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

export default function DashboardPage() {
  const [showFaceRecog, setShowFaceRecog] = useState(false);
  const [locationName, setLocationName] = useState("Head Office");

  const loadLocationData = useCallback(async () => {
    try {
      // Fetch department generic location
      const response = await fetchApi("attendance/department", { method: "GET" });
      const data = await response.json();
      
      if (response.ok && data.success && data.department) {
        setLocationName(data.department.name);
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
  }, []);

  return (
    <>
      <MobileLayout>
        <div className="px-6 flex-1 flex flex-col pt-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
            <p className="text-gray-500 text-sm mt-1">Please tap below to record your attendance</p>
          </div>
          
          <LiveClock />
          <LocationBadge locationName={locationName} />
          <ClockInButton onClockIn={handleClockIn} />
          
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
    </>
  );
}
