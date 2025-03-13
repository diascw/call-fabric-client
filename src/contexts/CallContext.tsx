"use client";

import { createContext, useContext, useState } from "react";

interface CallContextType {
  isConnected: boolean;
  startCall: (room: string) => Promise<boolean>;
  endCall: () => void;
  isPermissionGranted: boolean;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true); // Simulação

  const startCall = async (room: string) => {
    console.log(`Starting call in room: ${room}`);
    setIsConnected(true);
    return true;
  };

  const endCall = () => {
    console.log("Ending call");
    setIsConnected(false);
  };

  return (
    <CallContext.Provider
      value={{ isConnected, startCall, endCall, isPermissionGranted }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
