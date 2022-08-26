import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Post from './Pages/Post/Post';
import NewPost from './Pages/NewPost';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const getUser = () => {
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, [])
  return (
    <BrowserRouter>
      <Menu user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
        <Route path="/post/:id_post" element={user ? <Post user={user} /> : <Navigate to="/" />} />
        <Route path="/newpost" element={user ? <NewPost user={user} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
