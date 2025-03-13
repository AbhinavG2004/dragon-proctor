
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  type: 'single' | 'multiple';
}

interface QuestionCardProps {
  question: Question;
  onNext?: () => void;
  onPrevious?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
}

const QuestionCard = ({ 
  question, 
  onNext, 
  onPrevious, 
  isLast = false,
  isFirst = false
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      setSelectedOption(optionId);
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId) 
          : [...prev, optionId]
      );
    }
  };

  const isOptionSelected = (optionId: string) => {
    return question.type === 'single' 
      ? selectedOption === optionId 
      : selectedOptions.includes(optionId);
  };

  return (
    <Card className="question-card bg-[#252A37] border-gray-700 shadow-lg text-white">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium px-2 py-1 bg-[#1E2330] text-gray-300 rounded-full">
          Question {question.id}
        </span>
      </div>
      
      <h3 className="text-xl font-medium mb-6 text-white">{question.text}</h3>
      
      {question.type === 'single' ? (
        <RadioGroup value={selectedOption} className="space-y-3">
          {question.options.map((option) => (
            <div 
              key={option.id}
              className={`option-button ${isOptionSelected(option.id) ? 'active-option' : ''} bg-[#1E2330] border border-gray-700 hover:bg-[#2A3042]`}
              onClick={() => handleOptionClick(option.id)}
            >
              <RadioGroupItem id={option.id} value={option.id} className="text-[#f3f91c]" />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer text-gray-200">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="space-y-3">
          {question.options.map((option) => (
            <div 
              key={option.id}
              className={`option-button ${isOptionSelected(option.id) ? 'active-option' : ''} bg-[#1E2330] border border-gray-700 hover:bg-[#2A3042]`}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className={`w-5 h-5 mt-0.5 border rounded flex items-center justify-center ${isOptionSelected(option.id) ? 'bg-[#f3f91c] border-[#f3f91c] text-black' : 'border-gray-600'}`}>
                {isOptionSelected(option.id) && <Check size={14} />}
              </div>
              <span className="flex-1 text-gray-200">{option.text}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="border-gray-700 text-gray-300 hover:bg-[#2A3042] hover:text-white"
        >
          Previous
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-[#f3f91c] to-[#f3c81c] text-black font-bold hover:brightness-110"
        >
          {isLast ? 'Submit' : 'Next'}
        </Button>
      </div>
    </Card>
  );
};

export default QuestionCard;
