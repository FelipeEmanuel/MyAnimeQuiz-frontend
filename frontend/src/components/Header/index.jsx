import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <ul>
            <li>
              <Link to="/">MyAnimeQuiz</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
