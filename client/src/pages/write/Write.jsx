import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Context } from "../../context/Context";
import { useNavigate } from 'react-router-dom';


export const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [categories, setCategories] = useState([]);
    const [slectedCategory, setSelectedCategory] = useState("");
    const { user } = useContext(Context);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await axios.get("/authors");
                setAuthors(res.data);
            } catch (err) {
                console.error("Error fetching authors", err);
            }
        };
        fetchAuthors();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get("/categories");
            setCategories(res.data);
          } catch (err) {
            console.error("Error fetching categories", err);
          }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(e);
        let authorId = selectedAuthor;
        let categoryId = slectedCategory;

        if (!selectedAuthor && newAuthor) {
            try {
                const res = await axios.post("/authors", { 
                  name: newAuthor,
                  userId: user._id

                });
                authorId = res.data._id;
            } catch (err) {
                console.error("error creating new author", err);
                return;
            }
        }
        const newPost = {
            userId: user._id,
            title,
            author: authorId,
            description: desc,
            content,
            categories: categoryId,
            rating,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.image = filename; // If doesn't work, try newPost.photo
            try{
                await axios.post("/upload", data);
            } catch (err){
                console.error("Error uploading file", err);
            }
        }
        try {
           const res = await axios.post("/posts", newPost);
           console.log("New post created", res.data)
           // window.location.replace("/post" + res.data._id);
            if (res.data && res.data._id) { // O simplemente if (res.data) si no necesitas el ID para esta redirección
               console.log("Navigating to Home Page");
               navigate("/"); // <--- REDIRIGE A LA RUTA RAÍZ (HOME)
           } else {
               console.error("Post creation might have failed or response is unexpected.");
               // Quizás no redirigir o redirigir a home como fallback
               // navigate("/");
           }
          
        } catch (err) {
            console.error("Error creating post", err)
        }
        
    }
  return (
    <div className="write">
      {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input type="file" style={{ display: "none" }} id="fileInput" onChange={e => setFile(e.target.files[0])} />
          <label htmlFor="fileInput"><i className="writeIcon fa-solid fa-plus"></i></label>
          <input type="text" placeholder="Title" className="writeInput" autoFocus onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="writeFormGroup">
          <select className="writeSelect" onChange={(e) => setSelectedAuthor(e.target.value)} value={selectedAuthor}>
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>{author.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or enter a new author"
            className="writeInput"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>

        <div className="writeRating">
          <input
            type="number"
            min="0"
            max="5"
            placeholder="Rating"
            className="writeInput"
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>

        <div className="writeDescription">
          <textarea
            placeholder="Short description..."
            className="writeInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="writeCategory">
          <select className="writeSelect" onChange={(e) => setSelectedCategory(e.target.value)} value={setSelectedCategory}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="writeFormGroup">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}
