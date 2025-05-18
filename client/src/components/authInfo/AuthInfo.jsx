import React, { useEffect, useState } from 'react'
import "./authInfo.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export const AuthInfo = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [author, setAuthor] = useState({})
  useEffect(() => {
    const getAuthor = async () => {
      const res = await axios.get("/authors/" + path);
      setAuthor(res.data);
    }
    getAuthor();
  }, [path])
  return (
    <div className='author'>
      <div className="authorWrapper">
        {author.photo && (
              <img 
                  className="authorImg"
                  src= {author.photo}
                  alt="" 
              />
          )}
          <div className="authorInfo">
              <h1 className="authorName">
                  {author.name}
                  <div className="authorDates">
                    <span>Birth Date: {new Date(author.birthDate).toLocaleDateString(
                      "en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}</span>
                    {author.deathDate && <span> Death Date: { new Date(author.deathDate).toLocaleDateString(
                      "en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}</span>}
                  </div>
              </h1>
              <div className="authorbio">
                  <p className="authorBioContent">{author.bio}</p>
              </div>
          </div>
      </div>
        
        
    </div>
  )
}
