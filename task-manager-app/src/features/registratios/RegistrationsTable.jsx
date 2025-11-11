import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRegistrations, deleteRegistration } from "./registrationsSlice";
import EditModal from "./EditModal";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 5;

export default function RegistrationsTable({ sessions = [] }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(s => s.registrations);
  const [query, setQuery] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchRegistrations()); }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(r => {
      if (sessionFilter && r.session !== sessionFilter) return false;
      if (!q) return true;
      return [r.name, r.email, r.phone, r.session].some(f => String(f).toLowerCase().includes(q));
    });
  }, [items, query, sessionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete registration?")) return;
    try { await dispatch(deleteRegistration(id)).unwrap(); }
    catch (err) { console.error(err); }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)}>
          <option value="">All sessions</option>
          {sessions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Session</th><th>Type</th><th>Tags</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {status === "loading" && <tr><td colSpan="7">Loading...</td></tr>}
          {current.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.session}</td>
              <td>{r.type}</td>
              <td>{(r.tags || []).join(", ")}</td>
              <td>
                <button onClick={() => setEditing(r)}>Edit</button>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {editing && <EditModal record={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
