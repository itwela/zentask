'use client'

import prisma from "@/libs/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { ZenMenuS } from "../dashComponents/menu_S";
import ZenAddTask from "../dashComponents/🔵addTask_C";
import ZenAddProject from "../dashComponents/🟢addProjects_C";
import ZenBottomBadge from "../dashComponents/bottomZentask_C";
import { ProjectProps, ZenProject } from "@/types/uData";
import { PiPencil } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import Popover from "@mui/material/Popover";
import React from "react";
import { deleteProjectData } from "@/actions/database";
import ZenLine from "../dashComponents/line_C";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { FaTrashCan } from "react-icons/fa6";

// Client Component


export default function Projects({ projectdata }: ProjectProps) {

  const [projectEdit, setprojectEdit] = React.useState(false);
  const handleprojectEdit = () => setprojectEdit(true);
  const handleProjectExit = () => setprojectEdit(false);

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
            <span>{projectdata?.length} project(s)</span>
            <span className="w-max place-content-end place-items-center flex">
              <span onClick={() => setprojectEdit(!projectEdit)} className="p-2 cursor-pointer rounded-lg hover:bg-slate-100">Edit</span>
            </span>
          </span>
          <ZenLine />
        </div>

        <div className="w-full h-max flex flex-col mt-6">

          {projectdata?.map((project: ZenProject, index: number) => (
            <div key={index} className="w-full h-max flex flex-col cursor-pointer  hover:bg-slate-100 rounded-lg">

              <div className="w-full h-max flex justify-between ">

                <span className="relative py-4 px-1 flex justify-between place-items-center w-full h-[3.5em]">
                  <Link href={`/edit/project/${project.id}`}>
                    <span className="hover:font-bold">{project.name}</span>
                  </Link>
                  <span style={{ backgroundColor: project.color }} className="absolute top-[5%] left-[-1%] w-3 h-3 rounded-full"></span>
                </span>

              {projectEdit && (   
                <span className="flex gap-2 place-items-center">
                  <Link className="" href={`/edit/project/${project.id}`}>
                    <PiPencil className="hover:bg-slate-100 p-2 rounded-lg" size={25} />
                  </Link>
                  <span className='outline-none rounded-full w-max cursor-pointer'>
                        <form action={deleteProjectData}>
                          <input type="hidden" name="projectId" value={project.id} />
                          <button className="p-2 w-full flex place-items-start cursor-pointer text-red-500 hover:bg-slate-100" onClick={() => handleClose()}><FaTrashCan  /></button>
                        </form>
                  </span>
                </span>
              )}

              </div>

            </div>
          ))}

        </div>

        <ZenBottomBadge />
      </div>
    </>
  );
};

