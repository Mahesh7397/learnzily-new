import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import AdminDashboard from './pages/Admin/DashBoard'
import ResourceList from './pages/Admin/ResourceList'
import UserList from './pages/Admin/UserList'
import Contact from './pages/Contact'
import Course from './pages/Course'
import FifiAI from './pages/FifiAI'
// import Forum from './pages/Forum'
import Schedule from './pages/Schedule'
import Tutor from './pages/Tutor'
import Notification from './pages/Notifications'
import Profile from './pages/Profile'
import SmartPrep from './pages/SmartPrep'

import { UseDataProvider } from './contexts/DataProvider'
import Admin from './pages/Admin'
import UserDetails from './pages/Admin/UserDetails'
import LogList from './pages/Admin/Loglist'
import CoreSettings from './pages/Admin/CoreSettings'
import Upload from './pages/Admin/Upload'
import Notes from './pages/Admin/pages/Notes'
import Question_paper from './pages/Admin/pages/Question_paper'
//tools
import GradeCalculator from './pages/tools/GradeCalculator'
import GradePredictor from './pages/tools/GradePredictor'
import GradeTracker from './pages/tools/GradeTracker'
import PercentageCalculator from './pages/tools/PercentageCalculator'

const Router = () => {
    const { Userdata, role } = UseDataProvider()
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            {Userdata?.OnBoardingfinish ? null : <Route path="/onboarding" element={<Onboarding />} />}
            {Userdata?.OnBoardingfinish && (role == import.meta.env.VITE_TUTOR || role == import.meta.env.VITE_STUDENT || role == import.meta.env.VITE_ADMIN) ? <>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/course' element={<Course />} />
                <Route path='/fifi-ai' element={<FifiAI />} />
                {/* <Route path='/forum' element={<Forum />} /> */}
                <Route path='/schedule' element={<Schedule />} />
                <Route path='/tutor' element={<Tutor />} />
                <Route path='/notifications' element={<Notification />} />
                <Route path='/profile' element={<Profile/>} /> 
                <Route path='/smartprep' element={<SmartPrep/>} />
            </> : null}
            {Userdata && role == import.meta.env.VITE_ADMIN ?
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='resources' element={<ResourceList />} >
                        <Route index element={<Question_paper />} />
                        <Route path='question-paper' element={<Question_paper />} />
                        <Route path='notes' element={<Notes />} />
                    </Route>
                    <Route path='tools'>
                        <Route path='grade-calculator' element={<GradeCalculator/>}/>
                        <Route path='Percentage-calculator' element={<PercentageCalculator/>} />
                        <Route path='grade-tracker' element={<GradeTracker/>} />
                        <Route path='grade-predictor' element={<GradePredictor/>} />
                    </Route>
                    <Route path='userlist' element={<UserList />} />
                    <Route path='userDatails/:id' element={<UserDetails />} />
                    <Route path='loglist' element={<LogList />} />
                    <Route path='setting' element={<CoreSettings />} />
                    <Route path='upload' element={<Upload />} />
                </Route>
                : null}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router