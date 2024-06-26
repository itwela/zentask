'use client'

import { addQuotes, addSection } from "@/actions/database";
import { ZenQuotes } from "@/types/uData";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs"
import ZenLine from "./line_C";
import { useFormStatus } from "react-dom";

interface FormData {
    quotes: ZenQuotes
}

export default function ZenAddQuote() {

    const [quoteOpen, setQuoteOpen] = React.useState(false);
    const handleQuoteOpen = () => setQuoteOpen(!quoteOpen);
    const handleQuoteClose = () => setQuoteOpen(false);

    const [formData, setFormData] = useState<FormData>({
        quotes: {
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
            quotes: {
                ...prevState.quotes,
                [name]: value
                }
            }));
    };

    function AddQuoteButton() {
        const status = useFormStatus();
    
        return (
            <>
    
                {status.pending != true && (
                    <button type="submit" className="bg-lime-200 hover:bg-lime-200/50 text-black p-2 rounded-lg px-4">Add Quote</button>
                )}
    
                {status.pending != false && (
                    <button className="bg-lime-200 text-black p-2 rounded-lg px-4 animate-pulse" disabled >Loading..</button>
                )}
    
            </>
        )
    }

    return (
        <>
            <span onClick={handleQuoteOpen} className="cursor-pointer place-items-center hover:text-lime-500 hover:font-bold flex gap-2">
                <BsPlusLg /> Add Quote
            </span>

            {quoteOpen && (
                <div className="w-full h-max outline outline-[1px] outline-slate-300 p-3 rounded-lg my-3">
                <form action={addQuotes} className="flex flex-col">
                    {/* input fields */}
                    
                    {/* Quote */}
                    <textarea 
                        autoComplete="off"
                        className="outline-none text-2xl bg-transparent min-h-[100px]"
                        name="quote"
                        id="quote"
                        placeholder="Feeling Inspired?"
                        onChange={handleInputChange} 
                        required
                    />
                                                
                    <ZenLine />

                    <div className="flex gap-2 mt-5 justify-between">
                        {/* add thought */}
                        <span className="flex gap-4">
                            <button type="submit" className="bg-slate-200 hover:bg-slate-100 p-2 py-3 rounded-lg"  onClick={handleQuoteClose}>Cancel</button>
                            <AddQuoteButton/>
                        </span>
                    </div>

                </form>
                </div>
            )}
        </>
    )
}