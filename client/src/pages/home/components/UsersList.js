import React from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {CreateNewChat} from '../../../apicalls/chats';
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { SetAllChats, SetSelectedChat } from "../../../redux/userSlice";



const UsersList = ({searchKey}) => {
  const {allUsers, allChats, user} = useSelector(state => state.userReducer)
    console.log("all chats list ===> ", allChats)
  const dispatch = useDispatch();
  const createNewChat = async (receipentUserId) => {
    try {
      dispatch(ShowLoader());
      const response = await CreateNewChat([user._id, receipentUserId]);
      dispatch(HideLoader());
      if (response.status) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChats = [...allChats, newChat];
        dispatch(SetAllChats(updatedChats));
        ///dispatch(SetSelectedChat(newChat));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };
 

  return (
    <div className="flex flex-col gap-3 mt-5 lg:w-96 xl:w-96 md:w-60 sm:w-60">
      {
        allUsers.filter(
          (userobj) =>
          userobj.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey
        ).map((userObj) => {
          return (
            <div className='shadow-sm border p-2 rounded-xl bg-white flex justify-between items-center cursor-pointer w-full'>
            <div className="flex gap-5 items-center">
              {userObj.profilePic && (
                <img
                  src={userObj.profilePic}
                  alt="profile pic"
                  className="w-10 h-10 rounded-full"
                />
              )}
              {!userObj.profilePic && (
                <div className="bg-gray-400 rounded-full h-12 w-12 flex items-center justify-center relative">
                  <h1 className="uppercase text-xl font-semibold text-white">
                    {userObj.name[0]}
                  </h1>
                </div>
              )}
                <h1>{userObj.name}</h1>
              </div>
              <div onClick={() => createNewChat(userObj._id)}>
                  {!allChats.find((chat) =>
                    chat.members.map((mem) => mem).includes(userObj._id)
                  ) && (
                    <button className="border-primary border text-primary bg-white p-1 rounded">
                      Create Chat
                    </button>
                  )}
            </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersList