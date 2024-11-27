import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageUploadLoading,
  imageUploadLoading,
  isInEditMode,
  customize,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) setImageFile(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const uploadImageToCloudinary = async () => {
    try {
      setImageUploadLoading(true);
      const data = new FormData();
      data.append("my_file", imageFile);

      const url = "http://localhost:5000/api/admin/products/upload-image";
      const response = await axios.post(url, data);

      const result = response?.data?.url;

      if (!result) {
        toast.error("Failed to upload image to Cloudinary");
      }

      setImageUploadLoading(false);
      setUploadedImageUrl(result.secure_url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full py-5 ${!customize ? "max-w-md mx-auto" : ""}`}>
      <label className="text-lg py-2 font-semibold block">
        Upload {customize ? "Hero" : "Product"} Image
      </label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          id="imageUpload"
          name="imageUpload"
          ref={inputRef}
          accept="image/"
          onChange={handleImageFileChange}
          required
          className="hidden"
          disabled={isInEditMode}
        />

        {imageFile ? (
          imageUploadLoading ? (
            <div className="flex flex-col gap-4 items-center justify-center h-32">
              <AiOutlineLoading3Quarters size={28} className="animate-spin" />
              <p className="text-sm font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon size={30} className="text-primary mr-2" />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                title="remove image"
                variant="ghost"
                className="text-sm font-medium text-orange-600"
                onClick={handleRemoveImage}
              >
                <XIcon size={12} />
                Remove
              </Button>
            </div>
          )
        ) : (
          <Label
            htmlFor="imageUpload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isInEditMode ? "cursor-not-allowed bg-opacity-60" : ""
            } `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="">Drag & Drop or Click and Upload</span>
          </Label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
