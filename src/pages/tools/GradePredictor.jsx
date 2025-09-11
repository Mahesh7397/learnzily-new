import { useState } from "react";
import { SessionNavBar } from "../../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { Label } from "../../component/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select";
import { Badge } from "../../component/ui/badge";
import { Progress } from "../../component/ui/progress";
import { Gem, Target, AlertCircle, TrendingUp } from "lucide-react";

const GradePredictor = () => {
  const [programType, setProgramType] = useState("UG");
  const [internalAssessment, setInternalAssessment] = useState({
    testsModel: 0,
    assignment: 0,
    regularity: 0
  });
  const [semesterMarks, setSemesterMarks] = useState(0);
  const [prediction, setPrediction] = useState(null);

  const maxMarks = {
    testsModel: 12,
    assignment: 8,
    regularity: 5,
    total: 25,
    semester: 75,
    overall: 100
  };

  const predictGrade = () => {
    const totalInternal = internalAssessment.testsModel + internalAssessment.assignment + internalAssessment.regularity;
    const totalOverall = totalInternal + semesterMarks;
    const percentage = (totalOverall / maxMarks.overall) * 100;

    let grade = "";
    let gradePoints = 0;
    let description = "";

    if (percentage >= 90) {
      grade = "O";
      gradePoints = 9.5;
      description = "Outstanding";
    } else if (percentage >= 80) {
      grade = "D+";
      gradePoints = 8.5;
      description = "Excellent";
    } else if (percentage >= 75) {
      grade = "D";
      gradePoints = 7.5;
      description = "Distinction";
    } else if (percentage >= 70) {
      grade = "A+";
      gradePoints = 7.0;
      description = "Very Good";
    } else if (percentage >= 60) {
      grade = "A";
      gradePoints = 6.5;
      description = "Good";
    } else if (percentage >= 50) {
      grade = "B";
      gradePoints = 5.5;
      description = "Average";
    } else if (percentage >= 40) {
      grade = "C";
      gradePoints = 0;
      description = "Satisfactory";
    } else {
      grade = "U";
      gradePoints = 0;
      description = "Re-Appear";
    }

    const result = {
      totalInternal,
      totalOverall,
      percentage,
      grade,
      gradePoints,
      description
    };

    setPrediction(result);

    // Send to backend
    console.log('Sending grade prediction to backend:', {
      programType,
      internalAssessment,
      semesterMarks,
      prediction: result
    });
  };

  const getRequiredMarksForGrade = (targetGrade) => {
    const totalInternal = internalAssessment.testsModel + internalAssessment.assignment + internalAssessment.regularity;
    let targetPercentage = 0;

    switch (targetGrade) {
      case "O": targetPercentage = 90; break;
      case "D+": targetPercentage = 80; break;
      case "D": targetPercentage = 75; break;
      case "A+": targetPercentage = 70; break;
      case "A": targetPercentage = 60; break;
      case "B": targetPercentage = 50; break;
      case "C": targetPercentage = 40; break;
      default: targetPercentage = 40;
    }

    const requiredTotal = (targetPercentage * maxMarks.overall) / 100;
    const requiredSemester = requiredTotal - totalInternal;
    
    return Math.max(0, Math.min(75, requiredSemester));
  };

  const getColorForPercentage = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <Gem className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Grade Predictor</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Predict your final grade based on internal assessment marks and semester exam performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Program Type */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Target className="w-5 h-5" />
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

              {/* Internal Assessment */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <TrendingUp className="w-5 h-5" />
                    Internal Assessment Marks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="tests-model">Tests & Model</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="tests-model"
                          type="number"
                          placeholder="0"
                          value={internalAssessment.testsModel || ""}
                          onChange={(e) => setInternalAssessment(prev => ({
                            ...prev,
                            testsModel: Math.min(maxMarks.testsModel, parseInt(e.target.value) || 0)
                          }))}
                          max={maxMarks.testsModel}
                          min="0"
                        />
                        <span className="text-sm text-muted-foreground">/{maxMarks.testsModel}</span>
                      </div>
                      <Progress 
                        value={(internalAssessment.testsModel / maxMarks.testsModel) * 100} 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignment">Assignment</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="assignment"
                          type="number"
                          placeholder="0"
                          value={internalAssessment.assignment || ""}
                          onChange={(e) => setInternalAssessment(prev => ({
                            ...prev,
                            assignment: Math.min(maxMarks.assignment, parseInt(e.target.value) || 0)
                          }))}
                          max={maxMarks.assignment}
                          min="0"
                        />
                        <span className="text-sm text-muted-foreground">/{maxMarks.assignment}</span>
                      </div>
                      <Progress 
                        value={(internalAssessment.assignment / maxMarks.assignment) * 100} 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="regularity">Regularity</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="regularity"
                          type="number"
                          placeholder="0"
                          value={internalAssessment.regularity || ""}
                          onChange={(e) => setInternalAssessment(prev => ({
                            ...prev,
                            regularity: Math.min(maxMarks.regularity, parseInt(e.target.value) || 0)
                          }))}
                          max={maxMarks.regularity}
                          min="0"
                        />
                        <span className="text-sm text-muted-foreground">/{maxMarks.regularity}</span>
                      </div>
                      <Progress 
                        value={(internalAssessment.regularity / maxMarks.regularity) * 100} 
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Internal:</span>
                      <span className="font-bold">
                        {internalAssessment.testsModel + internalAssessment.assignment + internalAssessment.regularity}/{maxMarks.total}
                      </span>
                    </div>
                    <Progress 
                      value={((internalAssessment.testsModel + internalAssessment.assignment + internalAssessment.regularity) / maxMarks.total) * 100} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Semester Exam Marks */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <AlertCircle className="w-5 h-5" />
                    Semester Exam Marks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="semester-marks">Marks Obtained in Semester Exam</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="semester-marks"
                        type="number"
                        placeholder="0"
                        value={semesterMarks || ""}
                        onChange={(e) => setSemesterMarks(Math.min(75, parseInt(e.target.value) || 0))}
                        max="75"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">/75</span>
                    </div>
                    <Progress value={(semesterMarks / 75) * 100} className="mt-2" />
                  </div>
                  <Button onClick={predictGrade} className="w-full">
                    Predict Final Grade
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {prediction && (
                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <Gem className="w-5 h-5" />
                      Predicted Grade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <div className={`text-4xl font-bold ${getColorForPercentage(prediction.percentage)}`}>
                        {prediction.grade}
                      </div>
                      <p className="text-sm text-muted-foreground">{prediction.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Marks:</span>
                        <span className="font-medium">{prediction.totalOverall}/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Percentage:</span>
                        <span className="font-medium">{prediction.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grade Points:</span>
                        <span className="font-medium">{prediction.gradePoints}</span>
                      </div>
                    </div>
                    <Progress value={prediction.percentage} className="mt-4" />
                  </CardContent>
                </Card>
              )}

              {/* Grade Targets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Required Semester Marks for Grades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  {["O", "D+", "D", "A+", "A", "B"].map(grade => {
                    const required = getRequiredMarksForGrade(grade);
                    const achievable = required <= 75;
                    return (
                      <div key={grade} className={`flex justify-between p-2 rounded ${achievable ? 'bg-green-50' : 'bg-red-50'}`}>
                        <span>Grade {grade}:</span>
                        <span className={achievable ? 'text-green-600 font-medium' : 'text-red-600'}>
                          {achievable ? `${required.toFixed(0)}/75` : 'Not achievable'}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Assessment Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assessment Structure ({programType})</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Tests & Model:</span>
                      <span className="font-medium">12 marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assignment:</span>
                      <span className="font-medium">8 marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regularity:</span>
                      <span className="font-medium">5 marks</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span>Internal Total:</span>
                      <span className="font-medium">25 marks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Semester Exam:</span>
                      <span className="font-medium">75 marks</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Grand Total:</span>
                      <span>100 marks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Note */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      If you get different grades, consult your professor or department secretary for clarification on the grading system.
                    </p>
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

export default GradePredictor;
