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

  function toJPG(imageURL) {
    if (imageURL.slice(-4, imageURL.length) == "heic") {
      return imageURL.slice(0, -4) + "jpg";
    }
    return imageURL;
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
          return { ...curr, image_URL: toJPG(response.data.url) };
        });
      })
      .catch((err) => {
        setStatus("error");
      });
  }

  return (
    <div>
      <label htmlFor="image" className="bold" style={{ padding: "5px" }}>
        Choose a new image:{" "}
      </label>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        style={{ paddingLeft: "5px" }}
      />
      {file && status == "not-uploaded" ? (
        <button onClick={uploadImage} className="buttons">
          Upload
        </button>
      ) : status == "loading" ? (
        <p style={{ paddingLeft: "5px" }}>Uploading Image...</p>
      ) : null}
      {status === "error" ? (
        <>
          {" "}
          <button onClick={uploadImage} className="buttons">
            Upload
          </button>
          <p className="error" style={{ paddingLeft: "5px" }}>
            An error has occured uploading this images
          </p>
        </>
      ) : null}
    </div>
  );
}
