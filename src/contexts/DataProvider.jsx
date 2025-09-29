import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../lib/Firebase"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../component/ui/Alert/alert-provider";
import api from "../api/Server_client"

const Datacontext = createContext()

export const DataProvider = ({ children }) => {
    const [Userdata, setUserdata] = useState({})
    const auth = getAuth(app)
    const [role, setrole] = useState("")
    const Navigate = useNavigate()
    const { showAlert } = useAlert()
    const [result, setresult] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [resources, setResources] = useState({});
    const [university,setuniversity]=useState("")

    const Googleprovider = new GoogleAuthProvider()

    function Alert(variant, title, description) {
        return showAlert({
            variant,
            title,
            description,
            autoClose: true,
            autoCloseDelay: 4000,
        })
    }

    const Handlesignup = async (email, password, name) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            const req = await api.post('/api/signup', {
                email: email,
                password: password,
                userdata: { ...user, displayName: name }
            })
            if (req.ok) {
                Navigate('/login')
            }
            else {
                Alert("error", "Try Again Later")
            }
        } catch (error) {
            Alert("error", error.code, "")
            throw new Error(error.code)
        }
    }

    const Handlelogin = async (email, Password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, Password)
            if (!user) { return { message: "Login failed" } }
            console.log(user.user.providerData[0])
            const serverres = await api.post("/api/login", {
                email: email,
                password: Password,
                data: user.user.providerData[0]
            })
            console.log(serverres)
            await localStorage.setItem("learnzilyRole", JSON.stringify({ CharToken: (serverres.data.Gatetoken).split("-")[1] }))
            await localStorage.setItem("learnzilyToken", JSON.stringify({ acesstoken: serverres.data.accessToken }))

            await getuserdata(true)
            console.log("login success")
            Alert("success", serverres.data.message)
        } catch (error) {
            Alert("error", error.code, "")
            throw new Error(error.code)
        }
    }


    const getuserdata = async (trigger) => {
        try {

            const actoken = await localStorage.getItem("learnzilyToken")
            const chtoken = await localStorage.getItem("learnzilyRole")
            if (actoken === null || chtoken === null) {
                trigger && Navigate("/")
            }
            else {

                const { acesstoken } = JSON.parse(actoken)
                const { CharToken } = JSON.parse(chtoken)
                const data = await api.get("/api/user/profile", {
                    headers: {
                        "Authorization": `Bearer ${acesstoken}`,
                        "Content-Type": "application/json"
                    }
                })
                if (data.data.userdata) {

                    setUserdata(data.data.userdata)
                    const check = await RefreshToken()
                    data.data.userdata.OnBoardingfinish && check ? trigger ? Navigate('/dashboard') : null : Navigate('/onboarding')
                }
                else {
                    Navigate('/login')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GoogleLoginandsignup = async () => {
        try {
            const user = await signInWithPopup(auth, Googleprovider)
            if (!user) { return { message: "Login failed" } }
            const serverres = await api.post("/api/googlelogin", {
                email: user.user.email,
                googleid: user.user.uid,
                data: user.user.providerData[0]
            })
            console.log(serverres)
            await localStorage.setItem("learnzilyRole", JSON.stringify({ CharToken: (serverres.data.Gatetoken).split("-")[1] }))
            await localStorage.setItem("learnzilyToken", JSON.stringify({ acesstoken: serverres.data.accessToken }))

            await getuserdata(true)
            Alert("success", serverres.data.message)
        } catch (error) {
            Alert("error", error.code, "")
            throw new Error(error.code)
        }
    }

    const Onboardingfinish = async (data) => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req = await api.post('/api/user/onboarding', data, {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "application/json"
                }
            })
            await getuserdata(true)
            Alert("success", req.data.message)
        } catch (error) {
            Alert("error", error.code, "")
        }
    }
    const RefreshToken = async () => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req = await api.get('/api/user/refresh-token', {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "application/json"
                }
            })
            await localStorage.setItem("learnzilyRole", JSON.stringify({ CharToken: (req.data.Gatetoken).split("-")[1] }))
            await localStorage.setItem("learnzilyToken", JSON.stringify({ acesstoken: req.data.accessToken }))
            setrole((req.data.Gatetoken).split("-")[1])
            return true
        } catch (error) {
            return false
        }
    }

    const Logout = async () => {
        try {
            await localStorage.removeItem("learnzilyRole")
            await localStorage.removeItem("learnzilyToken")
            getuserdata(true)
            Alert("success", "Successfully Logout!")
        } catch (error) {
            console.log(error)
        }
    }


    const HandleUpload = async (data, file) => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req = await api.post(`/auth/resources/upload/${data.sem_month_year || "None"}/${data.collegename || "None"}/${data.filename || "None"}/${data.filecode || "None"}/${data.type || "None"}/${data.degree || "None"}/${data.field || "None"}`, file, {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            const t=await getallresourcesdata()
            setResources(t)
            Alert("success", req.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const getallresourcesdata = async () => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req = await api.get('/auth/resource/alldata', {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "application/json"
                }
            })
            return req.data
        } catch (error) {
            console.log(error)
            Alert('error', error.message)
        }
    }

    const searchitem = async () => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))

            const req = await api.get(`/api/search?q=${searchQuery}`, {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "application/json"
                }
            })

            setresult(req.data.result)
        } catch (error) {
            setresult([])
        }
    }

    const HandleLink = async (key) => {
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const url = await api.get("/api/resouce-url", {
                params: {
                    key: key
                }
            }, {
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            return url.data.url
        } catch (error) {
            console.log(error)
        }
    }

    class College {
        constructor() {
            this.accessToken = ''
            this.Getaccesstoken()
        }
        async Getaccesstoken() {
            try {
                const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
                this.accessToken = acesstoken
            } catch (error) {
                this.accessToken = null
            }
        }
        async Addcollege(collegename, college_unversity,coursesOffered) {
            try {
                const data = {
                    collegeName: collegename,
                    college_University: college_unversity,
                    coursesOffered:coursesOffered
                }
                const req = await api.post('/api/addcollege', data, {
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                Alert("success", req.data.message)
            } catch (error) {
                Alert("error", error.code, "")
            }
        }
        async Getallcollege() {
            try {
                const req = await api.get('/api/getallcolleges', {
                    headers: {
                        "Authorization": `Bearer ${acesstoken}`, "Content-Type": "application/json" }
                })
                return req.data.colleges
            } catch (error) {
                Alert("error", error.code, "")
            }
        }
        async Editcollege(collegeid, collegename, college_unversity,coursesOffered) {
            try {
                const data = {
                    collegeName: collegename,
                    college_University: college_unversity,
                    coursesOffered:coursesOffered
                }
                const req = await api.put(`/api/editcollege/${collegeid}`, data, {
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                Alert("success", req.data.message)
            } catch (error) {
                Alert("error", error.code, "")
            }
        }
        async Deletecollege(collegeid) {
            try {
                const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
                const req = await api.delete(`/api/deletecollege/${collegeid}`, {
                    headers: {  "Authorization": `Bearer ${this.accessToken}`, "Content-Type": "application/json" }
                })
                Alert("success", req.data.message)
            } catch (error) {
                Alert("error", error.code, "")
            }
        }
    }
    const Getallusers=async()=>{
            try {
                const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
                if(acesstoken===null){
                    return
                }
                const req = await api.get('/auth/userdata', {
                    headers: {"Authorization": `Bearer ${acesstoken}`, "Content-Type": "application/json" }
                })
                return req.data
            } catch (error) {
                Alert("error", error.code, "")
            }
        }
    const DeleteUser=async(userid)=>{
            try {
                const req = await api.delete(`/api/admin/deleteuser/${userid}`, {
                    headers: {  "Authorization": `Bearer ${this.accessToken}`, "Content-Type": "application/json" }
                })
                Alert("success", req.data.message)
                this.Getallusers()
            } catch (error) {
                Alert("error", error.code, "")
            }
        }

    const checkCollege=async(collegename)=>{
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            if(acesstoken===null || collegename===undefined || collegename===""){
                return
            }
            const req = await api.get(`/api/checkcollege/${collegename}`, {
                headers: {  "Authorization": `Bearer ${acesstoken}`, "Content-Type": "application/json" }
            })
            setuniversity(req.data.college_University)
        } catch (error) {
            Alert("error", error.code, "")
        }
    }

    const Handledeleteresources=async(key,type,id)=>{
        try {
            console.log("Deleted started", key,type,id)
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            console.log(acesstoken)
            const req=await api.delete(`/auth/resources/delete`,{
                params:{ key: key, type: type, id: id },
                                    headers: {
                        "Authorization": `Bearer ${acesstoken}`,
                        "Content-Type": "application/json"
                    }
                })
            if(req.data.ok){
                const ne=await getallresourcesdata()
                setResources(ne)
            }   
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getuserdata(false)
        checkCollege(Userdata.collegename)
    },[])

    return (
        <Datacontext.Provider value={{ Handlesignup, Handlelogin, GoogleLoginandsignup, Userdata, Onboardingfinish, role, Logout, HandleUpload, getallresourcesdata, searchQuery, setSearchQuery, result, searchitem, setresult, getuserdata, setResources, resources, College ,Handledeleteresources,checkCollege,HandleLink,university,Getallusers,DeleteUser}}>
            {children}
        </Datacontext.Provider>
    )
}

export const UseDataProvider = () => useContext(Datacontext)