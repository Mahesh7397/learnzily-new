import React from 'react';
import { Download, Eye, Star, Calendar, User, FileText, GraduationCap } from 'lucide-react';


const SearchResultCard = ({ result }) => {
  const getTypeIcon = () => {
    return result.type === 'notes' ? FileText : GraduationCap;
  };

  const getTypeColor = () => {
    return result.type === 'notes' ? 'text-green-600 bg-green-50' : 'text-purple-600 bg-purple-50';
  };

  const preview=async()=>{
    
  }

  const TypeIcon = getTypeIcon();

  return (
    <div className="bg-background/60 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-200 group">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg ${getTypeColor()}`}>
            <TypeIcon className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {result.Sub_name}
        </h3>

        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {result.Course_name}
        </p>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {result.College_Degree}
        </p>

        {/* Metadata */}
        <div className="space-y-1 mb-3">
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {result.Key.includes("notes")?result.Issue_date:Sem_month_year}
            </div>
          </div>
        </div>

        {/* Tags */}
        {/* <div className="flex flex-wrap gap-1 mb-3">
          {result.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
            >
              {tag}
            </span>
          ))}
          {result.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
              +{result.tags.length - 3} more
            </span>
          )}
        </div>*/}
      </div> 

      {/* Card Footer */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-foreground font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-foreground font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;