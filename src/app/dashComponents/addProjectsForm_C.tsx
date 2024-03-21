'use client'

import React from "react";
import { addProject, addTask } from "@/actions/database";
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
    projectdata: ZenProject
}

export default function ZenAddProjectForm(
    {modalopen, handleModalClose, projectdata }:
    {modalopen: any, handleModalClose: any, projectdata: ZenProject[] | null }
    ) {
    // Initialize formData with default values
    const [formData, setFormData] = useState<FormData>({
        projectdata: {
            id: '',
            name: '',
            color: '',
            userId: ''
        }       
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            projectdata: {
                ...prevState.projectdata,
                [name]: value
              }
            }));
    };

    // Handle color
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    
    // handle color
    const [colorValue, setcolorValue] = React.useState('#808080');

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setcolorValue(value)
        setFormData(prevState => ({
          ...prevState,
          projectdata: {
            ...prevState.projectdata,
        color: value
          }
        }));
        console.log(colorValue);
      };

    // handle submit
    const handleSubmit = async (e: any) => {
        console.log(formData);
    }
 

    
    // Handle form submission

    return (
        <div className="w-full h-full">
            <form action={addProject} className="flex flex-col gap-3">
                {/* input fields */}
                
                {/* Task */}
                <input 
                    autoComplete="off"
                    className="outline-none text-2xl"
                    type="text" 
                    name="name"
                    id="name"
                    placeholder="Project Name"
                    onChange={handleInputChange} 
                    required
                />
                            
                {/* color  */}
                <Badge className="hover:bg-slate-100 outline outline-[1px] rounded-lg p-1 outline-slate-300">
                    <input type="hidden" name="color" value={colorValue} />
                    <select onChange={handleStatusChange} id="color" name="color" className="bg-transparent py-2 w-full">
                        <option value="">Color</option> 
                        <option value="#FF0000">Red</option>
                        <option value="#FFA500">Orange</option>
                        <option value="#FFFF00">Yellow</option>
                        <option value="#00FF00">Lime</option>
                        <option value="#0000FF">Green</option>
                        <option value="0000FF">Blue</option>
                        <option value="#FF00FF">Magenta</option>
                        <option value="#800080">Purple</option>
                        <option value="#FF69B4">Pink</option>
                        <option value="#00FFFF">Cyan</option>
                        <option value="#A52A2A">Brown</option>
                        <option value="#808080">Gray</option>
                    </select> 
                </Badge>
                    
                <ZenLine />



                <div className="flex gap-2 mt-5 justify-between">
                    <span></span>
                    <span className="flex gap-4">
                        <button type="submit" className="min-w-[5em] bg-slate-100 hover:bg-slate-100 p-2 py-3 rounded-lg"  onClick={handleModalClose}>Cancel</button>
                        <button type="submit"className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg" onClick={handleSubmit}>Add</button>
                    </span>
                </div>

            </form>
        </div>
    );
}
