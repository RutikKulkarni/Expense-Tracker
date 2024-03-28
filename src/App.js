import React from "react";
import { SnackbarProvider } from 'notistack';
import Home from "./Pages/Home";

const App = () => {
  return (
    <div>
      <SnackbarProvider maxSnack={3}></SnackbarProvider>
      <Home />
    </div>
  );
};

export default App;
