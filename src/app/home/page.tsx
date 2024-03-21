'use client'

import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
import ZenAddTask from "../dashComponents/addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import ZenAddSection from "../dashComponents/addSection_C";
import { ProjectProps, ZenTask } from "@/types/uData";
import ZenLine from "../dashComponents/line_C";
import { RxCircle } from "react-icons/rx";
import { TaskProps } from "@/types/uData";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { PiPencil } from "react-icons/pi";
import Popover from "@mui/material/Popover";
import React from "react";
import { deleteTaskData } from "@/actions/database";
import Link from "next/link";
// client Component



export default function Home({taskdata, projectdata}: {taskdata: any, projectdata: any}) {
 
  // Hndle date
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 161)
  };

  const [taskHover, setTaskHover] = React.useState(false);
  const handleTaskHover = () => setTaskHover(true);
  const handleTaskExit = () => setTaskHover(false);

  // Handle section
  const [sectionHover, setSectionHover] = React.useState(false);
  const handleSectionHover = () => setSectionHover(true);
  const handleSectionExit = () => setSectionHover(false);
  


  return (
    <>
          <div className="w-full flex flex-col text-black p-7 py-[6em] h-screen justify-start">
              
              {/* header and add task */}
              <div className="flex flex-col gap-3">
                  
                  {/* header */}
                  <h2 className="font-bold text-4xl">Home</h2>
              
              </div>

            {/* Render tasks */}
            <span className="w-full place-content-end place-items-center flex">
              <span onClick={() => setTaskHover(!taskHover)} className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</span>
            </span>
            <div className="my-3 w-full h-max">
              {taskdata?.map((task : ZenTask, index : number) => (
                <div key={index} className="flex flex-col gap-3">
                  {/* Render individual task details here */}
                  <div  className="flex cursor-pointer gap-2 place-items-center justify-between p-2">
                    
                    <Link href={`/edit/task/${task.id}`}>
                      <span className="flex  gap-2 place-items-start">
                          <RxCircle />
                        <span className="flex flex-col gap-2 place-items-start">
                          <h3 className="">{task.name}</h3>
                          <h3 className="text-slate-400">{task.description}</h3>
                        </span>
                      </span>
                    </Link>

                    { taskHover === true && (

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


              <div onMouseEnter={handleSectionHover} onMouseLeave={handleSectionExit} className="relative mt-3 w-full flex flex-col place-items-center">
              <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
               { sectionHover && (
                 <ZenAddSection />
                 )}
                 <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
              </div>
              





              <ZenBottomBadge />
          </div>
    </> 
  );
};

