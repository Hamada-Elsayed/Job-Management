import './Sidebar.css'
import { useState } from "react";
import logo from "../assets/logo.png";
import {
  House,
  SquarePlus,
  FolderHeart,
  BriefcaseBusiness,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useUser, SignOutButton, SignInButton } from "@clerk/clerk-react";


const Sidebar = () => {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="items">
          <ul>
          <li><a href="/"><House />الرئيسية</a></li>
          <li><a href="/addjob"><SquarePlus />اضافة وظيفة</a></li>
          <li><a href="/joblist"><BriefcaseBusiness />جميع الوظائف</a></li>
          <li><a href="/favorites"><FolderHeart />المفضلة</a></li>
          </ul>
        </div>

        <div className="auth-section">
          {isSignedIn ? (
            <>
              <div className="user-info">
                👤 {user.fullName || user.primaryEmailAddress?.emailAddress}
              </div>
              <SignOutButton>
                <button className="logout" style={{display:"flex"}}>
                  <LogOut /> تسجيل الخروج
                </button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="login">🔐 تسجيل الدخول</button>
            </SignInButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
