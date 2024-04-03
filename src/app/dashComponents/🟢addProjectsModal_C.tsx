'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ZenAddTaskForm from './🔵addTaskForm_C';
import { getUserData } from '@/actions/database';
import { ProjectProps } from "@/types/uData";
import ZenAddProjectForm from './🟢addProjectsForm_C';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 2,
};

export default function ZenAddProjectModal({projectdata}: any) {
  const [modalopen, setmodalOpen] = React.useState(false);
  const handleModalOpen = () => setmodalOpen(true);
  const handleModalClose = () => setmodalOpen(false);

  return (
    <div>
      <button onClick={handleModalOpen} className='flex gap-2 flex-col'>
        <span className="font-bold"># Add Project</span>
        <span className="text-stone-400 text-xs">Plan and manage tasks</span>
      </button>      
      <Modal
        open={modalopen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
        <Box sx={style}>
            <ZenAddProjectForm projectdata={projectdata} modalopen={modalopen} handleModalClose={handleModalClose}/>
        </Box>
      </Modal>
    </div>
  );
}