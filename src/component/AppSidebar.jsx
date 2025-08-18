
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Calendar,
  User,
  Brain,
  Bot,
  Calculator,
  Settings,
  LogOut,
  ChevronDown,
  Star
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Course",
    url: "/course",
    icon: BookOpen,
  },
  {
    title: "Forum",
    url: "/forum",
    icon: MessageSquare,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
  },
  {
    title: "Tutor",
    url: "/tutor",
    icon: User,
  },
  {
    title: "Smart Prep",
    url: "/smart-prep",
    icon: Brain,
  },
  {
    title: "Fifi AI",
    url: "/fifi-ai",
    icon: Bot,
  },
];

const tools = [
  {
    title: "Grade Calculator",
    url: "/tools/grade-calculator",
  },
  {
    title: "Percentage Calculator",
    url: "/tools/percentage-calculator",
  },
  {
    title: "Grade Tracker",
    url: "/tools/grade-tracker",
  },
  {
    title: "Grade Predictor",
    url: "/tools/grade-predictor",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const collapsed = state === "collapsed";

  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-foreground rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-black dark:text-white text-xl">LearnEze</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                    <item.icon className="w-4 h-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Tools
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tools.map((tool) => (
                      <SidebarMenuItem key={tool.title}>
                        <SidebarMenuButton asChild isActive={isActive(tool.url)}>
                          <Link to={tool.url} className="flex items-center px-6 py-2 text-sm">
                            {tool.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        {/* Upgrade to Premium */}
        {!collapsed && (
          <div className="bg-gradient-to-br from-brand/10 to-brand-foreground/10 border border-brand/20 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Upgrade to Premium</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock advanced features and unlimited access
            </p>
            <Button size="sm" className="w-full bg-gradient-to-r from-brand to-brand-foreground text-white">
              Upgrade Now
            </Button>
          </div>
        )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 p-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-brand text-white font-bold">
                  G
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">Gareth Christopher</div>
                  <div className="text-xs text-muted-foreground">gareth@example.com</div>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-brand text-white font-bold">
                  G
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Gareth Christopher</span>
                <span className="text-xs text-muted-foreground">gareth@example.com</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
              <LogOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
