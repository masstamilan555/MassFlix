import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,
    signup: async (credentials)=>{
        set({isSigningUp:true})
        try {
            
            const response = await axios.post('/api/v1/auth/signup',credentials);
            set({user:response.data.user,isSigningUp:false});
            toast.success("Hurrah! You have signed up successfully");
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message || 'Something went wrong, UserName or Email already exists');   
            set({isSigningUp:false})
            
        }

    },
    login: async (credentials)=>{ 
        set({isLoggingIn:true});
        try {
            const response = await axios.post('/api/v1/auth/login',credentials);
            set({user:response.data.user});
            toast.success("You have logged in successfully")
        } catch (error) {
            console.log(error);
            set({isLoggingIn:false,user:null});
            toast.error(error.response.data.message || "Login failed");
        }
    },
    logout: async ()=>{
        set({isLoggingOut:true});
        try {
            await axios.post('/api/v1/auth/logout');
            set({user:null,isLoggingOut:false});
            toast.success("You have logged out")
        } catch (error) {
            console.log(error);
            set({isLoggingOut:false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async ()=>{
        set({isCheckingAuth:true});
        try {
            const response = await axios.get('/api/v1/auth/authcheck');
            
            set({user:response.data.user,isCheckingAuth:false});
        } catch (error) {
            console.log(error);
            set({isCheckingAuth:false});
            set({user:null});
        }
    },
}))