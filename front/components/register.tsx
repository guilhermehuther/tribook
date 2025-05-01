"use client"

import { useState } from "react"
import { setCookie } from 'cookies-next/client';

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { FetchProxy } from "../proxies/fetch";

type Register = {
    name: string
    password: string
}

export default function Register() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [response, setResponse] = useState("");

    function clearState() {
        setName("");
        setPass("");
        setResponse("");
    }

    async function handleLogin() {
        try {
            const res = await FetchProxy.request(
                "users/login", 
                "POST", 
                {
                    name,
                    password: pass,
                }
            );

            setCookie("session", res);
            window.location.reload();
        } catch (err) {
            clearState();
            setResponse("Erro ao realizar o login.");
        }
    }

    async function handleRegister() {
        try {
            await FetchProxy.request(
                "users", 
                "POST", 
                {
                    name,
                    password: pass,
                }
            );

            setResponse("Registrado com sucesso. Agora efetue o login.");
        } catch {
            setResponse("Erro ao registrar.");
        }
    }
    
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-6 p-6">
            <Input className="mb-2" onChangeCapture={(e) => setName(e.currentTarget.value)} placeholder="Name"></Input>
            <Input className="mb-2" type="password" onChangeCapture={(e) => setPass(e.currentTarget.value)} placeholder="Password"></Input>
            
            <p className="text-black-100 text-sm">
                {response}
            </p>
            
            <div className="mt-2 flex justify-between">
                <Button onClick={handleLogin}>Login</Button>
                <Button variant="outline" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    )
}
  