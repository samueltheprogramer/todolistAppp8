import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { auth, db, storage } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between items-center w-[250px]`,
  input: `border p-2 w-[200px] text-xl m-1`,
  button: ` p-4  bg-purple-500 text-slate-100 rounded-full ml-3  hover:bg-green-500 hover:border-2 hover:border-black`,
  count: `text-center p-2`,
};

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskImage, setTaskImage] = useState();
  const [taskImageName, setTaskImageName] = useState("");
  const navigate = useNavigate();

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      deadline,
      taskImageName,
      userId: auth.currentUser.uid,
    });

    setInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const addImage = async () => {
    if (taskImage == null) return;
    const metadata = { contentType: "image/jpeg" };
    const imageRef = ref(storage, `images/${taskImage.name}`);

    await uploadBytes(imageRef, taskImage, metadata);
  };
  const imageName = () => {
    setTaskImageName(taskImage?.name);
  };

  const handleUplodeImage = () => {
    addImage();
    imageName();
  };

  const handleSignOut = async () => {
    await signOut(auth);

    navigate("/");
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className="flex flex-col">
          <h3 className={style.heading}>Todo App</h3>
          <div className="flex justify-between items-center">
            <div>
              <img
                src={auth.currentUser.photoURL}
                alt=""
                className="w-10 rounded-full "
              />
              <h2>{auth.currentUser.displayName}</h2>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-4 text-sm  p-1   bg-blue-500 text-slate-100 rounded-full hover:bg-red-500 hover:border-2 hover:border-black"
            >
              sign-out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center w-[300px] border-black border-2 rounded-md p-2 ">
          <div className="w-[200px]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Add Todo"
            />
            <input
              className="m-1"
              type="file"
              name=""
              filename={taskImage}
              onChange={(e) => setTaskImage(e.target.files[0])}
            />
            <label htmlFor="">Deadline :</label>
            <input
              className="w-20 m-1"
              type="text"
              name=""
              id=""
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div>
            <button className={style.button} onClick={createTodo}>
              <AiOutlinePlus size={30} />
            </button>
            <button
              onClick={handleUplodeImage}
              className="mt-4 text-sm  p-1   bg-purple-500 text-slate-100 rounded-full hover:bg-green-500 hover:border-2 hover:border-black"
            >
              step-1 UplodeImage
            </button>
          </div>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default Home;
