import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

import StoryProvider from "../hooks/StoryContext.jsx";

import Landing from "../pages/Landing.jsx";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Home from "../pages/Home.jsx";

import CreateStory from "../pages/story/CreateStory.jsx";
import StoryPage from "../pages/story/StoryPage.jsx";
import EditStory from "../pages/story/EditStory.jsx";

import Profile from "../pages/profile/Profile.jsx";
import EditProfile from "../pages/profile/EditProfile.jsx";

import NotFound from "../pages/NotFound.jsx";

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