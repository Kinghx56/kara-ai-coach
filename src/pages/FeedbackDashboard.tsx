import { useState } from 'react';
import { ArrowLeft, Download, Play, RotateCcw, BarChart3, Clock, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const mockTimelineEvents = [
  { timestamp: '0:15', type: 'positive', event: 'Strong opening statement', score: 85 },
  { timestamp: '1:23', type: 'neutral', event: 'Asked clarifying question', score: 75 },
  { timestamp: '2:45', type: 'negative', event: 'Excessive filler words', score: 60 },
  { timestamp: '3:12', type: 'positive', event: 'Excellent example provided', score: 90 },
  { timestamp: '4:30', type: 'positive', event: 'Confident body language', score: 88 },
];

const mockQuestions = [
  {
    question: "Tell me about yourself and why you're interested in this role.",
    userAnswer: "I'm a software engineer with 3 years of experience...",
    modelAnswer: "I'm a passionate software engineer with extensive experience in full-stack development, particularly in React and Node.js. What draws me to this role is the opportunity to work on scalable systems that impact millions of users, which aligns perfectly with my career goal of building meaningful technology solutions."
  },
  {
    question: "What is your greatest strength and how does it apply to this position?",
    userAnswer: "My greatest strength is problem-solving...",
    modelAnswer: "My greatest strength is my analytical problem-solving approach combined with strong communication skills. In my previous role, I consistently broke down complex technical challenges into manageable components, which not only helped me find efficient solutions but also enabled me to explain technical concepts clearly to both technical and non-technical stakeholders."
  }
];

export default function FeedbackDashboard() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTimelineClick = (timestamp: string) => {
    const [min, sec] = timestamp.split(':').map(Number);
    const totalSeconds = min * 60 + sec;
    setCurrentTime(totalSeconds);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/dashboard">
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-4xl font-bold mb-2">Interview Analysis</h1>
              <p className="text-muted-foreground">
                Software Engineer Interview • Completed on Dec 13, 2024
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button>
                <RotateCcw className="mr-2 h-4 w-4" />
                Practice Again
              </Button>
            </div>
          </div>

          <div className="text-center p-8 bg-muted/20 rounded-lg mb-8">
            <p className="text-muted-foreground">
              [BACKEND INTEGRATION REQUIRED: Fetch all analysis data for this session from /api/interview/session_id/results and populate all modules on this page.]
            </p>
          </div>

          {/* Main Content - Two Pane Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Pane - Video Player */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Interview Recording</CardTitle>
                    <Badge variant="secondary">25:42 duration</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Play className="h-12 w-12 mx-auto mb-2" />
                      <p>Video Player Placeholder</p>
                      <p className="text-xs mt-1">Current time: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Progress value={(currentTime / (25 * 60)) * 100} className="w-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">25:42</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Pane - Analysis Tabs */}
            <div className="space-y-6">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4 mt-6">
                  <Card className="premium-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Overall Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-primary mb-2">82/100</div>
                        <Badge variant="secondary" className="text-sm">Great Performance</Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Content Quality</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Communication</span>
                            <span>78%</span>
                          </div>
                          <Progress value={78} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Confidence</span>
                            <span>83%</span>
                          </div>
                          <Progress value={83} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="premium-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="mr-2 h-5 w-5" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <p className="font-medium">Strong Technical Knowledge</p>
                          <p className="text-muted-foreground">Demonstrated deep understanding of core concepts</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <p className="font-medium">Reduce Filler Words</p>
                          <p className="text-muted-foreground">Used "um" and "ah" 23 times during the session</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <p className="font-medium">Excellent Examples</p>
                          <p className="text-muted-foreground">Provided concrete, relevant examples for each answer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6">
                  <Card className="premium-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Interview Timeline
                      </CardTitle>
                      <CardDescription>Click on events to jump to that moment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockTimelineEvents.map((event, index) => (
                          <div 
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleTimelineClick(event.timestamp)}
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              event.type === 'positive' ? 'bg-green-500' :
                              event.type === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium">{event.event}</p>
                                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {event.score}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="answers" className="mt-6">
                  <div className="space-y-4">
                    {mockQuestions.map((q, index) => (
                      <Card key={index} className="premium-card">
                        <CardHeader>
                          <CardTitle className="text-base">Question {index + 1}</CardTitle>
                          <CardDescription className="text-sm italic">
                            "{q.question}"
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Your Answer</h4>
                            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                              {q.userAnswer}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              Model Answer
                              <Badge variant="secondary" className="ml-2 text-xs">AI Generated</Badge>
                            </h4>
                            <p className="text-sm text-muted-foreground bg-primary/5 border border-primary/10 p-3 rounded">
                              {q.modelAnswer}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}