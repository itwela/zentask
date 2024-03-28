'use client'

import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense, useState } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import ZenAddSection from "../dashComponents/addSection_C";
import { ProjectProps, ZenSection, ZenTask } from "@/types/uData";
import ZenLine from "../dashComponents/line_C";
import { RxCircle } from "react-icons/rx";
import { TaskProps } from "@/types/uData";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { PiPencil } from "react-icons/pi";
import Popover from "@mui/material/Popover";
import React from "react";
import { deleteSectionData, deleteTaskData, updateSectionData, updateSectionTaskData, updateTaskData } from "@/actions/database";
import Link from "next/link";
import ZenAddThought from "../dashComponents/addThought_C";
import ZenAddQuote from "../dashComponents/addQuote_C";
import { IoIosArrowForward } from "react-icons/io";

// client Component

interface FormData {
  sectiondata: ZenSection
}



export default function Home({taskdata, projectdata, sectiondata}: {taskdata: any, projectdata: any, sectiondata: any}) {
 
  // Hndle date
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSecForm(false)
    setTimeout(() => {
      setAnchorEl(null);
    }, 10)

  };

  const [taskEdit, settaskEdit] = React.useState(false);
  const handletaskOpen = () => settaskEdit(true);
  const handleTaskExit = () => settaskEdit(false);
  // 
  const [formData, setFormData] = useState<FormData>({
    sectiondata: {
        id: '',
        name: '',
        userId: '',
        createdAt: '',
        updeatedAt: '',
      }       
  });
  // 
  const handleSectionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        sectiondata: {
            ...prevState.sectiondata,
            [name]: value
            }
        }));
  };
  // 
  const [sectionEdit, setsectionEdit] = React.useState(false);
  
  // edit button ---------
  const handlesectionOpen = () => {
    setsectionEdit(true);
  } 

  const handlesectionExit = () => {
    setsectionEdit(false);
  } 
