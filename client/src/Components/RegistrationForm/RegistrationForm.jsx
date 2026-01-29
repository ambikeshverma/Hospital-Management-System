import React, { useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { Loader } from '@mantine/core';

const RegistrationForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleRegistration = async()=>{
    setLoading(true)
    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/registration`,{name,email,password})
        toast.success(`Welcome ${res.data.name}`)
        setName("")
        setEmail("")
        setPassword("")
        navigate('/login')
      }catch(err){
        toast.error(err.response?.data?.msg || "Something Went Wrong")
      }finally{
        setLoading(false)
      }
  }
  return (
       <div className={styles.loginPage}>
        <div className={styles.loginForm}>
            <div className={styles.formImage}>
              <img src="/Assets/hospital_bg.png" width="300px" alt="" />
           </div>
           <div className={styles.formContainer}>
                <div>Create Account</div>
               <TextField onChange={(e)=>setName(e.target.value)} value={name} label="Name" variant="standard"/>
               <TextField onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" variant="standard"/>
               <TextField onChange={(e)=>setPassword(e.target.value)} value={password} label="Password" type='password' variant="standard" />
               <Button onClick={handleRegistration} variant="contained" sx={{mt:3}}>{loading?<Loader size={25} color='white'></Loader>:"Register"}</Button>
               <div className={styles.RegsiterLink} onClick={()=>navigate('/login')}>Already have Account Login</div>
           </div>
        </div>
    </div> 
  )
}

export default RegistrationForm