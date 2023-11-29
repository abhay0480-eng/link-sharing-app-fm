import { SubmitHandler, useForm } from 'react-hook-form'
import { InputAdornment, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/User'; 
import {  useState } from 'react';

interface IFormInput {
  Email: string
  Password: string
}



function Login() {
  const navigate = useNavigate();
  const {users,updateUser} = useUser()
  
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<IFormInput>()

  const [error,setError] = useState({
    email:"",
    password:""
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    users.map((item) => {
      if(item.data.Email === data.Email && item.data.Password === data.Password){
        updateUser({  ...item,isLogin:true },item.id)
        localStorage.setItem("token", JSON.stringify(item.id))
        navigate(`/dashboard/${item.id}`);
      }
      else if(  item.data.Email !== data.Email && item.data.Password !== data.Password){
        return setError({email:"email is invalid", password:"password is invalid"})
      }else if(item.data.Password !== data.Password){
        return setError({...error, password:"password is invalid"})
      }else if(item.data.Email !== data.Email){
        return setError({...error, email:"email is invalid"})
      }else{
        navigate('/')
      }
    })
     reset()
  }

  
  return (
   <div className='flex flex-col h-screen  justify-center bg-[#FAFAFA]'>
    <div>
      <div className=''>
        <img src='/images/logo-devlinks-large.svg' alt='' className='mx-auto'/>
      </div>
      <div className='bg-[#FFFFFF] w-1/3 mx-auto p-12 mt-8'>
        <h1 className='text-[32px] font-bold text-[#333]'>Login</h1>
        <p className='text-[16px] font-normal mt-3 mb-14 text-[#737373]'>Add your details below to get back into the app</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
          <InputLabel htmlFor="email">
          Email address
          </InputLabel>
          <TextField 
            id="Email" 
            color={error.email?"warning":"secondary"}
            error={error.email?true:false}
            variant="outlined" 
            placeholder='e.g. alex@email.com'
            className='w-full '  
            {...register("Email",  { 
              required: true ,
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src='/images/icon-email.svg' alt='' className='w-6'/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {error.email && <span className='text-[#FF3939]'>{error.email}</span>}
                </InputAdornment>
              ),
            }}
          />
          </div>
          <div className='my-7'>
          <InputLabel htmlFor="Password">
          Password
          </InputLabel>
          <TextField 
          id="Password" 
          color={error.password?"warning":"secondary"}
          error={error.password?true:false}
          variant="outlined" 
          placeholder='Enter your password'
          className='w-full border-[#]'  
          {...register("Password", { required: true })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src='/images/icon-password.svg' alt='' className='w-6'/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {error.password && <span className='text-[#FF3939]'>{error.password}</span>}
              </InputAdornment>
            ),
          }}
          />
          </div>
         
          <Button>Login</Button>
        </form>
        <p className='text-[16px] text-[#737373] text-center mt-7'>Don’t have an account?<Link className='cursor-pointer text-[#633CFF]' to='/signup'> Create account</Link> </p>
      </div>
    </div>
   </div>
  )
}

export default Login









