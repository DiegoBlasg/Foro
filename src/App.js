import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Home from './Components/Home/Home';
import Profile from './Components/Profile';
import Post from './Components/Post/Post';
import NewPost from './Components/NewPost';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Post />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
