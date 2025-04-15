import "./settings.css";
import { Sidebar } from "../../components/sidebar/Sidebar";
export const Settings = () => {
  return (
    <div className="settings">
        <div className="settingsWrapper"> 
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm">
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img 
                        src="https://practicaltyping.com/wp-content/uploads/2020/07/gardenwallgreg.jpg" 
                        alt="" 
                    />
                    <label htmlFor="fileInput">
                        <i class="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder="name" />
                <label>Email</label>
                <input type="email" placeholder="example@gmail.com" />
                <label>Password</label>
                <input type="password"/>
                <button className="settingsSubmit">Update</button>
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
