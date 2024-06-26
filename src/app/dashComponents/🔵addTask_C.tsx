'use client'

import * as React from 'react';
import { BsPlusLg } from "react-icons/bs"
import { addTask } from "@/actions/database";
import { useState } from 'react';
import { Badge } from '@chakra-ui/react';
import { Popover } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import ZenLine from './line_C';
import { ZenProject, ZenSection, ZenTask } from '@/types/uData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { useFormStatus } from 'react-dom';

interface FormData {
    taskdata: ZenTask
}

export default function ZenAddTask({projectdata, sectiondata, today, tommorrow}: {today: boolean; tommorrow: boolean; projectdata: any; sectiondata: any;}) {
    
    
    console.log(sectiondata)
    const [taskOpen, setTaskopen] = React.useState(false);
    const handleTaskOpen = () => setTaskopen(!taskOpen);
    const handleTaskClose = () => setTaskopen(false);
  
    const [formData, setFormData] = useState<FormData>({
        taskdata: {
            id: '',
            name: '',
            description: '',
            completed: false,
            duedate: '',
            priority: '', 
            projectId: null,
            sectionId: null,
            createdAt: '',
            updeatedAt: '',
        }       
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            taskdata: {
                ...prevState.taskdata,
                [name]: value
              }
            }));
    };

    // Handle input change
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            taskdata: {
                ...prevState.taskdata,
                [name]: value
                }
            }));
    };

    // Hndle date
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [datevalue, setdateValue] = React.useState<Dayjs | null>(dayjs(Date.now()));

    const handleDateChange = (duedate: any) => {
        duedate = dayjs(duedate).format('YYYY-MM-DD');    
        setFormData(prevState => ({
            ...prevState,
            taskdata: {
              ...prevState.taskdata,
              duedate: duedate
            }
        }))
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    // handle priority
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            taskdata: {
            ...prevState.taskdata,
            [name]: value
            }
        }));
        };

    // handle submit
    const handleSubmit = async (e: any) => {
        console.log(formData);
    }

    function AddTaskButton() {
        const status = useFormStatus();
    
        return (
            <>
    
                {status.pending != true && (
                    <button type="submit" className="bg-lime-200 hover:bg-lime-200/50 text-black p-2 rounded-lg px-4">Add Task</button>
                )}
    
                {status.pending != false && (
                    <button type="submit" className="bg-lime-200 hover:bg-lime-200/50 text-black p-2 rounded-lg px-4 animate-pulse" disabled >Loading..</button>
                )}
    
            </>
        )
    }

    return (
        <>
        <div className='flex flex-col gap-5'>
            <span onClick={handleTaskOpen} className="cursor-pointer place-items-center flex gap-2 hover:text-lime-500 hover:font-bold">
                <BsPlusLg /> Add Task
            </span>

        { taskOpen && (  
            <div className="w-full h-full outline outline-[1px] outline-slate-300 p-3 rounded-lg">
                <form action={addTask} className="flex flex-col">
                    {/* input fields */}
                    
                    {/* Task */}
                    <input 
                        autoComplete="off"
                        className="outline-none text-2xl bg-transparent"
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="Task Name"
                        onChange={handleInputChange} 
                        required
                    />

                    {/* Description */}
                    <textarea 
                        autoComplete="off"
                        className="outline-none bg-transparent h-[100px]"
                        name="description"
                        id="description"
                        placeholder="Description"
                        onChange={handleTextAreaChange} 
                    />

                        
                    {/* date and priority */}
                    <div className="flex gap-2 my-8">
                        
                        {/* date */}
                        <Badge className="hover:bg-slate-100 outline outline-[1px] rounded-full p-1 outline-slate-300">
                            <input type="hidden" name="duedate" value={dayjs(datevalue).format('YYYY-MM-DD')}/>
                            <span
                                id="duedate"
                                className='outline-none rounded-full w-max cursor-pointer'>
                                { today === true && (
                                    <span className=" p-2 rounded-full" aria-describedby={id} onClick={handleClick}>
                                        today
                                    </span>
                                )}

                                { today === false && (   
                                <span className=" p-2 rounded-full" aria-describedby={id} onClick={handleClick}>
                                    due date
                                </span>
                                )}
                                <Popover
                                    id={id}
                                    open={open}
                                    onClose={handleClose}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <span className="flex flex-col pb-5 place-items-center">

                                        {/* date */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateCalendar
                                                onChange={(datevalue) => handleDateChange(datevalue)}
                                            >
                                            </DateCalendar>

                                        </LocalizationProvider>

                                        <span className="flex gap-4">
                                            <button type="submit" className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg" onClick={handleClose}>Cancel</button>
                                            <button type="submit" className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleClose}>Ok</button>
                                        </span>
                                    </span>
                                </Popover>
                            </span>
                        </Badge>
                        
                        {/* priority  */}
                        <Badge className="hover:bg-slate-100 outline outline-[1px] rounded-full p-1 outline-slate-300">
                            <select onChange={handleStatusChange} id="priority" name="priority" className="bg-transparent">
                                <option value="">priority</option>
                                <option value="urgent">urgent</option>
                                <option value="high">high</option>
                                <option value="medium">medium</option>
                                <option value="low">low</option>
                            </select>
                        </Badge>
                    </div>
                        
                    <ZenLine />

                    <div className="flex gap-2 mt-5 justify-between">

                        {/* choose project and section */}
                        <div className='flex gap-2 w-1/2'>

                            {/* choose project */}
                            <Badge className="hover:bg-slate-100 flex place-items-center place-content-center outline outline-[1px] rounded-lg px-3 w-1/2 outline-slate-300">
                                <select onChange={handleStatusChange} defaultValue={'Inbox'} id="project" name='project' className="w-full h-full  bg-transparent">
                                    <option value="Inbox">projects</option>
                                    {projectdata?.map((project: ZenProject) => (
                                        <option key={project.id} value={project.id as string}>{project.name}</option>
                                    ))}
                                </select>
                            </Badge>
                        
                            {/* choose section */}
                            <Badge className="hover:bg-slate-100 flex place-items-center place-content-center outline outline-[1px] rounded-lg px-3 w-1/2 outline-slate-300">
                                <select onChange={handleStatusChange} defaultValue={'Inbox'} id="section" name='section' className="w-full h-full  bg-transparent">
                                    <option value="Inbox">sections</option>
                                    {sectiondata?.map((section: ZenSection) => (
                                        <option key={section.id} value={section.id as string}>{section.name}</option>
                                    ))}
                                </select>
                            </Badge>
                        </div>       

                        <span className="flex gap-4">
                            <button className="bg-slate-200 hover:bg-slate-100 p-2 py-3 rounded-lg"  onClick={handleTaskClose}>Cancel</button>
                            <AddTaskButton />
                        </span>
                    </div>

                </form>
            </div>
        )
        }
        </div>
        </>
    )
}