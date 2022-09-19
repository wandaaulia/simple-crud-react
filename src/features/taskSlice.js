import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
  tasks: [
    {   
      id:1, 
      title : 'This is Task A',
      createdAt:  'Sept 12th, 10:00 pm',
      desc : '',
      complete : false},
         {   
          id:2, 
          title : 'New Task',
      createdAt:  'Sept 12th, 10:00 pm',
      desc : '',
      complete : false},
         {   id:3, title : 'New Task',
      createdAt:  'Sept 12th, 10:00 pm',
      desc : '',
      complete : false},
         {   id:4, title : 'New Task',
      createdAt:  'Sept 12th, 10:00 pm',
      desc : '',
      complete : false},
         {   id:5, title : 'New Task',
      createdAt:  'Sept 12th, 10:00 pm',
      desc : '',
      complete : false}
  ],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state) => {
       const pseudoId = Math.random().toString(16).slice(2);
     
       let datesTime = moment().format('MMMM Do, h:mm a');
      
       state.tasks.push({
      id: pseudoId,
      title : 'New Task',
      createdAt:  datesTime,
      desc : '',
      complete : false
     });
    },
  },
})

export const { setTask } = taskSlice.actions

export default taskSlice.reducer