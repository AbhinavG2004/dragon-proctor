
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store";
import CameraFeed from "@/components/CameraFeed";

const Index = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (regNo.trim() && password.trim() && name.trim()) {
        setUser({
          name,
          regNo,
        });
        toast({
          title: "Success",
          description: "Successfully logged in",
          variant: "default",
        });
        navigate("/exam");
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] text-white">
      <header className="border-b border-gray-800 p-6 bg-black/20 backdrop-blur-sm flex justify-center items-center">
        <h1 className="font-super-comic text-5xl text-[#f3f91c] drop-shadow-[0_2px_8px_rgba(255,255,0,0.6)]">Dragon</h1>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-[#1A1F2C] to-[#2F3542]">
          <div className="max-w-md w-full">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2 text-white">Exam Proctoring System</h2>
              <p className="text-gray-300">Enter your details to continue</p>
            </div>
            
            <Card className="bg-[#252A37] border-gray-700 shadow-xl shadow-black/20">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white">Login</CardTitle>
                <CardDescription className="text-gray-300">
                  Access your examination portal
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-[#1E2330] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#f3f91c]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regno" className="text-gray-200">Registration Number</Label>
                    <Input
                      id="regno"
                      placeholder="Enter your registration number"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      required
                      className="bg-[#1E2330] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#f3f91c]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-200">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-[#1E2330] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#f3f91c]/50"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#f3f91c] to-[#f3c81c] text-black font-bold hover:brightness-110 hover:shadow-md hover:shadow-yellow-500/20 transition-all" 
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Continue to Exam"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="md:w-2/5 bg-[#161A25] p-6 flex flex-col border-l border-gray-800">
          <div className="mb-6">
            <h3 className="text-[#f3f91c] font-super-comic text-xl mb-2">Proctor Instructions</h3>
            <p className="text-gray-300 text-sm">
              Ensure your camera is working properly before starting the exam. Your session will be monitored.
            </p>
          </div>
          
          <div className="flex-1 camera-container border-2 border-gray-700 rounded-xl overflow-hidden shadow-xl shadow-black/40">
            <CameraFeed />
          </div>
          
          <div className="mt-6">
            <h4 className="text-white text-sm font-medium mb-2">Exam Guidelines</h4>
            <ul className="text-gray-300 text-xs space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#f3f91c]">•</span> 
                <span>Ensure you're in a well-lit, quiet environment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f3f91c]">•</span> 
                <span>Keep your face visible in the camera throughout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f3f91c]">•</span> 
                <span>No additional devices or people allowed in the room</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f3f91c]">•</span> 
                <span>No browsing other tabs during the examination</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
