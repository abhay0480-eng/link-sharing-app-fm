import React from 'react'
import ImageIcon from '../../Components/ImageIcon'
import { useNavigate } from "react-router-dom";

const Preview = () => {
    const navigate = useNavigate();

    function editor(){
        navigate('/dashboard')
    }
  return (
    <div className=' relative h-screen'>
        <div className='bg-[#633CFF]  h-96 rounded-br-3xl rounded-bl-3xl pt-6 px-6'>
            <div className='flex justify-between  py-4 px-6  bg-white rounded-xl' >
                <button onClick={()=>editor()} className='py-3 px-7 border-[1px] border-[#633CFF] text-[#633CFF] rounded-lg' >Back to Editor</button>
                <button className='py-3 px-7 border-[1px] bg-[#633CFF] border-[#633CFF] text-[#FFFFFF] rounded-lg' >Share Link</button>
            </div>

        </div>
        <div className='bg-white py-12 px-14 w-96 shadow-2xl rounded-3xl  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='mb-14 text-center'>
                <img src='/images/profile.jpeg' alt='' className='rounded-full w-28 mx-auto' />
                <h1>Ben Wright</h1>
                <p>ben@example.com</p>
            </div>
            <div>
                <div className='bg-[#1A1A1A] rounded-lg p-4 flex justify-between'>
                    <div className='flex '>
                        <ImageIcon img="icon-github" />
                        <p className='ml-2 text-white'>GitHub</p>
                    </div>
                        <ImageIcon img="icon-arrow-right" />
                </div>
            </div>

        </div>
    </div>
  )
}

export default Preview