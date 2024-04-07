import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer text-md font-bold w-30 `,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

export default function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={todo?.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
          className="mr-2 w-10"
        />
        <div className="mt-5 mb-5">
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}
          >
            {todo.text}
          </p>
          <p className="w-32"> deadline :{todo.deadline}</p>
        </div>
        <img
          className="w-20 h-[100px] "
          src={`https://firebasestorage.googleapis.com/v0/b/todolistapp-559f6.appspot.com/o/images%2F${todo?.taskImageName}?alt=media&token=641734d6-a03e-41e3-b71f-df881e112c61`}
          alt=""
        />
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
}
