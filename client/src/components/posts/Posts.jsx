import { Post } from "../post/Post";
import "./posts.css";

export const Posts = ({posts}) => {
  return (
    <div className="posts">
        {posts.map((p) => (
          <Post post={p}/>
        ))}
        
    </div>
  )
}
