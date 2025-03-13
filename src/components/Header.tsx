
import { Link } from "react-router-dom";
import CameraFeed from "./CameraFeed";
import { useUserStore } from "@/lib/store";

const Header = () => {
  const { user } = useUserStore();

  return (
    <header className="flex items-center justify-between bg-white border-b p-4 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-super-comic text-2xl text-dragon flex items-center gap-2">
          <span>Dragon</span>
          <span className="text-xs font-satoshi bg-dragon/10 text-dragon px-2 py-1 rounded">Proctor</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-right">
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground text-xs">ID: {user.regNo}</div>
          </div>
        )}
        
        <div className="h-24 w-32 hidden sm:block">
          <CameraFeed />
        </div>
      </div>
    </header>
  );
};

export default Header;
