import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "./Button";
import "./MobileNavigation.css";

const navItems = [
  { to: "/", key: "nav.home", end: true },
  { to: "/find-business", key: "nav.findBusiness" },
  { to: "/find-partner", key: "nav.findPartner" },
  { to: "/need-help", key: "nav.needHelp" },
  { to: "/opportunities", key: "nav.opportunities" },
];

export default function MobileNavigation({ open = false, onClose }) {
  const { t } = useLanguage();

  return (
    <div
      className={`mobile-nav ${open ? "is-open" : ""}`}
      aria-hidden={!open}
    >
      <div
        className="mobile-nav__backdrop"
        onClick={onClose}
      />

      <nav
        className="mobile-nav__panel"
        aria-label="Mobile"
      >
        <ul className="mobile-nav__list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `mobile-nav__link ${
                    isActive ? "is-active" : ""
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-nav__divider" />

        <div className="mobile-nav__auth">
          <Button
            to="/profile"
            variant="secondary"
            onClick={onClose}
            className="mobile-nav__button"
          >
            {t("nav.signIn")}
          </Button>

          <Button
            to="/register"
            variant="primary"
            onClick={onClose}
            className="mobile-nav__button"
          >
            {t("nav.register")}
          </Button>
        </div>

        <LanguageSwitcher className="mobile-nav__lang" />
      </nav>
    </div>
  );
}