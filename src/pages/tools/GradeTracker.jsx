import { useState, useEffect } from "react";
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { Badge } from "../component/ui/badge";
import { Chart, ChartTooltip, ChartTooltipContent } from "../component/ui/pie-chart";
import { Pie, PieChart } from "recharts";
import { TrendingUp, BookOpen, Award, BarChart3 } from "lucide-react";

const GradeTracker = () => {
  const [trackedSubjects, setTrackedSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    credits: 0,
    gradePoints: 0,
    semester: ""
  });
  const [overallCGPA, setOverallCGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  // Load subjects from localStorage on component mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem('grade_tracker_subjects');
    if (savedSubjects) {
      const parsedSubjects = JSON.parse(savedSubjects);
      setTrackedSubjects(parsedSubjects);
    }
  }, []);

  const getLetterGrade = (gradePoints) => {
    if (gradePoints >= 9.0) return "O";
    if (gradePoints >= 8.0) return "D+";
    if (gradePoints >= 7.5) return "D";
    if (gradePoints >= 7.0) return "A+";
    if (gradePoints >= 6.0) return "A";
    if (gradePoints >= 5.0) return "B";
    if (gradePoints > 0) return "C";
    return "U";
  };

  const calculateOverallCGPA = () => {
    if (trackedSubjects.length === 0) return;

    const totalGradePoints = trackedSubjects.reduce(
      (sum, subject) => sum + (subject.gradePoints * subject.credits), 0);
    const totalCreditsEarned = trackedSubjects.reduce(
      (sum, subject) => sum + subject.credits, 0);

    const cgpa = totalCreditsEarned > 0 ? totalGradePoints / totalCreditsEarned : 0;
    setOverallCGPA(cgpa);
    setTotalCredits(totalCreditsEarned);

    console.log('Sending CGPA update to backend:', {
      cgpa,
      totalCredits: totalCreditsEarned,
      totalSubjects: trackedSubjects.length
    });
  };

  const addSubject = () => {
    if (!newSubject.name || newSubject.credits <= 0 || newSubject.gradePoints < 0) return;

    const subject = {
      id: Date.now(),
      name: newSubject.name,
      credits: newSubject.credits,
      gradePoints: newSubject.gradePoints,
      letterGrade: getLetterGrade(newSubject.gradePoints),
      semester: newSubject.semester || "Current Semester"
    };

    const updatedSubjects = [...trackedSubjects, subject];
    setTrackedSubjects(updatedSubjects);
    localStorage.setItem('grade_tracker_subjects', JSON.stringify(updatedSubjects));
    setNewSubject({ name: "", credits: 0, gradePoints: 0, semester: "" });

    console.log('Adding subject to grade tracker backend:', subject);
  };

  const removeSubject = (id) => {
    const updatedSubjects = trackedSubjects.filter(subject => subject.id !== id);
    setTrackedSubjects(updatedSubjects);
    localStorage.setItem('grade_tracker_subjects', JSON.stringify(updatedSubjects));

    console.log('Removing subject from backend:', id);
  };

  useEffect(() => {
    calculateOverallCGPA();
  }, [trackedSubjects]);

  // Group data by semester
  const semesterGroups = trackedSubjects.reduce((acc, subject) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {});

  // Prepare grade distribution chart data
  const gradeDistribution = trackedSubjects.reduce((acc, subject) => {
    const grade = subject.letterGrade;
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(gradeDistribution).map(([grade, count]) => ({
    name: grade,
    value: count,
    fill: `hsl(var(--chart-${Object.keys(gradeDistribution).indexOf(grade) + 1}))`
  }));

  const chartConfig = {
    value: { label: "Subjects" },
    ...Object.keys(gradeDistribution).reduce((acc, grade, index) => {
      acc[grade.toLowerCase()] = {
        label: grade,
        color: `hsl(var(--chart-${index + 1}))`
      };
      return acc;
    }, {})
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <TrendingUp className="w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Grade Tracker</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Track your academic progress across all semesters. Monitor your CGPA, subject performance, and grade distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add New Subject */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <BookOpen className="w-5 h-5" />
                    Add Subject to Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject-name">Subject Name</Label>
                      <Input
                        id="subject-name"
                        placeholder="e.g., Data Structures"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        placeholder="e.g., Semester 3"
                        value={newSubject.semester}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, semester: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="credits">Credits</Label>
                      <Input
                        id="credits"
                        type="number"
                        placeholder="e.g., 4"
                        value={newSubject.credits || ""}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, credits: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade-points">Grade Points</Label>
                      <Input
                        id="grade-points"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 8.5"
                        value={newSubject.gradePoints || ""}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, gradePoints: parseFloat(e.target.value) || 0 }))}
                        max="10"
                        min="0"
                      />
                    </div>
                  </div>
                  <Button onClick={addSubject} className="w-full">
                    Add Subject
                  </Button>
                </CardContent>
              </Card>

              {/* Subjects by Semester */}
              <div className="space-y-4">
                {Object.entries(semesterGroups).length > 0 ? (
                  Object.entries(semesterGroups).map(([semester, subjects]) => (
                    <Card key={semester}>
                      <CardHeader>
                        <CardTitle className="text-lg">{semester}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {subjects.map((subject) => (
                            <div key={subject.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3">
                              <div className="flex-1">
                                <h4 className="font-medium">{subject.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Credits: {subject.credits} | Grade Points: {subject.gradePoints}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{subject.letterGrade}</Badge>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeSubject(subject.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No subjects tracked yet. Add your first subject above!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Overall CGPA */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Award className="w-5 h-5" />
                    Overall Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-purple-600">
                      {overallCGPA.toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold">{totalCredits}</div>
                      <p className="text-xs text-muted-foreground">Total Credits</p>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{trackedSubjects.length}</div>
                      <p className="text-xs text-muted-foreground">Subjects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grade Distribution Chart */}
              {trackedSubjects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Grade Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie 
                          data={chartData} 
                          dataKey="value" 
                          nameKey="name"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                        />
                      </PieChart>
                    </Chart>
                  </CardContent>
                </Card>
              )}

              {/* CGPA Formula Reference */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">CGPA Formula</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-mono text-center">
                      CGPA = Σ(Cni × Gni) / ΣCni
                    </p>
                    <p className="mt-2 text-muted-foreground text-center">
                      Sum of (Credits × Grade Points) divided by Total Credits across all semesters
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              {trackedSubjects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="space-y-1">
                      <p>Highest Grade: <Badge variant="outline" className="ml-1">
                        {Math.max(...trackedSubjects.map(s => s.gradePoints)).toFixed(1)}
                      </Badge></p>
                      <p>Average Grade: <Badge variant="outline" className="ml-1">
                        {(trackedSubjects.reduce((sum, s) => sum + s.gradePoints, 0) / trackedSubjects.length).toFixed(1)}
                      </Badge></p>
                      <p>Total Semesters: <Badge variant="outline" className="ml-1">
                        {Object.keys(semesterGroups).length}
                      </Badge></p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeTracker;
