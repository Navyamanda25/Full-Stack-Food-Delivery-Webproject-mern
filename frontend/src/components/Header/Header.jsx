import React from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="header-contents">
        <h2>{t("header.title")}</h2>

        <p>{t("header.subtitle")}</p>

        <a href="/#restaurants">
  <button>View Restaurants</button>
</a>

      </div>
    </div>
  );
};

export default Header;
