import React from 'react';
import MainHeader from "./components/MainHeader";
import MainForm from "./components/AdminPanel/MainForm";

const AdminPanel = () => {
    return (
        <div className="App">
            <MainHeader/>
            <MainForm/>
        </div>
    );
};

export default AdminPanel;