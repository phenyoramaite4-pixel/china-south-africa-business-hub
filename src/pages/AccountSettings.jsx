import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import "./AccountSettings.css";

export default function AccountSettings() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const location = useLocation();

  // Detect whether Account Settings was opened from the Individual Portal.
  const isIndividualPortal =
    new URLSearchParams(location.search).get("from") === "individual";

  // Return users to the portal they came from.
  const dashboardPath = isIndividualPortal
    ? "/individual-dashboard"
    : "/dashboard";

  const [form, setForm] = useState({
    fullName: "Shanghai Trade & Investment Ltd",
    email: "contact@shanghaitrade.demo",
    phone: "+27 11 000 2026",
    accountType: "Chinese Business / Entrepreneur / Investor",
    language: language === "zh" ? "zh" : "en",
    emailNotifications: true,
    messageNotifications: true,
    opportunityNotifications: true,
    verificationNotifications: true,
  });

  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const text = {
    en: {
      eyebrow: "ACCOUNT SETTINGS",
      title: "Account Settings",
      description:
        "Manage your account information, security, language and notification preferences.",
      back: "Back to Dashboard",

      accountInformation: "Account Information",
      accountInformationDescription:
        "Review the information associated with your China–South Africa Business Hub account.",

      fullName: "Business / Account Name",
      email: "Email Address",
      phone: "Phone Number",
      accountType: "Account Type",

      security: "Security",
      securityDescription:
        "Manage your account password and keep your account secure.",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      changePassword: "Change Password",
      passwordPlaceholder: "Enter password",

      language: "Language",
      languageDescription:
        "Choose the language you want to use across the platform.",
      english: "English",
      chinese: "简体中文",

      notifications: "Notifications",
      notificationsDescription:
        "Choose which updates you would like to receive.",
      emailNotifications: "Email Notifications",
      emailNotificationsDescription:
        "Receive important account and platform updates by email.",
      messageNotifications: "Messages",
      messageNotificationsDescription:
        "Receive notifications when you receive new messages.",
      opportunityNotifications: "Business Opportunities",
      opportunityNotificationsDescription:
        "Receive updates about relevant business opportunities.",
      verificationNotifications: "Verification Updates",
      verificationNotificationsDescription:
        "Receive updates about your business verification status.",

      saveChanges: "Save Changes",
      changesSaved: "Your account settings have been saved.",
      passwordSaved: "Your password has been updated in this prototype.",

      accountStatus: "Account Status",
      verifiedAccount: "Verified Account",
      verifiedDescription:
        "This demo account represents a verified business profile.",
      signOut: "Sign Out",

      prototypeNotice:
        "Prototype only — account settings are currently simulated in the browser. Production authentication, password management and notification preferences will be connected to the secure backend.",
    },

    zh: {
      eyebrow: "账户设置",
      title: "账户设置",
      description:
        "管理您的账户信息、安全设置、语言和通知偏好。",
      back: "返回控制面板",

      accountInformation: "账户信息",
      accountInformationDescription:
        "查看与您的中南非商务平台账户相关的信息。",

      fullName: "企业 / 账户名称",
      email: "电子邮箱",
      phone: "电话号码",
      accountType: "账户类型",

      security: "安全设置",
      securityDescription:
        "管理您的账户密码并保护账户安全。",
      currentPassword: "当前密码",
      newPassword: "新密码",
      confirmPassword: "确认新密码",
      changePassword: "修改密码",
      passwordPlaceholder: "请输入密码",

      language: "语言",
      languageDescription:
        "选择您希望在平台上使用的语言。",
      english: "English",
      chinese: "简体中文",

      notifications: "通知",
      notificationsDescription:
        "选择您希望接收的更新通知。",
      emailNotifications: "电子邮件通知",
      emailNotificationsDescription:
        "通过电子邮件接收重要的账户和平台更新。",
      messageNotifications: "消息通知",
      messageNotificationsDescription:
        "收到新消息时接收通知。",
      opportunityNotifications: "商业机会",
      opportunityNotificationsDescription:
        "接收相关商业机会的更新。",
      verificationNotifications: "验证更新",
      verificationNotificationsDescription:
        "接收企业验证状态的更新。",

      saveChanges: "保存更改",
      changesSaved: "您的账户设置已保存。",
      passwordSaved: "您的密码已在此原型中更新。",

      accountStatus: "账户状态",
      verifiedAccount: "已验证账户",
      verifiedDescription:
        "此演示账户代表一个已验证的企业资料。",
      signOut: "退出登录",

      prototypeNotice:
        "仅用于原型演示 — 当前账户设置仅在浏览器中模拟。正式版本将连接安全后端，实现真实身份验证、密码管理和通知设置。",
    },
  };

  const t = text[isZh ? "zh" : "en"];

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    sessionStorage.setItem(
      "chinaHubAccountSettings",
      JSON.stringify(form)
    );

    setSaved(true);
  }

  function handlePasswordChange(event) {
    event.preventDefault();

    setPasswordSaved(true);

    event.currentTarget.reset();
  }

  return (
    <PageContainer>
      <div className="account-settings">
        <div className="account-settings__topbar">
          <Link
            to={dashboardPath}
            className="account-settings__back"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{t.back}</span>
          </Link>

          <span className="account-settings__badge">
            <ShieldCheck size={15} aria-hidden="true" />
            {t.eyebrow}
          </span>
        </div>

        <header className="account-settings__header">
          <div>
            <p className="account-settings__eyebrow">
              {t.eyebrow}
            </p>

            <h1>{t.title}</h1>

            <p className="account-settings__description">
              {t.description}
            </p>
          </div>
        </header>

        <div className="account-settings__layout">
          <main className="account-settings__main">
            <form onSubmit={handleSave}>
              <section className="account-settings__card">
                <div className="account-settings__card-heading">
                  <div className="account-settings__icon">
                    <UserRound size={19} aria-hidden="true" />
                  </div>

                  <div>
                    <h2>{t.accountInformation}</h2>
                    <p>{t.accountInformationDescription}</p>
                  </div>
                </div>

                <div className="account-settings__fields">
                  <label className="account-settings__field">
                    <span>{t.fullName}</span>
                    <div className="account-settings__input-wrap">
                      <UserRound size={16} aria-hidden="true" />
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="account-settings__field">
                    <span>{t.email}</span>
                    <div className="account-settings__input-wrap">
                      <Mail size={16} aria-hidden="true" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="account-settings__field">
                    <span>{t.phone}</span>
                    <div className="account-settings__input-wrap">
                      <Phone size={16} aria-hidden="true" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </label>

                  <label className="account-settings__field">
                    <span>{t.accountType}</span>
                    <input
                      type="text"
                      name="accountType"
                      value={form.accountType}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </section>

              <section className="account-settings__card">
                <div className="account-settings__card-heading">
                  <div className="account-settings__icon">
                    <Globe2 size={19} aria-hidden="true" />
                  </div>

                  <div>
                    <h2>{t.language}</h2>
                    <p>{t.languageDescription}</p>
                  </div>
                </div>

                <div className="account-settings__language-options">
                  <label
                    className={`account-settings__language-option ${
                      form.language === "en" ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={form.language === "en"}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>{t.english}</strong>
                      <small>English</small>
                    </span>
                  </label>

                  <label
                    className={`account-settings__language-option ${
                      form.language === "zh" ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value="zh"
                      checked={form.language === "zh"}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>{t.chinese}</strong>
                      <small>Chinese</small>
                    </span>
                  </label>
                </div>
              </section>

              <section className="account-settings__card">
                <div className="account-settings__card-heading">
                  <div className="account-settings__icon">
                    <Bell size={19} aria-hidden="true" />
                  </div>

                  <div>
                    <h2>{t.notifications}</h2>
                    <p>{t.notificationsDescription}</p>
                  </div>
                </div>

                <div className="account-settings__notification-list">
                  <label className="account-settings__notification">
                    <div>
                      <strong>{t.emailNotifications}</strong>
                      <span>
                        {t.emailNotificationsDescription}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={form.emailNotifications}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="account-settings__notification">
                    <div>
                      <strong>{t.messageNotifications}</strong>
                      <span>
                        {t.messageNotificationsDescription}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      name="messageNotifications"
                      checked={form.messageNotifications}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="account-settings__notification">
                    <div>
                      <strong>{t.opportunityNotifications}</strong>
                      <span>
                        {t.opportunityNotificationsDescription}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      name="opportunityNotifications"
                      checked={form.opportunityNotifications}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="account-settings__notification">
                    <div>
                      <strong>
                        {t.verificationNotifications}
                      </strong>
                      <span>
                        {t.verificationNotificationsDescription}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      name="verificationNotifications"
                      checked={form.verificationNotifications}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </section>

              <div className="account-settings__actions">
                <Button
                  type="submit"
                  variant="primary"
                  className="account-settings__save"
                >
                  <Save size={16} aria-hidden="true" />
                  {t.saveChanges}
                </Button>

                {saved && (
                  <span className="account-settings__success">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {t.changesSaved}
                  </span>
                )}
              </div>
            </form>

            <form
              className="account-settings__card"
              onSubmit={handlePasswordChange}
            >
              <div className="account-settings__card-heading">
                <div className="account-settings__icon">
                  <LockKeyhole size={19} aria-hidden="true" />
                </div>

                <div>
                  <h2>{t.security}</h2>
                  <p>{t.securityDescription}</p>
                </div>
              </div>

              <div className="account-settings__fields">
                <label className="account-settings__field">
                  <span>{t.currentPassword}</span>
                  <div className="account-settings__input-wrap">
                    <KeyRound size={16} aria-hidden="true" />
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder={t.passwordPlaceholder}
                    />
                  </div>
                </label>

                <label className="account-settings__field">
                  <span>{t.newPassword}</span>
                  <div className="account-settings__input-wrap">
                    <KeyRound size={16} aria-hidden="true" />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder={t.passwordPlaceholder}
                    />
                  </div>
                </label>

                <label className="account-settings__field">
                  <span>{t.confirmPassword}</span>
                  <div className="account-settings__input-wrap">
                    <KeyRound size={16} aria-hidden="true" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder={t.passwordPlaceholder}
                    />
                  </div>
                </label>
              </div>

              <div className="account-settings__password-actions">
                <Button
                  type="submit"
                  variant="secondary"
                  className="account-settings__password-button"
                >
                  <KeyRound size={16} aria-hidden="true" />
                  {t.changePassword}
                </Button>

                {passwordSaved && (
                  <span className="account-settings__success">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {t.passwordSaved}
                  </span>
                )}
              </div>
            </form>
          </main>

          <aside className="account-settings__side">
            <section className="account-settings__status-card">
              <div className="account-settings__status-icon">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>

              <div>
                <p className="account-settings__status-label">
                  {t.accountStatus}
                </p>

                <h3>{t.verifiedAccount}</h3>

                <p>{t.verifiedDescription}</p>
              </div>

              <span className="account-settings__verified">
                <CheckCircle2 size={14} aria-hidden="true" />
                {isZh ? "已验证" : "Verified"}
              </span>
            </section>

            <section className="account-settings__signout-card">
              <div>
                <h3>{t.signOut}</h3>

                <p>
                  {isZh
                    ? "退出当前演示账户。"
                    : "Sign out of the current demo account."}
                </p>
              </div>

              <Button
                to="/profile"
                variant="secondary"
                className="account-settings__signout"
              >
                <LogOut size={16} aria-hidden="true" />
                {t.signOut}
              </Button>
            </section>

            <div className="account-settings__notice">
              <ShieldCheck size={17} aria-hidden="true" />

              <p>{t.prototypeNotice}</p>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}