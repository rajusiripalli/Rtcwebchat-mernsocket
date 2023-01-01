import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="h-screen bg-green-500 ">
            <Toaster position="top-center" reverseOrder={false} />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
        </BrowserRouter>
   </div>
  );
}

export default App;
