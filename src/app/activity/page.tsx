'use client'

import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";

// Client Component


export default function Activity() {

  return (
    <>
          <div className="flex text-black p-7 py-[6em] h-screen justify-between">
              <div className="">
                  <h2 className="font-bold text-4xl">Activity: All Projects</h2>
              </div>
              <ZenBottomBadge />
          </div>
    </>
  );
};

