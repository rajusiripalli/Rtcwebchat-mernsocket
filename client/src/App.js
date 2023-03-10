import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {
  const {isloader} = useSelector(state => state.loaderReducer)

  return (
    <div className="h-screen bg-green-500 ">
            <Toaster position="top-center" reverseOrder={false} />
            {isloader && <Loader />}

        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                    <Home />
              </ProtectedRoute>
            }/>
            
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
        </BrowserRouter>
   </div>
  );
}

export default App;
