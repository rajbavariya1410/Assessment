import React, { useState } from "react";

export default function TagsInput({ value = [], onChange }) {
  const [text, setText] = useState("");

  const addTag = () => {
    const t = text.trim();
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setText("");
  };

  const removeTag = (tag) => onChange(value.filter(t => t !== tag));

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {value.map(tag => (
          <div key={tag} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd" }}>
            {tag} <button onClick={() => removeTag(tag)}>x</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6 }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
        <button onClick={addTag}>Add</button>
      </div>
    </div>
  );
}
