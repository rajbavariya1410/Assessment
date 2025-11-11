import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { updateRegistration } from "./registrationsSlice";
import TagsInput from "./TagsInput";

ReactModal.setAppElement("#root");

export default function EditModal({ record, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...record });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateRegistration({ id: record.id, data: form })).unwrap();
      onClose();
    } catch (err) { console.error(err); }
  };

  return (
    <ReactModal isOpen onRequestClose={onClose} style={{ content: { maxWidth: 600, margin: "auto" } }}>
      <h3>Edit Registration</h3>
      <form onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input name="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input name="phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <select name="type" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option>Online</option><option>Offline</option>
        </select>

        <TagsInput value={form.tags || []} onChange={(tags) => setForm({...form, tags})} />

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </ReactModal>
  );
}
