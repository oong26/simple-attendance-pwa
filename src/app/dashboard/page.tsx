"use client";

import { useState, useCallback, useEffect } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import LiveClock from "@/components/home/LiveClock";
import LocationBadge from "@/components/home/LocationBadge";
import ClockInButton from "@/components/home/ClockInButton";
import dynamic from "next/dynamic";
import { fetchApi } from "@/lib/api";

const FaceRecognitionModal = dynamic(
  () => import("@/components/clock-in/FaceRecognitionModal"),
  { ssr: false }
);

const QRCodeModal = dynamic(
  () => import("@/components/clock-in/QRCodeModal"),
  { ssr: false }
);

export default function DashboardPage() {
  const [showFaceRecog, setShowFaceRecog] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [locationName, setLocationName] = useState("Head Office");
  const [isDisabled, setIsDisabled] = useState(false);
  const [disabledReason, setDisabledReason] = useState<string | null>(null);

  const loadLocationData = useCallback(async () => {
    try {
      // Fetch department generic location
      const response = await fetchApi("attendance/department", { method: "GET" });
      const data = await response.json();
      
      if (response.ok && data.success && data.department) {
        setLocationName(data.department.name);

        // Validation for workdays and start time
        if (data.department.workdays && Array.isArray(data.department.workdays)) {
           const now = new Date();
           const currentDayStr = now.toLocaleDateString("en-US", { weekday: "long" });
           const currentHour = now.getHours();
           const currentMinute = now.getMinutes();

           const todaySetting = data.department.workdays.find((w: any) => w.day === currentDayStr);
           
           if (todaySetting) {
             if (!todaySetting.is_working) {
               setIsDisabled(true);
               setDisabledReason(`Today is ${currentDayStr} (Day Off). Attendance is closed.`);
             } else {
               const [startHour, startMinute] = todaySetting.start_time.split(":").map(Number);
               if (currentHour < startHour || (currentHour === startHour && currentMinute < startMinute)) {
                 setIsDisabled(true);
                 setDisabledReason(`Attendance will open today at ${todaySetting.start_time}.`);
               } else {
                 setIsDisabled(false);
                 setDisabledReason(null);
               }
             }
           }
        }
      }
    } catch (error) {
      console.error("Failed to load department data", error);
    }
  }, []);

  useEffect(() => {
    loadLocationData();
  }, [loadLocationData]);

  const handleClockIn = () => {
    setShowFaceRecog(true);
  };

  const handleClockInComplete = useCallback(() => {
    setShowFaceRecog(false);
    setShowQrCode(false);
  }, []);

  return (
    <>
      <MobileLayout>
        <div className="px-6 flex-1 flex flex-col pt-8 pb-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
            <p className="text-gray-500 text-sm mt-1">Please tap below to record your attendance</p>
          </div>
          
          <LiveClock />
          <LocationBadge locationName={locationName} />
          <ClockInButton onClockIn={handleClockIn} disabled={isDisabled} />
          
          <div className="mt-6 flex flex-col items-center gap-4">
            {disabledReason && (
              <div className="w-full max-w-[280px] text-center p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 break-words">
                {disabledReason}
              </div>
            )}
            <button
               onClick={() => setShowQrCode(true)}
               disabled={isDisabled}
               className={`flex items-center gap-2 px-6 py-3 border rounded-full shadow-sm transition-all w-full max-w-[280px] justify-center ${
                 isDisabled
                 ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                 : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
               }`}
            >
               <span className={`material-icons-round ${isDisabled ? "text-gray-300" : "text-gray-500"}`}>qr_code_scanner</span>
               <span className="font-medium text-sm">Scan QR Code</span>
            </button>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
             <span className="material-icons-round text-blue-500 mt-0.5">info</span>
             <p className="text-sm text-blue-800 leading-relaxed">
               Make sure your face is clearly visible in the camera frame before confirming your clock-in or clock-out.
             </p>
          </div>
        </div>
      </MobileLayout>

      <FaceRecognitionModal
        isOpen={showFaceRecog}
        onClose={() => setShowFaceRecog(false)}
        onComplete={handleClockInComplete}
      />

      <QRCodeModal
        isOpen={showQrCode}
        onClose={() => setShowQrCode(false)}
        onComplete={handleClockInComplete}
      />
    </>
  );
}
