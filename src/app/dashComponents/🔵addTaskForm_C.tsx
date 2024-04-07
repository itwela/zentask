'use client'

import React from "react";
import { addTask } from "@/actions/database";
import { useState } from "react";
import { ZenTask } from "@/types/uData";
import { TaskProps } from "@/types/uData";
import ZenLine from "./line_C";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import Popover from "@mui/material/Popover";
import dayjs, { Dayjs } from 'dayjs';
import { Badge, Select } from "@chakra-ui/react";
import { ZenProject } from "@/types/uData";



interface FormData {
    taskdata: ZenTask
}

export default function ZenAddTaskForm(
    {modalopen, handleModalClose, projectdata }:
    {modalopen: any, handleModalClose: any, projectdata: ZenProject[] | null }
    ) {

    // Initialize formData with default values
    const [formData, setFormData] = useState<FormData>({
        taskdata: {
            id: '',
            name: '',
            description: '',
            duedate: '',
            projectId: null,
            sectionId: null,
            completed: false,
            priority: '', 
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

    // Handle textare change
    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        setdateValue(duedate)
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

    const [startDate, setStartDate] = useState(new Date());
    
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
        console.log(datevalue);
    }
 

    
    // Handle form submission

    return (
        <div className="w-full h-full">
            <form action={addTask} className="flex flex-col">
                {/* input fields */}
                
                {/* Task */}
                <input 
                    autoComplete="off"
                    className="outline-none text-2xl"
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
                    className="outline-none h-[100px]"
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={handleTextArea} 
                />

                    
                {/* date and priority */}
                <div className="flex gap-2 my-8">
                    
                    {/* date */}
                    <Badge className="hover:bg-slate-100 outline outline-[1px] rounded-full p-1 outline-slate-300">
                        <input type="hidden" name="duedate" value={dayjs(datevalue).format('YYYY-MM-DD')} /> 
                        <span
                            id="duedate"
                            className='outline-none rounded-full w-max cursor-pointer'>
                            <span className=" p-2 rounded-full" aria-describedby={id} onClick={handleClick}>
                                due date
                            </span>
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
                    {/* choose project */}
                    <Badge className="hover:bg-slate-100 flex place-items-center outline outline-[1px] rounded-lg px-3 w-1/4 outline-slate-300">
                        <select onChange={handleStatusChange} defaultValue={'Inbox'} id="project" name="project" className="w-full mr-2 bg-transparent h-full">
                            <option value="Inbox">Inbox</option> 
                            {projectdata?.map((project) => (
                                <option key={project.id} value={project.id as string}>{project.name}</option>
                            ))}
                        </select>
                    </Badge>          

                    <span className="flex gap-4">
                        <button type="submit" className="min-w-[5em] bg-slate-100 hover:bg-slate-100 p-2 py-3 rounded-lg"  onClick={handleModalClose}>Cancel</button>
                        <button type="submit"className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleSubmit}>Add Task</button>
                    </span>
                </div>

            </form>
        </div>
    );
}
