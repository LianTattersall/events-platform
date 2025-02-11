import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ImagePicker({ setFormData }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  function handleImageUpload(e) {
    setFile(e.target.files[0]);
    setStatus("not-uploaded");
  }

  function uploadImage(e) {
    e.preventDefault();
    setStatus("loading");
    const formatData = new FormData();
    formatData.append("file", file);
    formatData.append("upload_preset", import.meta.env.VITE_PRESET);
    formatData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dacjk1jw1/image/upload",
        formatData
      )
      .then((response) => {
        setStatus("success");
        setFormData((curr) => {
          return { ...curr, image_URL: response.data.url };
        });
      })
      .catch((err) => {
        setStatus("error");
      });
  }

  return (
    <div>
      <label htmlFor="image">Choose a new image: </label>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {file && status == "not-uploaded" ? (
        <button onClick={uploadImage}>Upload</button>
      ) : status == "loading" ? (
        <p>Uploading Image...</p>
      ) : null}
    </div>
  );
}
