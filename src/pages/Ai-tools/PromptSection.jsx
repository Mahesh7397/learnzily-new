import { useState, useRef } from "react"
import { Send, Mic, Upload, X, Minus, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { ScrollArea } from "../../components/ui/scroll-area"
import axios from "axios"



export function PromptSection() {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([])
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const promptMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('/api/prompt', data)
      return response.data
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { type: 'assistant', content: data.response }])
    },
    onError: (error) => {
      console.error('Error sending prompt:', error)
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
      setMessages(prev => [...prev, { type: 'assistant', content: "Sorry, I'm having trouble responding right now. Please try again." }])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim() && !promptMutation.isPending) {
      setMessages(prev => [...prev, { type: 'user', content: prompt }])
      setIsExpanded(true)
      promptMutation.mutate({ prompt })
      setPrompt("")
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setMessages(prev => [...prev, { type: 'user', content: `Uploaded file: ${file.name}` }])
      setIsExpanded(true)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  if (isExpanded) {
    return (
      <section className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsExpanded(false)
                setMessages([])
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything or give instructions..."
                className="min-h-[80px] pr-32 resize-none text-lg shadow-glow border-2 border-primary/20 focus:border-primary/50 transition-smooth"
                rows={2}
              />
              <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xls,.xlsx"
                />
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  className={`h-8 w-8 ${isRecording ? 'text-destructive' : ''}`}
                  onClick={toggleRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-gradient-primary hover:opacity-90 transition-smooth h-10 w-10"
                  disabled={!prompt.trim() || promptMutation.isPending}
                >
                  {promptMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Ask Anything
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get instant help with flashcards, summaries, quizzes, and more. Just describe what you need.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything or give instructions..."
            className="min-h-[120px] pr-32 resize-none text-lg shadow-glow border-2 border-primary/20 focus:border-primary/50 transition-smooth"
          />
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xls,.xlsx"
            />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className="h-8 w-8"
              onClick={handleFileUpload}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className={`h-8 w-8 ${isRecording ? 'text-destructive' : ''}`}
              onClick={toggleRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              type="submit" 
              size="icon"
              className="bg-gradient-primary hover:opacity-90 transition-smooth h-10 w-10"
              disabled={!prompt.trim() || promptMutation.isPending}
            >
              {promptMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}