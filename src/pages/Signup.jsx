
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoaderOne from "../component/ui/loader-one";
import { AlertProvider, useAlert } from "../component/ui/Alert/alert-provider";
import { UseDataProvider } from "../contexts/DataProvider";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setname] = useState("")
  const [Password, setPassword] = useState("")
  const [email, setemail] = useState("")
  const [rePassword, setrePassword] = useState("")
  const [disable, setdisable] = useState(false)
  const navigate = useNavigate();
  const { showAlert } = useAlert()
  const { Handlesignup ,GoogleLoginandsignup } = UseDataProvider()

  function Alert(variant, title, description) {
    return showAlert({
      variant,
      title,
      description,
      autoClose: true,
      autoCloseDelay: 4000,
    })
  }

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }, []);



  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      if( name.length>=4 && Password===rePassword && email.includes("@gmail.com")){
        await Handlesignup(email,Password)
    }
    else{
      Alert('warning', 'Passwords do not match.', 'Please make sure your password and confirm password fields are identical.')
    }
    } catch (error) {
      console.log(error)
    }
    
    // Simulate signup process
    // Alert('success', 'Operation Complete!', 'Your task has been successfully completed.')
  };

  const handleGoogleSignup =async() => {
    // Simulate Google signup
    try {
      await GoogleLoginandsignup()
      navigate('/onboarding');
    } catch (error) {
      console.log(error)
    }
    
  };

  // useEffect(()=>{
  //    if( name.length>=4 && Password==rePassword && email.includes("@gmail.com")){
  //     setdisable(false)
  //    }
  //    else{
  //     setdisable(true)
  //    }
  // },[name,email,Password,rePassword])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-black dark:text-white text-xl">LearnEze</span>
          <div className="mt-8">
            <LoaderOne />
          </div>
          <p className="mt-4 text-muted-foreground">Loading signup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-black dark:text-white text-xl">LearnEze</span>
            <h1 className="text-3xl font-bold mt-8 mb-2">Join LearnEze</h1>
            <p className="text-muted-foreground">Start your smart learning journey today</p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Create a password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Confirm your password"
                  required
                  value={rePassword}
                  onChange={(e) => setrePassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand to-brand-foreground text-white py-2 px-4 rounded-md hover:scale-105 transition-transform duration-200"

              >
                Create Account
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignup}
                className="w-full mt-4 flex items-center justify-center gap-3 px-4 py-2 border border-border rounded-md bg-background hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-brand hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
      <SignupPage />
  )
}

export default Signup;
