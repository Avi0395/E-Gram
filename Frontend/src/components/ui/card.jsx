// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`rounded-xl shadow-md bg-white p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2 text-gray-700">{children}</div>;
}
