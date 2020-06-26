import React from "react";
import "./App.css";
import Header from "./main-components/Header/Header";
import Routes from "./main-components/Routes/Routes";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
};

export default App;
