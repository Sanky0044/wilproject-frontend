import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
//imported the pages to render
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Single from "./pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./Components/Footer";
import "./style.scss"

//created function of layout to create the element efficiently 
const Layout = ()=>{
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  );
};

// created outlet from react router dom so that every pages will have the same component 
// created path for each page so that user can route to the particular
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/post/:id",
        element: <Single/>
      },
      {
        path:"/post",
        element: <Post/>
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
  <div className="app">
    <div className="container">
      <RouterProvider router={router}/>
    </div>
  </div>
  );
   
}


export default App;
