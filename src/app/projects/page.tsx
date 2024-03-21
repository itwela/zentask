'use client'

import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
import ZenAddTask from "../dashComponents/addTask_C";
import ZenAddProject from "../dashComponents/addProjects_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import { ProjectProps } from "@/types/uData";
import { PiPencil } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import Popover from "@mui/material/Popover";
import React from "react";
import { deleteProjectData } from "@/actions/database";
import ZenLine from "../dashComponents/line_C";

// Client Component


export default function Projects({ projectdata }: ProjectProps) {

  const [projectHover, setProjectHover] = React.useState(false);
  const handleProjectHover = () => setProjectHover(true);
  const handleProjectExit = () => setProjectHover(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 161)
  };

  return (
    <>
      <div className="flex relative flex-col text-black p-7 py-[6em] h-screen">
        <div className="">
          <h2 className="font-bold text-4xl">My Projects</h2>
        </div>
        <div className="my-3 w-full h-max">
        </div>
        <ZenAddProject />

        <div className="w-full h-max flex flex-col gap-3 mt-6">
          <span className="w-full h-max flex justify-between place-items-center">
            <span>{projectdata.length} project(s)</span>
            <span className="w-max place-content-end place-items-center flex">
              <span onClick={() => setProjectHover(!projectHover)} className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</span>
            </span>
          </span>
          <ZenLine />
        </div>

        <div className="w-full h-max flex flex-col mt-6">

          {projectdata.map((project) => (
            <div
              className="w-full h-max flex flex-col cursor-pointer  hover:bg-slate-100 rounded-lg"
              key={project.id}
            >
              <span className="py-4 px-1 flex justify-between place-items-center w-full h-[3.5em]">
                <span>{project.name}</span>

                {projectHover === true && (

                  <span className="flex gap-4 place-items-center">
                    <PiPencil className="hover:bg-slate-100 " size={15} />
                    <span
                      id="duedate"
                      className='outline-none rounded-full w-max cursor-pointer'>
                      <span className="" onClick={handleClick}>
                        <BsThreeDots className="hover:bg-slate-100 " size={15} />
                      </span>
                      <Popover
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <span className="flex flex-col place-items-center">
                          <span className="w-[150px] flex flex-col p-3">
                            <span className="p-2 w-full hover:bg-slate-100 cursor-pointer">Edit</span>
                            <form action={deleteProjectData}>
                              <input type="hidden" name="projectId" value={project.id} />
                              <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={handleClose}>Delete</button>
                            </form>
                          </span>
                        </span>
                      </Popover>
                    </span>

                  </span>

                )}
              </span>
            </div>
          ))}

        </div>

        <ZenBottomBadge />
      </div>
    </>
  );
};

