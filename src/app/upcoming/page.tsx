'use client'

import { TaskProps, ZenTask } from "@/types/uData";
import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import dayjs, { Dayjs } from 'dayjs';
import ZenLine from "../dashComponents/line_C";
import React from "react";
import { RxCircle } from "react-icons/rx";
import { PiPencil } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import Popover from "@mui/material/Popover";
import { deleteTaskData, toggleTaskStatus } from "@/actions/database";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

// Client Component


export default function Upcoming({ taskdata, projectdata, sectiondata }: { taskdata: any, projectdata: any, sectiondata: any }) {


    // 🔵🔵🔵  ------------- TASK ----------------
    const month = dayjs().toDate().toDateString().substring(4, 7); // gets day of current month
    const numberday = dayjs().date();
    const weekday = dayjs().toDate().toDateString().substring(0, 3);
  
    const [taskHover, setTaskHover] = React.useState(false);
    const handleTaskHover = () => setTaskHover(true);
    const handleTaskExit = () => setTaskHover(false);
  
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const [taskEdit, settaskEdit] = React.useState(false);
  // 🔵🔵🔵 ---- END TASK ----------------

  return (
    <>
      <div className="flex flex-col text-black p-7 py-[6em] h-screen">

        <div className="flex">
          <div className="">
            <h2 className="font-bold text-4xl">Upcoming</h2>
          </div>
        </div>

        <div className="my-3 w-full h-max">
        </div>


        {/* all tasks */} 
        <div className="task-wrapper flex gap-[5em] w-max" >
        
            {taskdata?.map((task: ZenTask, index: number) => (
              <>
                  {/* task container */}         
                  <div className="task-container">
                    
                    <div className="flex flex-col gap-3 mb-3">
                      <span className="flex place-items-center justify-between p-2">
                        <span className="font-bold w-max">{dayjs(task.duedate).format('MMM DD YYYY')}</span> 
                        <span onClick={() => setTaskHover(!taskHover)} className="p-2 hover:bg-slate-100 cursor-pointer ">Edit</span>
                      </span>
                      <ZenLine />
                    </div>

                    <div className="my-2 w-full h-max">
                      <div key={index} className="flex flex-col gap-3">
                        {/* Render individual task details here */}
                        <div className="flex cursor-pointer gap-2 place-items-center justify-between p-2">
                          <span className="flex py-2 gap-2 place-items-start w-full hover:bg-slate-100 rounded-lg ">
                            {task.completed != true && (
                              <span>
                                <form className="" action={toggleTaskStatus}>
                                  <input type="hidden" name="taskId" value={task.id} />
                                  <input type="hidden" name="taskStatus" value='completed' />
                                  <button><RxCircle className="px-3 w-max h-max hover:text-lime-500 font-bold" type="submit" /></button>
                                </form>
                              </span>
                            )}
                            {task.completed != false && (
                              <span>
                                <form className="" action={toggleTaskStatus}>
                                  <input type="hidden" name="taskId" value={task.id} />
                                  <input type="hidden" name="taskStatus" value='notdone' />
                                  <button><FaCircleCheck className="px-3 w-max h-max text-lime-500" type="submit" /></button>
                                </form>
                              </span>
                            )}
                            <Link href={`/edit/task/${task.id}`}>
                              <span className="flex flex-col gap-2 place-items-start">
                                <h3 className="">{task.name}</h3>
                                <h3 className="text-slate-400">{task.description} - {task.duedate}</h3>
                              </span>
                            </Link>
                          </span>
                          {taskHover === true && (
                            <span className="flex gap-2 place-items-center">
                              <PiPencil className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                              <span
                                id="duedate"
                                className='outline-none rounded-full w-max cursor-pointer'>
                                <span className=" " onClick={handleClick}>
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
                                    <span className="w-[150px] flex flex-col gap-3 p-3">
                                      <span className="p-2 w-full hover:bg-slate-100 cursor-pointer">Edit</span>
                                      <form action={deleteTaskData}>
                                        <input type="hidden" name="taskId" value={task.id} />
                                        <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100">Delete</button>
                                      </form>
                                    </span>
                                  </span>
                                </Popover>
                              </span>
                            </span>
                          )}
                        </div>
                        <span className="my-2">
                          <ZenLine />
                        </span>
                      </div>
                    </div>

                    <ZenAddTask projectdata={projectdata} sectiondata={sectiondata} today={true} tommorrow={false} />
                  
                  </div>
                
              </>
            ))}

        </div>

      </div>
      <ZenBottomBadge />
    </>
  );
};

