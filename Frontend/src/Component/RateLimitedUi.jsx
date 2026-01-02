import React from 'react'

import { Zap } from "lucide-react";

export default function RateLimitedUi() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-700 px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-lg">
        
        {/* Glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-md">
          <Zap className="h-6 w-6" />
        </div>

        {/* Content */}
        <h1 className="mb-2 text-xl font-semibold text-slate-900">
          Rate Limit Reached
        </h1>

        <p className="mb-2 text-sm text-slate-600">
          You’ve made too many requests in a short period.
        </p>

        <p className="text-sm text-slate-500">
          Please wait a moment and try again in a few seconds.
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* Footer hint */}
        <span className="text-xs text-slate-400">
          This helps us keep things fast and fair 🚀
        </span>
      </div>
    </div>
  );
}
