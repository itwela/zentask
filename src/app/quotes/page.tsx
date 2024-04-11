'use client'

import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenAddQuote from "../dashComponents/🟡addQuote_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import { ZenQuotes } from "@/types/uData";
import { useState } from "react";
import { deleteQuotesData, updateQuotesData } from "@/actions/database";
import { useFormStatus } from "react-dom";
import { FaTrash } from "react-icons/fa6";

// Client Component
interface FormData {
  quotedata: ZenQuotes,
}

export default function Quotes({quotedata}: any) {

  const [formData, setFormData] = useState<FormData>({
    quotedata: {
      id: '',
      name: '',
      content: '',
      createdAt: '',
      updeatedAt: '',
    }       
  });

  const [quoteEdit, setQuoteEdit] = useState(false);
  const [currentQuoteId, setCurrentQuoteId] = useState('');
  const handlequoteTasksToggle = (setQuoteId: string) => {
    setCurrentQuoteId(setQuoteId);  
    setQuoteEdit(!quoteEdit);
  }

  const handleQuoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        quotedata: {
            ...prevState.quotedata,
            [name]: value
            }
        }));
  };

  const handleQuoteFormEdit = () => {
    setTimeout(() => {      
      setCurrentQuoteId('');  
      setQuoteEdit(!quoteEdit);
    }, 10)
  }

  function UpdateQuoteEdit () {
    const status = useFormStatus();
    
    return (
        <>

            {status.pending != true && (
                <button type="submit" className="bg-lime-200 hover:bg-lime-200/50 text-black p-2 rounded-lg px-4">Update</button>
            )}

            {status.pending != false && (
                <button className="bg-lime-200 text-black p-2 rounded-lg px-4 animate-pulse" disabled >Loading..</button>
            )}

        </>
    )
  }

  function DeleteQuoteButton () {
    const status = useFormStatus();
    
    return (
        <>
            {status.pending != true && (
                <button type="submit" className="text-red-400 hover:text-red-400/50 p-2 rounded-lg px-4"><FaTrash /></button>
            )}

            {status.pending != false && (
                <button className="text-gray-400 p-2 rounded-lg px-4 animate-pulse" disabled ><FaTrash /></button>
            )}

        </>
    )
  }
  
  return (
    <>
          <div className="flex w-full flex-col text-black p-7 py-[6em] h-screen">
              <div className="">
                  <h2 className="font-bold text-4xl">Quotes</h2>
              </div>

              <div className="py-3">
                {quotedata.map((quote: ZenQuotes, index: number) => (
                  <div key={index} className="my-1 w-full h-max">
                
                      {quoteEdit != true && (
                        <>
                          <div className="w-full h-max flex justify-between">
                              <div onClick={() => handlequoteTasksToggle(quote.id)} className="py-3 hover:font-bold cursor-pointer w-full h-max">" {quote.name} "</div>
                              <form action={deleteQuotesData}>
                                <input type="hidden" name="quoteId" value={quote.id} id="" />
                                <DeleteQuoteButton />
                              </form>
                          </div>
                
                        </>
                      )}
                      {quoteEdit != false && currentQuoteId === quote.id && (
                        <>
                          <div className="w-full h-max flex flex-col">
                            <div className="flex gap-3 w-full h-max py-1">
                              <span onClick={() => handleQuoteFormEdit()} className="hover:text-lime-500 cursor-pointer">Back</span>
                            </div>
                            <form action={updateQuotesData} className="w-full flex flex-col gap-4 h-max">
                                {/* <div className="py-3 select-none w-full h-max">{quote.name}</div> */}
                                <input type="hidden" name="quoteId" value={quote.id} id="" />
                                <input autoComplete="off" className="bg-gray-100 py-2 px-1  w-full h-max" name="quotename" id="" onChange={handleQuoteInputChange} defaultValue={quote.name ? quote.name : ''} ></input>
                                <div className="w-full justify-between flex">
                                  <UpdateQuoteEdit />
                                </div>
                                <div></div>
                            </form>
                          </div>
                
                        </>
                      )}
                  </div>
                ))}
              </div>


              <div className="my-3 w-full h-max">
                <ZenAddQuote />
              </div>
              <ZenBottomBadge />
          </div>
    </>
  );
};

// test 