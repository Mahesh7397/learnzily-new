import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, User, School, GraduationCap, Users} from "lucide-react";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { RadioGroup, RadioGroupItem } from "../component/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../component/ui/select";
import LoaderOne from "../component/ui/loader-one";
import { UseDataProvider } from "../contexts/DataProvider";

const Onboarding = () => {
   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {Onboardingfinish}=UseDataProvider()

  const [formData, setFormData] = useState({
    userAwareness: [],
    userGoals: [],
    inviteMembers: false,
    devicePreferences: [],
    educationType: '',
    region: 'India',
    institutionName: '',
    degree: '',
    course: '',
    board: '',
    state: '',
    grade: '',
    subjects: [],
    startYear: '',
    // Tutor specific fields
    workType: '',
    expertiseSubjects: [],
    audienceType: [],
    gender: ''
  });


  const Handlesubmit=()=>{
    Onboardingfinish(formData)
  }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  const colleges = ["The New College", "GSS Jain College Women", "SIET JABAS", "Loyola College", "Stella Maris College", "Vivekanandha College", "Anna University", "Madras University", "IIT Madras"];
  const degrees = ["Bachelor", "Master", "Doctorate", "Other"];
  const courses = ["Mathematics", "Physics", "Chemistry", "Data Science", "Aerospace", "Aeronautical", "Artificial Intelligence", "Commerce", "Computer Science", "Computer Application"];
  const boards = ["CBSE", "International", "State Board", "Other"];
  const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
  const grades = ["9", "10", "11", "12"];
  const subjects11_12 = ["Mathematics", "Business Mathematics", "Science", "Accounts", "Commerce", "Biology", "Zoology", "Botany", "Computer Science"];
  const subjects9_10 = ["Mathematics", "Science", "English", "Social Science", "Language"];
  const allTutorSubjects = ["Mathematics", "Physics", "Chemistry", "Data Science", "Aerospace", "Aeronautical", "Artificial Intelligence", "Commerce", "Computer Science", "Computer Application", "Business Mathematics", "Science", "Accounts", "Biology", "Zoology", "Botany", "English", "Social Science", "Language"];
  const awarenessOptions = ["Social media (Instagram, Facebook, Twitter, etc.)", "From social media (Facebook, Instagram, X (Twitter), etc.)", "From podcasts or radio", "From streaming/broadcasting (YouTube, Twitch, etc.)", "From word of mouth"];
  const goalOptions = ["To learn about digital transformation trends", "Prepare and check experience and skills after each session", "To learn practical learning via hard-to-explain basics", "Connect with peers and build skills", "All of the above"];
  const deviceOptions = [{
    name: "Desktop app",
    description: "Full desktop experience"
  }, {
    name: "Mobile app",
    description: "Native mobile experience"
  }, {
    name: "All Platforms",
    description: "Access from any device"
  }];
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand/80 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-foreground text-xl">LearnEze</span>
          <div className="mt-8">
            <LoaderOne />
          </div>
          <p className="mt-4 text-muted-foreground">Setting up your profile...</p>
        </div>
      </div>;
  }
  const nextStep = () => {
    if (currentStep < getMaxSteps() - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const getMaxSteps = () => {
    if (formData.educationType === 'college') {
      return 9; // 4 intro + education type + institution & degree + course + start year + welcome
    } else if (formData.educationType === 'school') {
      if (formData.board === 'State Board') {
        return 11; // 4 intro + education type + institution & board + state + grade + subjects + start year + welcome
      } else {
        return 10; // 4 intro + education type + institution & board + grade + subjects + start year + welcome
      }
    } else if (formData.educationType === 'tutor') {
      return 9; // 4 intro + education type + work type + expertise + audience & gender + welcome
    }
    return 6;
  };
  const handleAwarenessToggle = (option) => {
    const updated = formData.userAwareness.includes(option) ? formData.userAwareness.filter(item => item !== option) : [...formData.userAwareness, option];
    setFormData({
      ...formData,
      userAwareness: updated
    });
  };
  const handleGoalToggle = (option) => {
    const updated = formData.userGoals.includes(option) ? formData.userGoals.filter(item => item !== option) : [...formData.userGoals, option];
    setFormData({
      ...formData,
      userGoals: updated
    });
  };
  const handleDeviceToggle = (option) => {
    const updated = formData.devicePreferences.includes(option) ? formData.devicePreferences.filter(item => item !== option) : [...formData.devicePreferences, option];
    setFormData({
      ...formData,
      devicePreferences: updated
    });
  };
  const handleSubjectToggle = (subject) => {
    const updatedSubjects = formData.subjects.includes(subject) ? formData.subjects.filter(s => s !== subject) : [...formData.subjects, subject];
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };
  const handleExpertiseSubjectToggle = (subject) => {
    const updated = formData.expertiseSubjects.includes(subject) ? formData.expertiseSubjects.filter(s => s !== subject) : [...formData.expertiseSubjects, subject];
    setFormData({
      ...formData,
      expertiseSubjects: updated
    });
  };
  const handleAudienceToggle = (audience) => {
    const updated = formData.audienceType.includes(audience) ? formData.audienceType.filter(a => a !== audience) : [...formData.audienceType, audience];
    setFormData({
      ...formData,
      audienceType: updated
    });
  };
  const handleLetsGo = () => {
    navigate('/dashboard');
  };
  const renderStartYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({
      length: 10
    }, (_, i) => currentYear - i);
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">When did you start?</h2>
          <p className="text-muted-foreground">Select your academic start year</p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="h-32 overflow-hidden border rounded-lg bg-background">
              <div className="flex flex-col items-center py-2 space-y-1 overflow-y-auto max-h-32">
                {years.map(year => <button key={year} onClick={() => setFormData({
                ...formData,
                startYear: year.toString()
              })} className={`px-4 py-2 rounded-md transition-colors w-20 ${formData.startYear === year.toString() ? 'bg-brand text-white' : 'hover:bg-muted text-foreground'}`}>
                    {year}
                  </button>)}
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>;
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">How did you hear about LearnEzily?</h2>
              <p className="text-muted-foreground">We'd love to know how you discovered us</p>
            </div>
            
            <div className="space-y-3">
              {awarenessOptions.map(option => <div key={option} className={`p-4 rounded-lg border cursor-pointer transition-colors ${formData.userAwareness.includes(option) ? 'bg-brand/10 border-brand text-brand' : 'border-border hover:bg-muted/50'}`} onClick={() => handleAwarenessToggle(option)}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {formData.userAwareness.includes(option) && <Check className="w-4 h-4" />}
                  </div>
                </div>)}
            </div>
          </motion.div>;
      case 1:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What brings you to LearnEzily today?</h2>
              <p className="text-muted-foreground">Let us know your learning goals</p>
            </div>
            
            <div className="space-y-3">
              {goalOptions.map(option => <div key={option} className={`p-4 rounded-lg border cursor-pointer transition-colors ${formData.userGoals.includes(option) ? 'bg-brand/10 border-brand text-brand' : 'border-border hover:bg-muted/50'}`} onClick={() => handleGoalToggle(option)}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {formData.userGoals.includes(option) && <Check className="w-4 h-4" />}
                  </div>
                </div>)}
            </div>
          </motion.div>;
      case 2:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">All set!</h2>
              <h3 className="text-xl font-semibold mb-2">Now let's Invite your team.</h3>
              <p className="text-muted-foreground">Add friends members to collaborate together</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email1">Email address</Label>
                <Input id="email1" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="email2">Email address</Label>
                <Input id="email2" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="email3">Email address</Label>
                <Input id="email3" type="email" placeholder="Enter email address" />
              </div>
            </div>
          </motion.div>;
      case 3:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">You're in!</h2>
              <p className="text-muted-foreground">Choose how you'd like to access LearnEze</p>
            </div>
            
            <div className="space-y-4">
              {deviceOptions.map(device => <div key={device.name} className={`p-4 rounded-lg border cursor-pointer transition-colors ${formData.devicePreferences.includes(device.name) ? 'bg-brand/10 border-brand' : 'border-border hover:bg-muted/50'}`} onClick={() => handleDeviceToggle(device.name)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">{device.description}</div>
                    </div>
                    {formData.devicePreferences.includes(device.name) && <Check className="w-4 h-4 text-brand" />}
                  </div>
                </div>)}
            </div>
          </motion.div>;
      case 4:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-brand to-brand/80 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to LearnEzily!</h2>
              <p className="text-muted-foreground text-lg">Let's get to know you better to personalize your learning experience</p>
            </div>
          </motion.div>;
      case 5:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
              <p className="text-muted-foreground">Are you currently in school, college, or a tutor/mentor?</p>
            </div>
            
            <RadioGroup value={formData.educationType} onValueChange={value => setFormData({
            ...formData,
            educationType: value
          })} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="school" id="school" />
                <Label htmlFor="school" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <School className="w-6 h-6 text-brand" />
                  <div>
                    <div className="font-medium">School</div>
                    <div className="text-sm text-muted-foreground">Currently studying in school</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="college" id="college" />
                <Label htmlFor="college" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <GraduationCap className="w-6 h-6 text-brand" />
                  <div>
                    <div className="font-medium">College/University</div>
                    <div className="text-sm text-muted-foreground">Currently in higher education</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="tutor" id="tutor" />
                <Label htmlFor="tutor" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Users className="w-6 h-6 text-brand" />
                  <div>
                    <div className="font-medium">Tutor/Mentor</div>
                    <div className="text-sm text-muted-foreground">Teaching or mentoring students</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </motion.div>;
      case 6:
        if (formData.educationType === 'college') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Institution Details</h2>
                <p className="text-muted-foreground">Tell us about your college or university</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" value={formData.region} disabled className="bg-muted" />
                </div>

                <div>
                  <Label htmlFor="college">College/University Name</Label>
                  <Select value={formData.institutionName} onValueChange={value => setFormData({
                  ...formData,
                  institutionName: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map(college => <SelectItem key={college} value={college}>{college}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="degree">Degree Level</Label>
                  <Select value={formData.degree} onValueChange={value => setFormData({
                  ...formData,
                  degree: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree level" />
                    </SelectTrigger>
                    <SelectContent>
                      {degrees.map(degree => <SelectItem key={degree} value={degree}>{degree}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>;
        } else if (formData.educationType === 'school') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">School Details</h2>
                <p className="text-muted-foreground">Tell us about your school</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" value={formData.region} disabled className="bg-muted" />
                </div>

                <div>
                  <Label htmlFor="school">School Name</Label>
                  <Input id="school" value={formData.institutionName} onChange={e => setFormData({
                  ...formData,
                  institutionName: e.target.value
                })} placeholder="Enter your school name" />
                </div>

                <div>
                  <Label htmlFor="board">Board</Label>
                  <Select value={formData.board} onValueChange={value => setFormData({
                  ...formData,
                  board: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your board" />
                    </SelectTrigger>
                    <SelectContent>
                      {boards.map(board => <SelectItem key={board} value={board}>{board}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>;
        } else if (formData.educationType === 'tutor') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">How do you work?</h2>
                <p className="text-muted-foreground">Are you with an organization or independent?</p>
              </div>
              
              <RadioGroup value={formData.workType} onValueChange={value => setFormData({
              ...formData,
              workType: value
            })} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="organization" id="organization" />
                  <Label htmlFor="organization" className="cursor-pointer flex-1">
                    <div className="font-medium">Working at Institute/Organization</div>
                    <div className="text-sm text-muted-foreground">Part of an educational institution</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="independent" id="independent" />
                  <Label htmlFor="independent" className="cursor-pointer flex-1">
                    <div className="font-medium">Running own organization</div>
                    <div className="text-sm text-muted-foreground">Independent tutor or own coaching center</div>
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>;
        }
        break;
      case 7:
        if (formData.educationType === 'college') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Course Details</h2>
                <p className="text-muted-foreground">What are you studying?</p>
              </div>

              <div>
                <Label htmlFor="course">Course/Field of Study</Label>
                <Select value={formData.course} onValueChange={value => setFormData({
                ...formData,
                course: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => <SelectItem key={course} value={course}>{course}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>;
        } else if (formData.educationType === 'school') {
          if (formData.board === 'State Board') {
            return <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">State Selection</h2>
                  <p className="text-muted-foreground">Which state board are you following?</p>
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={value => setFormData({
                  ...formData,
                  state: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>;
          } else {
            return <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Grade & Subjects</h2>
                  <p className="text-muted-foreground">What grade are you in and what subjects do you study?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade">Standard/Grade</Label>
                    <Select value={formData.grade} onValueChange={value => setFormData({
                    ...formData,
                    grade: value,
                    subjects: []
                  })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map(grade => <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.grade && <div>
                      <Label>Choose your subjects</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {(formData.grade === '11' || formData.grade === '12' ? subjects11_12 : subjects9_10).map(subject => <div key={subject} className={`p-3 rounded-lg border cursor-pointer transition-colors ${formData.subjects.includes(subject) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted/50'}`} onClick={() => handleSubjectToggle(subject)}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subject}</span>
                              {formData.subjects.includes(subject) && <Check className="w-4 h-4" />}
                            </div>
                          </div>)}
                      </div>
                    </div>}
                </div>
              </motion.div>;
          }
        } else if (formData.educationType === 'tutor') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Expertise</h2>
                <p className="text-muted-foreground">What subjects can you guide or take tuitions in?</p>
              </div>

              <div>
                <Label>Select Subjects</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {allTutorSubjects.map(subject => <div key={subject} className={`p-3 rounded-lg border cursor-pointer transition-colors ${formData.expertiseSubjects.includes(subject) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted/50'}`} onClick={() => handleExpertiseSubjectToggle(subject)}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{subject}</span>
                        {formData.expertiseSubjects.includes(subject) && <Check className="w-4 h-4" />}
                      </div>
                    </div>)}
                </div>
              </div>
            </motion.div>;
        }
        break;
      case 8:
        if (formData.educationType === 'college') {
          return renderStartYearPicker();
        } else if (formData.educationType === 'school') {
          if (formData.board === 'State Board') {
            return <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Grade & Subjects</h2>
                  <p className="text-muted-foreground">What grade are you in and what subjects do you study?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade">Standard/Grade</Label>
                    <Select value={formData.grade} onValueChange={value => setFormData({
                    ...formData,
                    grade: value,
                    subjects: []
                  })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map(grade => <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.grade && <div>
                      <Label>Choose your subjects</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {(formData.grade === '11' || formData.grade === '12' ? subjects11_12 : subjects9_10).map(subject => <div key={subject} className={`p-3 rounded-lg border cursor-pointer transition-colors ${formData.subjects.includes(subject) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted/50'}`} onClick={() => handleSubjectToggle(subject)}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subject}</span>
                              {formData.subjects.includes(subject) && <Check className="w-4 h-4" />}
                            </div>
                          </div>)}
                      </div>
                    </div>}
                </div>
              </motion.div>;
          } else {
            return renderStartYearPicker();
          }
        } else if (formData.educationType === 'tutor') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Audience</h2>
                <p className="text-muted-foreground">Who are you capable of tutoring or mentoring?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Select Audience</Label>
                  <div className="space-y-3 mt-2">
                    {['School Students', 'College Students'].map(audience => <div key={audience} className={`p-3 rounded-lg border cursor-pointer transition-colors ${formData.audienceType.includes(audience) ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted/50'}`} onClick={() => handleAudienceToggle(audience)}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{audience}</span>
                          {formData.audienceType.includes(audience) && <Check className="w-4 h-4" />}
                        </div>
                      </div>)}
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">Your Gender</Label>
                  <Select value={formData.gender} onValueChange={value => setFormData({
                  ...formData,
                  gender: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>;
        }
        break;
      case 9:
        if (formData.educationType === 'college') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome to LearnEze!</h2>
                <p className="text-muted-foreground text-lg">Your profile is all set up. Let's start your learning journey!</p>
              </div>
              <Button onClick={handleLetsGo} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 text-lg">
                Let's Go!
              </Button>
            </motion.div>;
        } else if (formData.educationType === 'school') {
          return renderStartYearPicker();
        } else if (formData.educationType === 'tutor') {
          return <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome to LearnEze!</h2>
                <p className="text-muted-foreground text-lg">Your tutor profile is ready. Start connecting with students!</p>
              </div>
              <Button onClick={handleLetsGo} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 text-lg">
                Get Started!
              </Button>
            </motion.div>;
        }
        break;
      case 10:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to LearnEze!</h2>
              <p className="text-muted-foreground text-lg">Your profile is all set up. Let's start your learning journey!</p>
            </div>
            <Button onClick={handleLetsGo} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 text-lg">
              Let's Go!
            </Button>
          </motion.div>;
      default:
        return <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to LearnEze!</h2>
              <p className="text-muted-foreground text-lg">Your profile is all set up. Let's start your learning journey!</p>
            </div>
            <Button onClick={handleLetsGo} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 text-lg">
              Let's Go!
            </Button>
          </motion.div>;
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.userAwareness.length > 0;
      case 1:
        return formData.userGoals.length > 0;
      case 2:
        return true;
      case 3:
        return formData.devicePreferences.length > 0;
      case 4:
        return true;
      case 5:
        return formData.educationType !== '';
      case 6:
        if (formData.educationType === 'college') {
          return formData.institutionName !== '' && formData.degree !== '';
        } else if (formData.educationType === 'school') {
          return formData.institutionName !== '' && formData.board !== '';
        } else if (formData.educationType === 'tutor') {
          return formData.workType !== '';
        }
        return false;
      case 7:
        if (formData.educationType === 'college') {
          return formData.course !== '';
        } else if (formData.educationType === 'school') {
          if (formData.board === 'State Board') {
            return formData.state !== '';
          } else {
            return formData.grade !== '' && formData.subjects.length > 0;
          }
        } else if (formData.educationType === 'tutor') {
          return formData.expertiseSubjects.length > 0;
        }
        return false;
      case 8:
        if (formData.educationType === 'college') {
          return formData.startYear !== '';
        } else if (formData.educationType === 'school') {
          if (formData.board === 'State Board') {
            return formData.grade !== '' && formData.subjects.length > 0;
          } else {
            return formData.startYear !== '';
          }
        } else if (formData.educationType === 'tutor') {
          return formData.audienceType.length > 0 && formData.gender !== '';
        }
        return false;
      case 9:
        if (formData.educationType === 'school' && formData.board === 'State Board') {
          return formData.startYear !== '';
        }
        return true;
      default:
        return true;
    }
  };
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {getMaxSteps()}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep + 1) / getMaxSteps() * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300" style={{
              width: `${(currentStep + 1) / getMaxSteps() * 100}%`
            }} />
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border min-h-[500px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} transition={{
              duration: 0.3
            }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

             <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                {currentStep < getMaxSteps() - 1 ?
                <Button onClick={nextStep} disabled={!canProceed()} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex items-center gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>:
                 <Button onClick={()=>Handlesubmit()} disabled={!canProceed()} className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex items-center gap-2">
                  Start
                  <ChevronRight className="w-4 h-4" />
                </Button>
                }
              </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Onboarding;
