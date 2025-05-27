import { Link } from "react-router-dom";
import "./post.css";

export const Post = ({post}) => {
    const PF = "http://localhost:8000/images/";
  return (
    <div className="post">
        {post.image && (
            <img 
                className="postImg"
                src= {PF + post.image} //PF +  post.image
                alt="" 
            />
        )}
        
        <div className="postInfo">
            <div className="postCats">
               {post.categories.map((c) => (
                <span className="postCat" key={c._id}>{c.name}</span>
               ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span>
            </Link>
            
            
            <span className="postDate">{new Date(post.createdAt).toLocaleDateString(
                "en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            )}</span>
        </div>
        <p className="postDesc">
            {post.description}
        </p>
    </div>
  )
}
