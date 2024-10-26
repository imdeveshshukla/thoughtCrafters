import { useState } from "react";

function useAuth(){
    const [login,isLogin] = useState(false);
    const [error,setError] = useState("");
    
}