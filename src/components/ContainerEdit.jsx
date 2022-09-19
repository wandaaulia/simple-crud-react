import React, {useEffect, useState} from 'react'
import { uid } from 'uid';

const ContainerEdit = ({isDeleteTask, dataEditTask, allTasks}) => {
    let getEditTask = allTasks.find((item) => item.id === dataEditTask.id);

    const [descTask, setDescTask] = useState('');

    const [addComment, setAddComment] = useState({
         id: null, textComment: '', date : ''
    })

    useEffect(() => {
     setDescTask(getEditTask?.desc);

     if(isDeleteTask.id === dataEditTask.id) {
     setDescTask('');
     }

    }, [dataEditTask, allTasks])

    const handleChangeDesc = (e, id) => {
         let getTask = [...allTasks];
         getTask.forEach((item) => {
            if(item.id === id) {
                item.desc = e.target.value
            }
         })
         setDescTask(e.target.value);
    }

    const handleChangeComment = (e) => {
        setAddComment({
            id: uid(), textComment: e.target.value, date: '5 minutes ago'
        });
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();
        getEditTask.comment.push(addComment);
        setAddComment({id: null, textComment: '', date: ''})
    }

  return (
    <div className='flex flex-col  w-full'>
        <> 
 <h4 className='bg-gray-100 px-4 py-3 border-b border-solid border-b-gray-300'> Created : {getEditTask?.createdAt} </h4>
        <form id="form">
            <textarea 
            value={descTask} 
            name="desc"
            onChange={e => handleChangeDesc(e, getEditTask?.id)}
            className='w-full bg-gray-50 p-4 border-b border-solid border-b-gray-300' > 
            </textarea>
        </form>
        <div className='comments mb-4'> {
            getEditTask?.comment.map((item) => (
                 <div className='p-4 border-b border-solid border-b-gray-300'> 
                <p> {item.textComment} </p>
                <p className='text-xs text-gray-500'>{item.date} </p>
            </div>
            ))
        }
        </div>
        </>
        <form id="formComments" onSubmit={handleSubmitComment}>
            <div className='w-full flex flex-row bg-gray-100 p-2 lg:fixed bottom-0 lg:border lg:border-solid lg:border-gray-300'> 
                <input type="text" 
                value={addComment.textComment}
                name="textComment"
                onChange={handleChangeComment}
                className='w-[300px]  p-2 border border-solid border-gray-300'
                 placeholder='Type a comment'/>
                <button className='w-[20%]'> send </button>
            </div>
        </form>
    </div>
 
  )
}

export default ContainerEdit
