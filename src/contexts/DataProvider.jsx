import { createContext, useContext, useEffect, useState } from "react";
import {app} from "../lib/Firebase"
import { createUserWithEmailAndPassword , getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../component/ui/Alert/alert-provider";
import api from "../api/Server_client"

const Datacontext=createContext()

export const DataProvider=({children})=>{
    const [Userdata,setUserdata]=useState({})
    const auth=getAuth(app)
    const Navigate=useNavigate()
    const {showAlert}=useAlert()
   
    const Googleprovider=new GoogleAuthProvider()

      function Alert(variant, title, description) {
    return showAlert({
      variant,
      title,
      description,
      autoClose: true,
      autoCloseDelay: 4000,
    })
  }

    const Handlesignup=async(email,password)=>{
        try {
            const user=await createUserWithEmailAndPassword(auth,email,password)
            console.log(user)
            Navigate('/login')
        } catch (error) {
             Alert("error",error.code,"")
            throw new Error(error.code)
        }
    }

    const Handlelogin=async(email,Password)=>{
        try {
            const user=await signInWithEmailAndPassword(auth,email,Password)
            console.log(user)
        } catch (error) {
             Alert("error",error.code,"")
             throw new Error(error.code)
        }
    }


    const getuserdataandaccesstoken=async()=>{
       try {
        const storageuser=JSON.parse(await localStorage.getItem("learnzilydata"))
        const accesstoken=JSON.parse(await localStorage.getItem("learnzilyToken"))
       if(storageuser==null || accesstoken==null){
          Navigate("/")
       }
       else{
        Navigate("/dashboard")
       }

       } catch (error) {
         console.log(error)
       }
    }

    const GoogleLoginandsignup=async()=>{
        try {
            const user=await signInWithPopup(auth,Googleprovider)
            if(!user){ return {message:"Login failed"} }
            const serverres=await api.post("/acc/googlelogin",{
                email:user.user.email,
                googleid:user.user.uid,
                data:user.user.providerData[0]
            })
            // console.log(userdata)
            const userdata={
                email:user.user.email,
                profileurl:user.user.photoURL,
                displayname:user.user.displayName,
            }
            await localStorage.setItem("learnzilydata",JSON.stringify(userdata))
            await localStorage.setItem("learnzilyToken",JSON.stringify({acesstoken:serverres.data.accessToken}))
            
            if(serverres.data.newuser){
               Navigate("/onboarding")
            }
            else{
               Navigate("/dashboard")
            }
        } catch (error) {
            Alert("error",error.code,"")
            throw new Error(error.code)
        }
    }


    

    return(
        <Datacontext.Provider value={{Handlesignup,Handlelogin,GoogleLoginandsignup}}>
            {children}
        </Datacontext.Provider>
    )
}

export const UseDataProvider=()=>useContext(Datacontext)