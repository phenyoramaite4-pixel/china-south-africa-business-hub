import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  Image as ImageIcon,
  LockKeyhole,
  MapPin,
  Plus,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useRegistration } from "../context/RegistrationContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import "./Register.css";

const ACCOUNT_TYPES = [
  {
    id: "chinese",
    title: "Chinese Business / Entrepreneur / Investor",
    titleZh: "中国企业 / 企业家 / 投资者",
    icon: Globe2,
    description:
      "Join the hub to connect with South African businesses, professionals and opportunities.",
    descriptionZh:
      "加入平台，与南非企业、专业人士及商业机会建立联系。",
  },
  {
    id: "south-african",
    title: "South African Business",
    titleZh: "南非企业",
    icon: Building2,
    description:
      "Register your business and connect with Chinese partners, investors and opportunities.",
    descriptionZh:
      "注册您的企业，与中国合作伙伴、投资者及商业机会建立联系。",
  },
  {
    id: "professional",
    title: "Independent Professional",
    titleZh: "独立专业人士",
    icon: BriefcaseBusiness,
    description:
      "Offer your professional services and connect with businesses across both markets.",
    descriptionZh:
      "展示您的专业服务，与两国企业建立联系。",
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

function getDocumentRequirements(accountType) {
  if (accountType === "professional") {
    return [
      {
        id: "identity",
        title: "Identity Document",
        titleZh: "身份证明文件",
        description: "Upload a valid identity document.",
        descriptionZh: "上传有效的身份证明文件。",
      },
      {
        id: "professional-profile",
        title: "Professional Profile / CV",
        titleZh: "专业简介 / 简历",
        description: "Upload your professional profile or CV.",
        descriptionZh: "上传您的专业简介或简历。",
      },
      {
        id: "reference-information",
        title: "Reference Information",
        titleZh: "推荐信息",
        description: "Provide supporting reference information.",
        descriptionZh: "提供支持性的推荐信息。",
      },
    ];
  }

  return [
    {
      id: "business-registration",
      title: "Business Registration",
      titleZh: "企业注册证明",
      description: "Upload your official business registration document.",
      descriptionZh: "上传正式的企业注册证明文件。",
    },
    {
      id: "company-profile",
      title: "Company Profile",
      titleZh: "公司简介",
      description: "Upload a company profile or business overview.",
      descriptionZh: "上传公司简介或企业概况。",
    },
    {
      id: "representative-id",
      title: "Director / Representative ID",
      titleZh: "董事 / 企业代表身份证明",
      description: "Upload identification for the business representative.",
      descriptionZh: "上传企业董事或代表的身份证明。",
    },
  ];
}

export default function Register() {
  const { language } = useLanguage();
  const { addRegistration } = useRegistration();
  const isChinese = language === "zh";

  const text = (english, chinese) => (isChinese ? chinese : english);

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const [documentFiles, setDocumentFiles] = useState({});
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [projects, setProjects] = useState([]);
  const [projectDraft, setProjectDraft] = useState({
    title: "",
    details: "",
  });

  const [partners, setPartners] = useState([]);
  const [partnerDraft, setPartnerDraft] = useState("");

  const [references, setReferences] = useState([]);
  const [referenceDraft, setReferenceDraft] = useState({
    name: "",
    company: "",
    contact: "",
  });

  const [formError, setFormError] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const selectedType = ACCOUNT_TYPES.find(
    (type) => type.id === accountType
  );

  const documentRequirements = getDocumentRequirements(accountType);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormError("");
  }

  function selectAccountType(type) {
    setAccountType(type);
    setFormError("");
  }

  function goToDetails() {
    if (!accountType) {
      setFormError(
        text(
          "Please select an account type to continue.",
          "请选择账户类型后继续。"
        )
      );
      return;
    }

    setFormError("");
    setStep(2);
  }

  function goToVerification() {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.province ||
      !form.password ||
      !form.confirmPassword
    ) {
      setFormError(
        text(
          "Please complete all required account details.",
          "请完成所有必填的账户信息。"
        )
      );
      return;
    }

    if (accountType !== "professional" && !form.businessName.trim()) {
      setFormError(
        text(
          "Please enter your business name.",
          "请输入您的企业名称。"
        )
      );
      return;
    }

    if (form.password.length < 6) {
      setFormError(
        text(
          "Password must contain at least 6 characters.",
          "密码至少需要包含6个字符。"
        )
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setFormError(
        text(
          "Passwords do not match.",
          "两次输入的密码不一致。"
        )
      );
      return;
    }

    if (!form.agree) {
      setFormError(
        text(
          "Please accept the terms and conditions.",
          "请接受条款和条件。"
        )
      );
      return;
    }

    setFormError("");
    setStep(3);
  }

  function goBack() {
    setFormError("");
    setVerificationError("");

    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  function handleDocumentChange(documentId, event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setDocumentFiles((current) => ({
      ...current,
      [documentId]: file,
    }));

    setVerificationError("");
  }

  function removeDocument(documentId) {
    setDocumentFiles((current) => {
      const updated = { ...current };
      delete updated[documentId];
      return updated;
    });
  }

  function handleGalleryChange(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setGalleryFiles((current) => [...current, ...files]);
    setVerificationError("");
  }

  function removeGalleryFile(index) {
    setGalleryFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  }

  function addProject() {
    if (!projectDraft.title.trim() || !projectDraft.details.trim()) {
      return;
    }

    setProjects((current) => [
      ...current,
      {
        id: Date.now(),
        title: projectDraft.title.trim(),
        details: projectDraft.details.trim(),
      },
    ]);

    setProjectDraft({
      title: "",
      details: "",
    });
  }

  function removeProject(id) {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  }

  function addPartner() {
    if (!partnerDraft.trim()) {
      return;
    }

    setPartners((current) => [
      ...current,
      {
        id: Date.now(),
        name: partnerDraft.trim(),
      },
    ]);

    setPartnerDraft("");
  }

  function removePartner(id) {
    setPartners((current) =>
      current.filter((partner) => partner.id !== id)
    );
  }

  function addReference() {
    if (
      !referenceDraft.name.trim() ||
      !referenceDraft.company.trim() ||
      !referenceDraft.contact.trim()
    ) {
      return;
    }

    setReferences((current) => [
      ...current,
      {
        id: Date.now(),
        name: referenceDraft.name.trim(),
        company: referenceDraft.company.trim(),
        contact: referenceDraft.contact.trim(),
      },
    ]);

    setReferenceDraft({
      name: "",
      company: "",
      contact: "",
    });
  }

  function removeReference(id) {
    setReferences((current) =>
      current.filter((reference) => reference.id !== id)
    );
  }

  // Converts an uploaded file into a temporary browser-readable data URL.
  // This allows the Admin prototype to display the actual PDF/image later.
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit() {
    const missingDocuments = documentRequirements.filter(
      (document) => !documentFiles[document.id]
    );

    if (missingDocuments.length > 0) {
      setVerificationError(
        text(
          "Please upload all required verification documents before submitting.",
          "提交前请上传所有必需的验证文件。"
        )
      );
      return;
    }

    try {
      // Save the actual uploaded documents.
      const documents = await Promise.all(
        documentRequirements.map(async (document) => {
          const file = documentFiles[document.id];

          return {
            id: document.id,
            name: document.title,
            nameZh: document.titleZh,
            fileName: file?.name || "",
            type: file?.type || "",
            size: file?.size || 0,
            dataUrl: file
              ? await readFileAsDataUrl(file)
              : "",
          };
        })
      );

      // Save the actual uploaded gallery images.
      const gallery = await Promise.all(
        galleryFiles.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );

      const registration = {
        accountType,
        name: form.name,
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        province: form.province,

        services: [],

        documents,

        projects: projects.map((project) => ({
          title: project.title,
          details: project.details,
        })),

        partners: [...partners],

        references: references.map((reference) => ({
          name: reference.name,
          company: reference.company,
          contact: reference.contact,
        })),

        gallery,
      };

      addRegistration(registration);

      setVerificationError("");
      setSubmitted(true);
      setStep(4);
    } catch (error) {
      console.error("Failed to process uploaded files:", error);

      setVerificationError(
        text(
          "There was a problem processing your uploaded files. Please try again.",
          "处理您上传的文件时出现问题，请重试。"
        )
      );
    }
  }

  if (submitted) {
    return (
      <PageContainer className="register-page">
        <div className="register-auth-page">
          <div className="register-success">
            <div className="register-success__icon">
              <CheckCircle2 size={34} />
            </div>

            <span className="register-success__eyebrow">
              {text("Account Created", "账户已创建")}
            </span>

            <h1>
              {text(
                "Your account has been created successfully.",
                "您的账户已成功创建。"
              )}
            </h1>

            <p className="register-success__intro">
              {text(
                "Your account is currently Pending Verification. The Admin team will review your documents and supporting information before your profile becomes verified.",
                "您的账户目前处于待验证状态。管理员团队将审核您提交的文件和支持信息，审核通过后您的资料才会成为已验证资料。"
              )}
            </p>

            <div className="register-pending-status">
              <div className="register-pending-status__icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <span>
                  {text("Account Status", "账户状态")}
                </span>

                <strong>
                  {text("Pending Verification", "待验证")}
                </strong>
              </div>
            </div>

            <div className="register-success__summary">
              <div>
                <span>{text("Account Type", "账户类型")}</span>
                <strong>
                  {isChinese
                    ? selectedType?.titleZh
                    : selectedType?.title}
                </strong>
              </div>

              <div>
                <span>{text("Name", "姓名")}</span>
                <strong>{form.name}</strong>
              </div>

              <div>
                <span>{text("Email", "电子邮箱")}</span>
                <strong>{form.email}</strong>
              </div>
            </div>

            <div className="register-success__actions">
              <Link to="/">
                <Button variant="secondary">
                  {text("Back to Home", "返回首页")}
                </Button>
              </Link>

              <Link to="/profile">
                <Button>
                  {text("Go to Sign In", "前往登录")}
                  <ArrowRight size={17} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="register-page">
      <div className="register-auth-page">
        <div className="register-brand">
          <div className="register-brand__mark">
            <Globe2 size={24} />
          </div>

          <div>
            <strong>
              {text(
                "China–South Africa Business Hub",
                "中南商业合作平台"
              )}
            </strong>

            <span>
              {text(
                "Connect. Trade. Grow.",
                "连接 · 贸易 · 发展"
              )}
            </span>
          </div>
        </div>

        <Card className="register-card">
          <div className="register-card__header">
            <div>
              <span className="register-eyebrow">
                {text(`Step ${step} of 4`, `第 ${step} 步，共 4 步`)}
              </span>

              <h1>
                {step === 1 &&
                  text(
                    "How would you like to join?",
                    "您希望如何加入？"
                  )}

                {step === 2 &&
                  text(
                    "Create your account",
                    "创建您的账户"
                  )}

                {step === 3 &&
                  text(
                    "Complete your verification",
                    "完成您的验证资料"
                  )}

                {step === 4 &&
                  text(
                    "Account Created",
                    "账户已创建"
                  )}
              </h1>

              <p>
                {step === 1 &&
                  text(
                    "Choose the account type that best describes you.",
                    "选择最符合您身份的账户类型。"
                  )}

                {step === 2 &&
                  text(
                    "Create your account before submitting your verification information.",
                    "先创建您的账户，然后提交验证信息。"
                  )}

                {step === 3 &&
                  text(
                    "Provide the documents and supporting information the Admin team will review.",
                    "提供管理员团队需要审核的文件和支持信息。"
                  )}
              </p>
            </div>
          </div>

          <div className="register-progress">
            {[
              { number: 1, label: text("Type", "类型") },
              { number: 2, label: text("Account", "账户") },
              { number: 3, label: text("Verification", "验证") },
              { number: 4, label: text("Complete", "完成") },
            ].map((item) => (
              <div
                key={item.number}
                className={`register-progress__item ${
                  step === item.number
                    ? "is-active"
                    : step > item.number
                    ? "is-complete"
                    : ""
                }`}
              >
                <div className="register-progress__number">
                  {step > item.number ? (
                    <Check size={15} />
                  ) : (
                    item.number
                  )}
                </div>

                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="register-step">
              <div className="register-account-types">
                {ACCOUNT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const selected = accountType === type.id;

                  return (
                    <button
                      key={type.id}
                      type="button"
                      className={`register-account-type ${
                        selected ? "is-selected" : ""
                      }`}
                      onClick={() => selectAccountType(type.id)}
                    >
                      <div className="register-account-type__icon">
                        <Icon size={24} />
                      </div>

                      <div className="register-account-type__content">
                        <h3>
                          {isChinese ? type.titleZh : type.title}
                        </h3>

                        <p>
                          {isChinese
                            ? type.descriptionZh
                            : type.description}
                        </p>
                      </div>

                      <div className="register-account-type__check">
                        {selected && <Check size={17} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {formError && (
                <div className="register-error">
                  {formError}
                </div>
              )}

              <div className="register-actions">
                <div />
                <Button onClick={goToDetails}>
                  {text("Continue", "继续")}
                  <ArrowRight size={17} />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="register-step">
              <div className="register-form-grid">
                <label className="register-form-field">
                  <span>{text("Full Name", "姓名")}</span>

                  <div className="register-input">
                    <UserRound size={17} />

                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder={text(
                        "Enter your full name",
                        "请输入您的姓名"
                      )}
                    />
                  </div>
                </label>

                {accountType !== "professional" && (
                  <label className="register-form-field">
                    <span>
                      {text("Business Name", "企业名称")}
                    </span>

                    <div className="register-input">
                      <Building2 size={17} />

                      <input
                        name="businessName"
                        value={form.businessName}
                        onChange={updateField}
                        placeholder={text(
                          "Enter your business name",
                          "请输入您的企业名称"
                        )}
                      />
                    </div>
                  </label>
                )}

                <label className="register-form-field">
                  <span>
                    {text("Email Address", "电子邮箱")}
                  </span>

                  <div className="register-input">
                    <Globe2 size={17} />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                <label className="register-form-field">
                  <span>
                    {text("Phone Number", "电话号码")}
                  </span>

                  <div className="register-input">
                    <MapPin size={17} />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+27 / +86"
                    />
                  </div>
                </label>

                <label className="register-form-field">
                  <span>
                    {text("Province / Region", "省份 / 地区")}
                  </span>

                  <div className="register-input">
                    <MapPin size={17} />

                    <select
                      name="province"
                      value={form.province}
                      onChange={updateField}
                    >
                      <option value="">
                        {text(
                          "Select province / region",
                          "选择省份 / 地区"
                        )}
                      </option>

                      {PROVINCES.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="register-form-field">
                  <span>{text("Password", "密码")}</span>

                  <div className="register-input">
                    <LockKeyhole size={17} />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={updateField}
                      placeholder={text(
                        "Create a password",
                        "创建密码"
                      )}
                    />
                  </div>
                </label>

                <label className="register-form-field">
                  <span>
                    {text("Confirm Password", "确认密码")}
                  </span>

                  <div className="register-input">
                    <LockKeyhole size={17} />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={updateField}
                      placeholder={text(
                        "Confirm your password",
                        "确认您的密码"
                      )}
                    />
                  </div>
                </label>
              </div>

              <label className="register-checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={updateField}
                />

                <span>
                  {text(
                    "I agree to the Terms and Conditions and understand that my account will remain Pending Verification until reviewed by an Administrator.",
                    "我同意条款和条件，并了解我的账户在管理员审核之前将保持待验证状态。"
                  )}
                </span>
              </label>

              {formError && (
                <div className="register-error">
                  {formError}
                </div>
              )}

              <div className="register-actions">
                <button
                  type="button"
                  className="register-secondary-button"
                  onClick={goBack}
                >
                  <ArrowLeft size={17} />
                  {text("Back", "返回")}
                </button>

                <Button onClick={goToVerification}>
                  {text("Continue to Verification", "继续进行验证")}
                  <ArrowRight size={17} />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="register-verification">
              <div className="register-verification__intro">
                <div className="register-verification__intro-icon">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <strong>
                    {text(
                      "Account details complete",
                      "账户信息已完成"
                    )}
                  </strong>

                  <p>
                    {text(
                      "Your account will be created when you submit this verification information. It will remain Pending Verification until an Administrator reviews it.",
                      "提交这些验证信息后，您的账户将被创建。在管理员审核之前，账户将保持待验证状态。"
                    )}
                  </p>
                </div>
              </div>

              <section className="register-verification__section">
                <div className="register-verification__section-header">
                  <div>
                    <span className="register-section-eyebrow">
                      01
                    </span>

                    <h2>
                      {text(
                        "Verification Documents",
                        "验证文件"
                      )}
                    </h2>

                    <p>
                      {text(
                        "These documents are required for your account type.",
                        "这些文件是您的账户类型所必需的。"
                      )}
                    </p>
                  </div>
                </div>

                <div className="register-verification__document-list">
                  {documentRequirements.map((document) => {
                    const file = documentFiles[document.id];

                    return (
                      <div
                        key={document.id}
                        className={`register-verification__document ${
                          file ? "has-file" : ""
                        }`}
                      >
                        <div className="register-verification__document-icon">
                          <FileText size={21} />
                        </div>

                        <div className="register-verification__document-content">
                          <strong>
                            {isChinese
                              ? document.titleZh
                              : document.title}
                          </strong>

                          <p>
                            {isChinese
                              ? document.descriptionZh
                              : document.description}
                          </p>

                          {file && (
                            <span className="register-verification__file-name">
                              {file.name}
                            </span>
                          )}
                        </div>

                        {file ? (
                          <button
                            type="button"
                            className="register-icon-button"
                            onClick={() =>
                              removeDocument(document.id)
                            }
                            aria-label={text(
                              "Remove document",
                              "删除文件"
                            )}
                          >
                            <Trash2 size={17} />
                          </button>
                        ) : (
                          <label className="register-upload-button">
                            <Upload size={16} />
                            {text("Upload", "上传")}

                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              onChange={(event) =>
                                handleDocumentChange(
                                  document.id,
                                  event
                                )
                              }
                            />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="register-verification__section">
                <div className="register-verification__section-header">
                  <div>
                    <span className="register-section-eyebrow">
                      02
                    </span>

                    <h2>
                      {text(
                        "Projects Worked On",
                        "参与过的项目"
                      )}
                    </h2>

                    <p>
                      {text(
                        "Optional — add relevant projects where applicable.",
                        "可选 — 如适用，可添加相关项目。"
                      )}
                    </p>
                  </div>
                </div>

                <div className="register-verification__grid">
                  <input
                    value={projectDraft.title}
                    onChange={(event) =>
                      setProjectDraft((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder={text(
                      "Project title",
                      "项目名称"
                    )}
                  />

                  <input
                    value={projectDraft.details}
                    onChange={(event) =>
                      setProjectDraft((current) => ({
                        ...current,
                        details: event.target.value,
                      }))
                    }
                    placeholder={text(
                      "Project details",
                      "项目详情"
                    )}
                  />
                </div>

                <div className="register-verification__add-row">
                  <button
                    type="button"
                    className="register-add-button"
                    onClick={addProject}
                  >
                    <Plus size={17} />
                    {text("Add Project", "添加项目")}
                  </button>
                </div>

                {projects.length > 0 && (
                  <div className="register-verification__items">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="register-verification__item"
                      >
                        <div className="register-verification__item-main">
                          <strong>{project.title}</strong>
                          <span>{project.details}</span>
                        </div>

                        <button
                          type="button"
                          className="register-icon-button"
                          onClick={() =>
                            removeProject(project.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="register-verification__section">
                <div className="register-verification__section-header">
                  <div>
                    <span className="register-section-eyebrow">
                      03
                    </span>

                    <h2>
                      {text(
                        "Partnered Companies / Individuals",
                        "合作过的企业 / 个人"
                      )}
                    </h2>

                    <p>
                      {text(
                        "Optional — add previous business partners where applicable.",
                        "可选 — 如适用，可添加过去的商业合作伙伴。"
                      )}
                    </p>
                  </div>
                </div>

                <div className="register-verification__grid register-verification__grid--single">
                  <input
                    value={partnerDraft}
                    onChange={(event) =>
                      setPartnerDraft(event.target.value)
                    }
                    placeholder={text(
                      "Company or individual's name",
                      "企业或个人名称"
                    )}
                  />
                </div>

                <div className="register-verification__add-row">
                  <button
                    type="button"
                    className="register-add-button"
                    onClick={addPartner}
                  >
                    <Plus size={17} />
                    {text("Add Partner", "添加合作伙伴")}
                  </button>
                </div>

                {partners.length > 0 && (
                  <div className="register-verification__items">
                    {partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="register-verification__item"
                      >
                        <div className="register-verification__item-main">
                          <Handshake size={17} />
                          <strong>{partner.name}</strong>
                        </div>

                        <button
                          type="button"
                          className="register-icon-button"
                          onClick={() =>
                            removePartner(partner.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="register-verification__section">
                <div className="register-verification__section-header">
                  <div>
                    <span className="register-section-eyebrow">
                      04
                    </span>

                    <h2>
                      {text("References", "推荐人")}
                    </h2>

                    <p>
                      {text(
                        "Optional — provide professional references where applicable.",
                        "可选 — 如适用，可提供专业推荐人信息。"
                      )}
                    </p>
                  </div>
                </div>

                <div className="register-verification__grid">
                  <input
                    value={referenceDraft.name}
                    onChange={(event) =>
                      setReferenceDraft((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder={text(
                      "Reference name",
                      "推荐人姓名"
                    )}
                  />

                  <input
                    value={referenceDraft.company}
                    onChange={(event) =>
                      setReferenceDraft((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    placeholder={text(
                      "Company / organisation",
                      "企业 / 组织"
                    )}
                  />

                  <input
                    value={referenceDraft.contact}
                    onChange={(event) =>
                      setReferenceDraft((current) => ({
                        ...current,
                        contact: event.target.value,
                      }))
                    }
                    placeholder={text(
                      "Email or phone",
                      "邮箱或电话"
                    )}
                  />
                </div>

                <div className="register-verification__add-row">
                  <button
                    type="button"
                    className="register-add-button"
                    onClick={addReference}
                  >
                    <Plus size={17} />
                    {text("Add Reference", "添加推荐人")}
                  </button>
                </div>

                {references.length > 0 && (
                  <div className="register-verification__items">
                    {references.map((reference) => (
                      <div
                        key={reference.id}
                        className="register-verification__item"
                      >
                        <div className="register-verification__item-main">
                          <strong>{reference.name}</strong>
                          <span>
                            {reference.company} ·{" "}
                            {reference.contact}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="register-icon-button"
                          onClick={() =>
                            removeReference(reference.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="register-verification__section">
                <div className="register-verification__section-header">
                  <div>
                    <span className="register-section-eyebrow">
                      05
                    </span>

                    <h2>
                      {text("Gallery / Media", "图片 / 媒体")}
                    </h2>

                    <p>
                      {text(
                        "Optional — upload photos that support your profile or work.",
                        "可选 — 上传能够支持您的资料或工作的照片。"
                      )}
                    </p>
                  </div>
                </div>

                <label className="register-gallery-upload">
                  <div className="register-gallery-upload__icon">
                    <ImageIcon size={25} />
                  </div>

                  <strong>
                    {text(
                      "Add supporting photos",
                      "添加支持性照片"
                    )}
                  </strong>

                  <span>
                    {text(
                      "JPG, PNG or other image files",
                      "JPG、PNG 或其他图片文件"
                    )}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                  />
                </label>

                {galleryFiles.length > 0 && (
                  <div className="register-gallery-files">
                    {galleryFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="register-gallery-file"
                      >
                        <ImageIcon size={16} />
                        <span>{file.name}</span>

                        <button
                          type="button"
                          className="register-icon-button"
                          onClick={() =>
                            removeGalleryFile(index)
                          }
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {verificationError && (
                <div className="register-validation-message">
                  {verificationError}
                </div>
              )}

              <div className="register-verification__submit-note">
                <LockKeyhole size={17} />

                <span>
                  {text(
                    "When you submit, your account will be created and its status will remain Pending Verification until an Administrator reviews your submission.",
                    "提交后，您的账户将被创建，其状态将在管理员审核您的提交内容之前保持待验证状态。"
                  )}
                </span>
              </div>

              <div className="register-actions">
                <button
                  type="button"
                  className="register-secondary-button"
                  onClick={goBack}
                >
                  <ArrowLeft size={17} />
                  {text("Back", "返回")}
                </button>

                <Button onClick={handleSubmit}>
                  {text(
                    "Create Account & Submit for Verification",
                    "创建账户并提交验证"
                  )}
                  <CheckCircle2 size={17} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="register-auth-footer">
          <span>
            {text(
              "Already have an account?",
              "已经有账户？"
            )}
          </span>

          <Link to="/profile">
            {text("Sign in", "登录")}
          </Link>
        </div>

        <div className="register-security-note">
          <LockKeyhole size={15} />
          <span>
            {text(
              "Your information is submitted securely for administrative review.",
              "您的信息将安全提交给管理员审核。"
            )}
          </span>
        </div>
      </div>
    </PageContainer>
  );
}