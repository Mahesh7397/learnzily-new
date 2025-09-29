import { useState, useEffect } from 'react';
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Label } from '../../component/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../component/ui/dialog';
import { Plus, BarChart3, Trash2, Edit, ChevronDown, ChevronUp, Award, BookOpen } from 'lucide-react';
import { getGradeFromMarks, calculateSGPA, calculateCGPA, sgpaToPercentage } from '../../lib/grading';
import { UseDataProvider } from '../../contexts/DataProvider';
import { SessionNavBar } from '../../component/SessionNavBar';




const GradeTracker = () => {
  const [semesters, setSemesters] = useState  ([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState (null);
  const [expandedSemester, setExpandedSemester] = useState (null);
  const [newSemesterNumber, setNewSemesterNumber] = useState(1);
  const [subjectCount, setSubjectCount] = useState(5);
  const [subjects, setSubjects] = useState ([]);
  const { university}=UseDataProvider()
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(`gradeTracker_${university}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSemesters(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, [university]);

  // Save data to localStorage whenever semesters change
  useEffect(() => {
    if (semesters.length > 0) {
      localStorage.setItem(`gradeTracker_${university}`, JSON.stringify(semesters));
    }
  }, [semesters, university]);

  // Initialize subjects when count changes
  useEffect(() => {
    const newSubjects= Array.from({ length: subjectCount }, (_, index) => ({
      id: `subject-${index}`,
      name: `Subject ${index + 1}`,
      credits: 4,
      marks: 0,
    }));
    setSubjects(newSubjects);
  }, [subjectCount]);

  const updateSubject = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setSubjects(updatedSubjects);
  };

  const openAddDialog = () => {
    const nextSemesterNumber = semesters.length > 0 ? Math.max(...semesters.map(s => s.semesterNumber)) + 1 : 1;
    setNewSemesterNumber(nextSemesterNumber);
    setSubjectCount(5);
    setEditingSemester(null);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (semester) => {
    setEditingSemester(semester);
    setNewSemesterNumber(semester.semesterNumber);
    setSubjects(semester.subjects);
    setSubjectCount(semester.subjects.length);
    setIsAddDialogOpen(true);
  };

  const saveSemester = () => {
    // Validate inputs
    const invalidSubjects = subjects.filter(subject =>
      !subject.name.trim() || subject.credits <= 0 || subject.marks < 0 || subject.marks > 100
    );

    if (invalidSubjects.length > 0) {
      return;
    }

    // Check for duplicate semester number (except when editing)
    const isDuplicate = semesters.some(s =>
      s.semesterNumber === newSemesterNumber && (!editingSemester || s.id !== editingSemester.id)
    );

    if (isDuplicate) {
      return;
    }

    // Calculate grades and grade points for each subject
    const calculatedSubjects = subjects.map(subject => {
      const { grade, gradePoint } = getGradeFromMarks(subject.marks, university);
      return { ...subject, grade, gradePoint };
    });

    const sgpa = calculateSGPA(calculatedSubjects);
    const totalCredits = calculatedSubjects.reduce((sum, subject) => sum + subject.credits, 0);

    const semesterData = {
      id: editingSemester?.id || `semester-${Date.now()}`,
      semesterNumber: newSemesterNumber,
      subjects: calculatedSubjects,
      sgpa,
      totalCredits,
    };

    if (editingSemester) {
      // Update existing semester
      setSemesters(prev => prev.map(s => s.id === editingSemester.id ? semesterData : s));

    } else {
      // Add new semester
      setSemesters(prev => [...prev, semesterData].sort((a, b) => a.semesterNumber - b.semesterNumber));
    }

    setIsAddDialogOpen(false);
  };

  const deleteSemester = (semesterId) => {
    setSemesters(prev => prev.filter(s => s.id !== semesterId));

  };

  const toggleExpanded = (semesterId) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  const cgpa = calculateCGPA(semesters);

  return (
    <div className="min-h-screen flex w-full bg-background">
     <SessionNavBar/>
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in">
          {/* Header */}
          <Card className="hero-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="w-5 h-5 text-primary" />
                Grade Tracker (CGPA)
              </CardTitle>
              <CardDescription>
                Track your semester-wise performance and overall CGPA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="feature-card bg-gradient-primary text-primary-foreground">
                    <div className="text-center">
                      <p className="text-sm opacity-90">Overall CGPA</p>
                      <p className="text-2xl font-bold">{cgpa || '0.00'}</p>
                    </div>
                  </div>
                  <div className="feature-card bg-gradient-secondary text-secondary-foreground">
                    <div className="text-center">
                      <p className="text-sm opacity-90">Semesters Tracked</p>
                      <p className="text-2xl font-bold">{semesters.length}</p>
                    </div>
                  </div>
                </div>
                <Button onClick={openAddDialog} className="btn-hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Semester
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Semesters List */}
          {semesters.length === 0 ? (
            <Card className="feature-card text-center py-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Semesters Added Yet</h3>
              <p className="text-muted-foreground mb-4">Start tracking your academic progress by adding your first semester</p>
              <Button onClick={openAddDialog} className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Semester
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {semesters.map((semester) => (
                <Card key={semester.id} className="feature-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-4 cursor-pointer flex-1"
                        onClick={() => toggleExpanded(semester.id)}
                      >
                        <div className="feature-card bg-gradient-accent text-accent-foreground min-w-[80px] text-center">
                          <p className="text-xs">Sem {semester.semesterNumber}</p>
                          <p className="font-bold text-sm">{semester.sgpa}</p>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Semester {semester.semesterNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {semester.subjects.length} subjects • {semester.totalCredits} credits • {sgpaToPercentage(semester.sgpa, university)}%
                          </p>
                        </div>
                        {expandedSemester === semester.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(semester)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSemester(semester.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedSemester === semester.id && (
                      <div className="mt-4 pt-4 border-t border-border animate-slide-in">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-2 text-sm font-medium">Subject</th>
                                <th className="text-center p-2 text-sm font-medium">Credits</th>
                                <th className="text-center p-2 text-sm font-medium">Marks</th>
                                <th className="text-center p-2 text-sm font-medium">Grade</th>
                                <th className="text-center p-2 text-sm font-medium">Grade Point</th>
                              </tr>
                            </thead>
                            <tbody>
                              {semester.subjects.map((subject, index) => (
                                <tr key={index} className="border-b border-border/50">
                                  <td className="p-2 text-sm">{subject.name}</td>
                                  <td className="p-2 text-sm text-center">{subject.credits}</td>
                                  <td className="p-2 text-sm text-center">{subject.marks}</td>
                                  <td className="p-2 text-sm text-center font-semibold text-primary">{subject.grade}</td>
                                  <td className="p-2 text-sm text-center">{subject.gradePoint}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Add/Edit Semester Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {editingSemester ? 'Edit Semester' : 'Add New Semester'}
                </DialogTitle>
                <DialogDescription>
                  Enter subject details to calculate and save semester SGPA
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Semester Number and Subject Count */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester-number">Semester Number</Label>
                    <Input
                      id="semester-number"
                      type="number"
                      value={newSemesterNumber}
                      onChange={(e) => setNewSemesterNumber(parseInt(e.target.value) || 1)}
                      min="1"
                      max="12"
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject-count-dialog">Number of Subjects</Label>
                    <Input
                      id="subject-count-dialog"
                      type="number"
                      value={subjectCount}
                      onChange={(e) => setSubjectCount(parseInt(e.target.value) || 1)}
                      min="1"
                      max="12"
                      className="input-enhanced"
                    />
                  </div>
                </div>

                {/* Subject Inputs */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {subjects.map((subject, index) => (
                    <div key={subject.id} className="feature-card">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor={`dialog-subject-name-${index}`}>Subject Name</Label>
                          <Input
                            id={`dialog-subject-name-${index}`}
                            value={subject.name}
                            onChange={(e) => updateSubject(index, 'name', e.target.value)}
                            placeholder={`Subject ${index + 1}`}
                            className="input-enhanced"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`dialog-subject-credits-${index}`}>Credits</Label>
                          <Input
                            id={`dialog-subject-credits-${index}`}
                            type="number"
                            value={subject.credits}
                            onChange={(e) => updateSubject(index, 'credits', parseInt(e.target.value) || 0)}
                            min="1"
                            max="10"
                            className="input-enhanced"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`dialog-subject-marks-${index}`}>Marks</Label>
                          <Input
                            id={`dialog-subject-marks-${index}`}
                            type="number"
                            value={subject.marks}
                            onChange={(e) => updateSubject(index, 'marks', parseInt(e.target.value) || 0)}
                            min="0"
                            max="100"
                            className="input-enhanced"
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="feature-card bg-muted w-full text-center">
                            <p className="text-xs text-muted-foreground">Preview Grade</p>
                            <p className="font-semibold text-primary">
                              {subject.marks > 0 ? getGradeFromMarks(subject.marks, university).grade : '-'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveSemester} className="btn-hero">
                  {editingSemester ? 'Update Semester' : 'Save Semester'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>

  );
};

export default GradeTracker;
