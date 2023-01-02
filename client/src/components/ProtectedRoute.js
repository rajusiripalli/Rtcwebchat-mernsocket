import React, {useEffect, useState} from 'react'
import {GetCurrentUser} from '../apicalls/users';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function ProtectedRoute({children}) {
    const navigate = useNavigate();

    const [user, setUser] = useState('');

    const getCurrentUser = async () =>{
        try {
            const response = await GetCurrentUser();
            if(response.status){
                console.log("get current data ===> ", response.data);
                setUser(response.data);
            }else{
                toast.error(response.message)
                navigate('/login');
                return false
            }
        } catch (error) {
            toast.error(error.message)

            navigate("/login");

        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
          getCurrentUser();
        } else {
          navigate("/login");
        }
      }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
    {/* header */}
    <div className="flex justify-between p-5 bg-primary rounded">
      <div className="flex items-center gap-1">
        <i className="ri-message-3-line text-2xl text-white"></i>
        <h1
          className="text-white text-2xl uppercase font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          RTCWEBCHAT
        </h1>
      </div>
      <div className="flex gap-2 text-md items-center bg-white p-2 rounded">
        {user?.profilePic && 
          <img
            src={user?.profilePic}
            alt="profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        }
        {!user?.profilePic && <i class="ri-shield-user-line text-primary"></i>}
        <h1
          className="underline text-primary cursor-pointer"
          onClick={() => {
            //navigate("/profile");
          }}
        >
          {user?.name}
        </h1>

        <i
          class="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        ></i>
      </div>
    </div>

    {/* content (pages) */}
    <div className="py-5">{children}</div>
  </div>
  )
}

export default ProtectedRoute