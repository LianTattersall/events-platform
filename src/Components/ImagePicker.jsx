import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ImagePicker({ event_id, setImageURL }) {
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
    formatData.append("upload_preset", "eventPlatformPreset");
    formatData.append("cloud_name", "dacjk1jw1");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dacjk1jw1/image/upload",
        formatData
      )
      .then((response) => {
        setStatus("success");
        setImageURL(response.data.url);
      })
      .catch((err) => {
        console.log(err);
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
