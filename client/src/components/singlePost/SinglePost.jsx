import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singlePost.css";
import axios from "axios";

export const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
        }
        getPost();
    }, [path])
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.image && (
                    <img
                        className="singlePostImg"
                        src={post.image}
                        alt=""
                    />)
                }
                
                <div className="singlePostText">
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                        <i className="singlePostIcon fa-solid fa-trash"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    {post.author && (
                        <span className="singlePostAuthor">Author: <b>{post.author.name}</b></span>
                    )}
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostContent">
                    {post.content}
                </p>
                </div>
                
            </div>
        </div>
    )
}
