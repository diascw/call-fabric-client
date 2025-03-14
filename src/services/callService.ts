const API_URL = process.env.NEXT_PUBLIC_SIGNALWIRE_FABRIC_API_URL;
const PROJECT_KEY = process.env.NEXT_PUBLIC_SIGNALWIRE_PROJECT_KEY;
const TOKEN = process.env.NEXT_PUBLIC_SIGNALWIRE_TOKEN;

if (!API_URL || !PROJECT_KEY || !TOKEN) {
  throw new Error("SignalWire environment variables are not defined! Check your .env.local file.");
}


const fetchSignalWire = async (endpoint: string, method: string, body?: object) => {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${PROJECT_KEY}:${TOKEN}`)}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const createRoomAndGetToken = async (roomName: string) => {
  return fetchSignalWire("/video/rooms", "POST", {
    name: roomName,
    display_name: "My Video Room",
    size: "medium",
    quality: "1080p",
    layout: "grid-responsive",
    enable_chat: true,
  });
};
