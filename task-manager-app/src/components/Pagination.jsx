import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={() => onChange(Math.max(1, page-1))} disabled={page===1}>Prev</button>
      <span style={{ margin: "0 8px" }}>{page} / {totalPages}</span>
      <button onClick={() => onChange(Math.min(totalPages, page+1))} disabled={page===totalPages}>Next</button>
    </div>
  );
}
