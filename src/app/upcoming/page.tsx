'use client'

import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import ZenLine from "../dashComponents/line_C";

// Client Component


export default function Upcoming() {

  return (
    <>
          <div className="flex flex-col text-black p-7 py-[6em] h-screen">
              
              <div className="flex">
                <div className="">
                    <h2 className="font-bold text-4xl">Upcoming</h2>
                </div>
              </div>

              <div className="my-3 w-full h-max">
              </div>
              
              <ZenLine />
          </div>
          <ZenBottomBadge />
    </>
  );
};

