//  Root component and supplying contnent to index.js
import React from "react";
import { AppRouting } from "./App.routing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = (args) => {
    return (
        <div>
            <AppRouting />
            <ToastContainer />
        </div>
    )
}

export default App;