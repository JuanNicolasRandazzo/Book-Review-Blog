import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const MAX_STARS = 5;
    const ratingValue = parseFloat(post.rating) || 0;
    const PF = "http://localhost:8000/images/";
    const { user } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) {
            return;
        }
        try {
            if (!post || !post._id) {
                console.error("Post ID is missing from deletion");
                alert("Error: Post ID is missing. Cannot delete.");
                return;
            }

            if (!user || !user._id) {
                console.error("User ID for authorization is missing");
                alert("Error: User has not been found.");
                return;
            }


            await axios.delete(`/posts/${post._id}`, {data: {userId: user._id}});
            navigate("/");
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Error deleting post. Please try again later.");
        }
        
    }
    

    
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.image && (
                    <img
                        className="singlePostImg"
                        src={PF + post.image}
                        alt={post.title || "Post image"} // Añadir un alt descriptivo
                    />
                )}

                <div className="singlePostText">
                    <h1 className="singlePostTitle">
                        {post.title}
                        {((post.userId?.username === user?.username) || user?.isAdmin) && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}
                        
                    </h1>
                    <div className="singlePostInfo">
                        {post.author && ( // Verificar que post.author exista
                            <span className="singlePostAuthor">
                                Author:
                                <Link to={`/authors/${post.author._id}`} className="link">
                                    <b> {post.author.name} </b>
                                </Link>
                            </span>
                        )}
                        <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    <p className="singlePostContent"
                        dangerouslySetInnerHTML={{ __html: post.content }}>
                    </p>

                    {/* Contenedor para la línea de metadatos (Rating y Created By) */}
                    <div className="postMetaLine">
                        <div className="singlePostRating">
                            {post.rating !== undefined && ( // Solo renderizar si hay rating
                                Array.from({ length: MAX_STARS }).map((_, index) => {
                                    const starNumber = index + 1; // Star 1, 2, 3, etc.
                                    let iconClass = "";

                                    if (ratingValue >= starNumber) {
                                        iconClass = "fa-solid fa-star"; // Estrella llena
                                    } else if (ratingValue >= (starNumber - 0.5)) {
                                        iconClass = "fa-solid fa-star-half-stroke"; // Media estrella
                                    } else {
                                        iconClass = "fa-regular fa-star"; // Estrella vacía
                                    }
                                    return (
                                        <i key={index} className={`singleIcon ${iconClass}`}></i>
                                    );
                                })
                            )}
                        </div>

                        {post.userId && post.userId.username && ( // Verificar que post.userId y su username existan
                            <div className="singlePostCreatedBy">
                                <span className="singlePostCreatedByText">Created by: <b>{post.userId.username}</b></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
