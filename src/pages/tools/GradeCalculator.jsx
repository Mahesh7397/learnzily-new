import { useState, useEffect } from 'react';
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Label } from '../../component/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Plus, Minus, Calculator, Award } from 'lucide-react';
import { getGradeFromMarks, calculateSGPA, sgpaToPercentage, getMotivationalQuote } from '../../lib/grading';
import { UseDataProvider } from '../../contexts/DataProvider';
import { SessionNavBar } from '../../component/SessionNavBar';



const GradeCalculator = () => {
  const { university } = UseDataProvider()
  const [subjectCount, setSubjectCount] = useState(5);
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Initialize subjects array when count changes
    const newSubjects = Array.from({ length: subjectCount }, (_, index) => ({
      id: `subject-${index}`,
      name: `Subject ${index + 1}`,
      credits: 4,
      marks: 0,
    }));
    setSubjects(newSubjects);
    setResults(null);
  }, [subjectCount]);

  const updateSubject = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setSubjects(updatedSubjects);
  };

  const calculateResults = () => {
    // Validate inputs
    const invalidSubjects = subjects.filter(subject =>
      !subject.name.trim() || subject.credits <= 0 || subject.marks < 0 || subject.marks > 100
    );

    if (invalidSubjects.length > 0) {
      return;
    }

    // Calculate grades and grade points for each subject
    const calculatedSubjects = subjects.map(subject => {
      const { grade, gradePoint } = getGradeFromMarks(subject.marks, university);
      return { ...subject, grade, gradePoint };
    });

    const sgpa = calculateSGPA(calculatedSubjects);
    const percentage = sgpaToPercentage(sgpa, university);
    const quote = getMotivationalQuote(sgpa);

    setSubjects(calculatedSubjects);
    setResults({ sgpa, percentage, quote });
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar/>
      <main className='flex-1 ml-12 lg:ml-60 transition-all duration-200'>
        <div className="max-w-4xl mx-auto p-4 space-y-6 animate-fade-in">
          <Card className="hero-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="w-5 h-5 text-primary" />
                Grade Calculator (SGPA)
              </CardTitle>
              <CardDescription>
                Calculate your Semester Grade Point Average based on subject marks and credits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subject Count Input */}
              <div className="flex items-center gap-4">
                <Label htmlFor="subject-count" className="text-sm font-medium">
                  Number of Subjects:
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubjectCount(Math.max(1, subjectCount - 1))}
                    disabled={subjectCount <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="subject-count"
                    type="number"
                    value={subjectCount}
                    onChange={(e) => setSubjectCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center input-enhanced"
                    min="1"
                    max="12"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubjectCount(Math.min(12, subjectCount + 1))}
                    disabled={subjectCount >= 12}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Subject Inputs */}
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={subject.id} className="feature-card">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <Label htmlFor={`subject-name-${index}`} className="text-sm font-medium">
                          Subject Name
                        </Label>
                        <Input
                          id={`subject-name-${index}`}
                          value={subject.name}
                          onChange={(e) => updateSubject(index, 'name', e.target.value)}
                          placeholder={`Subject ${index + 1}`}
                          className="input-enhanced"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`subject-credits-${index}`} className="text-sm font-medium">
                          Credits
                        </Label>
                        <Input
                          id={`subject-credits-${index}`}
                          type="number"
                          value={subject.credits}
                          onChange={(e) => updateSubject(index, 'credits', parseInt(e.target.value) || 0)}
                          min="1"
                          max="10"
                          className="input-enhanced"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`subject-marks-${index}`} className="text-sm font-medium">
                          Marks (out of 100)
                        </Label>
                        <Input
                          id={`subject-marks-${index}`}
                          type="number"
                          value={subject.marks}
                          onChange={(e) => updateSubject(index, 'marks', parseInt(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="input-enhanced"
                        />
                      </div>
                      <div>
                        {subject.grade && (
                          <div className="feature-card bg-muted">
                            <p className="text-sm font-medium text-center">
                              Grade: <span className="text-primary font-bold">{subject.grade}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={calculateResults} className="btn-hero w-full">
                Calculate SGPA
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card className="hero-card animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="w-5 h-5 text-success" />
                  Your Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="feature-card bg-gradient-primary text-primary-foreground text-center">
                    <p className="text-sm opacity-90 mb-2">Semester Grade Point Average</p>
                    <p className="text-3xl font-bold">{results.sgpa}</p>
                  </div>
                  <div className="feature-card bg-gradient-secondary text-secondary-foreground text-center">
                    <p className="text-sm opacity-90 mb-2">Equivalent Percentage</p>
                    <p className="text-3xl font-bold">{results.percentage}%</p>
                  </div>
                </div>

                <div className="feature-card status-success text-center">
                  <p className="text-sm font-medium">{results.quote}</p>
                </div>

                {/* Subject-wise Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Subject-wise Breakdown</h4>
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
                        {subjects.map((subject, index) => (
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
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>

  );
};

export default GradeCalculator;