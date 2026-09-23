import {
ArrowLeft,
CheckCircle2,
Clock3,
FileCheck2,
FileText,
ShieldCheck,
Trash2,
Upload,
XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import "./BusinessDocuments.css";

const DOCUMENT_TYPES = [
{
id: "company-registration",
en: "Company Registration Certificate",
zh: "企业注册证书",
descriptionEn: "Official company registration or incorporation document.",
descriptionZh: "官方企业注册或成立文件。",
required: true,
},
{
id: "tax-document",
en: "Tax / SARS Document",
zh: "税务 / SARS 文件",
descriptionEn: "Tax registration or relevant tax compliance document.",
descriptionZh: "税务登记或相关税务合规文件。",
required: true,
},
{
id: "bbbee",
en: "B-BBEE Certificate / Affidavit",
zh: "B-BBEE 证书 / 宣誓书",
descriptionEn: "B-BBEE certificate or applicable affidavit.",
descriptionZh: "B-BBEE 证书或适用的宣誓书。",
required: false,
},
{
id: "proof-of-address",
en: "Proof of Business Address",
zh: "企业地址证明",
descriptionEn: "Recent document confirming the business address.",
descriptionZh: "确认企业地址的近期文件。",
required: true,
},
{
id: "director-id",
en: "Director / Owner Identification",
zh: "董事 / 企业所有人身份证明",
descriptionEn: "Identification document for the relevant director or owner.",
descriptionZh: "相关董事或企业所有人的身份证明文件。",
required: true,
},
{
id: "business-licence",
en: "Business Licence / Permit",
zh: "营业执照 / 许可证",
descriptionEn: "Licence or permit required for the business activity, where applicable.",
descriptionZh: "如适用，提供开展相关业务所需的许可证或许可文件。",
required: false,
},
{
id: "company-profile",
en: "Company Profile",
zh: "企业简介",
descriptionEn: "A company profile describing the business, services and capabilities.",
descriptionZh: "介绍企业、服务和业务能力的企业简介。",
required: false,
},
{
id: "certifications",
en: "Business Certifications",
zh: "企业认证",
descriptionEn: "Relevant industry, quality or professional certifications.",
descriptionZh: "相关行业、质量或专业认证。",
required: false,
},
{
id: "other",
en: "Other Supporting Documents",
zh: "其他支持文件",
descriptionEn: "Additional documents that support the business verification process.",
descriptionZh: "支持企业验证流程的其他文件。",
required: false,
},
];

const STORAGE_KEY = "chinaHubBusinessDocuments";

function loadDocuments() {
const saved = sessionStorage.getItem(STORAGE_KEY);

if (!saved) {
return {};
}

try {
return JSON.parse(saved);
} catch {
return {};
}
}

export default function BusinessDocuments() {
const { language } = useLanguage();
const isChinese = language === "zh";

const text = (english, chinese) =>
isChinese ? chinese : english;

const [documents, setDocuments] = useState(loadDocuments);
const [message, setMessage] = useState("");

function saveDocuments(nextDocuments) {
setDocuments(nextDocuments);
sessionStorage.setItem(
STORAGE_KEY,
JSON.stringify(nextDocuments)
);
}

function handleFileChange(event, documentType) {
const file = event.target.files?.[0];

if (!file) {
  return;
}

const nextDocuments = {
  ...documents,
  [documentType.id]: {
    fileName: file.name,
    fileSize: file.size,
    status: "uploaded",
    uploadedAt: new Date().toLocaleDateString(),
  },
};

saveDocuments(nextDocuments);

setMessage(
  text(
    `${documentType.en} uploaded successfully.`,
    `${documentType.zh}上传成功。`
  )
);

event.target.value = "";

}

function removeDocument(documentType) {
const nextDocuments = {
...documents,
};

delete nextDocuments[documentType.id];

saveDocuments(nextDocuments);

setMessage(
  text(
    `${documentType.en} removed.`,
    `${documentType.zh}已删除。`
  )
);

}

function getStatus(documentType) {
const document = documents[documentType.id];

if (!document) {
  return {
    label: text("Not Uploaded", "未上传"),
    className: "not-uploaded",
    icon: Upload,
  };
}

if (document.status === "approved") {
  return {
    label: text("Approved", "已批准"),
    className: "approved",
    icon: CheckCircle2,
  };
}

if (document.status === "rejected") {
  return {
    label: text("Rejected", "已拒绝"),
    className: "rejected",
    icon: XCircle,
  };
}

return {
  label: text("Uploaded — Pending Review", "已上传 — 等待审核"),
  className: "pending",
  icon: Clock3,
};

}

const uploadedCount = DOCUMENT_TYPES.filter(
(documentType) => documents[documentType.id]
).length;

const requiredCount = DOCUMENT_TYPES.filter(
(documentType) => documentType.required
).length;

const requiredUploadedCount = DOCUMENT_TYPES.filter(
(documentType) =>
documentType.required && documents[documentType.id]
).length;

return ( <PageContainer className="business-documents"> <div className="business-documents__topbar"> <Link
       to="/dashboard"
       className="business-documents__back"
     > <ArrowLeft size={17} aria-hidden="true" />
{text("Back to Dashboard", "返回控制面板")} </Link>

    <span className="business-documents__status">
      <ShieldCheck size={15} aria-hidden="true" />
      {text("Verification Documents", "验证文件")}
    </span>
  </div>

  <header className="business-documents__header">
    <div className="business-documents__header-icon">
      <FileCheck2 size={28} aria-hidden="true" />
    </div>

    <div>
      <span className="business-documents__eyebrow">
        {text("Business verification", "企业验证")}
      </span>

      <h1 className="business-documents__title">
        {text("Business Documents", "企业文件")}
      </h1>

      <p className="business-documents__subtitle">
        {text(
          "Upload and manage the documents used to verify your business on the China–South Africa Business Hub.",
          "上传和管理用于验证您在中南商业平台上企业身份的文件。"
        )}
      </p>
    </div>
  </header>

  <section className="business-documents__overview">
    <div className="business-documents__overview-card">
      <FileText size={20} aria-hidden="true" />

      <div>
        <strong>{uploadedCount}</strong>
        <span>
          {text(
            "Documents uploaded",
            "已上传文件"
          )}
        </span>
      </div>
    </div>

    <div className="business-documents__overview-card">
      <ShieldCheck size={20} aria-hidden="true" />

      <div>
        <strong>
          {requiredUploadedCount}/{requiredCount}
        </strong>
        <span>
          {text(
            "Required documents",
            "必需文件"
          )}
        </span>
      </div>
    </div>

    <div className="business-documents__overview-card">
      <Clock3 size={20} aria-hidden="true" />

      <div>
        <strong>
          {uploadedCount > 0
            ? text("Pending", "审核中")
            : text("Ready", "待上传")}
        </strong>
        <span>
          {text(
            "Verification status",
            "验证状态"
          )}
        </span>
      </div>
    </div>
  </section>

  {message && (
    <div className="business-documents__message">
      <CheckCircle2 size={18} aria-hidden="true" />

      <span>{message}</span>

      <button
        type="button"
        onClick={() => setMessage("")}
        aria-label={text("Close", "关闭")}
      >
        ×
      </button>
    </div>
  )}

  <section className="business-documents__card">
    <div className="business-documents__card-heading">
      <div>
        <span className="business-documents__eyebrow">
          {text(
            "Verification checklist",
            "验证清单"
          )}
        </span>

        <h2>
          {text(
            "Upload Business Documents",
            "上传企业文件"
          )}
        </h2>
      </div>

      <FileCheck2 size={20} aria-hidden="true" />
    </div>

    <div className="business-documents__list">
      {DOCUMENT_TYPES.map((documentType) => {
        const document = documents[documentType.id];
        const status = getStatus(documentType);
        const StatusIcon = status.icon;

        return (
          <article
            className="business-documents__item"
            key={documentType.id}
          >
            <div className="business-documents__item-icon">
              <FileText size={20} aria-hidden="true" />
            </div>

            <div className="business-documents__item-content">
              <div className="business-documents__item-title-row">
                <h3>
                  {text(
                    documentType.en,
                    documentType.zh
                  )}
                </h3>

                {documentType.required && (
                  <span className="business-documents__required">
                    {text("Required", "必需")}
                  </span>
                )}
              </div>

              <p>
                {text(
                  documentType.descriptionEn,
                  documentType.descriptionZh
                )}
              </p>

              {document && (
                <div className="business-documents__file">
                  <FileText
                    size={15}
                    aria-hidden="true"
                  />

                  <span>{document.fileName}</span>

                  <small>
                    {document.uploadedAt}
                  </small>
                </div>
              )}
            </div>

            <div className="business-documents__item-actions">
              <span
                className={`business-documents__item-status business-documents__item-status--${status.className}`}
              >
                <StatusIcon
                  size={14}
                  aria-hidden="true"
                />
                {status.label}
              </span>

              <label className="business-documents__upload">
                <Upload
                  size={15}
                  aria-hidden="true"
                />

                {text(
                  document ? "Replace" : "Upload",
                  document ? "替换" : "上传"
                )}

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    handleFileChange(
                      event,
                      documentType
                    )
                  }
                />
              </label>

              {document && (
                <button
                  type="button"
                  className="business-documents__remove"
                  onClick={() =>
                    removeDocument(documentType)
                  }
                >
                  <Trash2
                    size={15}
                    aria-hidden="true"
                  />

                  {text("Remove", "删除")}
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  </section>

  <section className="business-documents__security">
    <div className="business-documents__security-icon">
      <ShieldCheck size={21} aria-hidden="true" />
    </div>

    <div>
      <h2>
        {text(
          "Document security",
          "文件安全"
        )}
      </h2>

      <p>
        {text(
          "Prototype notice: selected files are represented in this browser session only. Production documents will be securely stored, access-controlled and reviewed by authorised administrators.",
          "原型说明：所选文件仅在本次浏览器会话中进行演示。正式平台将对文件进行安全存储、访问控制，并由授权管理员审核。"
        )}
      </p>
    </div>
  </section>

  <div className="business-documents__footer-actions">
    <Button
      to="/dashboard"
      variant="secondary"
    >
      {text("Back to Dashboard", "返回控制面板")}
    </Button>
  </div>
</PageContainer>

);
}
