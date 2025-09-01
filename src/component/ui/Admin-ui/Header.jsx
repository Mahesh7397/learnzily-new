import React from 'react';
import { Menu, Bell, Search, User, House  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Header = ({ onMenuClick }) => {
  const Navigate=useNavigate()
  return (
    <header className="bg-card border-b border-border px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring w-80 bg-background text-foreground transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">

          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-destructive rounded-full"></span>
          </button>
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors" onClick={()=>Navigate('/dashboard')}>
            <House className="w-6 h-6 text-foreground" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;