import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  FileText,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import "./IndividualNavigation.css";

const NAV_ITEMS = [
  {
    to: "/individual-dashboard",
    key: "dashboard",
    icon: Home,
  },
  {
    to: "/individual-profile",
    key: "profile",
    icon: UserRound,
  },
  {
    to: "/opportunities",
    key: "opportunities",
    icon: Search,
  },
  {
    to: "/individual-applications",
    key: "applications",
    icon: FileText,
  },
  {
    to: "/individual-saved",
    key: "saved",
    icon: Heart,
  },
  {
    to: "/individual-connections",
    key: "connections",
    icon: UsersRound,
  },
  {
    to: "/messages",
    key: "messages",
    icon: MessageCircle,
  },
  {
    to: "/notifications",
    key: "notifications",
    icon: Bell,
  },
  {
    to: "/individual-documents",
    key: "documents",
    icon: FileText,
  },
];

export default function IndividualNavigation() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isChinese = language === "zh";

  const labels = {
    dashboard: isChinese ? "个人首页" : "Dashboard",
    profile: isChinese ? "我的资料" : "My Profile",
    opportunities: isChinese ? "机会" : "Opportunities",
    applications: isChinese ? "我的申请" : "My Applications",
    saved: isChinese ? "已保存机会" : "Saved Opportunities",
    connections: isChinese ? "我的联系" : "My Connections",
    messages: isChinese ? "消息" : "Messages",
    notifications: isChinese ? "通知" : "Notifications",
    documents: isChinese ? "我的文件" : "My Documents",
    signOut: isChinese ? "退出登录" : "Sign Out",
  };

  const handleSignOut = () => {
    // Prototype navigation: return to the existing Sign In destination.
    navigate("/profile");
  };

  return (
    <aside className="individual-navigation">
      <div className="individual-navigation__header">
        <div className="individual-navigation__avatar">
          <UserRound size={21} aria-hidden="true" />
        </div>

        <div className="individual-navigation__identity">
          <strong>
            {isChinese ? "个人账户" : "Individual Account"}
          </strong>

          <span>
            {isChinese ? "已验证用户" : "Verified User"}
          </span>
        </div>
      </div>

      <nav
        className="individual-navigation__menu"
        aria-label={
          isChinese
            ? "个人门户导航"
            : "Individual Portal Navigation"
        }
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              state={
                item.key === "opportunities"
                  ? { fromIndividualDashboard: true }
                  : undefined
              }
              end={item.to === "/individual-dashboard"}
              className={({ isActive }) =>
                `individual-navigation__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{labels[item.key]}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          className="individual-navigation__link individual-navigation__link--signout"
          onClick={handleSignOut}
        >
          <LogOut size={18} aria-hidden="true" />
          <span>{labels.signOut}</span>
        </button>
      </nav>
    </aside>
  );
}