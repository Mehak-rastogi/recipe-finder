import "./SecondFooter.css";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const SecondFooter = () => {
  return (
    <footer className="secondfooter">
      <div className="secondfooter-container">
        <div className="secondfooter-brand">
          <div className="logo">
            <span className="logo-circle">🍴</span>
            <h2>Foodie.</h2>
          </div>

          <p>
            Your go-to destination for discovering and cooking <br /> amazing
            recipes from around the world.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaPinterestP />
            <FaYoutube />
          </div>
        </div>

        <div className="secondfooter-column">
          <h3>Support</h3>
          <ul>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="copyright">© 2026 Foodie. All Rights Reserved.</div>
    </footer>
  );
};

export default SecondFooter;
