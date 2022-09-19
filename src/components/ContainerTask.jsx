import { isEditable } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import ContainerEdit from "./ContainerEdit";

const ContainerTask = () => {
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      title: "new Task",
      desc: "ini desc",
      createdAt: "Sept 8th, 12:00 pm",
      comment: [
        { id: 9, textComment: "This is Comment", date: "3 minutes ago" },
      ],
    },
    {
      id: 2,
      title: "new Task 2 ",
      desc: "ini desc 2 ",
      createdAt: "Sept 9th, 12:00 pm",
      comment: [
        { id: 4, textComment: "This is Comment", date: "3 minutes ago" },
      ],
    },
    {
      id: 3,
      title: "new Task 3",
      desc: "ini desc 3",
      createdAt: "Sept 10th, 12:00 pm",
      comment: [
        { id: 5, textComment: "This is Comment", date: "8 minutes ago" },
      ],
    },
  ]);

  const [isDeleteTask, setIsDeleteTask] = useState({
    id: null,
    status: false,
  });

  const [editTask, setEditTask] = useState({
    id: 1,
    status: false,
  });

  const [searchTask, setSearchTask] = useState("");

  const [findTask, setFindTask] = useState([]);

  const [foodApi, setFoodApi] = useState([]);

  const handleEditTask = (id) => {
    setEditTask({ id: id, status: true });
  };

  const handleAddTask = () => {
    setIsDeleteTask({ id: null, status: false });
    let addTaskToAllTask = [
      ...allTasks,
      {
        id: uid(),
        title: "new Task",
        desc: "ini desc baru",
        createdAt: "Sept 12th, 12:00 pm",
        comment: [],
      },
    ];
    setAllTasks(addTaskToAllTask);
  };

  const handleDelete = (id) => {
    setIsDeleteTask({ id: id, status: true });
    let getAllDataTask = [...allTasks];
    let deleteOneTask = getAllDataTask.filter((item) => item.id !== id);

    let getFindTask = [...findTask];
    let deleteFindTask = getFindTask.filter((item) => item.id !== id);

    setAllTasks(deleteOneTask);
    setFindTask(deleteFindTask);
  };

  const handleSearch = (e) => {
    setFindTask([]);
    setSearchTask(e.target.value);
  };

  const submitSearch = (e) => {
    setFindTask([]);
    setSearchTask("");
    e.preventDefault();

    let dataSearchTask = [...allTasks];
    let findAllTask = dataSearchTask.filter((item) =>
      item.title.includes(searchTask)
    );
    setFindTask(findAllTask);
    setSearchTask("");
  };

  const URL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast";

      const URL2 =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=pasta";

  const getMealsApi = async () => {
    let getDataApi = await fetch(URL);
    let res = await getDataApi.json();
    setFoodApi(res.meals);
  };

  const getMealsApiAxios = async () => {
    let getDatafromApi = await axios(URL2);
      let getFoodAxios = getDatafromApi.data.meals.splice(0, 9);
      setFoodApi(getFoodAxios);
        console.log(foodApi);
  }
  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen lg:relative">
      <div className="flex flex-col w-full">
        <div className="bg-gray-200 px-5 border-b border-solid border-b-gray-300 py-2  w-full flex flex-row justify-between">
          <h5> Task </h5>
          <button
            className="p-1 px-2 bg-green-400 text-white rounded-[2px]"
            onClick={handleAddTask}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div className="flex flex-col p-5 pb-[100px] gap-2 min-h-screen  bg-gray-50 border border-solid border-gray-300">
          {allTasks &&
            allTasks.map((item) => (
              <div className="flex flex-row justify-between">
                <div
                  key={item.id}
                  onClick={() => handleEditTask(item.id)}
                  className="rounded-[5px] p-4 w-[400px]  border border-solid cursor-pointer border-gray-200 bg-white"
                >
                  <div>
                    <input type="checkbox" />
                    <span className="pl-2"> {item.title} </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-5 border border-solid border-gray-300 px-5"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            ))}

          <div className="mt-10">
            <form
              className="flex flex-row justify-between items-center"
              onSubmit={submitSearch}
            >
              <div>
                <input
                  className="w-[550px] rounded-[2px] border border-solid border-gray-300 mr-4 flex-1 bg-white text-center py-4"
                  type="text"
                  value={searchTask.textSearch}
                  onChange={handleSearch}
                  placeholder="looking for task ..."
                />
              </div>
              <button className="w-30 bg-blue-400  rounded-[6px] border border-solid text-white py-4 px-2 border-gray-300">
                {" "}
                Search{" "}
              </button>
            </form>
          </div>

          <div className="bg-blue-300 mt-[50px]">
            {findTask?.map((item) => (
              <div className="flex flex-row justify-between">
                <div
                  onClick={() => handleEditTask(item.id)}
                  className="rounded-[5px] p-4 w-[400px]  border border-solid cursor-pointer border-gray-200 bg-white"
                >
                  <div>
                    <input type="checkbox" />
                    <span className="pl-2"> {item.title} </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-5 border border-solid border-gray-300 px-5"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3> Meals API </h3>
            <button onClick={getMealsApi} className="border border-solid border-gray-300 p-4 mr-2"> get Api from fetch </button>
                <button onClick={getMealsApiAxios} className="border border-solid border-gray-300 p-4"> get Api from axios </button>

            {foodApi.map((item) => (
              <div>{item.strMeal}</div>
            ))}
          </div>
        </div>

        <form id="completeTask">
          <div className="w-full p-4 bg-white lg:fixed bottom-0 lg:border lg:border-solid lg:border-gray-300">
            <input type="checkbox" name="allComplete" className="mr-2 p-2" />{" "}
            Mark all as complete
          </div>
        </form>
      </div>

      <ContainerEdit
        isDeleteTask={isDeleteTask}
        dataEditTask={editTask}
        allTasks={allTasks}
      />
    </div>
  );
};

export default ContainerTask;
