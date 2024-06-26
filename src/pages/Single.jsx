import React, { useEffect, useState } from "react";
import Edit from "../Images/edit.png"
import Delete from "../Images/delete.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from '../components/Menu';
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../Context/authContext.jsx";
import { useContext } from "react";
import DOMPurify from "dompurify";
import { Image } from "cloudinary-react";
import {AdvancedImage} from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  //const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const res = await axios.get('http://localhost:8800/BackEnd/posts${cat}');
        const res = await axios.get(`https://wilproject-backend.onrender.com/BackEnd/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`https://wilproject-backend.onrender.com/BackEnd/posts/${postId}`, { withCredentials: true });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
      {/* <img src={`https://res.cloudinary.com/dsbbepeox/image/upload/v1714613718/${post?.img}`} alt="" />
      <Image 
                cloudName= "dsbbepeox"
                publicId={post.img}
                width="300"
                height="200"
                crop="fill"
                alt=""
                /> */}
                <AdvancedImage
                cldImg = {
                  new CloudinaryImage(post.img, { cloudName: 'dsbbepeox' }).resize(fill().width(300).height(200)) // Adjust width and height as needed
                }
                />
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/post?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
      </div>
      <Menu cat ={post.cat}/>
    </div>
  );
};

export default Single