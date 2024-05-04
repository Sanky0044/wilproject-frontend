import React, {useState} from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Post = () => {

  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("https://wilproject-backend.onrender.com/BackEnd/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      const config = {
        headers: {
          // Any additional headers you need
        },
        withCredentials: true // This is crucial for sending cookies with the request
      };
      state
        ? await axios.put(`https://wilproject-backend.onrender.com/BackEnd/posts/${state.id}`,  {
            title,
            desc,
            cat,
            img: file ? imgUrl : "",
          }, config )
        : await axios.post(`https://wilproject-backend.onrender.com/BackEnd/posts/`, {
            title,
            desc,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          }, config);
          navigate("/")
    } catch (err) {
      console.log(err);
    }

  }
  



  return (
    <div className='add'>
      <div className="content">
        <input type='text' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className='editor' theme="snow" value={desc} onChange={setDesc} />;
        </div>
      </div>
        <div className="menu">
          <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='file' htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
          </div>
          <div className="item">
            <h1>Category of Awareness Campaign</h1>
            <div className="cat">
              <input type='radio' checked={cat === "environmental"} name='cat' value="environmental" id='environmental' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='environmental'>Environmental</label>
            </div>
            <div className="cat">
              <input type='radio' checked={cat === "health"} name='cat' value="health" id='health' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='health'>Health</label>
            </div>
            <div className="cat">
              <input type='radio' checked={cat === "technology"} name='cat' value="technology" id='technology' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='technology'>Technology</label>
            </div>
            <div className="cat">
              <input type='radio' checked={cat === "education"} name='cat' value="education" id='education' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='education'>Education</label>
            </div>
            <div className="cat">
              <input type='radio' checked={cat === "other"} name='cat' value="other" id='other' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='other'>Other</label>
            </div>
            <div className="cat">
              <input type='radio' checked={cat === "business"} name='cat' value="business" id='business' onChange={(e) => setCat(e.target.value)}/>
              <label htmlFor='business'>Business</label>
            </div> 
          </div>
        </div>
      
    </div>
  )
}

export default Post