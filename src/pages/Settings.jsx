
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Switch } from "../component/ui/switch";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { Separator } from "../component/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../component/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../component/ui/radix-accordion";
import { useTheme } from "../contexts/Themecontext";
import { useState } from "react";
import { 
  User, 
  Shield, 
  Bell, 
  Download, 
  CreditCard, 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Trash2,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    school: "State University"
  });

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Deleting account...");
  };

  const faqData = [
    {
      question: "What is Smart Study and how does it work?",
      answer: "Smart Study is an AI-powered learning platform that helps students with personalized study plans, interactive content, and progress tracking."
    },
    {
      question: "Is Smart Study free to use?",
      answer: "We offer both free and premium plans. Free users get access to basic features, while premium users unlock advanced AI tutoring and additional tools."
    },
    {
      question: "Can school and college students both use Smart Study?",
      answer: "Yes! Smart Study is designed for both school and college students with customized content for different education levels."
    },
    {
      question: "How does the AI Tutor work?",
      answer: "Our AI Tutor uses advanced machine learning to provide personalized explanations, answer questions, and adapt to your learning style."
    },
    {
      question: "How can I contact Smart Study support?",
      answer: "You can reach our support team through the contact form in the app, email us at support@smartstudy.com, or join our community forum."
    }
  ];

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          {/* Theme Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : theme === 'light' ? <Sun className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                </div>
                <Switch 
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                >
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Switch>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School/College</Label>
                  <Input
                    id="school"
                    value={profile.school}
                    onChange={(e) => setProfile(prev => ({ ...prev, school: e.target.value }))}
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Data Privacy</Label>
                  <p className="text-sm text-muted-foreground">Control how your data is used</p>
                </div>
                <Button variant="outline">Manage Privacy</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Change Password</Label>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications & Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch>Push</Switch>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get study reminders via email</p>
                </div>
                <Switch>Email</Switch>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Assignment Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming assignments</p>
                </div>
                <Switch>Assignments</Switch>
              </div>
            </CardContent>
          </Card>

          {/* Uploads & Downloads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Uploads & Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto-sync Files</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync your study materials</p>
                </div>
                <Switch>Auto-sync</Switch>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Download Quality</Label>
                  <p className="text-sm text-muted-foreground">Choose download quality for materials</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription & Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Current Plan</Label>
                  <p className="text-sm text-muted-foreground">Free Plan - Upgrade for more features</p>
                </div>
                <Button>Upgrade Plan</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <p className="text-sm text-muted-foreground">Manage your payment information</p>
                </div>
                <Button variant="outline">Manage Payment</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Billing History</Label>
                  <p className="text-sm text-muted-foreground">View your past transactions</p>
                </div>
                <Button variant="outline">View History</Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Desk */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Help Desk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Contact Support</Label>
                    <p className="text-sm text-muted-foreground">Get help from our support team</p>
                  </div>
                  <Button variant="outline">Contact Us</Button>
                </div>
                <Separator />
                
                {/* FAQ Section */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Frequently Asked Questions</Label>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Send Feedback</Label>
                  <p className="text-sm text-muted-foreground">Help us improve Smart Study</p>
                </div>
                <Button variant="outline">Give Feedback</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Rate Our App</Label>
                  <p className="text-sm text-muted-foreground">Share your experience with others</p>
                </div>
                <Button variant="outline">Rate App</Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Legal & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Terms of Service</Label>
                  <p className="text-sm text-muted-foreground">Read our terms and conditions</p>
                </div>
                <Button variant="outline">View Terms</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Privacy Policy</Label>
                  <p className="text-sm text-muted-foreground">Understand how we handle your data</p>
                </div>
                <Button variant="outline">View Policy</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Community Guidelines</Label>
                  <p className="text-sm text-muted-foreground">Learn about our community standards</p>
                </div>
                <Button variant="outline">View Guidelines</Button>
              </div>
            </CardContent>
          </Card>

          {/* Logout & Deactivation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout & Deactivation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">🚪 Logout</Label>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">🗑️ Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers including your study progress,
                        saved materials, and forum contributions.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
