import React, { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import ImageGrid from "../components/ImageGrid";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const[user,setUser] = useState({});

  const fetchImages = async () => {
    try {
      const res = await API.get("/images");
      console.log("Fetched imagess:", res.data.images);
      setImages(res.data.images);
      setUser(res.data.user); // 👈 set user data
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar
        user={{ name:user.name , email: user.email }} // 👈 pass user data to Navbar
        onUpload={(newImage) => setImages([newImage, ...images])} // 👈 handle upload
      />
      <ImageGrid images={images} />
    </div>
  );
}
