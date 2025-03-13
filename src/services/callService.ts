export const createRoomAndGetToken = async (roomName: string) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_SIGNALWIRE_FABRIC_API_URL;

    if (!API_URL) {
      throw new Error("API_URL is not defined! Check your .env.local file.");
    }

    const url = `${API_URL}/video/rooms`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_SIGNALWIRE_PROJECT_KEY}:${process.env.NEXT_PUBLIC_SIGNALWIRE_TOKEN}`
        )}`,
      },
      body: JSON.stringify({
        name: roomName,
        display_name: "My Video Room",
        size: "medium",
        quality: "1080p",
        layout: "grid-responsive",
        enable_chat: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
