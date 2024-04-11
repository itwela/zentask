'use client'

import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenAddThought from "../dashComponents/🟠addThought_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import { ZenThoughts } from "@/types/uData";
import { useState } from "react";
import { deleteThoughtsData, updateThoughtsData } from "@/actions/database";
import { useFormStatus } from "react-dom";
import { FaTrash } from "react-icons/fa6";

// Client Component
interface FormData {
  thoughtdata: ZenThoughts,
}

export default function Thoughts({thoughtdata}: any) {

  const [formData, setFormData] = useState<FormData>({
    thoughtdata: {
      id: '',
      name: '',
      content: '',
      createdAt: '',
      updeatedAt: '',
    }       
  });

  const [thoughtEdit, setThoughtEdit] = useState(false);
  const [currentThoughtId, setCurrentThoughtId] = useState('');
  const handleThoughtTasksToggle = (sectaskId: string) => {
    setCurrentThoughtId(sectaskId);  
    setThoughtEdit(!thoughtEdit);
  }

  const handleThoughtInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        thoughtdata: {
            ...prevState.thoughtdata,
            [name]: value
            }
        }));
  };

  const handleThoughtFormExit = () => {
    setTimeout(() => {      
      setCurrentThoughtId('');  
      setThoughtEdit(!thoughtEdit);
    }, 10)
  }

  function UpdateThoughtButton () {
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

  function DeleteThoughtButton () {
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
                  <h2 className="font-bold text-4xl">Thoughts</h2>
              </div>

              <div className="py-3">
                {thoughtdata.map((thought: ZenThoughts, index: number) => (
                  <div key={index} className="my-1 w-full h-max">
                
                      {thoughtEdit != true && ( 
                        <>
                          <div className="w-full h-max flex justify-between">
                              <div onClick={() => handleThoughtTasksToggle(thought.id)} className="py-3 hover:font-bold cursor-pointer w-full h-max">- {thought.name}</div>
                              <form action={deleteThoughtsData}>
                                <input type="hidden" name="thoughtId" value={thought.id} id="" />
                                <DeleteThoughtButton />
                              </form>
                          </div>
                
                        </>
                      )}
                      {thoughtEdit != false && currentThoughtId === thought.id && (
                        <>
                          <div className="w-full h-max flex flex-col">
                            <div className="flex gap-3 w-full h-max py-1">
                              <span onClick={() => handleThoughtFormExit()} className="hover:text-lime-500 cursor-pointer">Back</span>
                            </div>
                            <form action={updateThoughtsData} className="w-full flex flex-col gap-4 h-max">
                                {/* <div className="py-3 select-none w-full h-max">{thought.name}</div> */}
                                <input type="hidden" name="thoughtId" value={thought.id} id="" />
                                <input autoComplete="off" className="bg-gray-100 py-2 px-1  w-full h-max" name="thoughtname" id="" onChange={handleThoughtInputChange} defaultValue={thought.name ? thought.name : ''} ></input>
                                <div className="w-full justify-between flex">
                                  <UpdateThoughtButton />
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
                <ZenAddThought />
              </div>
              <ZenBottomBadge />
          </div>
    </>
  );
};

