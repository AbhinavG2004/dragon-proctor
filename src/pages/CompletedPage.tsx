
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useUserStore } from "@/lib/store";

const CompletedPage = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleExit = () => {
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" />
            </div>
            <CardTitle className="text-2xl">Exam Completed</CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Thank you for completing your exam, {user.name}. Your responses have been recorded.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="text-sm mb-2">
                <span className="text-muted-foreground">Registration Number:</span> {user.regNo}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Submission Time:</span> {new Date().toLocaleString()}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Your results will be available within 48 hours. You may now close this window.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button onClick={handleExit}>Exit Exam</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default CompletedPage;
