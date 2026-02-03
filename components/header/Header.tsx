import * as React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <h1 className="text-lg font-semibold">AI Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Ask questions, get analytics</p>
      </div>
    </header>
  );
}
