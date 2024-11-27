import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/phone/bluetooth/")({
  component: RouteComponent,
});

interface MusicInfo {
  title: string;
  artist: string;
}
let options = {
  acceptAllDevices: true,
  optionalServices: ["battery_service"],
};
function RouteComponent() {
  const [device, setDevice] = useState<null>(null);
  const [musicInfo, setMusicInfo] = useState<MusicInfo | null>(null);

  const connectBluetooth = async () => {
    try {
      const device = await (navigator as any).bluetooth.requestDevice(options);

      await device.gatt?.connect();
      setDevice(device);

      // 在这里我们应该订阅音乐信息更新
      // 这部分需要根据具体的蓝牙协议来实现
      // 以下是一个模拟实现
      setMusicInfo({ title: "Connected", artist: "Updating..." });
    } catch (error) {
      console.error("Error connecting to device:", error);
    }
  };

  const disconnectBluetooth = () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
    }
    setDevice(null);
    setMusicInfo(null);
  };

  const nextTrack = () => {
    // 发送下一曲命令
    console.log("Next track");
  };

  const previousTrack = () => {
    // 发送上一曲命令
    console.log("Previous track");
  };

  useEffect(() => {
    // 清理函数
    return () => {
      if (device && device.gatt?.connected) {
        device.gatt.disconnect();
      }
    };
  }, [device]);
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Bluetooth Music Control</CardTitle>
      </CardHeader>
      <CardContent>
        {!device ? (
          <Button onClick={connectBluetooth}>Connect to Bluetooth</Button>
        ) : (
          <>
            <Button onClick={disconnectBluetooth} variant="destructive">
              Disconnect
            </Button>
            {musicInfo && (
              <div className="mt-4">
                <p>Now Playing: {musicInfo.title}</p>
                <p>Artist: {musicInfo.artist}</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={previousTrack}>Previous</Button>
              <Button onClick={nextTrack}>Next</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
