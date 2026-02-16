"use client";

import { useEffect, useRef, useState } from "react";

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
  const [identityVerified, setIdentityVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      if (!isOpen) return;
      
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        
        if (mounted) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          // Clean up if component unmounted during setup
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        if (mounted) {
          setCameraError("Could not access camera. Please allow camera permissions.");
        }
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };

    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setIdentityVerified(false);
      setProcessing(false);
    }

    return () => {
      mounted = false;
      stopCamera();
    };
  }, [isOpen]);

  // Simulation of face detection/recognition
  useEffect(() => {
    if (!isOpen || cameraError) return;

    // Simulate verification flow after camera starts
    const identityTimer = setTimeout(() => {
        setIdentityVerified(true);
    }, 3500); // Increased delay slightly to simulate scanning

    return () => clearTimeout(identityTimer);
  }, [isOpen, cameraError]);

  useEffect(() => {
    if (identityVerified && isOpen) {
      setProcessing(true);
      const processTimer = setTimeout(() => {
        setProcessing(false);
        onComplete();
      }, 2000);
      return () => clearTimeout(processTimer);
    }
  }, [identityVerified, isOpen, onComplete]);

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
            Clock In
          </h1>
          <div className="w-10" />
        </div>

        {/* Face scanner */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-64 h-64 rounded-full border-4 border-white overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] bg-gray-100">
             {/* Camera Feed or Placeholder */}
             {cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500 p-4 text-center">
                    <span className="material-icons-round text-4xl mb-2">no_photography</span>
                    <span className="text-xs">{cameraError}</span>
                </div>
             ) : (
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                />
             )}

            {/* Scan line animation */}
            {!cameraError && (
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="w-full h-[200%] bg-gradient-to-b from-transparent via-[var(--color-primary)]/20 to-transparent animate-scan absolute top-0 left-0 -translate-y-1/2" />
                </div>
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
            {cameraError ? "Camera Error" : "Align your face"}
          </h2>
          <p className="mt-2 text-gray-500 text-center text-sm">
             {cameraError ? "Please check permissions" : "Please hold still for a moment"}
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
                    {identityVerified ? "Verified" : "Verifying..."}
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

            {/* Location */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                  <span className="material-icons-round text-lg">near_me</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    Office HQ (Verified)
                  </span>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                <span className="material-icons-round text-xs text-white font-bold">
                  check
                </span>
              </div>
            </div>
          </div>

          {/* Submit / Processing button */}
          <button
            disabled={!identityVerified || processing}
            className={`w-full mt-4 py-4 px-6 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              identityVerified && !processing
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-blue-500/20"
                : "bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed opacity-80"
            }`}
          >
            {processing || !identityVerified ? (
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
                <span>Confirm Clock In</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            By clocking in, you agree to the{" "}
            <a
              className="underline text-gray-500 hover:text-gray-800"
              href="#"
            >
              terms of service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
