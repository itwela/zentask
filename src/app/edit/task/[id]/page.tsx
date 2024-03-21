'use client'

import { updateTaskData } from "@/actions/database";
import ZenBottomBadge from "@/app/dashComponents/bottomZentask_C";
import ZenLine from "@/app/dashComponents/line_C";
import { ZenProject, ZenTask } from "@/types/uData";
import { Badge } from "@chakra-ui/react";
import Popover from "@mui/material/Popover";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { RxCircle } from "react-icons/rx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { IoIosClose } from "react-icons/io";


interface FormData {
    taskdata: ZenTask
}



export default function EditTask({ taskdata, projectdata }: { taskdata: any, projectdata: any }) {
    
    const fullPath = window.location.pathname;
    // Split the path by '/' to get an array of path segments
    const pathSegments = fullPath.split('/');
    // Get the last segment of the path, which represents the end of the URL
    const endOfUrl = pathSegments[pathSegments.length - 1];

    // Initialize formData with default values
    const [formData, setFormData] = useState<FormData>({
        taskdata: {
            id: '',
            name: '',
            description: '',
            duedate: '',
            priority: '',
            projectId: '',
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

    const initialDueDate = taskdata.find((task: ZenTask) => task.id === endOfUrl)?.duedate;
    const [datevalue, setdateValue] = React.useState<Dayjs | null>(initialDueDate ? dayjs(initialDueDate) : null);

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




    return (
        <>
            {taskdata.map((task: ZenTask) => (
                <>
                    <div key={endOfUrl} className="flex flex-col text-black p-7 gap-3 py-[2em] h-screen justify-start">
                        <div className="flex flex-col gap-4 place-items-center place-content-center  w-full h-full">
                            <p></p>
                            <form className="flex flex-col w-full h-full outline outline-[1px] outline-slate-300 p-4 rounded-lg" action={updateTaskData}>

                                <div className="w-full flex flex-col gap-4 place-items-end mb-4">
                                    <a href={'/today'}><span className="flex gap-1 place-items-center place-content-center hover:bg-slate-100 p-1 px-2 rounded-lg" > <span>Close</span> <IoIosClose className="" size={20} /></span></a>
                                    <ZenLine />
                                    <span className="flex justify-between w-full">
                                        <h2 className="text-2xl font-bold">{task.name}</h2>
                                        <button type="submit" className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg">Update Task</button>
                                    </span>
                                </div>

                                <div className="flex gap-3 w-full h-full">
                                    <div className="w-[70%] h-full gap-3 flex flex-col outline outline-[1px] outline-slate-300 p-4 rounded-lg">
                                        <input type="hidden" name="taskId" value={task.id} />
                                        {/* input fields */}
                                        {/* Task */}
                                        <h2 className="font-bold">Edit Task Name</h2>
                                        <input
                                            autoComplete="off"
                                            className="outline-none h-max text-2xl bg-transparent"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder={task.name as string}
                                            defaultValue={task.name as string}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {/* Description */}
                                        <h2 className="font-bold">Edit Task Description</h2>
                                        <textarea
                                            autoComplete="off"
                                            className="outline-none min-h-[10em] bg-transparent"
                                            name="description"
                                            id="description"
                                            placeholder={task.description as string}
                                            defaultValue={task.description as string}
                                            onChange={handleTextAreaChange}
                                        />
                                        <div className="flex gap-2 mt-5 justify-between">
                                            {/* choose project */}


                                        </div>
                                    </div>

                                    <div className="w-[30%] p-2 h-full bg-slate-100 rounded-lg">
                                        {/* */}
                                        <div className="flex flex-col gap-2 ">
                                            <span className="flex gap-1 flex-col" >
                                                <span className="py-2  px-3 w-full  "><span className="font-bold">Project</span> - {projectdata?.find((project: ZenProject) => project.id === task.projectId)?.name}</span>
                                                <Badge className="py-2 hover:bg-slate-200 flex place-items-center rounded-lg px-3 w-full ">
                                                    <select onChange={handleStatusChange} defaultValue={'Inbox'} id="project" name="project" className="w-full mr-2 bg-transparent h-full">
                                                        <option value="Inbox">Inbox</option>
                                                        {projectdata?.map((project: ZenProject) => (
                                                            <option key={project.id} value={project.id as string}>{project.name}</option>
                                                        ))}
                                                    </select>
                                                </Badge>
                                            </span>
                                            {/* date */}
                                            <span className="flex gap-1 flex-col">
                                                <span className="py-2  px-3 w-full  "><span className="font-bold">Due Date</span> - {task.duedate}</span>
                                                <Badge className="hover:bg-slate-200 py-2  rounded-lg p-1">
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
                                            </span>
                                            {/* priority  */}
                                            <span className="flex gap-1 flex-col">
                                            <span className="py-2 px-3 w-full  "><span className="font-bold ">Priority</span> - {task.priority}</span>
                                                <Badge className="hover:bg-slate-200 py-2  rounded-lg p-1 ">
                                                    <select defaultValue={task.priority as string} onChange={handleStatusChange} id="priority" name="priority" className="bg-transparent w-full">
                                                        <option value="">priority</option>
                                                        <option value="urgent">urgent</option>
                                                        <option value="high">high</option>
                                                        <option value="medium">medium</option>
                                                        <option value="low">low</option>
                                                    </select>
                                                </Badge>
                                            </span>
                                        </div>
                                        <ZenLine />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <ZenBottomBadge />
                    </div>
                </>
            ))}
        </>
    )
}