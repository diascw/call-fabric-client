"use client";

import { useState } from "react";
import { createRoomAndGetToken } from "@/services/callService";

const CallConsole = () => {
  const [roomName, setRoomName] = useState(`video_room_${Date.now()}`);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRoom = async () => {
    try {
      const data = await createRoomAndGetToken(roomName);
    } catch (error) {
      setErrorMessage("Error connecting to the call.");
    }
  };

  return (
    <div className="p-4 bg-white rounded border border-gray-300 shadow-md">
      <h1 className="text-lg font-bold mb-2">Connect</h1>
      <div className="mb-2">
        <label className="text-sm font-medium">Room Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-1"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>

      <button
        onClick={handleCreateRoom}
        className="w-full bg-green-600 text-white p-2 rounded mt-2"
      >
        Connect
      </button>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default CallConsole;
