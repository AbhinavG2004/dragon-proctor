
import { Link } from "react-router-dom";
import CameraFeed from "./CameraFeed";
import { useUserStore } from "@/lib/store";

const Header = () => {
  const { user } = useUserStore();

  return (
    <header className="flex items-center justify-between bg-[#1A1F2C] border-b border-gray-800 p-4 sticky top-0 z-50 shadow-md backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-super-comic text-3xl text-[#f3f91c] drop-shadow-[0_2px_8px_rgba(255,255,0,0.6)]">Dragon</span>
          <span className="text-xs font-satoshi bg-[#f3f91c]/10 text-[#f3f91c] px-2 py-1 rounded">Proctor</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-right text-white">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-400 text-xs">ID: {user.regNo}</div>
          </div>
        )}
        
        <div className="h-24 w-32 hidden sm:block border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <CameraFeed />
        </div>
      </div>
    </header>
  );
};

export default Header;
