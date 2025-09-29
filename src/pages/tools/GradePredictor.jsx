import { useState } from 'react';
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Label } from '../../component/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Target, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { calculateRequiredExternalMarks } from '../../lib/grading';
import { SessionNavBar } from '../../component/SessionNavBar';
import { UseDataProvider } from '../../contexts/DataProvider';



const GradePredictor = () => {
  const { university } = UseDataProvider()
  const [internalMarks, setInternalMarks] = useState(0);
  const [totalInternalMarks, setTotalInternalMarks] = useState(university === 'madras' ? 25 : 30);
  const [results, setResults] = useState(null);

    const calculatePrediction = () => {
      if (internalMarks < 0 || internalMarks > totalInternalMarks) {
        return;
      }

      if (totalInternalMarks < 0 || totalInternalMarks > 100) {
        return;
      }

      const predictions = calculateRequiredExternalMarks(internalMarks, totalInternalMarks, university);
      setResults(predictions);
    };

    const getStatusIcon = (requiredExternal) => {
      if (requiredExternal === "Already Secured") {
        return <CheckCircle className="w-4 h-4 text-success" />;
      } else if (requiredExternal === "Not Possible") {
        return <XCircle className="w-4 h-4 text-destructive" />;
      }
      return <Target className="w-4 h-4 text-info" />;
    };

    const getStatusClass = (requiredExternal) => {
      if (requiredExternal === "Already Secured") {
        return "status-success";
      } else if (requiredExternal === "Not Possible") {
        return "bg-destructive/10 text-destructive border-destructive/20";
      }
      return "status-info";
    };

    return (
      <div className="min-h-screen flex w-full bg-background">
        <SessionNavBar />
        <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
          <div className="max-w-4xl mx-auto p-4 space-y-6 animate-fade-in">
            <Card className="hero-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-5 h-5 text-primary" />
                  Grade Predictor (External Marks)
                </CardTitle>
                <CardDescription>
                  Calculate the minimum external marks needed to achieve your desired grades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="internal-marks" className="text-sm font-medium">
                      Internal Marks Obtained
                    </Label>
                    <Input
                      id="internal-marks"
                      type="number"
                      value={internalMarks}
                      onChange={(e) => setInternalMarks(parseInt(e.target.value) || 0)}
                      min="0"
                      max={totalInternalMarks}
                      placeholder="Enter your internal marks"
                      className="input-enhanced"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Marks you've already secured in internal assessments
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="total-internal" className="text-sm font-medium">
                      Total Internal Marks
                    </Label>
                    <Input
                      id="total-internal"
                      type="number"
                      value={totalInternalMarks}
                      onChange={(e) => setTotalInternalMarks(parseInt(e.target.value) || 0)}
                      min="0"
                      max="100"
                      className="input-enhanced"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {university === 'madras'
                        ? 'Default: 25 (can be modified)'
                        : 'Maximum possible internal marks'
                      }
                    </p>
                  </div>
                </div>

                <Button onClick={calculatePrediction} className="btn-hero w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Required Marks
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="hero-card animate-slide-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-success" />
                    Prediction Results
                  </CardTitle>
                  <CardDescription>
                    Minimum external marks required for each grade (out of {100 - totalInternalMarks} marks)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result, index) => (
                      <div key={index} className={`feature-card ${getStatusClass(result.requiredExternal)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold">Grade {result.grade}</span>
                          {getStatusIcon(result.requiredExternal)}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Required: </span>
                          <span className="font-bold">
                            {typeof result.requiredExternal === 'number'
                              ? `${result.requiredExternal} marks`
                              : result.requiredExternal
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Legend:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>Already Secured - You've already earned this grade</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-info" />
                        <span>Achievable - Marks needed in external exam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-destructive" />
                        <span>Not Possible - Beyond maximum external marks</span>
                      </div>
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

  export default GradePredictor;