"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type SnoozePickerProps = {
  onConfirm: (days: number, hours: number, minutes: number) => void;
};

export default function SnoozePicker({ onConfirm }: SnoozePickerProps) {
  const [days, setDays] = React.useState("0");
  const [hours, setHours] = React.useState("0");
  const [minutes, setMinutes] = React.useState("0");

  const handleConfirm = () => {
    const d = Math.max(0, parseInt(days) || 0);
    const h = Math.min(23, Math.max(0, parseInt(hours) || 0));
    const m = Math.min(59, Math.max(0, parseInt(minutes) || 0));

    onConfirm(d, h, m);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Snooze
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Days</label>
              <input
                type="number"
                min={0}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-16 border rounded px-2 py-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Hours</label>
              <input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-16 border rounded px-2 py-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Minutes</label>
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-16 border rounded px-2 py-1"
              />
            </div>
          </div>

          <Button className="mt-2" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
