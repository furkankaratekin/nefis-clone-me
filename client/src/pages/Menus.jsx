import React, { useState, useEffect } from "react";
import axios from "axios";

const Menus = () => {
  // State to store the menus
  const [menus, setMenus] = useState([]);

  // useEffect to fetch the menus on component mount
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenus(response.data); // Assuming the response data is the array of menus
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []); // The empty array ensures this effect runs once on mount

  return (
    <div>
      <h2>Menus</h2>
      {menus.map((menu) => (
        <div key={menu._id}>
          <h3>{menu.name}</h3>
          <p>{menu.content}</p>
          <p>{menu.popular ? "Popular" : "Not Popular"}</p>
        </div>
      ))}
    </div>
  );
};

export default Menus;
