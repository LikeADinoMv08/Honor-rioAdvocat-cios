import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import { fmtBRLInt } from "../utils/helpers";

export function InlineNumber({
  value,
  onChange,
  min = 0,
  max,
  suffix = "",
  highlight = false,
  large = false,
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState("");
  const start = () => {
    setRaw(String(value));
    setEditing(true);
  };
  const commit = () => {
    const n = parseFloat(raw.replace(",", "."));
    if (!isNaN(n)) {
      let v = Math.max(min, n);
      if (max !== undefined) v = Math.min(max, v);
      onChange(v);
    }
    setEditing(false);
  };
  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        value={raw}
        min={min}
        max={max}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        className={`rounded-lg border-2 outline-none text-center font-black
          ${highlight ? "bg-white/20 border-white/60 text-white" : "bg-white border-purple-400 text-purple-700"}
          ${large ? "text-3xl w-36 py-1 px-2" : "text-xs w-16 py-0.5 px-1"}`}
      />
    );
  }
  return (
    <button
      onClick={start}
      title="Clique para editar"
      className={`group inline-flex items-center gap-1 font-black rounded-lg px-1 py-0.5 border-2 border-transparent cursor-pointer
        ${highlight ? "hover:bg-white/15 hover:border-white/40" : "hover:bg-purple-50 hover:border-purple-300"}
        ${large ? "text-4xl" : "text-xs"}`}
    >
      <span
        className={
          highlight
            ? "text-white"
            : large
              ? "text-purple-600"
              : "text-slate-600"
        }
      >
        {fmtBRLInt(value)}
        {suffix}
      </span>
      <Edit3
        className={`opacity-0 group-hover:opacity-60 flex-shrink-0 ${highlight ? "text-white" : "text-purple-400"} ${large ? "w-5 h-5" : "w-3 h-3"}`}
      />
    </button>
  );
}
