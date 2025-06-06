import "./settings.css";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export const Settings = () => {
    const { user, dispatch} = useContext(Context);
    const [ file, setFile ] = useState(null);
    const [ username, setUsername ] = useState(user.username);
    const [ email, setEmail ] = useState(user.email);
    const [ password, setPassword ] = useState("");
    const [ success, setSuccess ] = useState(false); 

    const PF = "http://localhost:8000/images/"; // Adjust the path as needed

    if (!user) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            username,
            email,
        };
        if (password) {
            updatedUser.password = password;
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePicture = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.error("Error uploading file", err);
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data})

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Error updating user", err);
            dispatch({type: "UPDATE_FAILURE"});
        }
    }
  return (
    <div className="settings">
        <div className="settingsWrapper"> 
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img 
                        src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
                        alt="Profile"  
                    />
                    <label htmlFor="fileInput">
                        <i class="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display: "none"}}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <label>Username</label>
                <input type="text" value={username}  onChange={e => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <button className="settingsSubmit" type="submit">Update</button>
                {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px"}}>Profile Updated successfully!</span>}
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
