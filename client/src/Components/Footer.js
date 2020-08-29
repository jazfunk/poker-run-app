import React from "react";
import JkLogo from "../Images/titleGraphicWithLogoOPTIMIZED.svg";

const Footer = () => {
  return (
    <section className="footer" id="footer">
      <img
        id="jk-logo"
        className="jklogo-glow-border"
        width="12%"
        src={JkLogo}
        alt="Jeff King"
      />
      <div>
        <a href="https://github.com/jazfunk">GitHub</a>
        &nbsp;|&nbsp;
        <a href="https://www.linkedin.com/in/jeffking222/">Linkedin</a>
        &nbsp;|&nbsp;
        <a href="https://www.jeff-king.net">Website</a>
      </div>
    </section>
  );
};

export default Footer;
