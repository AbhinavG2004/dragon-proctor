
import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraFeedProps {
  className?: string;
}

const CameraFeed = ({ className = "" }: CameraFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Camera access denied. Please check permissions.");
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className={`camera-container ${className}`}>
      {isActive ? (
        <video ref={videoRef} className="camera-feed" autoPlay playsInline />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
          <CameraOff size={32} />
        </div>
      )}
      
      <div className="absolute top-2 right-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-white/10 hover:bg-white/20 text-white"
          onClick={isActive ? stopCamera : startCamera}
        >
          {isActive ? <CameraOff size={18} /> : <Camera size={18} />}
        </Button>
      </div>
      
      <div className="camera-overlay flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse-slow' : 'bg-red-500'}`}></div>
        <span>{isActive ? 'Live' : 'Inactive'}</span>
      </div>
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-center p-4">
          <div>
            <CameraOff className="mx-auto mb-2" />
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-white/20 text-white hover:bg-white/10"
              onClick={() => startCamera()}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
