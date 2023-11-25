import React, { createContext,  useState } from 'react'
import Button from '../../Components/Button'
import ImageIcon from '../../Components/ImageIcon'
import { Link } from 'react-router-dom'
import AddLink from '../../Components/Link/AddLink'


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

  interface LinkContextProps {
    values: IFormInput;
    setValues: React.Dispatch<React.SetStateAction<IFormInput>>;
  }
  
  const LinkContext = createContext<LinkContextProps | undefined>(undefined);


export default function Dashboard() {
    const [profile, setProfile] = useState(false)
    const [preview, setPreview] = useState(false)
    const [addLink, setAddLink] = useState([{}])

    const [values, setValues] = useState<IFormInput>({ LinkUrl: 'e.g. https://www.github.com/johnappleseed', Platform: Platform.GitHub });

    const showPreview = () => {
        setPreview(true)
    }

    console.log("addLink",addLink);

   
   
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
            <Button onClick={()=>showPreview()} className={`${!preview?"!bg-[#fff] hover:!bg-[#EFEBFF] !border-[1px] !border-[#633CFF] !text-[#633CFF]":"!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] "} !w-[200px] flex justify-center items-center`}>Preview</Button>
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
                <h1 className='text-[#333] font-bold text-[32px]'>Customize your links</h1>
                <p className='text-[#737373] font-normal text-[16px] mt-5 mb-7'>Add/edit/remove links below and then share all your profiles with the world!</p>

                <Button onClick={()=>setAddLink((prevLinks) => [...prevLinks, values])} className={`${!preview?"!bg-[#fff] hover:!bg-[#EFEBFF] !border-[1px] !border-[#633CFF] !text-[#633CFF]":"!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] "} !w-full flex justify-center items-center shadow-none`}>+ Add new link</Button>

                <div className='p-5  h-96 overflow-y-auto '>
                   {addLink.length<2? <div className=' mx-auto bg-[#FAFAFA] w-full'>
                        <img src='/images/illustration-empty.svg' alt='' className='mx-auto' />
                        <h2 className='text-[32px] font-bold text-[#333] text-center mt-6 mb-8'>Let’s get you started</h2>
                        <p className='text-[16px] font-normal text-[#737373] text-center w-1/2 mx-auto'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                    </div>:
                addLink.map((item,index)=>index===0?null:<div className='bg-[#FAFAFA]'><AddLink index={index}/></div>)}
                </div>
                
                {/* </div>:<AddLink/>} */}

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