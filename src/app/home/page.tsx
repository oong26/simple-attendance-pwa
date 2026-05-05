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


export default function HomePage() {
  const [showFaceRecog, setShowFaceRecog] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [locationName, setLocationName] = useState("Head Office");
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannerType, setScannerType] = useState<string>("qrcode");
  const [disabledReason, setDisabledReason] = useState<string | null>(null);

  const loadLocationData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch department info for location name
      const deptResponse = await fetchApi("attendance/department", { method: "GET" });
      const deptData = await deptResponse.json();
      if (deptResponse.ok && deptData.success && deptData.department) {
        setLocationName(deptData.department.name);
      }

      // 2. Fetch today's global status (Holiday, Day Off, Schedule)
      const todayResponse = await fetchApi("attendance/today", { method: "GET" });
      const todayData = await todayResponse.json();

      if (todayResponse.ok && todayData.success) {
        if (todayData.is_holiday) {
          setIsDisabled(true);
          setDisabledReason(`Today is a holiday (${todayData.holiday_name}). Attendance is disabled.`);
        } else if (todayData.is_day_off) {
          setIsDisabled(true);
          const currentDayStr = new Date().toLocaleDateString("en-US", { weekday: "long" });
          setDisabledReason(`Today is ${currentDayStr} (Day Off). Attendance is closed.`);
        } else if (todayData.schedule && todayData.schedule.start_time) {
          const now = new Date();
          const [startHour, startMinute] = todayData.schedule.start_time.split(":").map(Number);
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          if (currentHour < startHour || (currentHour === startHour && currentMinute < startMinute)) {
            setIsDisabled(true);
            setDisabledReason(`Attendance will open today at ${todayData.schedule.start_time}.`);
          } else {
            setIsDisabled(false);
            setDisabledReason(null);
          }
        } else {
          setIsDisabled(false);
          setDisabledReason(null);
        }
      }

      // 3. Fetch scanner type
      const scannerResponse = await fetchApi("attendance/scanner-type", { method: "GET" });
      const scannerData = await scannerResponse.json();

      if (scannerResponse.ok && scannerData.success) {
        setScannerType(scannerData.data.type);
      }
    } catch (error) {
      console.error("Failed to load attendance status", error);
    } finally {
      setLoading(false);
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
            {loading && (
              <div className="w-full max-w-[280px] text-center p-3 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl border border-blue-100 break-words">
                Loading...
              </div>
            )}
            {!loading && (
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
                  <span className="font-medium text-sm">{scannerType == 'qrcode' ? 'Scan QR Code' : 'Scan Barcode'}</span>
              </button>
            )}
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
        scannerType={scannerType}
      />
    </>
  );
}
