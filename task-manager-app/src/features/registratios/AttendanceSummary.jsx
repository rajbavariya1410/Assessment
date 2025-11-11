import React from "react";
import { useSelector } from "react-redux";

export default function AttendanceSummary() {
  const items = useSelector(s => s.registrations.items);
  const online = items.filter(i => i.type === "Online").length;
  const offline = items.filter(i => i.type === "Offline").length;
  const total = items.length;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div>
        <h4>Online</h4>
        <div>{online}</div>
      </div>
      <div>
        <h4>Offline</h4>
        <div>{offline}</div>
      </div>
      <div>
        <h4>Total</h4>
        <div>{total}</div>
      </div>
    </div>
  );
}
