import "./index.css";
import ReactDOM from "react-dom/client";

// import { StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProtectedApp } from "App";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import { Note } from "pages/Note/Note";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { PageNoteFound } from "pages/PageNoteFound/PageNoteFound";
import { Signin } from "components/Signin/Signin";
import { Signup } from "components/Signup/Signup";
import { FirebaseApp } from "utils/firebase";

FirebaseApp.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedApp />}>
            <Route path="/" element={<NoteBrowse />} />
            <Route path="/note/new" element={<NoteCreate />} />
            <Route path="/note/:noteId" element={<Note />} />
          </Route>
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
