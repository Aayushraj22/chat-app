import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "../Pages/home/Home";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<App />}
                errorElement={<ErrorPage />}
            >
                <Route index element={<Home/>} />
                {/* route for chat */}
            

            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
        </Route>
    )
)


export {router}