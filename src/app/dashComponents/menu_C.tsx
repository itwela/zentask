'use client'

import { FaCirclePlus } from "react-icons/fa6";
import { IoTodayOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineHome, HiOutlineInbox } from "react-icons/hi";
import { GoProjectSymlink } from "react-icons/go";
import { PiBrain } from "react-icons/pi";
import { PiQuotes } from "react-icons/pi";
import { FiActivity } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import Link from 'next/link';
import { Avatar } from "@chakra-ui/react";
import Popover from "@mui/material/Popover";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



// type imports
import { ZenTask, ZenUser } from "@/types/uData";
import { ZenProject } from "@/types/uData";
import { UserProps } from "@/types/uData";
import { ProjectProps } from "@/types/uData";

import ZenAddTask from "./🔵addTask_C";
import ZenAddTaskModal from "./🔵addtaskModal_S";
import { BiPlus } from "react-icons/bi";
import ZenAddProjectModal from "./🟢addProjectsModal_C";






export function ZenMenuClient(
  { userdata, taskdata, projectdata, todaystaskdata }: 
  { userdata: ZenUser | null; taskdata: any; projectdata: ZenProject[] | null, todaystaskdata: any }
  ) {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openProj, setOpenProj] = React.useState(false);
  const handleOpenProj = () => setOpenProj(true);
  const handleCloseProj = () => setOpenProj(false);

  return (
    <>
      <header className="hidden sm:flex text-stone-700 w-full h-full">

        <span className='w-full h-full bg-lime-200/50 flex flex-col justify-between p-5'>

          {/* Top Section of Nave */}
          <span className='w-full h-max flex flex-col'>

            {/* avatar - top */}
            <span className='w-full gap-4 flex place-items-center justify-between'>
              
                <span className='w-[80%] p-2 hover:bg-lime-500/30 rounded-lg h-[3em] flex gap-4 items-center'>
                  <Avatar src={userdata?.profileImg as string} className="h-full w-[2em] rounded-full overflow-hidden"/>
                  <span className='truncate'>{userdata?.email}</span>
                </span>
                <span className="p-2 hover:bg-lime-500/30 rounded-lg h-[3em]">
                  <BsLayoutTextWindowReverse size={20} />
                </span> 

            </span> 

            {/* menu */}
            <span className='select-none p-2'>Menu</span>

            {/* add task */}
            <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full cursor-pointer flex gap-2'>

              <FaCirclePlus size={20} />
              <span>
                <ZenAddTaskModal projectdata={projectdata} />
              </span>
            </span>

            {/* Home */}

            <Link href='/home'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] w-full flex gap-2 justify-between place-items-center'>
                <span className="flex gap-2 place-items-center">
                  <HiOutlineHome size={20} />
                  <span>
                    Home
                  </span>
                </span>
                <span className="p-2">
                  {taskdata?.length || 0}
                </span>
              </span>
            </Link>

            {/* Today */}
            <Link href='/today'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] w-full flex gap-2 place-items-center justify-between'>
                <span className="flex gap-2 place-items-center">
                  <IoTodayOutline size={20} />
                  <span>
                    Today
                  </span>
                </span>
                <span className="p-2">
                  {todaystaskdata?.length || 0}
                </span>
              </span>
            </Link>

            {/* Upcoming */}
            <Link href='/upcoming'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2'>
                <IoCalendarOutline size={20} />
                <span>
                  Upcoming
                </span>
              </span>
            </Link>


            {/*Thoughts */}
            <Link href='/thoughts'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2'>
                <PiBrain size={20} />
                <span>
                  Thoughts
                </span>
              </span>
            </Link>

            {/* Quotes */}
            <Link href='/quotes'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2'>
                <PiQuotes size={20} />
                <span>
                  Quotes
                </span>
              </span>
            </Link>

            {/* My Projects */}
            <Link href='/projects'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2 justify-between'>
                <span className="flex gap-2 place-items-center">
                  <GoProjectSymlink size={20} />
                  <span>
                    My Projects
                  </span>
                </span>

                { openProj === false && (
                  
                <span onClick={handleOpenProj} className="p-2 h-max">
                  <IoIosArrowForward className=""  size={15} />
                </span>

                )}
                
                { openProj === true && (
                <span onClick={handleCloseProj} className="p-2">
                  <IoIosArrowDown className=""  size={15} />
                </span>
                )}

              </span>
              {openProj === true && (
                <span className="flex flex-col p-2">
                  {projectdata?.map((project) => (
                    <span className="p-2 hover  flex place-items-center hover:bg-lime-500/30 rounded-lg h-[3em]">
                      {project.name}
                    </span>
                  ))}
                </span>
              )}
            </Link>

          </span>

          {/* Bottom Section of Nave */}
          <span className='w-full h-max flex flex-col'>

            {/* User */}
            <span className='select-none p-2'>User</span>

            {/* Activity */}
            <Link href='/activity'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2'>
                <FiActivity size={20} />
                <span>
                  Activity
                </span>
              </span>
            </Link>

            {/* Settings */}

            <Link href='/settings'>
              <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full flex gap-2'>
                <IoSettingsOutline size={20} />
                <span>
                  Settings
                </span>
              </span>
            </Link>

            {/* Sign Out */}
            <span className='p-2 hover:bg-lime-500/30 rounded-lg h-[3em] place-items-center w-full  cursor-pointer flex gap-2'>
              <PiSignOut size={20} />
              <span>
                Sign out
              </span>
            </span>

          </span>


        </span>

      </header>
    </>
  )
}