'use client'

import * as React from 'react';
import { BsPlusLg } from "react-icons/bs"
import ZenLine from './line_C';
import { Badge } from '@chakra-ui/react';
import { addProject } from '@/actions/database';
import { useState } from 'react';
import { ZenProject } from '@/types/uData';
import Popover from '@mui/material/Popover';

interface FormData {
    projectdata: ZenProject
}

export default function ZenAddProject() {
    const [sectionOpen, setSectionOpen] = React.useState(false);
    const handleSectionOpen = () => setSectionOpen(!sectionOpen);
    const handleSectionClose = () => setSectionOpen(false);

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

      
    return (
        <>
            <span onClick={handleClick} className="cursor-pointer place-items-center flex gap-2  hover:text-lime-500 hover:font-bold">
                <BsPlusLg /> Add Project
            </span>


                <Popover
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

                <form action={addProject} className="outline outline-[1px] rounded-lg outline-slate-300 p-3 w-[20em] flex flex-col gap-3">
                        {/* input fields */}
                
                        {/* Task */}
                        <input
                            autoComplete="off"
                            className="outline outline-[1px] rounded-md outline-slate-300 bg-transparent rounded-lg p-1"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Project Name"
                            onChange={handleInputChange}
                            required
                        />
                
                        {/* color  */}
                        <Badge className="hover:bg-slate-100 outline outline-[1px] rounded-md outline-slate-300">
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
                        <div className="flex gap-2 mt-2 justify-between">
                            <span></span>
                            <span className="flex gap-4">
                                <span className="min-w-[5em] bg-slate-100 hover:bg-slate-100 p-2 py-3 rounded-lg cursor-pointer flex place-items-center place-content-center "  onClick={handleClose}>Cancel</span>
                                <button type="submit"className="min-w-[5em] bg-lime-200/50 p-2 py-3 rounded-lg">Add</button>
                            </span>
                        </div>
                </form>
                </Popover>
    </>
    )
}