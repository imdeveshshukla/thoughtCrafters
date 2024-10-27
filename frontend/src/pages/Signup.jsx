import axios from "axios";
import Auth from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Signup(){
    const [email,SetEmail] = useState("");
    const [pass,SetPass] = useState("");
    const nav = useNavigate();
    function signup(event){
        event.preventDefault();
        (async ()=>{
            try{
                const res = await axios.post("http://localhost:3000/",{
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
            }
            catch(e){
                console.log(e.message);
            }
        })();
    }
    return <>
        <Auth page={"sign up"} email={email} SetEmail={SetEmail} pass={pass} SetPass={SetPass} onClick={signup}/>
    </>
}