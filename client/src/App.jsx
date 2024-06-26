import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeContent from "./pages/RecipeContent";
import AddRecipe from "./pages/AddRecipe";
import Menus from "./pages/Menus";
AddRecipe
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/:id" element={<RecipeContent/>}></Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/menus" element={<Menus />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
