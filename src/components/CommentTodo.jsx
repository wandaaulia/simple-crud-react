import React, { useEffect, useState } from 'react'

const CommentTodo = ({comments, id, allTodo}) => {

    const [isDeleteComment, setIsDeleteComment] = useState(
false
    );

    const [allComments, setAllComments] = useState([]);
    
    const handleDeleteComment = (id, commentId) => {
        let getAllDataTodo = [...allTodo];
        let getOneData = getAllDataTodo.find((item) => item.id === id);
        let filterComment = getOneData.comments.filter((item) => item.id !== commentId);
        getAllDataTodo.forEach((item) => {
            if(item.id === id) {
             setIsDeleteComment(true);
               item.comments = filterComment;
                 setAllComments(filterComment);
            }
        });
    }


    useEffect(() => {
        
        if(!isDeleteComment) {
       setAllComments(comments);
        }

    }, [allTodo, allComments])



  return (
    <div className='my-4'>
    {
        allComments.map((item) => 
            <div key={item.id} className="mb-[4px] flex flex-row justify-between">
             <p> {item.text} </p> 
             <button 
             onClick={() => handleDeleteComment(id, item.id)}
             className='border border-solid bg-red-300 py-2 px-4 rounded-[10px]'> Delete comment </button> 
             </div>
    )
    }
      
    </div>
  )
}

export default CommentTodo
