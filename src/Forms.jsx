import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./features/features";

const Forms = () => {
  const [value, setValue] = useState('')
 const dispatch = useDispatch();

 const handleClick = () => {
   dispatch(addTodo(value))
   setValue('')
 }

  const handleValue = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="containerForms">
     
        <input className="input" type="text" onChange={handleValue}  value={value} placeholder="Введите текс" />
        <button className="addButton" onClick={handleClick}>добавить</button>
      
    </div>
  );
};
export default Forms;
