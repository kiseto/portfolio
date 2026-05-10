"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

function formatPhilippinesTime(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value;

  if (!hour || !minute || !dayPeriod) {
    return "";
  }

  return `${hour}:${minute} ${dayPeriod.toLowerCase()}`;
}

type PhilippinesTimeProps = {
  className?: string;
};

export function PhilippinesTime({ className }: PhilippinesTimeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(formatPhilippinesTime(new Date()));
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span
      className={cn("flex items-center gap-4", className)}
      aria-live="polite"
    >
      <span>philippines utc+8</span>
      <span>{time || "--:--"}</span>
    </span>
  );
}
