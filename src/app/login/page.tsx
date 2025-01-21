'use client';
import { useState } from "react";
import { Button } from "@/components/Button";
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Spinner } from "@/components/Spinner";
import { authentication } from "../services/auth";

export default function Page() {
  const router = useRouter();
  const [authForm, setAuthForm] = useState({usuario:'', password:''});
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [messageError, setMessageError] = useState('');
  
  const handleClick = async () => {
    setLoading(true);
    setErrorLogin(false);
    const response = await authentication(authForm);
    console.log(response);
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', response.data.usuario);
      localStorage.setItem('rol', response.data.rol);
      setLoading(false);
      router.push('./administracion');
    } else {
      setAuthForm({usuario:'', password:''});
      setLoading(false);
      setErrorLogin(true);
      setMessageError(response.message);
    }
  };

  return (
    <>
    <div className="p-5 mt-12 ">
    <div className="flex justify-center items-center ">
      <Card className="sm:w-[50%] lg:w-[20%] rounded-md">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-center">
            Sistema de administración TEST
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-5">
          <div className='grid grid-rows-2 space-y-3'>
            <div>
          <Input
            name="usuario"
            type="text"
            placeholder="usuario"
            value={authForm.usuario}
            onChange={(e) => setAuthForm({... authForm, usuario : e.target.value})}
            required
          />
          </div>
          <div>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={authForm.password}
            onChange={(e) => setAuthForm({... authForm, password : e.target.value})}
            required
          />
          </div>
          </div>
        </CardContent>
        <CardContent className="flex justify-center items-center">
          <div className="grid grid-rows-2 w-full">
            { errorLogin ? (
              <div className=" text-center justify-center items-center flex bg-red-500 h-8 rounded-md text-white">{messageError}</div>
            )  : <div></div> }
            <div className='w-full justify-center flex'>
              <Button type='login' onClick={handleClick}/>
            </div> 
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
        { loading ?? ( <Spinner/> )}
    </>
  );
}
