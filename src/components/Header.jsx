import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "./Button";
import MobileNavigation from "./MobileNavigation";
import "./Header.css";

const NAV_ITEMS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/find-business", key: "nav.findBusiness" },
  { to: "/find-partner", key: "nav.findPartner" },
  { to: "/need-help", key: "nav.needHelp" },
  { to: "/opportunities", key: "nav.opportunities" },
  { to: "/admin", key: "nav.admin" },
];

function Logomark() {
  return (
    <svg
      className="logomark"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="China–South Africa Business Hub"
    >
      <circle
        cx="17"
        cy="17"
        r="16"
        stroke="var(--color-navy-800)"
        strokeWidth="1.4"
      />

      <path
        d="M8 21.5C11.5 14.5 22.5 14.5 26 21.5"
        stroke="var(--color-gold-500)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <circle
        cx="8"
        cy="21.5"
        r="2.4"
        fill="var(--color-red-600)"
      />

      <circle
        cx="26"
        cy="21.5"
        r="2.4"
        fill="var(--color-green-600)"
      />
    </svg>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink
            to="/"
            className="site-header__brand"
            onClick={() => setMobileOpen(false)}
          >
            <Logomark />

            <span className="site-header__brand-text">
              China–South Africa
              <strong>Business Hub</strong>
            </span>
          </NavLink>

          <nav className="site-header__nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `site-header__link ${isActive ? "is-active" : ""}`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <LanguageSwitcher className="site-header__lang" />

            <Button to="/profile" variant="secondary" size="sm">
              {t("nav.signIn")}
            </Button>

            <Button to="/profile" variant="primary" size="sm">
              {t("nav.register")}
            </Button>
          </div>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-label={
              mobileOpen ? t("nav.closeMenu") : t("nav.menu")
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <MobileNavigation
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}