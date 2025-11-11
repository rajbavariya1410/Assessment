// src/pages/Dashboard.jsx
import React from "react";
import RegistrationForm from "../features/registratios/RegistrationForm";
import RegistrationsTable from "../features/registratios/RegistrationsTable";
import AttendanceSummary from "../features/registratios/AttendanceSummary";

// Example session topics (could also fetch from API)
const sessionTopics = [
  "React Basics",
  "Redux Toolkit",
  "Advanced React Patterns",
  "State Management",
  "Performance Optimization"
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">
          Conference Registration Dashboard
        </h1>
        <p className="text-gray-600">
          Manage attendees, track sessions, and monitor participation in real time.
        </p>
      </div>

      {/* Summary Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Attendance Summary</h2>
        <AttendanceSummary />
      </div>

      {/* Add New Registration */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Add New Registration</h2>
        <RegistrationForm sessions={sessionTopics} />
      </div>

      {/* Table with Search, Filter, Pagination, Edit/Delete */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">All Registrations</h2>
        <RegistrationsTable sessions={sessionTopics} />
      </div>
    </div>
  );
}
