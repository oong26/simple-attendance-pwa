"use client";

import { useState, useCallback } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import Greeting from "@/components/home/Greeting";
import LiveClock from "@/components/home/LiveClock";
import LocationBadge from "@/components/home/LocationBadge";
import ClockInButton from "@/components/home/ClockInButton";
import StatusCards from "@/components/home/StatusCards";
import FaceRecognitionModal from "@/components/clock-in/FaceRecognitionModal";

export default function DashboardPage() {
  const [showFaceRecog, setShowFaceRecog] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [totalHours, setTotalHours] = useState("0h 0m");

  const handleClockIn = () => {
    setShowFaceRecog(true);
  };

  const handleClockInComplete = useCallback(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setCheckInTime(timeStr);
    setTotalHours("0h 0m");
    setShowFaceRecog(false);
  }, []);

  return (
    <>
      <MobileLayout>
        <div className="px-6 flex-1 flex flex-col pt-4">
          <Greeting />
          <LiveClock />
          <LocationBadge />
          <ClockInButton onClockIn={handleClockIn} />
          <StatusCards
            checkInTime={checkInTime}
            totalHours={totalHours}
            overtime="--"
          />
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
