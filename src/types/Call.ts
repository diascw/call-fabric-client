export interface Call {
    id: string;
    address: string;
    status: "connecting" | "connected" | "disconnected";
  }
  