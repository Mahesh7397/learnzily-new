import { useState } from "react";
import { SessionNavBar } from "../../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { Label } from "../../component/ui/label";
import { Badge } from "../../component/ui/badge";
import { Calculator, Target, TrendingUp, Percent } from "lucide-react";

const PercentageCalculator = () => {
  const [marksObtained, setMarksObtained] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [multipleSubjects, setMultipleSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ obtained: 0, total: 0 });

  const calculatePercentage = () => {
    if (totalMarks > 0) {
      const result = (marksObtained / totalMarks) * 100;
      setPercentage(result);

      // Send to backend
      console.log('Sending percentage calculation to backend:', {
        marksObtained,
        totalMarks,
        percentage: result
      });
    }
  };

  const addSubject = () => {
    if (newSubject.total > 0) {
      setMultipleSubjects(prev => [...prev, newSubject]);
      setNewSubject({ obtained: 0, total: 0 });
    }
  };

  const removeSubject = (index) => {
    setMultipleSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const calculateOverallPercentage = () => {
    const totalObtained = multipleSubjects.reduce((sum, subject) => sum + subject.obtained, 0);
    const totalPossible = multipleSubjects.reduce((sum, subject) => sum + subject.total, 0);
    return totalPossible > 0 ? (totalObtained / totalPossible) * 100 : 0;
  };

  const getGradeFromPercentage = (percent) => {
    if (percent >= 90) return { grade: "O (Outstanding)", color: "bg-green-500" };
    if (percent >= 80) return { grade: "D+ (Excellent)", color: "bg-blue-500" };
    if (percent >= 75) return { grade: "D (Distinction)", color: "bg-indigo-500" };
    if (percent >= 70) return { grade: "A+ (Very Good)", color: "bg-purple-500" };
    if (percent >= 60) return { grade: "A (Good)", color: "bg-yellow-500" };
    if (percent >= 50) return { grade: "B (Average)", color: "bg-orange-500" };
    if (percent >= 40) return { grade: "C (Satisfactory)", color: "bg-red-400" };
    return { grade: "U (Re-Appear)", color: "bg-red-600" };
  };

  const overallPercentage = calculateOverallPercentage();
  const singleGrade = getGradeFromPercentage(percentage);
  const overallGrade = getGradeFromPercentage(overallPercentage);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              <Percent className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Percentage Calculator</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate percentages for individual subjects or overall performance across multiple subjects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Single Subject Calculator */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Calculator className="w-5 h-5" />
                    Single Subject Percentage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="marks-obtained">Marks Obtained</Label>
                      <Input
                        id="marks-obtained"
                        type="number"
                        placeholder="e.g., 85"
                        value={marksObtained || ""}
                        onChange={(e) => setMarksObtained(parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="total-marks">Total Marks</Label>
                      <Input
                        id="total-marks"
                        type="number"
                        placeholder="e.g., 100"
                        value={totalMarks || ""}
                        onChange={(e) => setTotalMarks(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <Button onClick={calculatePercentage} className="w-full">
                    Calculate Percentage
                  </Button>
                </CardContent>
              </Card>

              {/* Single Subject Result */}
              {percentage > 0 && (
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Target className="w-5 h-5" />
                      Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-blue-600">
                        {percentage.toFixed(2)}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {marksObtained} out of {totalMarks} marks
                      </p>
                    </div>
                    <Badge className={`${singleGrade.color} text-white`}>
                      {singleGrade.grade}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Formula Reference */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Percentage Formula</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-lg font-mono font-bold mb-2">
                      Percentage = (Marks Obtained / Total Marks) × 100
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Standard Method for calculating percentage
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Multiple Subjects Calculator */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <TrendingUp className="w-5 h-5" />
                    Multiple Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject-obtained">Marks Obtained</Label>
                      <Input
                        id="subject-obtained"
                        type="number"
                        placeholder="e.g., 78"
                        value={newSubject.obtained || ""}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, obtained: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject-total">Total Marks</Label>
                      <Input
                        id="subject-total"
                        type="number"
                        placeholder="e.g., 100"
                        value={newSubject.total || ""}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, total: parseInt(e.target.value) || 0 }))}
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
                  <CardTitle className="text-sm">Added Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  {multipleSubjects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No subjects added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {multipleSubjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">
                            {subject.obtained}/{subject.total} ({((subject.obtained / subject.total) * 100).toFixed(1)}%)
                          </span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSubject(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overall Result */}
              {multipleSubjects.length > 0 && (
                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <Target className="w-5 h-5" />
                      Overall Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-orange-600">
                        {overallPercentage.toFixed(2)}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {multipleSubjects.reduce((sum, s) => sum + s.obtained, 0)} out of{" "}
                        {multipleSubjects.reduce((sum, s) => sum + s.total, 0)} total marks
                      </p>
                    </div>
                    <Badge className={`${overallGrade.color} text-white`}>
                      {overallGrade.grade}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Based on {multipleSubjects.length} subjects
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Grade Reference Table */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-green-600">90-100%</div>
                  <div>O - Outstanding</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-blue-600">80-89%</div>
                  <div>D+ - Excellent</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-indigo-600">75-79%</div>
                  <div>D - Distinction</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-purple-600">70-74%</div>
                  <div>A+ - Very Good</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-yellow-600">60-69%</div>
                  <div>A - Good</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-orange-600">50-59%</div>
                  <div>B - Average</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-red-400">40-49%</div>
                  <div>C - Satisfactory</div>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <div className="font-bold text-red-600">Below 40%</div>
                  <div>U - Re-Appear</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PercentageCalculator;
