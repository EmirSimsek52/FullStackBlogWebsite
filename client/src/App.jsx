import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Homepage from './components/Homepage';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import { UserContextProvider } from './UserContext';
import PostPage from './components/PostPage';
import Profile from './components/Profile';
import EditPage from './components/Edit';
function App() {
  const [userName, setUserName] = useState(null);

  return (
    <UserContextProvider>
    <Router>
    <Navbar/>
        <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/postpage/:id" element={<PostPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createpost' element={<CreatePost/>} />
        <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
  </Router>
  </UserContextProvider>
  )
}

export default App
