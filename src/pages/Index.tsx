
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
        toast.success("Successfully logged in");
        navigate("/exam");
      } else {
        toast.error("Please fill in all fields");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="font-super-comic text-3xl text-dragon">Dragon</h1>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-100">
          <div className="max-w-md w-full">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Exam Proctoring System</h2>
              <p className="text-muted-foreground">Enter your details to continue</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Access your examination portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regno">Registration Number</Label>
                    <Input
                      id="regno"
                      placeholder="Enter your registration number"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Continue to Exam"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="md:w-2/5 bg-gray-900 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-white font-super-comic text-xl mb-2">Proctor Instructions</h3>
            <p className="text-gray-300 text-sm">
              Ensure your camera is working properly before starting the exam. Your session will be monitored.
            </p>
          </div>
          
          <div className="flex-1 camera-container">
            <CameraFeed />
          </div>
          
          <div className="mt-6">
            <h4 className="text-white text-sm font-medium mb-2">Exam Guidelines</h4>
            <ul className="text-gray-300 text-xs space-y-2">
              <li>• Ensure you're in a well-lit, quiet environment</li>
              <li>• Keep your face visible in the camera throughout</li>
              <li>• No additional devices or people allowed in the room</li>
              <li>• No browsing other tabs during the examination</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
