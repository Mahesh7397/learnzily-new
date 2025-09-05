import React from 'react';
import { Search, Filter, Upload, Plus } from 'lucide-react';


const Header= ({ searchQuery, onSearchChange }) => {

  return (
    <header className="bg-card  border-border px-4 sm:px-6 py-4 transition-theme">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="w-full sm:flex-1 max-w-2xl sm:mx-auto relative order-2 sm:order-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search your courses or discover new ones..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-theme placeholder:text-muted-foreground text-sm sm:text-base"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-theme">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-theme">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base hidden sm:inline">Upload</span>
          </button>
          
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-brand text-foreground hover:opacity-90 rounded-lg transition-theme shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Add Course</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;