import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="footer-container">
      <Link to={"/"} className="footer-item">
        Home
      </Link>
      <Link to={"/browseEvents"} className="footer-item">
        Browse
      </Link>
      <p className="footer-item">Contact us: events.tech.returners@gmail.com</p>
      <p className="footer-item">© 2025 Lian Bremner Tattersall</p>
    </div>
  );
}
