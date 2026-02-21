"use client";

import { useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import { fetchApi } from "@/lib/api";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  onComplete,
}: QRCodeModalProps) {
  const [processing, setProcessing] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScan = async (devices: unknown[]) => {
    if (processing) return;
    if (!devices || devices.length === 0) return;

    // Get the detected value String
    const rawValue = devices[0].rawValue;
    if (!rawValue) return;

    setProcessing(true);
    setApiMessage(null);

    // Validate if it is JSON and has employee_id
    let parsedData = null;
    try {
      parsedData = JSON.parse(rawValue);
    } catch {
       setApiMessage("Error: Invalid QR Code format");
       setTimeout(() => setProcessing(false), 2000);
       return;
    }

    if (!parsedData || !parsedData.employee_id) {
       setApiMessage("Error: No valid Employee ID found in QR Code");
       setTimeout(() => setProcessing(false), 2000);
       return;
    }

    // Attempt scan payload
    try {
      const response = await fetchApi("attendance/clock-by-qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrcode_data: rawValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiMessage(`Success: ${data.message} as ${data.employee_name}`);
        setTimeout(() => {
          onComplete();
          setProcessing(false);
          setApiMessage(null);
        }, 1500);
      } else {
        setApiMessage(`Failed: ${data.message || "Unrecognized payload"}`);
        setTimeout(() => setProcessing(false), 2000);
      }
    } catch (error: unknown) {
      console.error("API Error:", error);
      setApiMessage("Error connecting to server");
      setTimeout(() => setProcessing(false), 2000);
    }
  };

  const handleModalClose = () => {
     setApiMessage(null);
     setProcessing(false);
     onClose();
  };

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
            onClick={handleModalClose}
            className="p-2 -ml-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="material-icons-round">close</span>
          </button>
          <h1 className="text-lg font-semibold tracking-wide text-gray-800">
            Scan QR Code
          </h1>
          <div className="w-10" />
        </div>

        {/* QR scanner */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-72 h-72 rounded-3xl border-4 border-white overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] bg-gray-100 flex items-center justify-center">
             
             {!processing && isOpen && (
               <Scanner
                  onScan={handleScan}
                  formats={['qr_code']}
                  components={{
                      audio: false,
                      tracker: true,
                  }}
                  styles={{
                      container: { width: '100%', height: '100%' },
                  }}
               />
             )}
             
             {processing && (
               <div className="w-full h-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20 absolute inset-0">
                 <span className="material-icons-round animate-spin text-4xl text-[var(--color-primary)] mb-2">
                   sync
                 </span>
                 <span className="text-sm font-semibold text-gray-700">Verifying...</span>
               </div>
             )}
          </div>

          <h2 className="mt-8 text-xl font-semibold text-center text-gray-800">
             Align QR Code within the frame
          </h2>
          <p className={"mt-2 text-center text-sm font-medium px-4 " + 
            (apiMessage?.startsWith("Failed") || apiMessage?.startsWith("Error") ? "text-red-500" : 
             apiMessage?.startsWith("Success") ? "text-green-600" : "text-gray-500")}
          >
             {apiMessage || "Scanning will happen automatically"}
          </p>
        </div>
      </div>
    </div>
  );
}
