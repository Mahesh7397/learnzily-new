
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";

const FifiAI = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Fifi AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Fifi AI content will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FifiAI;
