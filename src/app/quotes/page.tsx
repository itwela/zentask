'use client'

import ZenAddQuote from "../dashComponents/addQuote_C";
import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenAddThought from "../dashComponents/addThought_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";

// Client Component


export default function Quotes() {

  return (
    <>
          <div className="flex flex-col text-black p-7 py-[6em] h-screen">
              <div className="">
                  <h2 className="font-bold text-4xl">Quotes</h2>
              </div>
              <div className="my-3 w-full h-max">
              </div>
              <ZenAddQuote />
              <ZenBottomBadge />
          </div>
    </>
  );
};

