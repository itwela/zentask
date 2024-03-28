'use client'
import * as React from 'react';
import { addSection } from "@/actions/database";
import { useState } from 'react';
import { ZenProject, ZenSection } from '@/types/uData';
import ZenLine from './line_C';
import { Badge } from '@chakra-ui/react';

interface FormData {
    sectiondata: ZenSection
}

export default function ZenAddSection({projectdata}: {projectdata: ZenProject[] | null}) {
    
    const [sectionOpen, setSectionOpen] = React.useState(false);
    const handleSectionOpen = () => setSectionOpen(!sectionOpen);
    const handleSectionClose = () => setSectionOpen(false);

    const [formData, setFormData] = useState<FormData>({
        sectiondata: {
            id: '',
            name: '',
            userId: '',
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
            sectiondata: {
                ...prevState.sectiondata,
                [name]: value
                }
            }));
    };

    // handle priority
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            sectiondata: {
            ...prevState.sectiondata,
            [name]: value
            }
        }));
    };

    return (
        <>
            <span onClick={handleSectionOpen} className="flex gap-5 place-items-center w-full h-max place-content-center my-5">
                <span className="cursor-pointer w-[35%] h-[1px] bg-lime-500"></span>
                <span className="cursor-pointer text-lime-500 hover:font-bold ">Add Section</span>
                <span className="cursor-pointer w-[35%] h-[1px] bg-lime-500"></span>
            </span>

            {sectionOpen && (
                 <div className="w-full h-full outline outline-[1px] outline-slate-300 p-3 rounded-lg">
                 <form action={addSection} className="flex flex-col">
                     {/* input fields */}
                     
                     {/* Task */}
                     <input 
                         autoComplete="off"
                         className="outline-none text-2xl bg-transparent"
                         type="text" 
                         name="name"
                         id="name"
                         placeholder="Section Name"
                         onChange={handleInputChange} 
                         required
                     />
                                                  
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
                             <button type="submit" className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg"  onClick={handleSectionClose}>Cancel</button>
                             <button type="submit"className="bg-lime-200/50 p-2 py-3 rounded-lg">Add Section</button>
                         </span>
                     </div>
 
                 </form>
             </div>
            )}
        </>
    )
}