import axios from "axios";
import PropTypes from "prop-types";
import { Edit, LoaderCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { imageAdd } from "../features/auth/authSlice";

const ImageUpload = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pskbaxbg");
    formData.append("cloud_name", "dudkmza2y");

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dudkmza2y/image/upload",
        formData
      );

      const uploadedImageUrl = data.secure_url;
      setImageUrl(uploadedImageUrl);
      onChange(uploadedImageUrl);

      await dispatch(imageAdd(uploadedImageUrl)).unwrap();
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.error?.message || "Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, onChange]);
  return (
    <div>
      <label className="cursor-pointer transition-all duration-300">
        <Edit />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {loading && (
          <p className="flex items-center">
            Uploading... wait for a moment
            <LoaderCircle className="animate-spin" />
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded Image" className="mt-5 w-20 h-20" />
        )}
      </label>
    </div>
  );
};

// Add prop-types validation
ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageUpload;
