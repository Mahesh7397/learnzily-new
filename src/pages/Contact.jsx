
import { NavbarLogo } from "../component/ui/navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <NavbarLogo />
            <h1 className="text-4xl font-bold mt-8 mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-4">
              Email: <a href="mailto:mohamedfazilrm@gmail.com" className="text-brand hover:underline">mohamedfazilrm@gmail.com</a>
            </p>
            <p className="text-lg">
              We'd love to hear from you and help with any questions about LearnEze.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
