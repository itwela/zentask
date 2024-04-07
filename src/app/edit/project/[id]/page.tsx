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



export default function EditProject({ taskdata, projectdata }: { taskdata: any, projectdata: any }) {
    
    try {    
        const router = useRouter();
        router.refresh();
    } catch (error) {
        console.log(error);
    }

    const fullPath = window.location.pathname;
    // Split the path by '/' to get an array of path segments
    const pathSegments = fullPath.split('/');
    // Get the last segment of the path, which represents the end of the URL
    const endOfUrl = pathSegments[pathSegments.length - 1];

    const filteredTask = taskdata.find((task: ZenTask) => task.projectId === endOfUrl);
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

    return (
        <>
            {filteredProject && (
                <>
                    <div key={endOfUrl} className="flex flex-col text-black p-7 gap-3 py-[2em] h-screen justify-start">
                            <div className="flex flex-col gap-3 w-full my-8">
                                <span className="flex justify-between w-full">
                                    <h2 className="text-2xl font-bold">{filteredProject.name}</h2>
                                </span>
                                <ZenLine />
                            </div>
                        <ZenBottomBadge />
                    </div>
                </>
            )}
        </>
    )
}