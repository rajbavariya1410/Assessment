import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRegistration } from "./registrationsSlice";
import TagsInput from "./TagsInput";

const initialErrors = { name: "", email: "", phone: "" };

function validate({ name, email, phone }) {
  const errors = { ...initialErrors };
  if (!name || name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.email = "Invalid email.";
  const phoneRegex = /^\d{10}$/;
  if (!phone || !phoneRegex.test(phone)) errors.phone = "Phone must be 10 digits.";
  return errors;
}

export default function RegistrationForm({ sessions = [] }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    session: sessions[0] || "",
    type: "Online",
    tags: [],
  });
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleTagsChange = (tags) => setForm(prev => ({ ...prev, tags }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    if (v.name || v.email || v.phone) { setErrors(v); return; }
    setSubmitting(true);
    try {
      await dispatch(addRegistration(form)).unwrap();
      setForm({ name: "", email: "", phone: "", session: sessions[0] || "", type: "Online", tags: [] });
    } catch (err) {
      // handle API error (toast or field)
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="text-red-600">{errors.name}</small>}
      </div>

      <div>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="text-red-600">{errors.email}</small>}
      </div>

      <div>
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <small className="text-red-600">{errors.phone}</small>}
      </div>

      <div>
        <label>Session</label>
        <select name="session" value={form.session} onChange={handleChange}>
          {sessions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label>Attendance Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Online</option>
          <option>Offline</option>
        </select>
      </div>

      <div>
        <label>Tags / Interests</label>
        <TagsInput value={form.tags} onChange={handleTagsChange} />
      </div>

      <button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Register"}</button>
    </form>
  );
}
