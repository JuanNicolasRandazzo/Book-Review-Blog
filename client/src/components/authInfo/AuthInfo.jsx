import React, { useEffect, useState } from 'react';
import "./authInfo.css"; // Asegúrate que el nombre del archivo CSS coincida
import axios from "axios";
import { useLocation } from 'react-router-dom';

export const AuthInfo = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [author, setAuthor] = useState({}); // Inicializa como objeto vacío

  useEffect(() => {
    const getAuthor = async () => {
      if (path) { // Solo hacer la petición si path tiene valor
        try {
          const res = await axios.get("/authors/" + path);
          setAuthor(res.data);
        } catch (error) {
          console.error("Error fetching author:", error);
          // Aquí podrías setear un estado de error para mostrar un mensaje al usuario
        }
      }
    };
    getAuthor();
  }, [path]);

  // PF para imágenes si vienen de tu backend (como en Post)
  // Si author.photo ya es una URL completa, no necesitas PF.
  // const PF = "http://localhost:8000/images/"; 

  return (
    <div className='authorPage'> {/* Cambiado de 'author' a 'authorPage' para evitar confusión si 'author' es un objeto */}
      <div className="authorWrapper">
        {author.photo && (
          <img
            className="authorImg"
            // src={PF + author.photo} // Descomenta y ajusta si es necesario
            src={author.photo} // Usar directamente si author.photo es una URL completa
            alt={author.name || "Author image"} // Alt descriptivo
          />
        )}
        <div className="authorTextContainer"> {/* Contenedor para todo el texto, similar a singlePostText */}
          {author.name && (
            <h1 className="authorName">
              {author.name}
            </h1>
          )}

          {(author.birthDate || author.deathDate) && (
            <div className="authorDates"> {/* Contenedor principal para AMBAS fechas */}
              {author.birthDate && (
                <span className="authorBirthDate">
                  Birth Date: {new Date(author.birthDate).toLocaleDateString("us-EN", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
              {author.deathDate && (
                <span className="authorDeathDate">
                  Death Date: {new Date(author.deathDate).toLocaleDateString("us-EN", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          )}

          {author.bio && (
            <div className="authorBio"> {/* Usar div para la bio, que puede contener párrafos */}
              {/* Si la bio es HTML, usar dangerouslySetInnerHTML */}
              {/* <p dangerouslySetInnerHTML={{ __html: author.bio }} /> */}

              {/* Si la bio es texto plano que puede tener saltos de línea */}
              {author.bio.split('\n').map((paragraph, index) => (
                <p key={index} className="authorBioParagraph">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};