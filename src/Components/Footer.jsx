import { CiMail } from "react-icons/ci";
import { useState } from "react";
import SecondFooter from "./SecondFooter";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <section className="footer">
      <div className="footer-section">
        <div className="newsletter">
          <div className="mail-icon">
            <CiMail size={40} />
          </div>
          <div>
            <h2>Never Miss A Recipe</h2>
            <p>
              Subscribe to get delicious recipes and <br />
              cooking tips in your inbox.
            </p>
          </div>
        </div>
        <div className="search-container">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>
      <SecondFooter />
    </section>
  );
};

export default Footer;
