import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './routes/Homepage';
import Register from './routes/Register';
import Appbar from './components/Appbar';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Appbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
);
