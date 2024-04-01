'use client'

import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense, useState } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import ZenAddSection from "../dashComponents/🟣addSection_C";
import { ProjectProps, ZenQuotes, ZenSection, ZenTask, ZenThoughts } from "@/types/uData";
import ZenLine from "../dashComponents/line_C";
import { RxCircle } from "react-icons/rx";
import { TaskProps } from "@/types/uData";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { PiPencil } from "react-icons/pi";
import Popover from "@mui/material/Popover";
import React from "react";
import { deleteQuotesData, deleteSectionData, deleteTaskData, deleteThoughtsData, getQuotesData, toggleTaskStatus, updateQuotesData, updateSectionData, updateSectionTaskData, updateTaskData, updateThoughtsData } from "@/actions/database";
import Link from "next/link";
import ZenAddThought from "../dashComponents/🟠addThought_C";
import ZenAddQuote from "../dashComponents/🟡addQuote_C";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import ZenBigLine from "../dashComponents/linebig_C";

// client Component

interface FormData {
  sectiondata: ZenSection,
  thoughtdata: ZenThoughts,
}



export default function Home({taskdata, projectdata, sectiondata, thoughtdata, quotedata}: {taskdata: any, projectdata: any, sectiondata: any, thoughtdata: any, quotedata: any}) {
 
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

// 🔵🔵🔵  ------------- TASK ----------------
  const [taskEdit, settaskEdit] = React.useState(false);
  const handletaskOpen = () => settaskEdit(true);
  const handleTaskExit = () => settaskEdit(false);
// 🔵🔵🔵 ---- END TASK ----------------


  
// 🟣🟣🟣 ------------  SECTION ----------------

  // 🟣
  const [formData, setFormData] = useState<FormData>({
    sectiondata: {
        id: '',
        name: '',
        userId: '',
        createdAt: '',
        updeatedAt: '',
      },
    thoughtdata: {
      id: '',
      name: '',
      content: '',
      createdAt: '',
      updeatedAt: '',
    }       
  });

  // 🟣
  const [showSectionTask, setShowSectionTask] = useState(false);

  // 🟣
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
  // 🟣
  const [sectionEdit, setsectionEdit] = React.useState(false);
  
  // 🟣🟣 edit button ---------
  const handlesectionOpen = () => {
    setsectionEdit(true);
  } 

  const handlesectionExit = () => {
    setsectionEdit(false);
  } 

  const [showSectionTasks, setShowSectionTasks] = useState(true);
  const sectiontasks = taskdata.filter((task: any) => task.sectionId)

// 🟣🟣 end edit button --------

  const [secForm, setSecForm] = React.useState(false);
  const [editingSectionId, setEditingSectionId] = React.useState<string | null>(null);
  // 🟣
  const handleSecFormOpen = (sectionId: string) => {
    setAnchorEl(null)
    setEditingSectionId(sectionId);
    setSecForm(true);
  } 
  // 🟣
  const handleSecFormExit = () => {
    setTimeout(() => {      
      setAnchorEl(null)
      setEditingSectionId(null);
      setSecForm(false);
    }, 10)
  }

// 🟣🟣🟣 ---- END SECTION ----------------



// 🟠🟠🟠 ------------ THOUGHT -----------------

const handleThoughtInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const [thoughtEdit, setthoughtEdit] = React.useState(false);
  const [thoughtForm, setThoughtForm] = React.useState(false);
  const [editingThoughtId, setEditingThoughtId] = React.useState<string | null>(null);
  
  const handleThoughtFormOpen = (thoughtId: string) => {
    setAnchorEl(null)
    setEditingThoughtId(thoughtId);
    setThoughtForm(true);
  } 
  // 
  const handleThoughtFormExit = () => {
    setTimeout(() => {      
      setAnchorEl(null)
      setEditingThoughtId(null);
      setThoughtForm(false);
    }, 10)
  }
  // 🟠🟠🟠 ---- END THOUGHT ----------------
 
  
  // 🟡🟡🟡 -------- QUOTE -----------------

  const handleQuoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const [quoteEdit, setquoteEdit] = React.useState(false);
    const [quoteForm, setQuoteForm] = React.useState(false);
    const [editingQuoteId, setEditingQuoteId] = React.useState<string | null>(null);
    
    const handleQuoteFormOpen = (quoteId: string) => {
      setAnchorEl(null)
      setEditingQuoteId(quoteId);
      setQuoteForm(true);
    } 
    // 
    const handleQuoteFormExit = () => {
      setTimeout(() => {      
        setAnchorEl(null)
        setEditingQuoteId(null);
        setQuoteForm(false);
      }, 10)
    }

  // 🟡🟡🟡 ------ END QUOTE ----------------

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
            <ZenBigLine />


            <div className="mb-3 w-full h-max">
              {taskdata?.map((task : ZenTask, index : number) => (
                <div key={index} className="flex flex-col">
                  {/* Render individual task details here */}
                  <div  className="flex  cursor-pointer gap-2 place-items-center justify-between p-2">
                    
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
                            <h3 className="text-slate-400">{task.description}</h3>
                          </span>
                      </Link>

                      </span>

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
              <ZenAddTask projectdata={projectdata} sectiondata={sectiondata} today={false} tommorrow={false} />
            </span>


            {/* add section */}
            <div className="relative w-full h-max my-3 flex flex-col place-items-center">
            <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
                <ZenAddSection projectdata={projectdata} />
            <span className="text-transparent cursor-pointer w-full h-[1em]">.....</span>
            </div>

            <span className="w-full my-4 justify-between place-items-center flex">
                  <span className="font-bold">Sections</span>
                  <span className="" onClick={() => setsectionEdit(!sectionEdit)}>
                     <p className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</p>
                  </span>
            </span>
            <ZenBigLine />

            
            {sectiondata?.map((section: ZenSection, index: number) => (
              <React.Fragment key={index}>
                {editingSectionId !== section.id && (
                  <>
                  {/* // Display section details without form */}
                  <div className="flex flex-col justify-between w-full h-max">
                    <div className="flex gap-3">
                      {/* Render individual section details here */}
                      <div className="flex flex-col w-full py-3 cursor-pointer gap-2 place-items-center justify-between">
                       
                        <span className="flex place-items-center w-full gap-2">
                          {!showSectionTasks && (
                            <IoIosArrowForward onClick={() => setShowSectionTasks(true)} className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                          )}

                          {showSectionTasks && (
                            <IoIosArrowDown onClick={() => setShowSectionTasks(false)} className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                          )}
                          <span onClick={() => handleSecFormOpen(section.id)} className="flex flex-col gap-2 place-items-start w-full">
                            <h3 className="font-bold">{section.name}</h3>
                          </span>

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
                        </span>

                        {/* show section tasks */}
                          {showSectionTasks && (
                            <div className="flex w-full place-items-start py-3 place-content-start hover:bg-slate-100 rounded-lg">
                              {sectiontasks.map((task: ZenTask, index: number) => ( 
                              <>
                              
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
                                    <h3 className="text-slate-400">{task.description}</h3>
                                  </span>
                              </Link>

                                </>
                              ))}
                            </div>
                          )}
                          
                      </div>

                    </div>
                    <ZenLine />
                  </div>

                  <span className=" mx-5 my-2">
                  <ZenAddTask projectdata={projectdata} sectiondata={sectiondata} today={false} tommorrow={false} />
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
                              name="sectionname"
                              id="sectionname"
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
              
{/* thoughts ------------------------------------- */}
                
                <div className="flex w-full">
                    <div className="flex flex-col w-full gap-2">
                     
                      <div className="flex gap-3 justify-between">
                        
                        <h2 className="font-bold">Thoughts</h2>
                        <span className="" onClick={() => setthoughtEdit(!thoughtEdit)}>
                          <p className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</p>
                        </span>

                      </div>
                      <ZenBigLine />

                      {thoughtdata.map((thought: ZenThoughts) => (  
                        <React.Fragment key={thought.id}>
                          {editingThoughtId !== thought.id && (
                            <>
                              {/* // Display section details without form */}
                              <div className="flex flex-col justify-between w-full h-max">
                                <div className="flex gap-3">
                                  {/* Render individual section details here */}
                                  <div
                                    className="flex w-full py-3 cursor-pointer gap-2 place-items-center justify-between"
                                  >
                                    <span className="flex place-items-center w-full gap-2">
                                      <span onClick={() => handleThoughtFormOpen(thought.id)} className="flex flex-col gap-2 place-items-start w-full">
                                        <h3 className="pl-4 font-bold">{thought.name}</h3>
                                      </span>
                                    </span>

                                  </div>
                                  {/* Section edit options */}
                                  {thoughtEdit && (
                                    <span className="flex gap-2 place-items-center">
                                      <PiPencil
                                        onClick={() => handleThoughtFormOpen(thought.id)}
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
                                            <span className="p-2 w-full flex place-items-start cursor-pointer hover:bg-slate-100" onClick={() => handleThoughtFormOpen(thought.id)}>Update</span>
                                            <form action={deleteThoughtsData}>
                                              <input type="hidden" name="thoughtId" value={thought.id} />
                                              <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={() => handleClose()}>Delete</button>
                                            </form>
                                          </span>
                                        </span>
                                      </Popover>


                                    </span>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                          {/* Render thought form */}
                          {editingThoughtId === thought.id && (
                            <div className="flex flex-col justify-between w-full h-max">
                              <div className="flex gap-3">
                                {/* Render form for section here */}
                                <div className="flex w-full py-3 gap-2 place-items-center justify-between">

                                  <form action={updateThoughtsData} className="flex place-items-center w-full">
                                    <span className="flex flex-col gap-2 place-items-start w-full">
                                      <input type="hidden" name="thoughtId" value={thought.id} />
                                      <input
                                        type="text"
                                        name="thoughtname"
                                        id="thoughtname"
                                        placeholder="Thought Name"
                                        required
                                        defaultValue={thought.name as string}
                                        onChange={handleThoughtInputChange}
                                        className="font-bold w-full py-2 px-1" />
                                      <span className="flex gap-4">
                                        <span className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg" onClick={handleThoughtFormExit}>
                                          Cancel
                                        </span>
                                        <button type="submit" className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleThoughtFormExit}>
                                          Update
                                        </button>
                                      </span>
                                    </span>
                                  </form>

                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      
                      ))}
                      <ZenLine />
                      <ZenAddThought />
                    </div>
                </div>


{/* quotes ------------------------------------- */}

                <div className="flex w-full">
                    <div className="flex flex-col w-full gap-2">
                      
                      <div className="flex gap-3 justify-between">
                        <h2 className="font-bold">Quotes</h2>
                        <span className="" onClick={() => setquoteEdit(!quoteEdit)}>
                          <p className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</p>
                        </span>
                      </div>
                      <ZenBigLine />

                      {quotedata.map((quote: ZenQuotes) => (                
                        <React.Fragment key={quote.id}>
                          {editingQuoteId !== quote.id && (
                            <>
                              {/* // Display quote details without form */}
                              <div className="flex flex-col justify-between w-full h-max">
                                <div className="flex gap-3">
                                  {/* Render individual quote details here */}
                                  <div
                                    className="flex w-full py-3 cursor-pointer gap-2 place-items-center justify-between"
                                  >
                                    <span className="flex place-items-center w-full gap-2">
                                      <span onClick={() => handleQuoteFormOpen(quote.id)} className="flex flex-col gap-2 place-items-start w-full">
                                        <h3 className="pl-4 font-bold">{quote.name}</h3>
                                      </span>
                                    </span>

                                  </div>
                                  {/* Section edit options */}
                                  {quoteEdit && (
                                    <span className="flex gap-2 place-items-center">
                                      <PiPencil
                                        onClick={() => handleQuoteFormOpen(quote.id)}
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
                                            <span className="p-2 w-full flex place-items-start cursor-pointer hover:bg-slate-100" onClick={() => handleQuoteFormOpen(quote.id)}>Update</span>
                                            <form action={deleteQuotesData}>
                                              <input type="hidden" name="quoteId" value={quote.id} />
                                              <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={() => handleClose()}>Delete</button>
                                            </form>
                                          </span>
                                        </span>
                                      </Popover>


                                    </span>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                          {/* Render quote form */}
                          {editingQuoteId === quote.id && (
                            <div className="flex flex-col justify-between w-full h-max">
                              <div className="flex gap-3">
                                {/* Render form for quote here */}
                                <div className="flex w-full py-3 gap-2 place-items-center justify-between">

                                  <form action={updateQuotesData} className="flex place-items-center w-full">
                                    <span className="flex flex-col gap-2 place-items-start w-full">
                                      <input type="hidden" name="quoteId" value={quote.id} />
                                      <input
                                        type="text"
                                        name="quote"
                                        id="quote"
                                        placeholder="Quote"
                                        required
                                        defaultValue={quote.name as string}
                                        onChange={handleQuoteInputChange}
                                        className="font-bold w-full py-2 px-1" />
                                      <span className="flex gap-4">
                                        <span className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg" onClick={handleQuoteFormExit}>
                                          Cancel
                                        </span>
                                        <button type="submit" className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleQuoteFormExit}>
                                          Update
                                        </button>
                                      </span>
                                    </span>
                                  </form>

                                </div>
                              </div>
                            </div>
                          )}                          
                        </React.Fragment>
                      ))}
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

