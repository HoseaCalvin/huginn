import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";

import PrivateRoute from "./PrivateRoute.jsx";

import StoryProvider from "../hooks/StoryContext.jsx";

import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import CreateStory from "../pages/CreateStory.jsx";
import Profile from "../pages/Profile.jsx";
import EditStory from "../pages/EditStory.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import NotFound from "../pages/NotFound.jsx";
import StoryPage from "../pages/StoryPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: (
          <StoryProvider>
            <Home />
          </StoryProvider>
        ),
      },
      {
        path: '/story',
        children: [
          { 
            path: 'get/:id', 
            element: (
              <StoryProvider>
                <StoryPage/>
              </StoryProvider>
            )
          },
          { path: 'create', element: <CreateStory /> },
          { path: 'edit/:id', element: <EditStory /> },
        ],
      },
      {
        path: '/profile',
        children: [
          { index: true, element: <Profile /> },
          { path: 'edit/:id', element: <EditProfile /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);


const AppRoutes = () => (
    <RouterProvider router={router}/>
)

export default AppRoutes;