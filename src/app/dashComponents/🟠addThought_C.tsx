'use client'

import { ZenThoughts } from "@/types/uData";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs"
import { addSection, addThoughts } from "@/actions/database";
import ZenLine from "./line_C";
import { Badge } from "@chakra-ui/react";

interface FormData {
    thoughts: ZenThoughts
}

export default function ZenAddThought() {
    
    const [thoughtOpen, setThoughtOpen] = React.useState(false);
    const handleThoughtOpen = () => setThoughtOpen(!thoughtOpen);
    const handleThoughtClose = () => setThoughtOpen(false);

    const [formData, setFormData] = useState<FormData>({
        thoughts: {
            id: '',
            name: '',
            content: '',
            createdAt: '',
            updeatedAt: '',        
        }       
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            thoughts: {
                ...prevState.thoughts,
                [name]: value
                }
            }));
    };
    
    return (
        <>
            <span onClick={handleThoughtOpen} className="cursor-pointer place-items-center hover:text-lime-500 hover:font-bold flex gap-2">
                <BsPlusLg /> Add Thought
            </span>

            {thoughtOpen && (
                                 <div className="w-full h-full outline outline-[1px] outline-slate-300 p-3 rounded-lg my-3">
                                 <form action={addThoughts} className="flex flex-col">
                                     {/* input fields */}
                                     
                                     {/* Thought */}
                                     <textarea 
                                         autoComplete="off"
                                         className="outline-none text-2xl bg-transparent min-h-[100px]"
                                         name="thoughtname"
                                         id="thoughtname"
                                         placeholder="What are you thinking?"
                                         onChange={handleInputChange} 
                                         required
                                     />
                                                                  
                                     <ZenLine />
                 
                                     <div className="flex gap-2 mt-5 justify-between">
                                            {/* add thought */}
                                            <span className="flex gap-4">
                                             <button type="submit" className="bg-slate-100 hover:bg-slate-200 p-2 py-3 rounded-lg"  onClick={handleThoughtClose}>Cancel</button>
                                             <button type="submit"className="bg-lime-200/50 p-2 py-3 rounded-lg">Add Thought</button>
                                         </span>
                                     </div>
                 
                                 </form>
                                 </div>
            )}
    </>
    )
}