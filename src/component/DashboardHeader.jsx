
import { Bell, MessageCircle, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-brand to-brand-foreground text-white rounded-lg mb-6">
      {/* Header Icons - Top Left */}
      <div className="flex items-center gap-3">
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </Button>
        </Link>
        
        <Link to="/forum">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
            <MessageCircle className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-blue-500">
              5
            </Badge>
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* User Info - Right Side */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-orange-300 text-white text-lg font-bold">
              G
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-1">Hello, Gareth!</h1>
          <p className="text-blue-100 text-sm">
            We've missed you! Check out what's new
          </p>
        </div>
      </div>
    </div>
  );
};
