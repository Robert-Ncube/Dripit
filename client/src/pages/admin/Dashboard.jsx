import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common/featureSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const dispatch = useDispatch();
  const { featureImagesList } = useSelector((state) => state.CommonFeatures);

  console.log("[uploadedImageUrl:", uploadedImageUrl);

  const handleFeatureUpload = async () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      console.log("data:", data);
      if (data?.payload?.success) {
        setImageFile(null);
        setUploadedImageUrl("");
        setImageUploadLoading(false);
        dispatch(getFeatureImages());
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log("featureImagesList:", featureImagesList);

  return (
    <div>
      <div className="">
        <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          imageUploadLoading={imageUploadLoading}
          setImageUploadLoading={setImageUploadLoading}
          //isInEditMode={currentEditedId !== null}
          customize={true}
        />
        <Button
          type="primary"
          size="large"
          onClick={handleFeatureUpload}
          loading={imageUploadLoading}
          disabled={!imageFile}
          className="mb-4 bg-orange-600"
        >
          Upload
        </Button>
      </div>
      <div className="flex items-center gap-4 shadow-sm shadow-black rounded-lg overflow-x-auto h-full max-h-32 px-4">
        {featureImagesList.map((image) => (
          <div className="flex-shrink-0">
            <img
              key={image?._id}
              src={image?.image}
              alt={"hero-image"}
              className="w-28 h-28 rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
