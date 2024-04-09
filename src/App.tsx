import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <div className="app">
                <RouterProvider router={router} />

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
            </div>
        </>
    );
}

export default App;
