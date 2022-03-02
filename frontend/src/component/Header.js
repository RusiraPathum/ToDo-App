import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          ToDo List
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            
            <li className="nav-item ">
              <Link to = "/add"className="nav-link">
              <i class="fa fa-plus"></i> Add ToDo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;