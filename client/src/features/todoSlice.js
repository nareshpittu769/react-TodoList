import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      action.payload.data && state.push(action.payload);
    },
    editTodo: (state, action) => {
      //   state.splice(action.payload.id, 1, action.payload.data);
      console.log(action);
      console.log(state);
      state.map((item) => {
        console.log(item);
        if (item.id === action.payload.id) {
          item.data = action.payload.data;
        }
        return item;
      });
      return state;
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    handleCheck:(state,action)=>{
      state.map((item)=>{
        if (item.id === action.payload){
          item.completed = !item.completed
        }
        return item
      })
    }
  },
});

export const { addTodo, editTodo, deleteTodo,handleCheck } = todoSlice.actions;
export default todoSlice.reducer;
