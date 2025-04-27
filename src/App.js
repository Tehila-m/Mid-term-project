import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainUsersPage from './users/MainUsersPage'
import Layout from "./common/Layout";
import AddTask from './tasks/AddTask';
import HomaPage from './components/homePage';
import UsersList from './users/UsersList';
import MainTodosPage from './todos/MainTodosPage';

function App() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:7001/api/posts")
  //     .then(response => setPosts(response.data))
  //     .catch(error => console.error("Error fetching posts:", error));
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomaPage/>}/>
          <Route path='/api/todos' element={<MainTodosPage/>}/>
          <Route path='/api/users' element={<MainUsersPage />}>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
