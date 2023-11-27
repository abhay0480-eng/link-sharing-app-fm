import React, { createContext,  useEffect,  useState } from 'react'
import Button from '../../Components/Button'
import ImageIcon from '../../Components/ImageIcon'
import { Link } from 'react-router-dom'
import AddLink from '../../Components/Link/AddLink'
import {  InputLabel, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";


enum Platform {
    GitHub = "GitHub",
    FrontendMentor = "Frontend Mentor",
    Twitter = "Twitter",
    LinkedIn = "LinkedIn",
    YouTube = "YouTube",
    Facebook = "Facebook",
    Twitch = "Twitch",
    Devto = "Dev.to",
    Codewars = "Codewars",
    Codepen = "Codepen",
    freeCodeCamp = "freeCodeCamp",
    GitLab = "GitLab",
    Hashnode = "Hashnode",
    StackOverflow = "Stack Overflow",
  }
  
  interface IFormInput {
    LinkUrl: string
    Platform: Platform
    
   
  }

//   interface IUpload{
//     fileInput:File
//   }

  interface IProfileInput{
    FirstName : string
    LastName : string
    Email : string
    fileInput:File
  }

  interface LinkContextProps {
    values: IFormInput;
    setValues: React.Dispatch<React.SetStateAction<IFormInput>>;
  }
  
  const LinkContext = createContext<LinkContextProps | undefined>(undefined);


export default function Dashboard() {
    const navigate = useNavigate();
  const { control } = useForm<IProfileInput>()
  const [selectedFile, setSelectedFile] =  useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile(file);
      }
  };
    const [profile, setProfile] = useState(false)
    const [addLink, setAddLink] = useState([{}])

    const [values, setValues] = useState<IFormInput>({ LinkUrl: 'e.g. https://www.github.com/johnappleseed', Platform: Platform.GitHub });

    const showPreview = () => {
        navigate("/preview");

    }
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/')
      }
  
   
  return (
    <LinkContext.Provider value={{values,setValues}}>
    <div className='h-screen flex flex-col'>
        <div className='bg-[#FAFAFA] p-6 '>
        <div className='flex justify-between items-center  p-4 bg-white'>
        <div className=''>
            <Link to="/"><img src='/images/logo-devlinks-large.svg' alt='' className='mx-auto'/></Link>
        </div>
        <div className='flex justify-between items-center'>

            <Button onClick={()=>setProfile(false)} className={`${!profile?"!bg-[#EFEBFF] !text-[#633CFF] ":"!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "} !w-[150px] flex justify-center items-center mr-5 !text-[16px]`}><ImageIcon  className='!mr-3' img="icon-links-header"></ImageIcon>Links</Button>

            <Button onClick={()=>setProfile(true)} className={`${profile?"!bg-[#EFEBFF] !text-[#633CFF]":"!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "} !w-[200px] flex justify-center items-center !text-[16px]`}><ImageIcon className={`!mr-3 ${profile?"":" hover:!text-[#633CFF] !text-[#737373] "} `}  img="icon-profile-details-header"></ImageIcon>Profile Details</Button>

        </div>
        <div>
            <Button onClick={()=>showPreview()} className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center`}>Preview</Button>
            <Button onClick={()=>logout()} className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center`}>Logout</Button>
        </div>
        </div>
        </div>
        <div className='grid grid-cols-12 pb-6 pr-6 pl-6 h-full bg-[#FAFAFA] gap-x-3 '>
            <div className='col-span-4 flex flex-col  justify-center items-center bg-white'>
                <div>
                <img src='/images/illustration-phone-mockup.svg' alt='' className=''/>
                </div>
            </div>
            <div className='col-span-8   bg-white p-10 6 overflow-y-auto'>
                <h1 className='text-[#333] font-bold text-[32px]'>{`${!profile?"Customize your links":"Profile Details"}`}</h1>
                <p className='text-[#737373] font-normal text-[16px] mt-5 mb-7'>{`${!profile?"Add/edit/remove links below and then share all your profiles with the world!":"Add your details to create a personal touch to your profile."}`}</p>

               {!profile&& <Button onClick={()=>setAddLink((prevLinks) => [...prevLinks, values])} className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-full flex justify-center items-center shadow-none`}>+ Add new link</Button>}

                {!profile ? <div className='p-5  h-96 overflow-y-auto '>
                   {addLink.length<2? <div className=' mx-auto bg-[#FAFAFA] w-full'>
                        <img src='/images/illustration-empty.svg' alt='' className='mx-auto' />
                        <h2 className='text-[32px] font-bold text-[#333] text-center mt-6 mb-8'>Let’s get you started</h2>
                        <p className='text-[16px] font-normal text-[#737373] text-center w-1/2 mx-auto'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                    </div>:
                addLink.map((item,index)=>index===0?null:<div className='bg-[#FAFAFA]'><AddLink index={index}/></div>)}
                </div>:
                <div>
                    <div className='grid grid-cols-3 bg-[#FAFAFA] p-5'>
                        <div className='flex flex-col justify-center'>
                            <p className='text-[16px] font-normal text-[#737373]'>Profile picture</p>
                        </div>
                        <div className='bg-[#EFEBFF] flex flex-col h-52 justify-center items-center'>
                           { !selectedFile ?<div>
                            <img src='images/icon-upload-image.svg' alt='' className='w-7 mx-auto my-2' />
                            <div className='text-[16px] font-semibold text-[#633CFF]'></div>
                            <div>
                            <Controller
                            name="fileInput"
                            control={control}
                            render={() => (
                                <div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                {!selectedFile ?<label
                                    htmlFor="fileInput"
                                    className="w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl cursor-pointer"
                                >
                                    + Upload Image
                                </label>:<img src={URL.createObjectURL(selectedFile)} alt="" className='w-9 h-9' />}
                                </div>
                            )}
                            />
                            </div>
                            
                            </div>:<img src={URL.createObjectURL(selectedFile)} alt="" className='w-full h-full object-contain' />}
                        </div>
                        <div className='flex flex-col justify-center items-end'>
                            <p className='text-[16px] font-normal text-right text-[#737373]'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                        </div>
                    </div>

                    <div className='bg-[#FAFAFA] p-5 mt-5'>
                        <div className='flex justify-between items-center'>
                        <InputLabel className='!text-[16px] !font-normal !text-[#737373] !my-1' id="FirstName">First name*</InputLabel>
       
                        <Controller
                        name="FirstName"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                        id='FirstName'
                        className='w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl' 
                        
                        {...field} 
                        // onChange={(e) => handleFieldChange("LinkUrl", e.target.value)}
                        defaultValue="e.g. https://www.github.com/johnappleseed"
                        />}
                        />
                        </div>
                    
                    <div className='flex justify-between items-center'>
                    <InputLabel className='!text-[16px] !font-normal !text-[#737373] !my-1' id="LastName">Last name*</InputLabel>
                    {/* <label>Link</label> */}
                    <Controller
                    name="LastName"
                    control={control}
                    render={({ field }) => 
                    <TextField 
                    id='LastName'
                    className='w-1/2 !my-4 !border-[#D9D9D9] !border-[1px] !rounded-xl' 
                   
                    {...field} 
                    // onChange={(e) => handleFieldChange("LinkUrl", e.target.value)}
                    defaultValue="e.g. https://www.github.com/johnappleseed"
                    />}
                    />
                    </div>
                    <div className='flex justify-between items-center'>
                    <InputLabel className='!text-[16px] !font-normal !text-[#737373] !my-1' id="Email">Email</InputLabel>
       
                        <Controller
                        name="Email"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                        id='Email'
                        className='w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl' 
                        
                        {...field} 
                        // onChange={(e) => handleFieldChange("LinkUrl", e.target.value)}
                        defaultValue="e.g. https://www.github.com/johnappleseed"
                        />}
                        />
                        </div>
                    </div>
                    <div></div>
                </div>
                }

                

                <div className='border-t-[1px] border-[#D9D9D9] w-full flex justify-end items-center mt-7'>
                <Button onClick={()=>setProfile(false)} className={`${!profile?"!bg-[#633cffa3] !text-[#fff] ":"!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "} !w-[150px] flex justify-center items-center mr-5 !text-[16px] mt-5`}>Save</Button>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
    </LinkContext.Provider>
  )
            
}

export {LinkContext}