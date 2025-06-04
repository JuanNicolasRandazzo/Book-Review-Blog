import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import ReactQuill from "react-quill"; // Importar ReactQuill
import 'react-quill/dist/quill.snow.css'; // Importar CSS de ReactQuill

export const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const MAX_STARS = 5;
    const ratingValue = parseFloat(post.rating) || 0;
    const PF = "http://localhost:8000/images/";
    const { user } = useContext(Context);

    // Estados para el modo de actualización
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    // const [updatedDesc, setUpdatedDesc] = useState(""); // Si también quieres editar la descripción

    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get("/posts/" + path);
                setPost(res.data);
                // Inicializar los estados de edición cuando se carga el post
                setUpdatedTitle(res.data.title);
                setUpdatedContent(res.data.content);
                // setUpdatedDesc(res.data.description); // Si es editable
            } catch (err) {
                console.error("Error fetching post:", err);
                // Podrías redirigir o mostrar un mensaje de error
            }
        };
        getPost();
    }, [path]);

    // Efecto para resetear los campos de edición si el post cambia o se sale del modo edición
    // Esto es útil si el usuario cancela la edición, para que la próxima vez
    // que entre en modo edición, los campos tengan los valores correctos del post.
    useEffect(() => {
        if (post) {
            setUpdatedTitle(post.title || "");
            setUpdatedContent(post.content || "");
            // setUpdatedDesc(post.description || "");
        }
    }, [post, updateMode]); // Se ejecuta si 'post' cambia o 'updateMode' cambia


    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) {
            return;
        }
        try {
            if (!post || !post._id) {
                console.error("Post ID is missing for deletion");
                alert("Error: Post ID is missing. Cannot delete.");
                return;
            }
            if (!user || !user._id) {
                console.error("User ID for authorization is missing");
                alert("Error: User has not been found.");
                return;
            }
            await axios.delete(`/posts/${post._id}`, { data: { userId: user._id } });
            navigate("/");
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Error deleting post. Please try again later.");
        }
    };

    const handleUpdate = async () => {
        try {
            if (!post || !post._id) {
                console.error("Post ID is missing for update");
                alert("Error: Post ID is missing. Cannot update.");
                return;
            }
            if (!user || !user._id) {
                console.error("User ID for authorization is missing");
                alert("Error: User has not been found.");
                return;
            }

            const updatedPostData = {
                userId: user._id, // Necesario para la autorización en el backend
                title: updatedTitle,
                content: updatedContent,
                // description: updatedDesc, // Si es editable
                // Aquí podrías añadir otros campos que quieras actualizar, como la imagen si permites cambiarla
            };

            // Si quieres permitir la actualización de la imagen, necesitarías una lógica similar a la del componente Write
            // Por simplicidad, este ejemplo se centra en título y contenido.

            const res = await axios.put(`/posts/${post._id}`, updatedPostData);
            
            // Actualizar el estado del post local con los datos devueltos por el servidor
            // o simplemente recargar el post, aunque actualizar el estado local es más eficiente.
            setPost(res.data); // Asumiendo que el backend devuelve el post actualizado
            setUpdateMode(false); // Salir del modo edición
            alert("Post updated successfully!");
            window.location.reload()

        } catch (err) {
            console.error("Error updating post:", err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Error updating post: ${err.response.data.message}`);
            } else {
                alert("Error updating post. Please try again later.");
            }
        }
    };


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.image && (
                    <img
                        className="singlePostImg"
                        src={updateMode ? (post.image) : (PF + post.image)} // Manejar la imagen si es editable también
                        alt={post.title || "Post image"}
                    />
                )}
                {/* Si quieres permitir cambiar la imagen en modo edición:
                {updateMode && (
                    <div className="singlePostFormGroup">
                        <label htmlFor="fileInput">
                            <i className="singlePostIcon fa-solid fa-plus"></i> Add Image
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: "none" }} 
                            onChange={(e) => setFile(e.target.files[0])} // Necesitarías un estado 'file'
                        />
                    </div>
                )}
                */}

                <div className="singlePostText">
                    {updateMode ? (
                        <input
                            type="text"
                            value={updatedTitle}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {post.title}
                            {((post.userId?.username === user?.username) || user?.isAdmin) && (
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                    )}

                    <div className="singlePostInfo">
                        {post.author && (
                            <span className="singlePostAuthor">
                                Author:
                                <Link to={`/authors/${post.author._id}`} className="link">
                                    <b> {post.author.name} </b>
                                </Link>
                            </span>
                        )}
                        <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                    </div>

                    {/* Aquí es donde usamos ReactQuill para editar el contenido */}
                    {updateMode ? (
                        <div className="singlePostContentInputContainer"> {/* Contenedor opcional para estilos */}
                            <ReactQuill
                                theme="snow"
                                value={updatedContent}
                                onChange={setUpdatedContent}
                                className="singlePostContentInput" // Puedes usar esta clase para darle estilos
                                modules={{ // Opcional: Configura los módulos como en tu componente Write si es necesario
                                    toolbar: [
                                      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                      [{size: []}],
                                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                      [{'list': 'ordered'}, {'list': 'bullet'}, 
                                       {'indent': '-1'}, {'indent': '+1'}],
                                      ['link', 'image', 'video'], // Quita 'image' y 'video' si no los manejas en la actualización
                                      ['clean']
                                    ],
                                  }}
                            />
                        </div>
                    ) : (
                        <p
                            className="singlePostContent"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        >
                        </p>
                    )}

                    {/* Botón para guardar los cambios */}
                    {updateMode && (
                        <div className="singlePostUpdateButtons">
                            <button className="singlePostButton" onClick={handleUpdate}>
                                Update Post
                            </button>
                            <button className="singlePostButton singlePostCancelButton" onClick={() => setUpdateMode(false)}>
                                Cancel
                            </button>
                        </div>
                    )}

                    <div className="postMetaLine">
                        <div className="singlePostRating">
                            {post.rating !== undefined && (
                                Array.from({ length: MAX_STARS }).map((_, index) => {
                                    const starNumber = index + 1;
                                    let iconClass = "";
                                    if (ratingValue >= starNumber) iconClass = "fa-solid fa-star";
                                    else if (ratingValue >= (starNumber - 0.5)) iconClass = "fa-solid fa-star-half-stroke";
                                    else iconClass = "fa-regular fa-star";
                                    return <i key={index} className={`singleIcon ${iconClass}`}></i>;
                                })
                            )}
                        </div>
                        {post.userId && post.userId.username && (
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