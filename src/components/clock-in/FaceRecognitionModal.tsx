"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from '@vladmandic/face-api';
import { fetchApi } from "@/lib/api";

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function FaceRecognitionModal({
  isOpen,
  onClose,
  onComplete,
}: FaceRecognitionModalProps) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [identityVerified, setIdentityVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lastDescriptor, setLastDescriptor] = useState<number[] | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const successSound = process.env.NEXT_PUBLIC_SUCCESS_SOUND || "success2.mp3";

  // Load models
  useEffect(() => {
    if (!isOpen) return;
    
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err: any) {
        console.error("Error loading face-api models:", err);
        setCameraError("Failed to load face detection models.");
      }
    };

    if (!modelsLoaded) {
      loadModels();
    }
  }, [isOpen, modelsLoaded]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (!modelsLoaded) return;
    
    try {
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         throw new Error("Camera API not supported. Please use HTTPS.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      // Custom wording based on strict mobile policies
      if (err.name === 'NotAllowedError') {
         setCameraError("Camera access denied. Please allow it in settings.");
      } else {
         const msg = "Camera unavailable. Ensure you are using HTTPS. " + (err.message || "");
         setCameraError(msg);
         if (!isOpen) return; // Prevent alert if closing
         // alert is helpful for mobile debugging when the UI is stuck
         window.alert(msg);
      }
    }
  }, [modelsLoaded, isOpen]);

  // Handle open state
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setIdentityVerified(false);
      setProcessing(false);
      setLastDescriptor(null);
      setApiMessage(null);
    }

    return () => stopCamera();
  }, [isOpen, startCamera, stopCamera]);

  // Face Detection Logic
  const handleVideoPlay = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrameId: number;

    const scan = async () => {
      if (!video || video.paused || video.ended) return;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      if (displaySize.width === 0) {
        animationFrameId = requestAnimationFrame(scan);
        return;
      }
      
      faceapi.matchDimensions(canvas, displaySize);

      const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        
        const box = resizedDetections.detection.box;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Mirroring coordinates to match the CSS scale-x-[-1] flip
          const flippedX = displaySize.width - box.x - box.width;
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 3;
          ctx.strokeRect(flippedX, box.y, box.width, box.height);
        }

        setIdentityVerified(true);
        setLastDescriptor(Array.from(detection.descriptor));
      } else {
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        setIdentityVerified(false);
        setLastDescriptor(null);
      }
      
      animationFrameId = requestAnimationFrame(scan);
    };

    scan();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [modelsLoaded]);

  const handleConfirmClockIn = async () => {
    if (!lastDescriptor) return;

    setProcessing(true);
    setApiMessage(null);

    try {
      const response = await fetchApi("attendance/clock-by-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ face_embedding: lastDescriptor }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiMessage(`Success: ${data.message} as ${data.employee_name}`);
        
        // Play success sound
        const audio = new Audio(`/sounds/${successSound}`);
        audio.play().catch(e => console.error("Error playing sound:", e));
        
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        setApiMessage(`Failed: ${data.message || "Face not recognized"}`);
        setProcessing(false);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      setApiMessage("Error connecting to server");
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Blurred background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 py-6 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="material-icons-round">close</span>
          </button>
          <h1 className="text-lg font-semibold tracking-wide text-gray-800">
            Attendance
          </h1>
          <div className="w-10" />
        </div>

        {/* Face scanner */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-64 h-64 rounded-full border-4 border-white overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] bg-gray-100">
             {cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500 p-4 text-center relative z-50">
                    <span className="material-icons-round text-4xl mb-2 text-red-400">no_photography</span>
                    <span className="text-sm font-bold text-gray-700 mb-1">Camera Error</span>
                    <span className="text-[11px] leading-tight mb-3">
                      {cameraError}
                    </span>
                    <button 
                      onClick={(e) => { e.preventDefault(); startCamera(); }}
                      className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-xs font-semibold shadow-md active:scale-95 transition-all pointer-events-auto"
                    >
                      Allow Camera
                    </button>
                </div>
             ) : (
                <>
                  <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted
                      onPlay={handleVideoPlay}
                      className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                  />
                  <canvas 
                      ref={canvasRef} 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                  />
                </>
             )}

            {/* Inner ring */}
            <div className="absolute inset-4 border-2 border-white/50 rounded-full pointer-events-none" />

            {/* Crosshairs */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-2 bg-[var(--color-primary)] shadow-sm pointer-events-none" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1 h-2 bg-[var(--color-primary)] shadow-sm pointer-events-none" />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-2 h-1 bg-[var(--color-primary)] shadow-sm pointer-events-none" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-1 bg-[var(--color-primary)] shadow-sm pointer-events-none" />
          </div>

          {/* Pulse rings */}
          {!cameraError && (
            <>
                <div className="absolute w-72 h-72 rounded-full border border-[var(--color-primary)]/20 animate-pulse -z-10 bg-white/50" />
                <div className="absolute w-80 h-80 rounded-full border border-[var(--color-primary)]/10 animate-pulse -z-10" />
            </>
          )}

          <h2 className="mt-8 text-2xl font-semibold text-center text-gray-800">
            {cameraError ? "Camera Error" : (!modelsLoaded ? "Loading Models..." : "Align your face")}
          </h2>
          <p className={"mt-2 text-center text-sm font-medium px-4 " + 
            (apiMessage?.startsWith("Failed") || apiMessage?.startsWith("Error") ? "text-red-500" : 
             apiMessage?.startsWith("Success") ? "text-green-600" : "text-gray-500")}
          >
             {apiMessage || (cameraError ? "Please check permissions" : "Please hold still for a moment")}
          </p>
        </div>

        {/* Verification cards */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {/* Identity */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                  <span className="material-icons-round text-lg">face</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Identity
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {identityVerified ? "Face Detected" : "Scanning..."}
                  </span>
                </div>
              </div>
              {identityVerified ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                  <span className="material-icons-round text-xs text-white font-bold">
                    check
                  </span>
                </div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse ring-4 ring-yellow-500/20" />
              )}
            </div>
          </div>

          {/* Submit / Processing button */}
          <button
            onClick={handleConfirmClockIn}
            disabled={!identityVerified || processing}
            className={`w-full mt-4 py-4 px-6 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              identityVerified && !processing
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-blue-500/20"
                : "bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed opacity-80"
            }`}
          >
            {processing ? (
              <>
                <span className="material-icons-round animate-spin text-lg text-[var(--color-primary)]">
                  sync
                </span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="material-icons-round text-lg">
                  check_circle
                </span>
                <span>Confirm Attendance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
