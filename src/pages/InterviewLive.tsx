import { useState, useEffect } from 'react';
import { Mic, MicOff, Camera, CameraOff, Square, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function InterviewLive() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock questions for demo
  const questions = [
    "Tell me about yourself and why you're interested in this role.",
    "What is your greatest strength and how does it apply to this position?",
    "Describe a challenging project you've worked on and how you overcame obstacles.",
    "How do you handle working under pressure and tight deadlines?",
    "Where do you see yourself in 5 years and how does this role fit into your career goals?"
  ];

  useEffect(() => {
    // Simulate loading first question
    const timer = setTimeout(() => {
      setCurrentQuestion(questions[0]);
      setIsLoading(false);
      setIsRecording(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (questionNumber < questions.length) {
      setCurrentQuestion(questions[questionNumber]);
      setQuestionNumber(prev => prev + 1);
    } else {
      // End interview
      navigate('/feedback');
    }
  };

  const handleEndInterview = () => {
    setIsRecording(false);
    // Simulate processing time then redirect
    setTimeout(() => {
      navigate('/feedback');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="pulse-ring">
              {isRecording ? 'Recording' : 'Paused'}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Question {questionNumber} of {questions.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              {formatTime(timeElapsed)}
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleEndInterview}
            >
              <Square className="mr-2 h-4 w-4" />
              End Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Question Section */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <Card className="w-full max-w-2xl premium-card">
            <CardContent className="p-8 text-center">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground">
                    [BACKEND INTEGRATION REQUIRED: Fetch first question from /api/interview/start and display here. Subsequent questions will be received from the /api/answer/submit response.]
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    AI Interviewer says:
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
                    "{currentQuestion}"
                  </blockquote>
                  
                  <div className="pt-4">
                    <Button onClick={handleNextQuestion} variant="outline">
                      Next Question
                      <Play className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        <div className="w-80 border-l border-border/50 bg-card/20 p-6">
          <div className="space-y-4">
            <h3 className="font-medium text-center">Your Video</h3>
            
            <Card className="aspect-video bg-muted rounded-lg overflow-hidden">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">
                    [BACKEND INTEGRATION REQUIRED: Connect webcam stream here. Recording logic to be implemented on button press.]
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="flex items-center justify-center space-x-2 text-sm text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Recording</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}