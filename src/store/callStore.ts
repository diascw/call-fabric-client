'use client';

import { create } from "zustand";
import { Call } from "@/types/Call";

interface CallState {
  currentCall: Call | null;
  startCall: (address: string) => void;
  endCall: () => void;
}

export const useCallStore = create<CallState>((set) => ({
  currentCall: null,
  startCall: (address) =>
    set({
      currentCall: { id: Math.random().toString(36), address, status: "connecting" },
    }),
  endCall: () => set({ currentCall: null }),
}));
