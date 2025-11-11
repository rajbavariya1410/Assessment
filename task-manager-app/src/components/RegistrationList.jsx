import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistrations } from "../features/registratios/registrationsSlice";

export default function RegistrationList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.registrations);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Conference Registrations</h2>
      {items.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <ul>
          {items.map((reg) => (
            <li key={reg.id}>
              <strong>{reg.fullName}</strong> – {reg.email} – {reg.topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
