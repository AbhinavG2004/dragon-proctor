
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore, useExamStore } from "@/lib/store";
import { examQuestions } from "@/lib/data";
import Header from "@/components/Header";
import QuestionCard from "@/components/QuestionCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";
import CameraFeed from "@/components/CameraFeed";

const ExamPage = () => {
  const { user } = useUserStore();
  const { currentQuestionIndex, setCurrentQuestionIndex } = useExamStore();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [showMobileCam, setShowMobileCam] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/completed");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="p-4 border-b bg-white sticky top-16 z-40">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex gap-2 items-center">
            <Progress value={progress} className="w-32 h-2" />
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1}/{examQuestions.length}
            </span>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setShowMobileCam(!showMobileCam)}
            >
              {showMobileCam ? "Hide Camera" : "Show Camera"}
            </Button>
            
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock size={16} className={timeLeft < 300 ? "text-red-500" : ""} />
              <span className={timeLeft < 300 ? "text-red-500" : ""}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {showMobileCam && (
        <div className="p-4 md:hidden">
          <CameraFeed className="h-32" />
        </div>
      )}
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {timeLeft < 300 && (
          <Card className="p-3 mb-4 bg-red-50 border-red-200 flex items-center gap-3">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-sm text-red-700">You have less than 5 minutes remaining!</p>
          </Card>
        )}
        
        <QuestionCard 
          question={currentQuestion} 
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLast={currentQuestionIndex === examQuestions.length - 1}
          isFirst={currentQuestionIndex === 0}
        />
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Dragon Proctor System • Exam Session #{Math.floor(Math.random() * 10000)}
        </div>
      </main>
    </div>
  );
};

export default ExamPage;
