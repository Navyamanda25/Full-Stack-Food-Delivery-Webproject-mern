import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* LEFT */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>{t("footer.description")}</p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>{t("footer.company")}</h2>
          <ul>
            <a href="#navbar"><li>{t("footer.home")}</li></a>
            <li>{t("footer.about")}</li>
            <li>{t("footer.delivery")}</li>
            <li>{t("footer.privacy")}</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h2>{t("footer.getInTouch")}</h2>
          <ul>
            <li>9876543210</li>
            <li>contact@quickbites.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        {t("footer.copyright")}
      </p>
    </div>
  );
};

export default Footer;
