'use client'

import { deleteTaskData, toggleTaskStatus, updateTaskData } from "@/actions/database";
import ZenBottomBadge from "@/app/dashComponents/bottomZentask_C";
import ZenLine from "@/app/dashComponents/line_C";
import { ZenProject, ZenTask } from "@/types/uData";
import { Badge, Link } from "@chakra-ui/react";
import Popover from "@mui/material/Popover";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { RxCircle } from "react-icons/rx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { IoIosClose } from "react-icons/io";
import ZenAddTask from "@/app/dashComponents/🔵addTask_C";
import { BsThreeDots } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { PiPencil } from "react-icons/pi";


interface FormData {
    taskdata: ZenTask
}


export default function EditProject({ taskdata, projectdata, sectiondata }: { taskdata: any, projectdata: any, sectiondata: any }) {

    const router = useRouter();
    let endOfUrl = '';

    useEffect(() => {            
    router.refresh();
    }, []);        
    
    const fullPath = window.location.pathname;
    // Split the path by '/' to get an array of path segments
    const pathSegments = fullPath.split('/');
    // Get the last segment of the path, which represents the end of the URL
    endOfUrl = pathSegments[pathSegments.length - 1];



    const filteredTask = taskdata.filter((task: ZenTask) => task.projectId === endOfUrl);
    const filteredProject = projectdata.find((project: ZenProject) => project.id === endOfUrl);

    // Initialize formData with default values
    const [formData, setFormData] = useState<FormData>({
        taskdata: {
            id: '',
            name: '',
            description: '',
            duedate: '',
            completed: false,
            priority: '',
            projectId: '',
            sectionId: '',
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

// 🔵🔵🔵  ------------- TASK ----------------
  const [taskEdit, settaskEdit] = React.useState(false);
  const handletaskOpen = () => settaskEdit(true);
  const handleTaskExit = () => settaskEdit(false);
// 🔵🔵🔵 ---- END TASK ----------------


    return (
        <>
            {filteredProject && (
                <>
                    <div key={endOfUrl} className="flex flex-col text-black p-7 gap-3 py-[2em] h-screen justify-start">
                            <div className="flex flex-col gap-3 w-full my-[4em]">
                                <span className="flex relative justify-between w-full">
                                    <h2 className="text-2xl font-bold">{filteredProject.name}</h2>
                                    <span style={{ backgroundColor: filteredProject.color }} className="absolute top-[-20%] left-[-2%] w-3 h-3 rounded-full"></span>
                                </span>
                                <ZenLine />

                            <div className="mb-3 w-full h-max">
                                {filteredTask?.map((task: ZenTask, index: number) => (
                                    <div key={index} className="flex flex-col">
                                        {/* Render individual task details here */}
                                        <div className="flex  cursor-pointer gap-2 place-items-center justify-between p-2">

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

                                            {taskEdit === true && (

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
                            </div>
                        <ZenBottomBadge />
                    </div>
                </>
            )}
        </>
    )
}