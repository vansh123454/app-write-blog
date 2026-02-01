import React from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "SignUp", url: "/signup", active: !authStatus },
    { name: "All Post", url: "/all-post", active: authStatus },
    { name: "Add Post", url: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.url)}
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                ),
            )}

            {authStatus && (
              <li className="ml-4">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
