
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";

const Tutor = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tutor content will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tutor;
