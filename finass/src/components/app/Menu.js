import React from "react";
import { Link } from "react-router-dom";
import "./app-css/menu.css";

const Menu = () => {
  return (
    <div className="menu-container">
      <ul>
        <li>
          <Link to="/list" className="menu-link">
            <strong>List / รายการ</strong>
          </Link>
        </li>
        <li>
          <Link to="/create" className="menu-link">
            <strong>Create / สร้าง</strong>
          </Link>
        </li>
        <li>
          <Link to="/analyse" className="menu-link">
            <strong>Analyse / วิเคราะห์</strong>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="menu-link">
            <strong>Settings / ตั้งค่า</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