// end edit button --------

  // 
  const [secForm, setSecForm] = React.useState(false);
  const [editingSectionId, setEditingSectionId] = React.useState<string | null>(null);
  // 
  const handleSecFormOpen = (sectionId: string) => {
    setAnchorEl(null)
    setEditingSectionId(sectionId);
    setSecForm(true);
  } 
  // 
  const handleSecFormExit = () => {
    setTimeout(() => {      
      setAnchorEl(null)
      setEditingSectionId(null);
      setSecForm(false);
    }, 10)
  }
  
  return (
    <>
          <div className="w-full flex flex-col text-black p-7 py-[6em] h-screen justify-start">
              
            {/* header and add task */}
            <div className="flex flex-col gap-3">
                
                {/* header */}
                <h2 className="font-bold text-4xl">Home</h2>
            
            </div>

            {/* Render All tasks */}
            <span className="w-full mt-3 justify-between place-items-center flex">
              <span className="font-bold">Tasks</span>
              <span onClick={() => settaskEdit(!taskEdit)} className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</span>
            </span>
            <div className="mb-3 w-full h-max">
              {taskdata?.map((task : ZenTask, index : number) => (
                <div key={index} className="flex flex-col">
                  {/* Render individual task details here */}
                  <div  className="flex cursor-pointer gap-2 place-items-center justify-between p-2">
                    
                    <Link href={`/edit/task/${task.id}`}>
                      <span className="flex py-2 gap-2 place-items-start">
                          <RxCircle />
                        <span className="flex flex-col gap-2 place-items-start">
                          <h3 className="">{task.name}</h3>
                          <h3 className="text-slate-400">{task.description}</h3>
                        </span>
                      </span>
                    </Link>

                    { taskEdit === true && (

                    <span className="flex gap-2 place-items-center">
                      <Link className="" href={`/edit/task/${task.id}`}>
                        <PiPencil className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                      </Link>
                        <span
                            id="duedate"
                            className='outline-none rounded-full w-max cursor-pointer'>
                            <span className="" onClick={handleClick}>
                              <BsThreeDots className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                            </span>
                            <Popover
                                open={open}
                                onClose={handleClose}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <span className="flex flex-col place-items-center">
                                    <span className="w-[150px] flex flex-col p-3">
                                      <Link className="p-2 w-full hover:bg-slate-100 cursor-pointer" href={`/edit/task/${task.id}`}>
                                        <span className="">Update</span>
                                      </Link>
                                      <form action={deleteTaskData}>
                                        <input type="hidden" name="taskId" value={task.id} />
                                        <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={() => handleClose()}>Delete</button>
                                      </form>
                                    </span>
                                </span>
                            </Popover>
                        </span>

                    </span>

                    )}

                  </div>

                  <ZenLine />

                </div>
              ))}
            </div>

            {/* add task */}
            <span className="">
              <ZenAddTask projectdata={projectdata} today={false} tommorrow={false} />
            </span>


            {/* add section */}
            <div className="relative w-full h-max my-3 flex flex-col place-items-center">
            <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
                <ZenAddSection projectdata={projectdata} />
            <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
            </div>

            <span className="w-full justify-between place-items-center flex">
                  <span className="font-bold">Sections</span>
            </span>

            
            {sectiondata?.map((section: ZenSection, index: number) => (
              <React.Fragment key={index}>
                {editingSectionId !== section.id && (
                  <>
                  {/* // Display section details without form */}
                  <div className="flex flex-col justify-between w-full h-max">
                    <div className="flex gap-3">
                      {/* Render individual section details here */}
                      <div
                        className="flex w-full py-3 cursor-pointer gap-2 place-items-center justify-between"
                      >
                        <span className="flex place-items-center w-full gap-2">
                          <IoIosArrowForward className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                          <span onClick={() => handleSecFormOpen(section.id)} className="flex flex-col gap-2 place-items-start w-full">
                            <h3 className="font-bold">{section.name}</h3>
                          </span>
                        </span>
                      </div>
                      {/* Section edit options */}
                      {sectionEdit && (
                        <span className="flex gap-2 place-items-center">
                          <PiPencil
                            onClick={() => handleSecFormOpen(section.id)}
                            className="hover:bg-slate-100 p-2 rounded-lg"
                            size={25}
                          />

                          <span className="" onClick={handleClick}>
                            <BsThreeDots className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                          </span>
                          <Popover
                            open={open}
                            onClose={handleClose}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <span className="flex flex-col place-items-center">
                              <span className="w-[150px] flex flex-col p-3">
                                <span className="p-2 w-full flex place-items-start cursor-pointer hover:bg-slate-100" onClick={() => handleSecFormOpen(section.id)}>Update</span>
                                <form action={deleteSectionData}>
                                  <input type="hidden" name="sectionId" value={section.id} />
                                  <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={() => handleClose()}>Delete</button>
                                </form>
                              </span>
                            </span>
                          </Popover>


                        </span>
                      )}
                    </div>
                    <ZenLine />
                  </div>

                  <span className=" mx-5 my-2">
                  <ZenAddTask projectdata={projectdata} today={false} tommorrow={false} />
                  </span>
                  </>
                )}
                {/* Render section form */}
                {editingSectionId === section.id && (
                  <div className="flex flex-col justify-between w-full h-max">
                    <div className="flex gap-3">
                      {/* Render form for section here */}
                      <div className="flex w-full py-3 gap-2 place-items-center justify-between">
                        
                        <form action={updateSectionData} className="flex place-items-center w-full">
                          <span className="flex flex-col gap-2 place-items-start w-full">
                            <input type="hidden" name="sectionId" value={section.id} />
                            <input 
                              type="text" 
                              name="name"
                              id="name"
                              placeholder="Section Name"
                              required 
                              defaultValue={section.name as string} 
                              onChange={handleSectionInputChange}
                              className="font-bold w-full py-2 px-1" />
                            <span className="flex gap-4">
                              <span className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg" onClick={handleSecFormExit}>
                                Cancel
                              </span>
                              <button type="submit" className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleSecFormExit}>
                                Update
                              </button>
                            </span>
                          </span>
                        </form>

                      </div>
                    </div>
                    <ZenLine />
                  </div>
                )}

              </React.Fragment>
            ))}



            {/* thoughts and quotes */}
            <div className="flex flex-col gap-6 my-5">
              <div className="flex w-full">
                  <div className="flex flex-col w-full gap-2">
                    <h2 className="font-bold">Thoughts</h2>
                    <h3 className="py-3">Some thoughts....</h3>
                    <ZenLine />
                    <ZenAddThought />
                  </div>
              </div>
              <div className="flex w-full">
                  <div className="flex flex-col w-full gap-2">
                    <h2 className="font-bold">Quotes</h2>
                    <h3 className="py-3">Some quotes....</h3>
                    <ZenLine />
                    <ZenAddQuote />
                  </div>
              </div>
            </div>

            <ZenBottomBadge />
          </div>
    </> 
  );
};

