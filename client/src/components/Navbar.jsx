import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
 const { currentUser } = useSelector((state) => state.user);
 return (
   <div className="bg-white p-0 sticky top-0 flex justify-between items-center">
 

     {/* Avatar ve Menü */}
     <div className="flex items-center space-x-6 mr-5 ">
       {/* Menü */}

       {/* Avatar */}
       <div className="flex items-center">
         <Link to="/profile">
           {currentUser ? (
             <img
               src={currentUser.profilePicture}
               alt="profile"
               className="h-7 w-7 rounded-full object-cover"
             />
           ) : (
             <div className="bg-gray-200 rounded-full flex items-center justify-center bg-transparent">
               <FaUser className="md:h-8 w-8 h-10 w-10" />
             </div>
           )}
         </Link>
       </div>
     </div>
   </div>
 );
}

export default Navbar
