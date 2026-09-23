import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import "./Register.css";

const ACCOUNT_TYPES = [
  {
    id: "chinese",
    icon: Globe2,
    en: "Chinese Business / Entrepreneur / Investor",
    zh: "中国企业 / 企业家 / 投资者",
    descriptionEn:
      "Connect with South African businesses, partners, suppliers and opportunities.",
    descriptionZh:
      "与南非企业、合作伙伴、供应商及商业机会建立联系。",
  },
  {
    id: "south-african",
    icon: Building2,
    en: "South African Business",
    zh: "南非企业",
    descriptionEn:
      "Showcase your business and connect with Chinese companies, investors and partners.",
    descriptionZh:
      "展示您的企业，并与中国企业、投资者及合作伙伴建立联系。",
  },
  {
    id: "professional",
    icon: UserRound,
    en: "Independent Professional",
    zh: "独立专业人士",
    descriptionEn:
      "Offer your professional services and connect with businesses that need your expertise.",
    descriptionZh:
      "展示您的专业服务，与需要您专业技能的企业建立联系。",
  },
];

const PROVINCES = [
  "Gauteng",
  "KwaZulu-Natal",
  "Western Cape",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

export default function Register() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    province: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function selectAccountType(type) {
    setAccountType(type);
  }

  function goToDetails() {
    if (!accountType) return;
    setStep(2);
  }

  function goBack() {
    if (step === 2) {
      setStep(1);
      return;
    }

    if (step === 3) {
      setStep(2);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.province ||
      !form.password.trim() ||
      !form.confirmPassword.trim() ||
      !form.agree
    ) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      return;
    }

    setSubmitted(true);
    setStep(3);
  }

  const selectedType = ACCOUNT_TYPES.find(
    (type) => type.id === accountType
  );

  if (submitted) {
    return (
      <PageContainer width="sm" className="register-page">
        <section className="register-auth-page">
          <div className="register-brand">
            <div className="register-brand__mark">
              <Globe2 size={27} aria-hidden="true" />
            </div>

            <span className="register-brand__eyebrow">
              {isChinese
                ? "中国—南非商业中心"
                : "China–South Africa Business Hub"}
            </span>
          </div>

          <Card className="register-card register-success">
            <div className="register-success__icon">
              <Check size={31} aria-hidden="true" />
            </div>

            <span className="register-card__eyebrow">
              {isChinese ? "账户创建成功" : "Account Created"}
            </span>

            <h1>
              {isChinese
                ? "欢迎加入商业中心"
                : "Welcome to the Business Hub"}
            </h1>

            <p>
              {isChinese
                ? "这是原型演示流程。正式平台将在账户创建后完成身份验证，并引导您完善企业或专业人士资料。"
                : "This is a prototype registration flow. The live platform will verify your account and guide you through completing your business or professional profile."}
            </p>

            <div className="register-success__summary">
              <div>
                <span>
                  {isChinese ? "账户类型" : "Account Type"}
                </span>
                <strong>
                  {isChinese
                    ? selectedType?.zh
                    : selectedType?.en}
                </strong>
              </div>

              <div>
                <span>{isChinese ? "姓名" : "Name"}</span>
                <strong>{form.name}</strong>
              </div>

              <div>
                <span>{isChinese ? "邮箱" : "Email"}</span>
                <strong>{form.email}</strong>
              </div>
            </div>

            <div className="register-success__actions">
              <Button
                type="button"
                variant="primary"
                to="/"
              >
                {isChinese ? "返回首页" : "Back to Home"}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                to="/profile"
              >
                {isChinese ? "前往登录" : "Go to Sign In"}
              </Button>
            </div>
          </Card>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer width="sm" className="register-page">
      <section className="register-auth-page">
        <div className="register-brand">
          <div className="register-brand__mark">
            <Globe2 size={27} aria-hidden="true" />
          </div>

          <span className="register-brand__eyebrow">
            {isChinese
              ? "中国—南非商业中心"
              : "China–South Africa Business Hub"}
          </span>
        </div>

        <Card className="register-card">
          <div className="register-heading">
            <span className="register-card__eyebrow">
              {isChinese ? "创建账户" : "Create Account"}
            </span>

            <h1>
              {step === 1
                ? isChinese
                  ? "您想如何加入？"
                  : "How would you like to join?"
                : isChinese
                  ? "创建您的账户"
                  : "Create your account"}
            </h1>

            <p>
              {step === 1
                ? isChinese
                  ? "选择最符合您身份的账户类型。"
                  : "Choose the account type that best describes you."
                : isChinese
                  ? "填写您的基本信息以创建账户。"
                  : "Enter your basic information to create your account."}
            </p>
          </div>

          <div className="register-progress">
            <div
              className={`register-progress__step ${
                step >= 1 ? "is-active" : ""
              }`}
            >
              <span>1</span>
              <small>{isChinese ? "类型" : "Type"}</small>
            </div>

            <div
              className={`register-progress__line ${
                step >= 2 ? "is-active" : ""
              }`}
            />

            <div
              className={`register-progress__step ${
                step >= 2 ? "is-active" : ""
              }`}
            >
              <span>2</span>
              <small>{isChinese ? "资料" : "Details"}</small>
            </div>

            <div
              className={`register-progress__line ${
                step >= 3 ? "is-active" : ""
              }`}
            />

            <div
              className={`register-progress__step ${
                step >= 3 ? "is-active" : ""
              }`}
            >
              <span>3</span>
              <small>{isChinese ? "完成" : "Complete"}</small>
            </div>
          </div>

          {step === 1 ? (
            <div className="register-types">
              {ACCOUNT_TYPES.map((type) => {
                const Icon = type.icon;
                const selected = accountType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    className={`register-type ${
                      selected ? "is-selected" : ""
                    }`}
                    onClick={() => selectAccountType(type.id)}
                  >
                    <div className="register-type__icon">
                      <Icon size={21} aria-hidden="true" />
                    </div>

                    <div className="register-type__content">
                      <strong>
                        {isChinese ? type.zh : type.en}
                      </strong>

                      <span>
                        {isChinese
                          ? type.descriptionZh
                          : type.descriptionEn}
                      </span>
                    </div>

                    <div className="register-type__check">
                      {selected ? (
                        <Check size={16} aria-hidden="true" />
                      ) : null}
                    </div>
                  </button>
                );
              })}

              <Button
                type="button"
                variant="primary"
                className="register-next"
                disabled={!accountType}
                onClick={goToDetails}
              >
                {isChinese ? "继续" : "Continue"}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-field">
                <label htmlFor="register-name">
                  {isChinese ? "姓名" : "Full name"}
                </label>

                <div className="register-input">
                  <UserRound size={18} aria-hidden="true" />

                  <input
                    id="register-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder={
                      isChinese ? "输入您的姓名" : "Enter your full name"
                    }
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {accountType !== "professional" ? (
                <div className="register-field">
                  <label htmlFor="register-business">
                    {isChinese ? "企业名称" : "Business name"}
                  </label>

                  <div className="register-input">
                    <Building2 size={18} aria-hidden="true" />

                    <input
                      id="register-business"
                      type="text"
                      value={form.businessName}
                      onChange={(event) =>
                        updateField(
                          "businessName",
                          event.target.value
                        )
                      }
                      placeholder={
                        isChinese
                          ? "输入企业名称"
                          : "Enter your business name"
                      }
                      autoComplete="organization"
                    />
                  </div>
                </div>
              ) : null}

              <div className="register-field">
                <label htmlFor="register-email">
                  {isChinese ? "邮箱地址" : "Email address"}
                </label>

                <div className="register-input">
                  <Mail size={18} aria-hidden="true" />

                  <input
                    id="register-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder={
                      isChinese
                        ? "输入邮箱地址"
                        : "Enter your email address"
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-phone">
                  {isChinese ? "手机号码" : "Phone number"}
                </label>

                <div className="register-input">
                  <Phone size={18} aria-hidden="true" />

                  <input
                    id="register-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder={
                      isChinese
                        ? "输入手机号码"
                        : "Enter your phone number"
                    }
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-province">
                  {isChinese ? "省份 / 地区" : "Province / Region"}
                </label>

                <div className="register-input register-select">
                  <MapPin size={18} aria-hidden="true" />

                  <select
                    id="register-province"
                    value={form.province}
                    onChange={(event) =>
                      updateField("province", event.target.value)
                    }
                    required
                  >
                    <option value="">
                      {isChinese
                        ? "选择省份 / 地区"
                        : "Select province / region"}
                    </option>

                    {PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-password">
                  {isChinese ? "密码" : "Password"}
                </label>

                <div className="register-input">
                  <LockKeyhole size={18} aria-hidden="true" />

                  <input
                    id="register-password"
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    placeholder={
                      isChinese ? "创建密码" : "Create a password"
                    }
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-confirm-password">
                  {isChinese ? "确认密码" : "Confirm password"}
                </label>

                <div className="register-input">
                  <LockKeyhole size={18} aria-hidden="true" />

                  <input
                    id="register-confirm-password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    placeholder={
                      isChinese
                        ? "再次输入密码"
                        : "Enter your password again"
                    }
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <label className="register-checkbox">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(event) =>
                    updateField("agree", event.target.checked)
                  }
                  required
                />

                <span>
                  {isChinese
                    ? "我同意平台的使用条款和隐私政策。"
                    : "I agree to the platform's Terms of Use and Privacy Policy."}
                </span>
              </label>

              <div className="register-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={goBack}
                >
                  <ArrowLeft size={17} aria-hidden="true" />
                  {isChinese ? "返回" : "Back"}
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={
                    !form.name.trim() ||
                    !form.email.trim() ||
                    !form.phone.trim() ||
                    !form.province ||
                    !form.password.trim() ||
                    !form.confirmPassword.trim() ||
                    !form.agree
                  }
                >
                  {isChinese ? "创建账户" : "Create Account"}
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
              </div>
            </form>
          )}

          <div className="register-divider">
            <span>
              {isChinese
                ? "已经有账户？"
                : "Already have an account?"}
            </span>
          </div>

          <Link to="/profile" className="register-signin-link">
            <UserRound size={17} aria-hidden="true" />
            {isChinese ? "前往登录" : "Sign In"}
          </Link>

          <div className="register-demo-note">
            {isChinese
              ? "原型说明：注册流程目前为演示流程。正式版本将使用安全的服务器端身份验证、邮箱验证和账户审核。"
              : "Prototype notice: Registration is currently a demonstration flow. The production version will use secure server-side authentication, email verification and account review."}
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}