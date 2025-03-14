"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CallContextType {
  isConnected: boolean;
  startCall: (room: string) => Promise<boolean>;
  endCall: () => void;
  isPermissionGranted: boolean;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

const checkPermissions = (): boolean => {
  if (typeof navigator !== "undefined" && navigator.mediaDevices) {
    return true;
  }
  return false;
};

const CallProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(
    checkPermissions()
  );

  useEffect(() => {
    setIsPermissionGranted(checkPermissions());
  }, []);

  const startCall = async (room: string) => {
    if (!isPermissionGranted) {
      console.warn("Permissão negada para iniciar a chamada.");
      return false;
    }
    setIsConnected(true);
    return true;
  };

  const endCall = () => {
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

const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};

export { CallProvider, useCall };
