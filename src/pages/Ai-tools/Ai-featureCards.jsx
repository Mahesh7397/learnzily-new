import { FileText, Upload, Brain, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../component/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useNavigate } from "react-router-dom"

export function FeatureCards() {
  const navigate = useNavigate()

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Flashcards */}
        <Card className="group hover:shadow-glow transition-smooth border-2 hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>AI Flashcards & Quick Quiz</span>
            </CardTitle>
            <CardDescription>
              Generate interactive flashcards and take quick quizzes on any topic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-12 h-8 bg-gradient-subtle border rounded shadow-card flex items-center justify-center text-xs font-medium"
                    style={{ zIndex: 4 - i }}
                  >
                    Q{i}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth group-hover:scale-105"
              onClick={() => navigate('/flashcards')}
            >
              Generate Flashcards
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* AI Summarizer */}
        <Card className="group hover:shadow-glow transition-smooth border-2 hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>AI Summarizer</span>
            </CardTitle>
            <CardDescription>
              Upload documents and get intelligent summaries instantly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center transition-smooth group-hover:border-primary/50">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Upload PDF, DOC, Image, or Excel
              </p>
            </div>
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth group-hover:scale-105"
              onClick={() => navigate('/summarizer')}
            >
              Summarize
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* AI Quiz Generator */}
        <Card className="group hover:shadow-glow transition-smooth border-2 hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>AI Quiz Generator</span>
            </CardTitle>
            <CardDescription>
              Create custom quizzes on any topic in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Enter topic..."
              className="transition-smooth focus:border-primary/50"
            />
            <div className="text-sm text-muted-foreground">
              Example: "World War 2 History", "JavaScript Functions", "Biology Cells"
            </div>
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth group-hover:scale-105"
              onClick={() => navigate('/quiz')}
            >
              Generate Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}