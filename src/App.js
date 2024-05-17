// import logo from './logo.svg';
import Box from '@mui/material/Box';
import AppBar from './components/AppBar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import AddTask from './Pages/AddTask';
import TasksList from './Pages/TasksList';
import './App.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <><AppBar /> <Home /></>
  },
  {
    path: '/add-task/:id?',
    element: <><AppBar /><AddTask /></>
  },
  {
    path: '/task-list',
    element: <><AppBar /><TasksList /></>
  }
])

function App() {
  return (
    <>
      <Box component="main" sx={{ pt: 10 }}>
        <RouterProvider router={router} />
      </Box>
    </>
  );
}

export default App;
