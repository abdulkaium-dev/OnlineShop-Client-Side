import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import axiosInstance from "../Api/axios";
import Swal from "sweetalert2";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const IMAGEBB_API_KEY = "4794f23cddfe3b9c5c2c2c6797bc5878";

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const uploadImageToImageBB = async (imageFile) => {
    const base64Image = await convertToBase64(imageFile);
    const formData = new FormData();
    formData.append("image", base64Image);
    const url = `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`;
    const response = await axios.post(url, formData);
    if (response.data?.data?.url) return response.data.data.url;
    throw new Error("Failed to upload image");
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImageBB(imageFile);

      const payload = {
        title: data.title,
        category: data.category,
        image: imageUrl,
        ingredients: data.ingredients,
        description: data.description,
        price: parseFloat(data.price),
        postTime: data.postTime,
        distributorName: user.displayName || "Admin",
        addedByEmail: user.email,
      };

      const response = await axiosInstance.post(
        `${
          import.meta.env.REACT_APP_API_BASE_URL ||
          "https://online-shop-server-side.vercel.app"
        }/products`,
        payload
      );

      if (response.data.success) {
        Swal.fire("✅ Success!", "Product added successfully!", "success");
        reset();
      } else {
        Swal.fire("❌ Error", "Failed to add product", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  // Input and text styles
  const inputClass =
    "w-full px-4 py-2 border rounded-lg bg-[#FFFFFF] text-[#111111] " +
    "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] " +
    "transition duration-200 shadow-sm";

  const errorClass = "text-[#FF6B6B] text-sm mt-1";

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-[#FFFFFF] rounded-2xl shadow-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-[#111111] text-center mb-8">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Title <span className="text-[#FF6B6B]">*</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter product title"
            className={`${inputClass} ${errors.title ? "border-[#FF6B6B]" : ""}`}
          />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Category <span className="text-[#FF6B6B]">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            defaultValue=""
            className={`${inputClass} ${errors.category ? "border-[#FF6B6B]" : ""}`}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Image <span className="text-[#FF6B6B]">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full text-[#111111]"
          />
          {errors.image && <p className={errorClass}>{errors.image.message}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Ingredients <span className="text-[#FF6B6B]">*</span>
          </label>
          <textarea
            rows={3}
            {...register("ingredients", {
              required: "Ingredients are required",
            })}
            placeholder="Separate ingredients by commas"
            className={`${inputClass} ${
              errors.ingredients ? "border-[#FF6B6B]" : ""
            }`}
          />
          {errors.ingredients && (
            <p className={errorClass}>{errors.ingredients.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Description <span className="text-[#FF6B6B]">*</span>
          </label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe the product"
            className={`${inputClass} ${
              errors.description ? "border-[#FF6B6B]" : ""
            }`}
          />
          {errors.description && (
            <p className={errorClass}>{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Price (USD) <span className="text-[#FF6B6B]">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            placeholder="Enter price in USD"
            className={`${inputClass} ${errors.price ? "border-[#FF6B6B]" : ""}`}
          />
          {errors.price && <p className={errorClass}>{errors.price.message}</p>}
        </div>

        {/* Post Time */}
        <div>
          <label className="block mb-2 font-semibold text-[#111111]">
            Post Time <span className="text-[#FF6B6B]">*</span>
          </label>
          <input
            type="datetime-local"
            {...register("postTime", { required: "Post time is required" })}
            className={`${inputClass} ${errors.postTime ? "border-[#FF6B6B]" : ""}`}
          />
          {errors.postTime && (
            <p className={errorClass}>{errors.postTime.message}</p>
          )}
        </div>

        {/* Distributor & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Distributor Name
            </label>
            <input
              type="text"
              value={user.displayName || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed text-[#111111]"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#111111]">
              Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed text-[#111111]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md
            ${
              isSubmitting || uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111]"
            }`}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
