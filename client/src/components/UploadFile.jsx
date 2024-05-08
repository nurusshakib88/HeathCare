import React, { useState } from "react";

const UploadFile = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hospitalcloud");
    data.append("cloud_name", "djtvum4xg");

    try {
      setLoading(true);
      if (image === null) {
        console.log("Please Upload image");
        setLoading(false);
        return;
      }
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djtvum4xg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      setLoading(false);

      const cloudData = await res.json();
      setImageUrl(cloudData.url);
      console.log("Image Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <label htmlFor="file-upload" className="cursor-pointer inline-block ">
        {image ? (
          <img
            className=" w-72 lg:w-96  rounded-xl"
            src={image ? URL.createObjectURL(image) : ""}
            alt="img"
          />
        ) : (
          "upload"
        )}
      </label>

      <input
        id="file-upload"
        className="hidden text-white"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button   onClick={saveImage} className="btn btn-primary">
        {loading ? "loading" : "Send"}
      </button>

      <p>{imageUrl}</p>
    </div>
  );
};

export default UploadFile;
