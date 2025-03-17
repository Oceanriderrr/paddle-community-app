import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      {children}
    </div>
  );
}