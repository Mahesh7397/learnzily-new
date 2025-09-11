
"use client";

import { cn } from "../lib/Utlis";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import {
  BookOpen,
  Calculator,
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  User,
  Brain,
  Bot,
  ChevronDown,
  ChevronsUpDown,
  Bell,
  UserCog 
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { UseDataProvider } from "../contexts/DataProvider";

const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  duration: 0.2,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Course", url: "/course", icon: BookOpen },
  { title: "Forum", url: "/forum", icon: MessageSquare },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Tutor", url: "/tutor", icon: User },
  { title: "Smart Prep", url: "/smartprep", icon: Brain },
  { title: "Fifi AI", url: "/fifi-ai", icon: Bot },
];

const tools = [
  { title: "Grade Calculator", url: "/tools/grade-calculator" },
  { title: "Percentage Calculator", url: "/tools/percentage-calculator" },
  { title: "Grade Tracker", url: "/tools/grade-tracker" },
  { title: "Grade Predictor", url: "/tools/grade-predictor" },
];

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const {Logout,role,Userdata}=UseDataProvider()
    const displayName = Userdata?.displayName || "User";
  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r bg-white dark:bg-black",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-white dark:bg-black transition-all"
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            {/* Header */}
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-foreground rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <motion.div variants={variants}>
                  {!isCollapsed && (
                    <span className="font-bold text-black dark:text-white text-xl">LearnEzily</span>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    {navigation.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        className={cn(
                          "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                          isActive(item.url) && "bg-muted text-brand",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <motion.li variants={variants}>
                          {!isCollapsed && (
                            <p className="ml-2 text-sm font-medium">{item.title}</p>
                          )}
                        </motion.li>
                      </Link>
                    ))}

                    {!isCollapsed && (
                      <>
                        <Separator className="w-full my-2" />
                        <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                            <div className="flex items-center gap-2">
                              <Calculator className="w-4 h-4" />
                              Tools
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="ml-6 space-y-1">
                              {tools.map((tool) => (
                                <Link
                                  key={tool.title}
                                  to={tool.url}
                                  className={cn(
                                    "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary text-sm",
                                    isActive(tool.url) && "bg-muted text-brand",
                                  )}
                                >
                                  {tool.title}
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Footer */}
              <div className="flex flex-col p-2 space-y-2">
                {/* Upgrade to Premium */}
                {!isCollapsed && (
                  <div className="bg-gradient-to-br from-brand/10 to-brand-foreground/10 border border-brand/20 rounded-lg p-3 text-center">
                    <div className="w-6 h-6 bg-brand rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-semibold text-xs mb-1">Upgrade to Premium</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Unlock advanced features
                    </p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-brand to-brand-foreground text-white text-xs">
                      Upgrade Now
                    </Button>
                  </div>
                )}

                <Link
                  to="/settings"
                  className="flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                >
                  <Settings className="h-4 w-4 shrink-0" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Settings</p>
                    )}
                  </motion.li>
                </Link>

                <Link
                  to="/notifications"
                  className="flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                >
                  <Bell className="h-4 w-4 shrink-0" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Notifications</p>
                    )}
                  </motion.li>
                </Link>
                {Userdata && role==import.meta.env.VITE_ADMIN ?<Link
                  to="/admin"
                  className="flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary"
                >
                  <UserCog className="h-4 w-4 shrink-0" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Admin</p>
                    )}
                  </motion.li>
                </Link>:null}

                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full">
                    <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
                      <Avatar className="size-4">
                        <AvatarFallback className="bg-brand text-white font-bold">
                          {displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <motion.li
                        variants={variants}
                        className="flex w-full items-center gap-2"
                      >
                        {!isCollapsed && (
                          <>
                            <p className="text-sm font-medium">{displayName}</p>
                            <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                          </>
                        )}
                      </motion.li>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={5}>
                    <div className="flex flex-row items-center gap-2 p-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="bg-brand text-white font-bold">
                          {displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium">{displayName}</span>
                        <span className="line-clamp-1 text-xs text-muted-foreground">
                          {Userdata?.email}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2" onClick={()=>Logout()}>
                      <LogOut className="h-4 w-4" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
