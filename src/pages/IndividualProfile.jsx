
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Save,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import IndividualNavigation from "../components/IndividualNavigation";

import "./IndividualProfile.css";

export default function IndividualProfile() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const [profile, setProfile] = useState({
    fullName: "Li Wei",
    email: "li.wei@example.com",
    phone: "",
    location: "South Africa",
    professionalTitle: "",
    interests: "",
    bio: "",
  });

  const [saved, setSaved] = useState(false);

  const text = {
    eyebrow: isChinese ? "个人门户" : "Individual Portal",
    title: isChinese ? "我的个人资料" : "My Profile",
    subtitle: isChinese
      ? "管理您的个人信息、专业背景和商业兴趣。"
      : "Manage your personal information, professional background and business interests.",
    back: isChinese ? "返回仪表板" : "Back to Dashboard",
    personalInfo: isChinese ? "个人信息" : "Personal Information",
    personalInfoText: isChinese
      ? "更新其他用户查看的基本信息。"
      : "Update the basic information visible to other users.",
    fullName: isChinese ? "全名" : "Full Name",
    email: isChinese ? "电子邮箱" : "Email Address",
    phone: isChinese ? "电话号码" : "Phone Number",
    location: isChinese ? "所在地" : "Location",
    professionalTitle: isChinese ? "职业或专业头衔" : "Professional Title",
    professionalPlaceholder: isChinese
      ? "例如：独立顾问、企业家、专业人士"
      : "e.g. Independent Consultant, Entrepreneur, Professional",
    interests: isChinese ? "商业兴趣" : "Business Interests",
    interestsPlaceholder: isChinese
      ? "例如：贸易、投资、合作、服务"
      : "e.g. Trade, investment, partnerships, services",
    bio: isChinese ? "个人简介" : "About Me",
    bioPlaceholder: isChinese
      ? "介绍您的专业背景、技能和合作目标..."
      : "Introduce your background, skills and collaboration goals...",
    save: isChinese ? "保存个人资料" : "Save Profile",
    saved: isChinese ? "资料已在原型中保存" : "Profile saved in this prototype",
    completion: isChinese ? "资料完成度" : "Profile Completion",
    completionText: isChinese
      ? "完善您的资料，让其他用户更好地了解您。"
      : "Complete your profile to help other users learn more about you.",
    notice: isChinese
      ? "原型说明：您的更改仅保存在当前页面的演示状态中。正式版本将使用安全的账户存储。"
      : "Prototype notice: Changes are held in this page's demonstration state. The production version will use secure account storage.",
  };

  const fields = [
    "fullName",
    "email",
    "phone",
    "location",
    "professionalTitle",
    "interests",
    "bio",
  ];

  const completedFields = fields.filter((field) =>
    profile[field].trim()
  ).length;

  const completion = Math.round(
    (completedFields / fields.length) * 100
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <PageContainer width="xl" className="individual-profile-page">
      <div className="individual-portal-layout">
        <IndividualNavigation />

        <main className="individual-profile">
          <header className="individual-profile__header">
            <div>
              <span className="individual-eyebrow">
                <UserRound size={16} aria-hidden="true" />
                {text.eyebrow}
              </span>

              <h1>{text.title}</h1>
              <p>{text.subtitle}</p>
            </div>

            <Button
              to="/individual-dashboard"
              variant="secondary"
              size="sm"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {text.back}
            </Button>
          </header>

          <Card className="individual-profile__completion">
            <div className="individual-profile__completion-top">
              <div>
                <span className="individual-profile__eyebrow">
                  {text.completion}
                </span>
                <h2>{completion}%</h2>
              </div>

              {saved && (
                <span className="individual-profile__saved">
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {text.saved}
                </span>
              )}
            </div>

            <div
              className="individual-profile__progress"
              role="progressbar"
              aria-label={text.completion}
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${completion}%` }} />
            </div>

            <p>{text.completionText}</p>
          </Card>

          <Card className="individual-profile__form-card">
            <div className="individual-profile__section-heading">
              <div className="individual-profile__avatar">
                <UserRound size={28} aria-hidden="true" />
              </div>

              <div>
                <h2>{text.personalInfo}</h2>
                <p>{text.personalInfoText}</p>
              </div>
            </div>

            <form
              className="individual-profile__form"
              onSubmit={handleSubmit}
            >
              <div className="individual-profile__fields">
                <div className="individual-profile__field">
                  <label htmlFor="individual-fullName">
                    {text.fullName}
                  </label>
                  <input
                    id="individual-fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="individual-profile__field">
                  <label htmlFor="individual-email">
                    {text.email}
                  </label>
                  <input
                    id="individual-email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="individual-profile__field">
                  <label htmlFor="individual-phone">
                    {text.phone}
                  </label>
                  <input
                    id="individual-phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+27..."
                  />
                </div>

                <div className="individual-profile__field">
                  <label htmlFor="individual-location">
                    {text.location}
                  </label>
                  <input
                    id="individual-location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    autoComplete="country-name"
                  />
                </div>

                <div className="individual-profile__field individual-profile__field--full">
                  <label htmlFor="individual-professionalTitle">
                    {text.professionalTitle}
                  </label>
                  <input
                    id="individual-professionalTitle"
                    name="professionalTitle"
                    value={profile.professionalTitle}
                    onChange={handleChange}
                    placeholder={text.professionalPlaceholder}
                  />
                </div>

                <div className="individual-profile__field individual-profile__field--full">
                  <label htmlFor="individual-interests">
                    {text.interests}
                  </label>
                  <input
                    id="individual-interests"
                    name="interests"
                    value={profile.interests}
                    onChange={handleChange}
                    placeholder={text.interestsPlaceholder}
                  />
                </div>

                <div className="individual-profile__field individual-profile__field--full">
                  <label htmlFor="individual-bio">
                    {text.bio}
                  </label>
                  <textarea
                    id="individual-bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder={text.bioPlaceholder}
                    rows={5}
                  />
                </div>
              </div>

              <div className="individual-profile__actions">
                <Button type="submit" variant="primary">
                  <Save size={17} aria-hidden="true" />
                  {text.save}
                </Button>

                <Link
                  to="/individual-dashboard"
                  className="individual-profile__cancel"
                >
                  {text.back}
                </Link>
              </div>
            </form>
          </Card>

          <div className="individual-profile__notice">
            <span>{text.notice}</span>
          </div>
        </main>
      </div>
    </PageContainer>
  );
}