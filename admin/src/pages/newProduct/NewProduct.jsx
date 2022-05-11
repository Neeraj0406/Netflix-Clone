import React, { useContext, useState } from "react";
import "./newProduct.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

const NewProduct = () => {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress} % done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    alert("Movie Created Successfully");
    setMovie("");
    navigate("/movies");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Movie</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Title Image</label>
              <input
                type="file"
                id="imgTitle"
                name="imgTitle"
                onChange={(e) => setImgTitle(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Thumbnail image</label>
              <input
                type="file"
                id="imgSmall"
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Movie name"
                onChange={handleChange}
                name="title"
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                onChange={handleChange}
                name="desc"
              />
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input
                type="text"
                placeholder="Year"
                onChange={handleChange}
                name="year"
              />
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder="Genre"
                onChange={handleChange}
                name="genre"
              />
            </div>
            <div className="addProductItem">
              <label>Duration</label>
              <input
                type="text"
                placeholder="Duration"
                onChange={handleChange}
                name="duration"
              />
            </div>
            <div className="addProductItem">
              <label>Limit</label>
              <input
                type="text"
                placeholder="Limit"
                onChange={handleChange}
                name="limit"
              />
            </div>

            <div className="addProductItem">
              <label>Is Series?</label>
              <select id="isSeries" name="isSeries" onChange={handleChange}>
                <option>Type</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="addProductItem">
              <label>Trailer</label>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            <button
              className="addProductButton"
              disabled={uploaded === 5}
              onClick={handleUpload}
              style={{
                cursor: uploaded === 5 ? "not-allowed" : "pointer",
                marginRight: "10px",
                backgroundColor:
                  uploaded === 5 ? "rgb(112, 112, 219)" : "darkblue",
              }}
            >
              upload
            </button>
            <button
              className="addProductButton"
              disabled={uploaded !== 5}
              style={{
                cursor: uploaded !== 5 ? "not-allowed" : "pointer",
                backgroundColor:
                  uploaded !== 5 ? "rgb(112, 112, 219)" : "darkblue",
              }}
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewProduct;
