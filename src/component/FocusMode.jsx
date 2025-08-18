import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Settings, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const backgroundImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
];

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const intervalRef = useRef(null);
  const bgIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);

      if (Notification.permission === 'granted') {
        new Notification('🎉 Focus Mode Complete!', {
          body: 'Great job! Your focus session has ended. Take a well-deserved break!',
          icon: '/favicon.ico',
          tag: 'focus-complete'
        });
      }

      try {
        const audio = new Audio('/notification-sound.mp3');
        audio.play().catch(() => console.log('Could not play notification sound'));
      } catch (error) {
        console.log('Audio not available');
      }

      if (isFullscreen) {
        exitFullscreen();
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isFullscreen]);

  useEffect(() => {
    if (isFullscreen && isActive) {
      bgIntervalRef.current = setInterval(() => {
        setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
      }, 10000);
    } else {
      if (bgIntervalRef.current) {
        clearInterval(bgIntervalRef.current);
      }
    }

    return () => {
      if (bgIntervalRef.current) {
        clearInterval(bgIntervalRef.current);
      }
    };
  }, [isFullscreen, isActive]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(customMinutes * 60);
  };

  const setCustomTimer = () => {
    setTimeLeft(customMinutes * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.log('Fullscreen not supported or permission denied');
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const getTimerColor = () => {
    const percentage = (timeLeft / (customMinutes * 60)) * 100;
    if (percentage > 50) return "text-green-600 dark:text-green-400";
    if (percentage > 25) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressPercentage = () => {
    return ((customMinutes * 60 - timeLeft) / (customMinutes * 60)) * 100;
  };

  const CircularTimer = ({ size, strokeWidth }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = getProgressPercentage();
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted-foreground/20"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={getTimerColor()}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center ${size > 200 ? 'text-4xl' : 'text-2xl'} font-mono font-bold ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    );
  };

  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center z-50 text-white transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImages[currentBgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center space-y-8 p-8 backdrop-blur-sm bg-black/20 rounded-3xl">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Focus Mode</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
              {isActive ? "In Progress" : "Paused"}
            </Badge>
          </div>
          
          <div className="flex justify-center">
            <CircularTimer size={300} strokeWidth={8} />
          </div>
          
          <div className="flex justify-center gap-6">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 text-xl px-8 py-4 border border-white/30"
            >
              {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
              className="text-xl px-8 py-4 border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={exitFullscreen}
              variant="outline"
              size="lg"
              className="text-xl px-8 py-4 border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
            >
              <Minimize2 className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-8">
            <Label htmlFor="fullscreen-timer" className="text-white">
              Set Timer (minutes):
            </Label>
            <Input
              id="fullscreen-timer"
              type="number"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 25)}
              className="w-20 bg-white/20 text-white border-white/30 backdrop-blur-sm"
              min="1"
              max="120"
            />
            <Button
              onClick={setCustomTimer}
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
            >
              Set
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <Image className="w-4 h-4" />
            <span>Nature scenery changes every 10 seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-64">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg flex items-center justify-center gap-2">
          Focus Mode
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Paused"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <CircularTimer size={150} strokeWidth={6} />
        </div>
        
        <div className="flex justify-center gap-2">
          <Button onClick={toggleTimer} size="sm">
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button onClick={resetTimer} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button onClick={enterFullscreen} variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timer-minutes">Timer Duration (minutes)</Label>
                  <Input
                    id="timer-minutes"
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 25)}
                    min="1"
                    max="120"
                  />
                </div>
                <Button onClick={setCustomTimer} className="w-full">
                  Set Timer
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusMode;
