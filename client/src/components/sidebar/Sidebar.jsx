import axios from "axios";
import "./sidebar.css";
import { useEffect, useState } from "react";

export const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {

        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    },[])
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME </span>
            <img
                className="sidebarImg" 
                src="https://images.steamusercontent.com/ugc/764896213604061445/AA758B17699A058BEDAEAFF3664345F19443E3F6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" 
                alt="" 
            />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nesciunt, laborum odio esse a suscipit dignissimos, 
                dolorem necessitatibus, odit culpa quidem ad iure vitae fugiat. 
                Blanditiis voluptates dolorem laudantium cum.
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c) => (
                    <li className="sidebarListItem">{c.name}</li>
                ))}
                
                
            </ul>
        </div>
        <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
        </div>
    </div>
  )
}
