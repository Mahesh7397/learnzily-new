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
    const [result,setresult]=useState([])
    const [searchQuery,setSearchQuery]=useState("")

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

    const Handlesignup = async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            const req=await api.post('/api/signup',{
                email:email,
                password:password,
                userdata:user
            })
            if(req.ok){
                Navigate('/login')
            }
            else{
                Alert("error","Try Again Later")
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

            await getuserdata()
            Alert("success", serverres.data.message)
        } catch (error) {
            Alert("error", error.code, "")
            throw new Error(error.code)
        }
    }


    const getuserdata = async () => {
        try {
            const actoken=await localStorage.getItem("learnzilyToken")
            const chtoken=await localStorage.getItem("learnzilyRole")
            if (actoken == null || chtoken == null) {
                // Navigate("/")
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
                    const check=await RefreshToken()
                    data.data.userdata.OnBoardingfinish && check? Navigate('/dashboard') : Navigate('/onboarding')
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

            await getuserdata()
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
            await getuserdata()
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
            setrole((req.data.Gatetoken).split("-")[1] )
            return true
        } catch (error) {
            return false
        }
    }

    const Logout=async()=>{
        try {
            await localStorage.removeItem("learnzilyRole")
            await localStorage.removeItem("learnzilyToken")
            await getuserdata()
            Alert("success","Successfully Logout!")
        } catch (error) {
            console.log(error)
        }
    }


    const HandleUpload=async(data,file)=>{
        try {
            const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req=await api.post(`/auth/resources/upload/${data.sem_month_year||"None"}/${data.collegename||"None"}/${data.filename||"None"}/${data.filecode||"None"}/${data.type||"None"}/${data.degree||"None"}/${data.field||"None"}`,file,{
                headers: {
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            Alert("success",req.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const getallresourcesdata=async()=>{
        try {
             const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const req=await api.get('/auth/resource/alldata',{
                headers:{
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "application/json"
                }
            })
            return req.data
        } catch (error) {
            console.log(error)
            Alert('error',error.message)
        }
    }
    
    const searchitem=async()=>{
        try {
             const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))

            const req=await api.get(`/api/search?q=${searchQuery}`,{
                headers:{
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type":"application/json"
                }
            })

            setresult(req.data.result)
        } catch (error) {
            setresult([])
        }
    }
    
    const HandleLink=async(key)=>{
        try {
             const { acesstoken } = JSON.parse(await localStorage.getItem("learnzilyToken"))
            const url= await api.get("/api/resouce-url",{
                params:{
                    key:key
                }
            },{
                headers:{
                    "Authorization": `Bearer ${acesstoken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            return url.data.url
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getuserdata()
    }, [])

    return (
        <Datacontext.Provider value={{ Handlesignup, Handlelogin, GoogleLoginandsignup, Userdata, Onboardingfinish, role ,Logout,HandleUpload,getallresourcesdata,searchQuery,setSearchQuery,result,searchitem,setresult}}>
            {children}
        </Datacontext.Provider>
    )
}

export const UseDataProvider = () => useContext(Datacontext)