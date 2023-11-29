import React, { createContext, useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import ImageIcon from "../../Components/ImageIcon";
import { Link, useParams } from "react-router-dom";
import AddLink from "../../Components/Link/AddLink";
import { InputLabel, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserData";
// import { useUser } from "../../contexts/User";
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
  LinkUrl: string;
  Platform: Platform;
}


interface IProfileInput {
  FirstName: string;
  LastName: string;
  Email: string;
  fileInput: File;
}

interface LinkContextProps {
  values: IFormInput;
  setValues: React.Dispatch<React.SetStateAction<IFormInput>>;
}

const LinkContext = createContext<LinkContextProps | undefined>(undefined);

export default function Dashboard() {
    const {id} = useParams()
    const {addUserData,usersData,updateUserData,indx} = useUserData()
    const user = usersData.filter((item)=>item.id===id)
    const isFirstRender = useRef(true);

    

//   const {users} = useUser()
//   console.log("users",users);
  

  const navigate = useNavigate();
  const { control } = useForm<IProfileInput>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const [profile, setProfile] = useState(false);

  const [values, setValues] = useState<IFormInput>({
    LinkUrl: "e.g. https://www.github.com/johnappleseed",
    Platform: Platform.GitHub,
  });

  const showPreview = () => {
    // navigate("/preview");
    navigate(`/preview/${id}`);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


//   console.log("values",values);

 
  const [profileDetails, setProfileDetails] = useState({
    image:File,
    firstName:"",
    lastName:"",
    email:"",
  })

//   console.log("profileDetails",profileDetails);
  
  
console.log(!user[0]?.links?.length );
const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;
  const addLinks = () => {
    const userIdToAddLinkTo = id
    console.log("values",values);
    !user[0]?.links?.length? addUserData(userIdToAddLinkTo,values ): user[0]?.links?.length<5 ? addUserData(userIdToAddLinkTo,values): ""
  }
 

  const addProfileDetails = () => {
    const userIdToAddLinkTo = id
    addUserData(userIdToAddLinkTo,undefined,profileDetails.firstName,profileDetails.lastName,profileDetails.email,fileUrl);
  }


 

  useEffect(()=>{
    

    if (!isFirstRender.current) {
        // Run your effect only when 'values' changes after the first render
        // addUserData(values, id, index);
        updateUserData(id, indx, values);
      } else {
        // Update the ref to indicate that it's not the first render anymore
        isFirstRender.current = false;
      }
  },[values])

  console.log("user",user);
  
  return (
    <LinkContext.Provider value={{ values, setValues }}>
      <div className="h-screen flex flex-col">
        <div className="bg-[#FAFAFA] p-6 ">
          <div className="flex justify-between items-center  p-4 bg-white">
            <div className="">
              <Link to="/">
                <img
                  src="/images/logo-devlinks-large.svg"
                  alt=""
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setProfile(false)}
                className={`${
                  !profile
                    ? "!bg-[#EFEBFF] !text-[#633CFF] "
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } !w-[150px] flex justify-center items-center mr-5 !text-[16px]`}
              >
                <ImageIcon
                  className="!mr-3"
                  img="icon-links-header"
                ></ImageIcon>
                Links
              </Button>

              <Button
                onClick={() => setProfile(true)}
                className={`${
                  profile
                    ? "!bg-[#EFEBFF] !text-[#633CFF]"
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } !w-[200px] flex justify-center items-center !text-[16px]`}
              >
                <ImageIcon
                  className={`!mr-3 ${
                    profile ? "" : " hover:!text-[#633CFF] !text-[#737373] "
                  } `}
                  img="icon-profile-details-header"
                ></ImageIcon>
                Profile Details
              </Button>
            </div>
            <div className="flex justify-around">
              <Button
                onClick={() => showPreview()}
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center mx-3`}
              >
                Preview
              </Button>
              <Button
                onClick={() => logout()}
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-[200px] flex justify-center items-center`}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 pb-6 pr-6 pl-6 h-full bg-[#FAFAFA] gap-x-3 ">
          <div className="col-span-4 flex flex-col  justify-center items-center bg-white">
            <div>
                <div className="relative">
                    <img
                        src="/images/illustration-phone-mockup.svg"
                        alt=""
                        className=""
                    />
                     <div className=" absolute  top-[11%] mx-auto rounded-full bg-white w-24 h-24  left-1/2 transform -translate-x-1/2 ">
                        <img src={user[0]?.profileImage} alt="profile" className="object-cover  w-full h-full rounded-full" />
                      </div>
                    <div className="absolute  w-[235px] bg-white text-center top-[28%]   left-1/2 transform -translate-x-1/2">
                     
                        <p className="text-[18px] font-semibold text-[#333]">{user[0]?.firstName} {user[0]?.lastName}</p>
                        <p className="text-[14px] font-normal text-[#737373]">{user[0]?.email}</p>
                    </div>
                    <div className="absolute w-[235px] top-[44%] left-1/2 transform -translate-x-1/2  ">
                        {
                        user[0]?.links.map((item, index) =>{
                           return  <Button key={index} className={`mb-2 px-3 
                           ${item?.Platform === "GitHub" && "!bg-[#1A1A1A]"} 
                           ${item?.Platform==="Frontend Mentor" && "!bg-[#FFF] !text-black"} 
                           ${item?.Platform==="Twitter" && "!bg-[#43B7E9]"} 
                           ${item?.Platform==="LinkedIn" && "!bg-[#2D68FF]"} 
                           ${item?.Platform==="YouTube" && "!bg-[#EE3939]"} 
                           ${item?.Platform==="Facebook" && "!bg-[#2442AC]"}  
                           ${item?.Platform==="Twitch" && "!bg-[#EE3FC8]"}  
                           ${item?.Platform==="Dev.to" && "!bg-[#333]"}  
                           ${item?.Platform==="Codewars" && "!bg-[#8A1A50]"}  
                           ${item?.Platform==="freeCodeCamp" && "!bg-[#302267]"}  
                           ${item?.Platform==="GitLab" && "!bg-[#EB4925]"}  
                           ${item?.Platform==="Codepen" && "!bg-[#0333]"}  
                           ${item?.Platform==="Hashnode" && "!bg-[#0330D1]"}  
                           ${item?.Platform==="Stack Overflow" && "!bg-[#EC7100]"}  
                           flex items-center `}><img src={`/images/${item?.Platform}.svg `} alt="" style={{stroke: '#fff',filter: 'brightness(0) invert(1)'}} className="w-5 h-5 mx-3 "/>{item?.Platform}<img src={`/images/icon-arrow-right.svg `} alt="" style={{stroke: '#fff',filter: 'brightness(0) invert(1)'}} className="w-5 h-5 ml-auto"/></Button>
                        })}
                    </div>
                </div>
            </div>
          </div>
          <div className="col-span-8   bg-white p-10 6 overflow-y-auto">
            <h1 className="text-[#333] font-bold text-[32px]">{`${
              !profile ? "Customize your links" : "Profile Details"
            }`}</h1>
            <p className="text-[#737373] font-normal text-[16px] mt-5 mb-7">{`${
              !profile
                ? "Add/edit/remove links below and then share all your profiles with the world!"
                : "Add your details to create a personal touch to your profile."
            }`}</p>

            {!profile && (
              <Button
                onClick={() =>
                     addLinks()
                }
                className={`!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] !text-[16px] !w-full flex justify-center items-center shadow-none`}
              >
                + Add new link
              </Button>
            )}

            {!profile ? (
              <div className="p-5  h-96 overflow-y-auto ">
                {user[0]?.links.length < 0 ? (
                  <div className=" mx-auto bg-[#FAFAFA] w-full">
                    <img
                      src="/images/illustration-empty.svg"
                      alt=""
                      className="mx-auto"
                    />
                    <h2 className="text-[32px] font-bold text-[#333] text-center mt-6 mb-8">
                      Let’s get you started
                    </h2>
                    <p className="text-[16px] font-normal text-[#737373] text-center w-1/2 mx-auto">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                ) : (
                    user[0]?.links.map((item, index) =>
                     (
                      <div key={index} className="bg-[#FAFAFA]">
                        <AddLink item={item} index={index+1} id={id} />
                      </div>
                    )
                  )
                )}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 bg-[#FAFAFA] p-5">
                  <div className="flex flex-col justify-center">
                    <p className="text-[16px] font-normal text-[#737373]">
                      Profile picture
                    </p>
                  </div>
                  <div className="bg-[#EFEBFF] flex flex-col h-52 justify-center items-center">
                    {!selectedFile ? (
                      <div>
                        <img
                          src="images/icon-upload-image.svg"
                          alt=""
                          className="w-7 mx-auto my-2"
                        />
                        <div className="text-[16px] font-semibold text-[#633CFF]"></div>
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
                                  style={{ display: "none" }}
                                />
                                {!selectedFile ? (
                                  <label
                                    htmlFor="fileInput"
                                    className="w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl cursor-pointer"
                                  >
                                    + Upload Image
                                  </label>
                                ) : (
                                  <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt=""
                                    className="w-9 h-9"
                                  />
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <p className="text-[16px] font-normal text-right text-[#737373]">
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-5 mt-5">
                  <div className="flex justify-between items-center">
                    <InputLabel
                      className="!text-[16px] !font-normal !text-[#737373] !my-1"
                      id="FirstName"
                    >
                      First name*
                    </InputLabel>

                    <Controller
                      name="FirstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="FirstName"
                          className="w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl"
                          {...field}
                          onChange={(e) => setProfileDetails({...profileDetails,firstName:e.target.value})}
                          defaultValue="e.g. John"
                        />
                      )}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <InputLabel
                      className="!text-[16px] !font-normal !text-[#737373] !my-1"
                      id="LastName"
                    >
                      Last name*
                    </InputLabel>
                    {/* <label>Link</label> */}
                    <Controller
                      name="LastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="LastName"
                          className="w-1/2 !my-4 !border-[#D9D9D9] !border-[1px] !rounded-xl"
                          {...field}
                          onChange={(e) => setProfileDetails({...profileDetails,lastName:e.target.value})}
                          defaultValue="e.g. Appleseed"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <InputLabel
                      className="!text-[16px] !font-normal !text-[#737373] !my-1"
                      id="Email"
                    >
                      Email
                    </InputLabel>

                    <Controller
                      name="Email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="Email"
                          className="w-1/2 !border-[#D9D9D9] !border-[1px] !rounded-xl"
                          {...field}
                          
                          onChange={(e) => setProfileDetails({...profileDetails,email:e.target.value})}
                          defaultValue="e.g. email@example.com"
                        />
                      )}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            )}

            <div className="border-t-[1px] border-[#D9D9D9] w-full flex justify-end items-center mt-7">
              <Button
                onClick={() => addProfileDetails()}
                className={`${
                  !profile
                    ? "!bg-[#633cffa3] !text-[#fff] "
                    : "!bg-[#fff] hover:!text-[#633CFF] !text-[#737373] "
                } !w-[150px] flex justify-center items-center mr-5 !text-[16px] mt-5`}
              >
                Save
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </LinkContext.Provider>
  );
            }
// }

export { LinkContext };
