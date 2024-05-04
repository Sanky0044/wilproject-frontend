import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Image } from 'cloudinary-react';
import {AdvancedImage} from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  //const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const res = await axios.get('http://localhost:8800/BackEnd/posts${cat}');
        const res = await axios.get(`https://wilproject-backend.onrender.com/BackEnd/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  //const posts = [
       //{
         //id: 1,
        // title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         //desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
         //img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       //},
       //{
         //id: 2,
         //title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         //desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
         //img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       //},
       //{
         //id: 3,
         //title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         //desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
         //img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       //},
       //{
         //id: 4,
        // title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        // desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        // img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       //},
     //];

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
    }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
                <AdvancedImage
                cldImg = {
                  new CloudinaryImage(post.img, { cloudName: 'dsbbepeox' }).resize(fill().width(300).height(400)) // Adjust width and height as needed
                }
                />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home