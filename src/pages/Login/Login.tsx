
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputAdornment, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface IFormInput {
  Email: string
  Password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<IFormInput>()


  const navigate = useNavigate();


  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    reset()
    navigate("/dashboard");
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
          Password
          </InputLabel>
          <TextField 
          id="Password" 
          color={errors.Password?"warning":"secondary"}
          error={errors.Password?true:false}
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
                {errors.Password && <span className='text-[#FF3939]'>Please check again</span>}
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








