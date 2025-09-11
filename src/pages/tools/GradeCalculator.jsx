import { useState, useEffect } from "react";
import { SessionNavBar } from "../../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { Label } from "../../component/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select";
import { Badge } from "../../component/ui/badge";
import { Calculator, GraduationCap, BookOpen, Award } from "lucide-react";

const gradeSystemData = [
  { range: "90-100", gradePoints: "9.0-10.0", letterGrade: "O", description: "Outstanding" },
  { range: "80-89", gradePoints: "8.0-8.9", letterGrade: "D+", description: "Excellent" },
  { range: "75-79", gradePoints: "7.5-7.9", letterGrade: "D", description: "Distinction" },
  { range: "70-74", gradePoints: "7.0-7.4", letterGrade: "A+", description: "Very Good" },
  { range: "60-69", gradePoints: "6.0-6.9", letterGrade: "A", description: "Good" },
  { range: "50-59", gradePoints: "5.0-5.9", letterGrade: "B", description: "Average" },
  { range: "40-49", gradePoints: "0.0", letterGrade: "C", description: "Satisfactory" },
  { range: "00-39", gradePoints: "0.0", letterGrade: "U", description: "Re-Appear" },
  { range: "Absent", gradePoints: "0.0", letterGrade: "AAA", description: "Absent" },
];

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    credits: 0,
    marks: 0
  });
  const [semesterGPA, setSemesterGPA] = useState(0);
  const [cumulativeGPA, setCumulativeGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [programType, setProgramType] = useState("UG");

  const getGradeFromMarks = (marks) => {
    if (marks >= 90) return { gradePoints: 9.5, letterGrade: "O", description: "Outstanding" };
    if (marks >= 80) return { gradePoints: 8.5, letterGrade: "D+", description: "Excellent" };
    if (marks >= 75) return { gradePoints: 7.5, letterGrade: "D", description: "Distinction" };
    if (marks >= 70) return { gradePoints: 7.0, letterGrade: "A+", description: "Very Good" };
    if (marks >= 60) return { gradePoints: 6.5, letterGrade: "A", description: "Good" };
    if (marks >= 50) return { gradePoints: 5.5, letterGrade: "B", description: "Average" };
    if (marks >= 40) return { gradePoints: 0, letterGrade: "C", description: "Satisfactory" };
    return { gradePoints: 0, letterGrade: "U", description: "Re-Appear" };
  };

  const calculateGPA = () => {
    if (subjects.length === 0) return;

    const totalGradePoints = subjects.reduce((sum, subject) => sum + (subject.gradePoints * subject.credits), 0);
    const totalCreditsEarned = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    
    const gpa = totalCreditsEarned > 0 ? totalGradePoints / totalCreditsEarned : 0;
    setSemesterGPA(gpa);
    setTotalCredits(totalCreditsEarned);

    // For demo purposes, same as semester GPA
    setCumulativeGPA(gpa);

    console.log('Sending GPA calculation to backend:', {
      subjects,
      semesterGPA: gpa,
      totalCredits: totalCreditsEarned,
      programType
    });
  };

  const addSubject = () => {
    if (!newSubject.name || newSubject.credits <= 0) return;

    const gradeInfo = getGradeFromMarks(newSubject.marks);
    const subject = {
      name: newSubject.name,
      credits: newSubject.credits,
      gradePoints: gradeInfo.gradePoints,
      letterGrade: gradeInfo.letterGrade
    };

    setSubjects(prev => [...prev, subject]);
    setNewSubject({ name: "", credits: 0, marks: 0 });

    console.log('Adding subject to backend:', subject);
  };

  const removeSubject = (index) => {
    setSubjects(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    calculateGPA();
  }, [subjects]);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Calculator className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Grade Calculator</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your GPA and CGPA based on your college's grading system. Select your program type and add subjects with their respective credits and marks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Subject Entry */}
            <div className="lg:col-span-2 space-y-6">
              {/* Program Type Selection */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <GraduationCap className="w-5 h-5" />
                    Program Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={programType} onValueChange={(value) => setProgramType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Program Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                      <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Add Subject */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <BookOpen className="w-5 h-5" />
                    Add Subject
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="subject-name">Subject Name</Label>
                      <Input
                        id="subject-name"
                        placeholder="e.g., Mathematics"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
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
                      <Label htmlFor="marks">Marks Obtained</Label>
                      <Input
                        id="marks"
                        type="number"
                        placeholder="e.g., 85"
                        value={newSubject.marks || ""}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, marks: parseInt(e.target.value) || 0 }))}
                        max="100"
                        min="0"
                      />
                    </div>
                  </div>
                  <Button onClick={addSubject} className="w-full">
                    Add Subject
                  </Button>
                </CardContent>
              </Card>

              {/* Subjects List */}
              <Card>
                <CardHeader>
                  <CardTitle>Added Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  {subjects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No subjects added yet</p>
                  ) : (
                    <div className="space-y-3">
                      {subjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
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
                              onClick={() => removeSubject(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Grading System Reference */}
              <Card>
                <CardHeader>
                  <CardTitle>Grading System Reference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Range of Marks</th>
                          <th className="text-left p-2">Grade Points</th>
                          <th className="text-left p-2">Letter Grade</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradeSystemData.map((grade, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{grade.range}</td>
                            <td className="p-2">{grade.gradePoints}</td>
                            <td className="p-2">
                              <Badge variant="outline">{grade.letterGrade}</Badge>
                            </td>
                            <td className="p-2">{grade.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* GPA Result */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Award className="w-5 h-5" />
                    Current Semester
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {semesterGPA.toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Semester GPA</p>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">
                      {totalCredits}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Credits</p>
                  </div>
                </CardContent>
              </Card>

              {/* CGPA Result */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Award className="w-5 h-5" />
                    Overall Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">
                      {cumulativeGPA.toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Cumulative GPA (CGPA)</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on all completed semesters
                  </div>
                </CardContent>
              </Card>

              {/* GPA Formula */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">GPA Formula</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-mono">
                      GPA = Σ(Ci × Gi) / ΣCi
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Where Ci = Credits for course i<br/>
                      Gi = Grade points for course i
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Assessment Components */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Internal Assessment ({programType})</CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tests & Model:</span>
                      <span className="font-medium">12 Marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assignment:</span>
                      <span className="font-medium">8 Marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regularity:</span>
                      <span className="font-medium">5 Marks</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total:</span>
                      <span className="font-medium">25 Marks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeCalculator;
