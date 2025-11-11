import { configureStore } from "@reduxjs/toolkit";
import registrationsReducer from "../features/registratios/registrationsSlice";

export const store = configureStore({
  reducer: {
    registrations: registrationsReducer,
  },
});
