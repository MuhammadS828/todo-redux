import {
  applyMiddleware,
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  todos: [],
  loading: false,
};
//Добавление дела
export const addTodo = createAsyncThunk("addTodo", async (value, thunkAPI) => {
  try {
    const todo = {
      text: value,
    };
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//Вывод всех дел
export const fetchTodos = createAsyncThunk("fetchTodo", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3000/todos");
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//Удаление дела
export const removeTodo = createAsyncThunk(
  "deleteTodo",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      return id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Выбрать избранное
export const makeFavoriteTodo = createAsyncThunk(
  "favoriteTodo",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: { isComplete: "!isComplete" },
      });
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const countReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      }).addCase(makeFavoriteTodo.fulfilled, (state, action) => {
        state.todos.map((item) => {
          if(item._id === action.payload){
            return(item.isComplete = !item.isComplete)
          }
        })
      })
  },
});

export default countReducer.reducer;
