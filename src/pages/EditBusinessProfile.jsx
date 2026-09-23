import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import "./EditBusinessProfile.css";

const PROVINCES = [
  {
    en: "Gauteng",
    zh: "豪登省",
  },
  {
    en: "KwaZulu-Natal",
    zh: "夸祖鲁-纳塔尔省",
  },
  {
    en: "Western Cape",
    zh: "西开普省",
  },
  {
    en: "Eastern Cape",
    zh: "东开普省",
  },
  {
    en: "Limpopo",
    zh: "林波波省",
  },
  {
    en: "Mpumalanga",
    zh: "普马兰加省",
  },
  {
    en: "North West",
    zh: "西北省",
  },
  {
    en: "Free State",
    zh: "自由州",
  },
  {
    en: "Northern Cape",
    zh: "北开普省",
  },
];

export default function EditBusinessProfile() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const text = (english, chinese) =>
    isChinese ? chinese : english;

  const [form, setForm] = useState({
    businessName: "Shanghai Trade & Investment Ltd",
    businessType:
      "Chinese Business / Entrepreneur / Investor",
    industry: "China–South Africa Business",
    province: "Gauteng",
    city: "Johannesburg",
    email: "contact@shanghaitrade.demo",
    phone: "+27 11 000 2026",
    website: "www.shanghaitrade.demo",
    description:
      "Shanghai Trade & Investment Ltd is a fictional demonstration business representing a Chinese company exploring commercial opportunities, partnerships and market expansion in South Africa.",
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
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
    <PageContainer className="edit-business-profile">
      <div className="edit-business-profile__topbar">
        <Link
          to="/my-business-profile"
          className="edit-business-profile__back"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          {text(
            "Back to My Business Profile",
            "返回我的企业资料"
          )}
        </Link>

        <span className="edit-business-profile__status">
          <ShieldCheck size={15} aria-hidden="true" />
          {text(
            "Profile editing",
            "资料编辑"
          )}
        </span>
      </div>

      <header className="edit-business-profile__header">
        <div className="edit-business-profile__identity-icon">
          <Building2 size={28} aria-hidden="true" />
        </div>

        <div>
          <span className="edit-business-profile__eyebrow">
            {text(
              "Manage your business",
              "管理您的企业"
            )}
          </span>

          <h1 className="edit-business-profile__title">
            {text(
              "Edit Business Profile",
              "编辑企业资料"
            )}
          </h1>

          <p className="edit-business-profile__subtitle">
            {text(
              "Keep your business information accurate and up to date.",
              "保持您的企业信息准确并及时更新。"
            )}
          </p>
        </div>
      </header>

      <form
        className="edit-business-profile__form"
        onSubmit={handleSubmit}
      >
        <section className="edit-business-profile__card">
          <div className="edit-business-profile__card-heading">
            <div>
              <span className="edit-business-profile__eyebrow">
                {text(
                  "Business information",
                  "企业信息"
                )}
              </span>

              <h2>
                {text(
                  "Company Details",
                  "企业详情"
                )}
              </h2>
            </div>

            <Building2 size={20} aria-hidden="true" />
          </div>

          <div className="edit-business-profile__fields">
            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Business name",
                  "企业名称"
                )}
              </span>

              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Business type",
                  "企业类型"
                )}
              </span>

              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
              >
                <option value="Chinese Business / Entrepreneur / Investor">
                  {text(
                    "Chinese Business / Entrepreneur / Investor",
                    "中国企业 / 企业家 / 投资者"
                  )}
                </option>

                <option value="South African Business">
                  {text(
                    "South African Business",
                    "南非企业"
                  )}
                </option>

                <option value="Independent Professional">
                  {text(
                    "Independent Professional",
                    "独立专业人士"
                  )}
                </option>
              </select>
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Industry",
                  "行业"
                )}
              </span>

              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                required
              />
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Province",
                  "省份"
                )}
              </span>

              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                required
              >
                {PROVINCES.map((province) => (
                  <option
                    key={province.en}
                    value={province.en}
                  >
                    {text(
                      province.en,
                      province.zh
                    )}
                  </option>
                ))}
              </select>
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "City",
                  "城市"
                )}
              </span>

              <div className="edit-business-profile__input-icon">
                <MapPin
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Website",
                  "网站"
                )}
              </span>

              <div className="edit-business-profile__input-icon">
                <Globe2
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
        </section>

        <section className="edit-business-profile__card">
          <div className="edit-business-profile__card-heading">
            <div>
              <span className="edit-business-profile__eyebrow">
                {text(
                  "About your business",
                  "企业介绍"
                )}
              </span>

              <h2>
                {text(
                  "Business Description",
                  "企业描述"
                )}
              </h2>
            </div>
          </div>

          <label className="edit-business-profile__field edit-business-profile__field--full">
            <span>
              {text(
                "Business overview",
                "企业概况"
              )}
            </span>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              required
            />
          </label>
        </section>

        <section className="edit-business-profile__card">
          <div className="edit-business-profile__card-heading">
            <div>
              <span className="edit-business-profile__eyebrow">
                {text(
                  "Contact information",
                  "联系方式"
                )}
              </span>

              <h2>
                {text(
                  "Business Contact",
                  "企业联系方式"
                )}
              </h2>
            </div>

            <Mail size={20} aria-hidden="true" />
          </div>

          <div className="edit-business-profile__fields">
            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Email address",
                  "电子邮箱"
                )}
              </span>

              <div className="edit-business-profile__input-icon">
                <Mail
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="edit-business-profile__field">
              <span>
                {text(
                  "Phone number",
                  "电话号码"
                )}
              </span>

              <div className="edit-business-profile__input-icon">
                <Phone
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          </div>
        </section>

        {saved && (
          <div className="edit-business-profile__success">
            <CheckCircle2
              size={19}
              aria-hidden="true"
            />

            <div>
              <strong>
                {text(
                  "Profile updated successfully",
                  "资料更新成功"
                )}
              </strong>

              <span>
                {text(
                  "Your changes have been saved in this prototype session.",
                  "您的更改已保存在本次原型会话中。"
                )}
              </span>
            </div>
          </div>
        )}

       <div className="edit-business-profile__actions">
  <Button
    to="/my-business-profile"
    variant="secondary"
  >
    {text("Cancel", "取消")}
  </Button>

  <button
    type="submit"
    className="edit-business-profile__save"
  >
    <Save size={17} aria-hidden="true" />
    {text("Save Changes", "保存更改")}
  </button>
</div>
      </form>

      <div className="edit-business-profile__demo-note">
        <ShieldCheck
          size={16}
          aria-hidden="true"
        />

        <span>
          {text(
            "Prototype notice: Profile changes are simulated for the demonstration. Production changes will be securely saved to the user's account and database.",
            "原型说明：资料更改仅用于演示。正式平台中的更改将安全保存到用户账户和数据库中。"
          )}
        </span>
      </div>
    </PageContainer>
  );
}