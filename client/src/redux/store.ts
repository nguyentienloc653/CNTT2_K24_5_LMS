import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/studentSlice";
import teacherReducer from "./slices/teacherSlice";
import classReducer from "./slices/classesSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    classes: classReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;