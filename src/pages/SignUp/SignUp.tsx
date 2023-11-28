
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputAdornment, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/User'; 
import { useState } from 'react';
interface IFormInput {
  Email: string
  Password: string
}

function SignUp() {
  const navigate = useNavigate();
  const {addUser,users} = useUser()
  const [error, setError] = useState("")

  console.log("users",users);
  

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    if (!data) return

   const isEmailMatch = users.map(item => item.data.Email === data.Email).includes(true);

   console.log("isEmailMatch",isEmailMatch);

   if(isEmailMatch){
    return setError("Already Register")
   }

    addUser({ data, isLogin:false })
    reset()
    navigate('/')
  }

  return (
   <div className='flex flex-col h-screen  justify-center bg-[#FAFAFA]'>
    <div>
      <div className=''>
        <img src='/images/logo-devlinks-large.svg' alt='' className='mx-auto'/>
      </div>
      <div className='bg-[#FFFFFF] w-1/3 mx-auto p-12 mt-8'>
        <h1 className='text-[32px] font-bold text-[#333]'>Sign Up</h1>
        <p className='text-[16px] font-normal mt-3 mb-14 text-[#737373]'>Let’s get you started sharing your links!</p>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          {/* <input defaultValue="test" {...register("Email")} /> */}
          <div>
          <InputLabel htmlFor="email">
          Email address
          </InputLabel>
          <TextField 
            id="Email" 
            color={errors.Email?"warning":"secondary"}
            error={errors.Email?true:false}
            variant="outlined" 
            placeholder='e.g. alex@email.com'
            className='w-full '  
            {...register("Email",  { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src='/images/icon-email.svg' alt='' className='w-6'/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {errors.Email && <span className='text-[#FF3939]'>Can’t be empty</span>}
                </InputAdornment>
              ),
            }}
          />
          </div>

          
          <div className='my-7'>
          <InputLabel htmlFor="Password">
          Create password
          </InputLabel>
          <TextField 
          id="Password" 
          color={errors.Password?"warning":"secondary"}
          error={errors.Password?true:false}
          variant="outlined" 
          placeholder='At least 8 characters'
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
                {errors.Password && <span className='text-[#FF3939]'>Please check again</span>}
              </InputAdornment>
            ),
          }}
          
          />
          
          </div>
         

          {/* <div className='my-7'>
          <InputLabel htmlFor="Password">
          Confirm password
          </InputLabel>
          <TextField 
          id="Password" 
          color={errors.Password?"warning":"secondary"}
          error={errors.Password?true:false}
          variant="outlined" 
          placeholder='At least 8 characters'
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
                {errors.Password && <span className='text-[#FF3939]'>Please check again</span>}
              </InputAdornment>
            ),
          }}
          
          />
          
          </div> */}

          <p className='text-[12px] text-[#737373] my-5'>Password must contain at least 8 characters</p>
         
          <Button>Create new account</Button>
        </form>
        {error&&<p className='text-[16px] text-[#a14040] text-center my-3'>{error}</p>}
        <p className='text-[16px] text-[#737373] text-center mt-7'>Already have an account?<Link className='cursor-pointer text-[#633CFF]' to='/'> Login </Link> </p>
      </div>
    </div>
   </div>
  )
}

export default SignUp









