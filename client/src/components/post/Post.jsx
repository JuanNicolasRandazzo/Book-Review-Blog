import { Link } from "react-router-dom";
import "./post.css";

export const Post = ({post}) => {
  return (
    <div className="post">
        {post.image && (
            <img 
                className="postImg"
                src= {post.image}
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
            
            
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
            {post.description}
        </p>
    </div>
  )
}
