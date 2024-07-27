import React from 'react';
import {toast} from "react-toastify";

const TestPage = () => {
    return (
        <div>
            {toast.success("test")}
        </div>
    );
};

export default TestPage;