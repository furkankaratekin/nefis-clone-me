import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Bu satırı genellikle ana componentinize eklemeniz daha iyi olur
import { useDispatch } from "react-redux";

const AddRecipe = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      name: "",
      picture :"",
      category: "",
      ingredients: [],
      recipe: "",
      calorie: "",
      content_photos: [],
    });
    const token = currentUser.token

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "ingredients" || name === "content_photos") {
      setFormData({
        ...formData,
        [name]: value.split(","),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

const handleSubmit = async (event) => {
 event.preventDefault();

 // Form alanlarını kontrol et
 if (!formData.name.trim()) {
   toast.error("Adı alanı boş bırakılamaz!");
   return;
 }
 if (!formData.category.trim()) {
   toast.error("Kategori alanı boş bırakılamaz!");
   return;
 }
 if (
   formData.ingredients.length === 0 ||
   formData.ingredients[0].trim() === ""
 ) {
   toast.error("Malzemeler alanı boş bırakılamaz!");
   return;
 }
 if (!formData.recipe.trim()) {
   toast.error("Tarif alanı boş bırakılamaz!");
   return;
 }
 if (!formData.calorie.trim()) {
   toast.error("Kalori alanı boş bırakılamaz!");
   return;
 }
 if (!formData.picture.trim()) {
   toast.error("Kapak görsel alanı boş bırakılamaz!");
   return;
 }
 if (
   formData.content_photos.length === 0 ||
   formData.content_photos[0].trim() === ""
 ) {
   toast.error("İçerik Fotoğrafları alanı boş bırakılamaz!");
   return;
 }

 const bodyParameters = {
   name: formData.name,
   category: formData.category,
   picture: formData.picture,
   ingredients: formData.ingredients,
   recipe: formData.recipe,
   content_photos: formData.content_photos,
   calorie: formData.calorie,
 };

 const config = {
   headers: { Authorization: `Bearer ${token}` },
 };

 try {
   await axios.post(
     "http://localhost:5000/api/recipe/add",
     bodyParameters,
     config
   );
   toast.success("Yorum başarı ile eklendi");
 } catch (error) {
   console.error("Yorum eklerken bir hata oluştu:", error);
   toast.error(
     `Yorum eklenirken bir sorun oluştu: ${
       error.response ? error.response.data.message : error.message
     }`
   );
 }
};

console.log(token)
return (
  <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-gray-700">Adı:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Kapak Götsei</label>
        <input
          type="text"
          name="picture"
          value={formData.picture}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Kategori:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">
          Malzemeler (virgül ile ayırarak giriniz):
        </label>
        <input
          type="text"
          name="ingredients"
          value={formData.ingredients.join(",")}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Tarif:</label>
        <textarea
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Kalori:</label>
        <input
          type="text"
          name="calorie"
          value={formData.calorie}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">
          İçerik Fotoğrafları (virgül ile ayırarak giriniz):
        </label>
        <input
          type="text"
          name="content_photos"
          value={formData.content_photos.join(",")}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Gönder
      </button>
    </form>
    <hr />
    <h3 className="text-center mt-20 text-3xl text-red-700 underline">
      Tariflerim
    </h3>
    <ToastContainer />
  </>
);
   
};

export default AddRecipe;



//Kullanıcı id'ye göre tarifleri listele

// Yeni bir tarif ekle

// Mevcut bir tarifi güncelle

//Mevcut bir tarifi silmek için
