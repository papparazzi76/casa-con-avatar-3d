
import React, { useState, useEffect } from 'react';
import { QuizQuestion, quizQuestions, getRecommendation, generateHighlights, getNextSteps } from './quizData';
import { QuizStep } from './QuizStep';
import { QuizResult } from './QuizResult';
import { Progress } from "@/components/ui/progress";

interface QuizProps {
  onClose?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const totalSteps = quizQuestions.length;
  
  // Load saved progress from localStorage if exists
  useEffect(() => {
    const savedProgress = localStorage.getItem('propertySaleQuizProgress');
    if (savedProgress) {
      try {
        const { step, savedAnswers } = JSON.parse(savedProgress);
        setCurrentStep(step);
        setAnswers(savedAnswers);
      } catch (e) {
        console.error('Error loading saved quiz progress:', e);
      }
    }
  }, []);
  
  // Save progress to localStorage whenever answers or currentStep changes
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('propertySaleQuizProgress', JSON.stringify({
        step: currentStep,
        savedAnswers: answers
      }));
    }
  }, [answers, currentStep]);
  
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      // Clean up localStorage when quiz is completed
      localStorage.removeItem('propertySaleQuizProgress');
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setCompleted(false);
    localStorage.removeItem('propertySaleQuizProgress');
  };
  
  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  const calculateTotalScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };
  
  if (completed) {
    const totalScore = calculateTotalScore();
    const result = getRecommendation(totalScore);
    const highlights = generateHighlights(answers);
    const nextSteps = getNextSteps(result);
    
    return (
      <QuizResult 
        result={result}
        score={totalScore}
        highlights={highlights}
        nextSteps={nextSteps}
        onRestart={handleRestart}
      />
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">¿Quién debe vender mi vivienda?</h3>
          <span className="text-sm text-gray-500">Paso {currentStep + 1}/{totalSteps}</span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <QuizStep
          question={currentQuestion}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
        />
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion.id] === undefined}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-realestate-purple to-realestate-turquoise rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps - 1 ? 'Ver resultado' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
