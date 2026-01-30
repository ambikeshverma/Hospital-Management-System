import {React, useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import styles from './LoginForm.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../Footer/Footer';
import { Loader } from '@mantine/core';


const LoginForm = () => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate();
      const handleLogin = async()=>{
        setLoading(true)
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`,{name,email,password})
            const token = res.data.token
            const user = res.data.user
            localStorage.setItem("token",token)
            localStorage.setItem("user", JSON.stringify(user))
            if(res.data.user.role === "admin"){
              navigate('/admin')
            }else if (res.data.user.role === "doctor"){
              navigate('/doctor-panel')
            }else{
              navigate('/')
            }
            toast.success(`Login Successfully`)
            setEmail("")
            setPassword("")
          }catch(err){
            toast.error(err.response?.data?.msg || "Something Went Wrong")
          }finally{
            setLoading(false)
          }
      }
  return (
    <>
    <div className={styles.loginPage}>
        <div className={styles.loginForm}>
            <div className={styles.formImage}>
              <img src="/Assets/hospital_bg.png" width="300px" alt="" />
           </div>
           <div className={styles.formContainer}>
                <div className={styles.thirdParty}>
                  <div className={styles.google}>
                    <img src="/Assets/Google icon.webp" width="20px" alt="" />
                    <span>Google</span>
                  </div>
                  <div className={styles.apple}>
                    <img src="/Assets/Apple Icon.png" width="20px" alt="" />
                    <span>Apple</span>
                  </div>
                </div>
                <div>Login Account</div>
               <TextField onChange={(e)=>{setEmail(e.target.value)}} value={email} label="Username" />
               <TextField onChange={(e)=>{setPassword(e.target.value)}} value={password} label="Password" type='password' />
               <Button onClick={handleLogin} variant="contained" sx={{mt:3}}>{loading?<Loader size={25} color='white'></Loader>:"Login"}</Button>
               <div className={styles.RegsiterLink} onClick={()=>navigate('/registration')}>Not have Account Register</div>
           </div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default LoginForm