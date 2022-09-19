import React, { useEffect, useState } from 'react'
import { uid } from 'uid';
import CommentTodo from '../components/CommentTodo';

const Home = () => {

    const [todoInput, setTodoInput] = useState('');
    const [addTodo, setAddTodo] = useState([]);
    const [detailTodo, setDetailTodo] = useState({});
    const [isEditTitle, setIsEditTitle] = useState({}
);
const [addComment, setAddComment] = useState({
    id: null, status: 'false'
})
const [inputComment, setInputComment] = useState('');

    const handleChangeInput = (e) => {
        setTodoInput(e.target.value);
    }
    
    const handleAddTodo = (e) => {
        e.preventDefault();
        let dataTodo = [...addTodo];
        dataTodo.push({id: uid(), title: todoInput, comments: []});
        setAddTodo(dataTodo);
        setTodoInput('');
        console.log(addTodo);
    }

    const handleDetail = (id) => {
        let getTodo = [...addTodo];
        let findTodo = getTodo.find((item) => item.id === id);
       setDetailTodo({id: findTodo.id, title: findTodo.title});
    }

    const handleEditTitle = (e, id) => {
       setIsEditTitle({id: id, title: e.target.value});
     setDetailTodo({id: id, title: e.target.value});
     
    }

    const handleChangeTitle = (e, id) => {
        setDetailTodo({id: id, title: e.target.value});
    }

    const submitTitle = (e, id) => {
        e.preventDefault();

        setIsEditTitle({id: id, title: detailTodo.title});
     setDetailTodo({id: id, title: detailTodo.title});

   let getAllTodo = [...addTodo];
        getAllTodo.forEach((item) => {
            if(item.id === id) {
                item.title = detailTodo.title
      
            }
        });
    }

    const handleComment = (e, id) => {
        e.preventDefault();
        setAddComment({id: id, status: true});
    }

    const handleChangeComment = (e) => {
         setInputComment(e.target.value);
    }

    const sendComment = (e) => {
        e.preventDefault();
        let getOneTask = [...addTodo];
        getOneTask.forEach((item) => {
            if(item.id === addComment.id) {
                item.comments.push({id: uid(), text: inputComment});
            }
        })

        setInputComment('');
    }

    const handleDeleteTodo = (id) => {
        let getAllData = [...addTodo];
        let filterData = getAllData.filter((item) => item.id !== id);
        setAddTodo(filterData);
        
        if(detailTodo.id === id) {
            setDetailTodo({});
        }
    }


  return (
    <div className='mx-[50px] my-[50px] px-[100px] flex flex-col'>
      <div> 
       <form className='flex flex-row' onSubmit={handleAddTodo}>
       <div>
        <input type="text" className='mr-[20px] py-4 bg-white flex-1 w-[600px] px-4 border border-solid border-gray-200' value={todoInput} onChange={handleChangeInput}/>
         </div>
        <button className='bg-blue-500 text-white border border-solid border-gray-200 p-4'> add todo </button>
       </form>
      </div>
      <div className='mt-10 border border-solid p-8 px-12 border-gray-300 w-full'>
        { addTodo.map((item) => 
        <div className='flex flex-row justify-between mb-4'> 
        <div className='flex flex-col'>
 <div onClick={() => handleDetail(item.id)} key={item.id} className="border border-solid border-gray-200 w-[500px] px-4 py-4"> {item.title} </div>
            <CommentTodo comments={item.comments} id={item.id} allTodo={addTodo}/>
        </div>
           
            <button className='bg-rose-200 py-2 px-6' onClick={() => handleDeleteTodo(item.id)}> delete </button>
        </div>
        
        )}
      </div> 

      <div className='mt-10 border border-solid p-8 px-12 border-gray-300 w-full'>
            {detailTodo?.id &&
            <> 
    <form className='flex flex-row '> 
             <input type="text" value={detailTodo.title} onChange={e => handleChangeTitle(e, detailTodo.id)}
             className='mr-[4px] py-4 bg-white flex-1 w-[50px] px-4 border border-solid border-gray-200' /> 
             <div className='flex flex-col gap-2'> 
         <button className='px-6 py-4 bg-green-500 text-white' onClick={(e) => submitTitle(e, detailTodo.id)}> Edit Title </button>
            <button className='px-6 py-4 bg-blue-500 text-white'
            onClick={(e) => handleComment(e, detailTodo.id)}> Add comment </button>
             </div>
            </form>
            {
                addComment.id === detailTodo.id && 
                  <div>
             <form className='flex flex-row mt-8'> 
             <input type="text" value={inputComment} onChange={handleChangeComment}
             className='mr-[4px] py-4 bg-white flex-1 w-[50px] px-4 border border-solid border-gray-200' /> 
             <button className='px-6 py-4 bg-blue-400 text-white'
             onClick={sendComment}> send Comment </button>
             </form>
                 </div>
            }
          
        </>
          }
      </div>
    </div>
  )
}

export default Home
