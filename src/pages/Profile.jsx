import { useState } from "react";
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../component/ui/Tabs";
import { Avatar, AvatarFallback } from "../component/ui/avatar";
import { Edit, Save, X } from "lucide-react";
import { ProfileStats } from "../component/ProfileStats";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Gareth Christopher", 
    email: "gareth@example.com",
    age: "17",
    grade: "12th Grade",
    school: "Lincoln High School",
    interests: ["Mathematics", "Science", "Programming"],
    studyHours: "4-6 hours",
    goals: ["Ace SAT", "Get into MIT", "Learn AI/ML"]
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    // Send to backend
    console.log('Saving profile to backend:', editProfile);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="max-w-6xl mx-auto p-3 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Profile</h1>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-brand text-white font-bold text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      <p className="text-muted-foreground">{profile.email}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editProfile.name}
                          onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editProfile.email}
                          onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="age">Age</Label>
                      {isEditing ? (
                        <Input
                          id="age"
                          value={editProfile.age}
                          onChange={(e) => setEditProfile({ ...editProfile, age: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.age}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="grade">Grade</Label>
                      {isEditing ? (
                        <Input
                          id="grade"
                          value={editProfile.grade}
                          onChange={(e) => setEditProfile({ ...editProfile, grade: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.grade}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="school">School</Label>
                      {isEditing ? (
                        <Input
                          id="school"
                          value={editProfile.school}
                          onChange={(e) => setEditProfile({ ...editProfile, school: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.school}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="studyHours">Daily Study Hours</Label>
                      {isEditing ? (
                        <Input
                          id="studyHours"
                          value={editProfile.studyHours}
                          onChange={(e) => setEditProfile({ ...editProfile, studyHours: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-muted rounded">{profile.studyHours}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics">
              <ProfileStats />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
