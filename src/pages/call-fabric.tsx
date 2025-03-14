import { useState, useRef, useEffect } from "react";
import { useCall } from "@/contexts/CallContext";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/Components/layouts/MainLayout";
import Button from "@/Components/atoms/Button";
import Input from "@/Components/atoms/Input";

const CallFabricPage = () => {
  const { isConnected, startCall, endCall, isPermissionGranted } = useCall();
  const { user } = useAuth();
  const [room, setRoom] = useState<string | null>(null);
  const [directory, setDirectory] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [, setCallHistory] = useState<string[]>([]);
  const [] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setRoom(`room_${Date.now()}`);
  }, []);

  useEffect(() => {
    if (isConnected && room) {
      navigator.mediaDevices
        .getUserMedia({ video: isCameraOn, audio: !isMuted })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    }
  }, [isConnected, isCameraOn, isMuted, room]);

  const handleCall = async (targetRoom?: string) => {
    const callTarget = targetRoom || room;
    if (!callTarget || !user?.name) {
      return;
    }
    if (!isPermissionGranted) {
      return;
    }
    const callSuccess = await startCall(callTarget);
    if (callSuccess) {
      setCallHistory((prevHistory) =>
        Array.from(new Set([callTarget, ...prevHistory]))
      );
    }
  };

  const deleteRoom = (roomToDelete: string) => {
    setDirectory(directory.filter((r) => r !== roomToDelete));
  };

  const addAddress = () => {
    if (newAddress && !directory.includes(newAddress)) {
      setDirectory([...directory, newAddress]);
      setNewAddress("");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-md rounded-xl p-8 w-[750px] text-center border border-gray-300 flex gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-700">Call Console</h2>
            <Input
              type="text"
              value={room || "Loading..."}
              readOnly
              className="mb-2 bg-gray-100 text-gray-700"
            />
            <Input
              type="text"
              value={user?.name || ""}
              readOnly
              className="mt-2 bg-gray-100 text-gray-700"
            />
            {isConnected ? (
              <>
                <Button
                  label="Disconnect"
                  onClick={() => endCall()}
                  variant="danger"
                  className="w-full mt-3"
                />
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="mt-4 w-full h-36 rounded shadow-md"
                />
                <div className="flex gap-2 mt-3 justify-center">
                  <Button
                    label={isMuted ? "Unmute" : "Mute"}
                    onClick={() => setIsMuted(!isMuted)}
                    variant="secondary"
                    className="px-2 "
                  />
                  <Button
                    label={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    variant="secondary"
                    className="px-2 "
                  />
                </div>
              </>
            ) : (
              <Button
                label="Dial"
                onClick={() => handleCall()}
                variant="success"
                className="w-full mt-3"
              />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-700">Directory</h2>
            <Input
              type="text"
              placeholder="New Address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="mt-2"
            />
            <Button
              label="Add Address"
              onClick={addAddress}
              variant="primary"
              className="w-full mt-2"
            />
            <ul className="space-y-2 mt-4">
              {directory.map((room, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md flex justify-between items-center gap-4"
                >
                  <span className="flex-1 truncate">{room}</span>
                  <div className="flex gap-2">
                    <Button
                      label="Call"
                      onClick={() => handleCall(room)}
                      variant="primary"
                      className="px-3 py-1"
                    />
                    <Button
                      label="Delete"
                      onClick={() => deleteRoom(room)}
                      variant="danger"
                      className="px-3 py-1"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CallFabricPage;
