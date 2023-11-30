import { useContext } from 'react'
// import ImageIcon from '../ImageIcon'
import { Controller,  useForm } from 'react-hook-form'
import { LinkContext } from '../../pages/Dashboard/Dashboard'
import {  InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import ImageIcon from '../ImageIcon'
import { useUserData } from '../../contexts/UserData'


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
type FieldName = keyof IFormInput;

const AddLink: React.FC<{ index: number; item: {Platform: Platform, LinkUrl: string  }; id: unknown }> = ({ index, item, id }) => {
const {updateIndex, deleteUserData} = useUserData()

  console.log("item",item);
  // const { control, setValue, getValues } = useForm<IFormInput>()
  const { control } = useForm<IFormInput>()

  const linkContext = useContext(LinkContext);
  if (!linkContext) {
    return null; 
  }

  const { setValues } = linkContext;
  



  const handleFieldChange = (fieldName: FieldName, value: string | Platform, index: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    updateIndex(index)
  };



 
  
  return (
    <div className='p-5 my-4'>
        <div className='flex justify-between items-center'>
            <div className='text-[16px] font-bold text-[#737373]'>{`Link #${index}`}</div>
            <div  onClick={()=> deleteUserData(id,index-1)} className='text-[16px] font-normal text-[#737373] cursor-pointer'>Remove</div>
        </div>
        {/* <label>Platform</label> */}
        <InputLabel className='!text-[12px] !font-normal !text-[#333] !my-2' id="demo-simple-select-label">Platform</InputLabel>
        <Controller
          name="Platform"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={Platform.GitHub}
              value={item?.Platform}
              className='w-full border-[#D9D9D9] !border-[1px] !rounded-xl'
              onChange={(e) => handleFieldChange("Platform",e.target.value as Platform,index-1)}
            >
              {Object.values(Platform).map((platform) => (
                <MenuItem key={platform} value={platform}>
                  <div className='flex'>
                  <ImageIcon img={`${platform}`} className='mr-4'/>{platform}
                  </div>
                </MenuItem>
              ))}
          
            </Select>
          )}
        />

        <InputLabel className='!text-[12px] !font-normal !text-[#333] !my-2' id="link">Link</InputLabel>
        {/* <label>Link</label> */}
        <Controller
          name="LinkUrl"
          control={control}
          render={({ field }) => 
          <TextField 
          id='link'
          className='w-full !border-[#D9D9D9] !border-[1px] !rounded-xl' 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src='/images/icon-link.svg' alt='' className='w-6'/>
              </InputAdornment>
            ),
          }}
          {...field} 
          value={item?.LinkUrl}
          onChange={(e) => handleFieldChange("LinkUrl", e.target.value,index-1)}
          defaultValue="e.g. https://www.github.com/johnappleseed"
          />}
        />


    </div>
  )
}

export default AddLink
