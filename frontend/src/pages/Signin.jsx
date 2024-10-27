import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [email,SetEmail] = useState("");
    const [pass,SetPass] = useState("");
    const nav = useNavigate()
    function signin(event){
        event.preventDefault();
        // console.log(email+" "+pass)
        (async ()=>{
            try{
                const res = await axios.post("http://localhost:3000/signin",{
                    email,
                    password:pass
                });
                if(res?.data?.token)
                {
                    localStorage.setItem("token",res.data.token);
                    nav('/');
                }
                else{
                    console.log("No Token Found");
                }
            }catch(e){
                console.log(e.message);
            }
        })();
    }
    
    return <>
        <NavBar/>
        <Auth page="Signin" email={email} SetEmail={SetEmail} pass={pass} SetPass={SetPass} onClick={signin}/>
    </>
}