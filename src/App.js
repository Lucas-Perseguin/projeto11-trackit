import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Habits from './Pages/Habits';
import History from './Pages/History';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Today from './Pages/Today';
import UserContext from './UserContext'

function App() {
  const [user, setUser] = useState({ name: '', image: '' });
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cadastro' element={<SignUp />} />
          <Route path='/habitos' element={<Habits />} />
          <Route path='/hoje' element={<Today />} />
          <Route path='/historico' element={<History />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
