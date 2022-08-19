import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Home from './Components/Home';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
