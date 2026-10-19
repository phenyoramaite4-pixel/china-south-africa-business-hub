import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  FileText,
  Handshake,
  Image as ImageIcon,
  MessageCircleQuestion,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundCog,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useRegistration } from "../context/RegistrationContext";
import PageContainer from "../components/PageContainer";
import "./Admin.css";

const STATS = [
  {
    labelEn: "Businesses",
    labelZh: "企业",
    value: "128",
    change: "+12",
    icon: Building2,
  },
  {
    labelEn: "Independent Professionals",
    labelZh: "独立专业人士",
    value: "86",
    change: "+8",
    icon: BriefcaseBusiness,
  },
  {
    labelEn: "Pending Verifications",
    labelZh: "待验证",
    value: "14",
    change: "Pending",
    icon: ShieldCheck,
  },
  {
    labelEn: "Active Opportunities",
    labelZh: "活跃机会",
    value: "32",
    change: "+5",
    icon: Sparkles,
  },
];

const MANAGEMENT = [
  {
    titleEn: "User Management",
    titleZh: "用户管理",
    descriptionEn:
      "Review businesses and independent professionals.",
    descriptionZh: "查看企业和独立专业人士。",
    icon: Users,
    route: "/admin/users",
  },
  {
    titleEn: "Verification Centre",
    titleZh: "验证中心",
    descriptionEn:
      "Review profiles, documents and verification submissions.",
    descriptionZh: "审核资料、文件和验证提交内容。",
    icon: FileCheck2,
    route: "/admin/verification",
  },
  {
    titleEn: "Opportunities",
    titleZh: "商业机会",
    descriptionEn:
      "Manage investment, supplier and partnership opportunities.",
    descriptionZh: "管理投资、供应商和合作机会。",
    icon: Sparkles,
    route: "/admin/opportunities",
  },
  {
    titleEn: "Help Requests",
    titleZh: "帮助请求",
    descriptionEn:
      "Monitor requests and provider responses.",
    descriptionZh: "监控帮助请求及服务商回复。",
    icon: MessageCircleQuestion,
    route: "/admin/help-requests",
  },
];

const ACTIVITY = [
  {
    titleEn: "New business submitted for verification",
    titleZh: "新企业提交验证",
    timeEn: "Today • 10:42",
    timeZh: "今天 • 10:42",
    icon: Building2,
  },
  {
    titleEn: "Independent professional profile created",
    titleZh: "独立专业人士资料已创建",
    timeEn: "Today • 09:18",
    timeZh: "今天 • 09:18",
    icon: UserRoundCog,
  },
  {
    titleEn: "New partnership opportunity submitted",
    titleZh: "新的合作机会已提交",
    timeEn: "Yesterday • 16:25",
    timeZh: "昨天 • 16:25",
    icon: Handshake,
  },
  {
    titleEn: "New logistics help request received",
    titleZh: "收到新的物流帮助请求",
    timeEn: "Yesterday • 14:10",
    timeZh: "昨天 • 14:10",
    icon: MessageCircleQuestion,
  },
];

const PENDING_VERIFICATIONS = [
  {
    name: "Guangzhou Logistics Solutions",
    type: "Business",
    location: "Guangzhou, China",
    submitted: "Submitted today",
  },
  {
    name: "Thabo Mokoena",
    type: "Independent Professional",
    location: "Johannesburg, South Africa",
    submitted: "Submitted yesterday",
  },
  {
    name: "Shenzhen Trade Connect",
    type: "Business",
    location: "Shenzhen, China",
    submitted: "Submitted 2 days ago",
  },
];

export const VERIFICATION_SUBMISSIONS = [
  {
    id: "demo-guangzhou-logistics",
    status: "pending",
    name: "Guangzhou Logistics Solutions",
    businessName: "Guangzhou Logistics Solutions",
    typeEn: "Business",
    typeZh: "企业",
    locationEn: "Guangzhou, China",
    locationZh: "中国广州",
    email: "demo@guangzhoulogistics.example",
    phone: "+86 20 5555 0188",
    servicesEn: [
      "Equipment transportation",
      "Warehousing",
      "Cross-border logistics",
    ],
    servicesZh: [
      "设备运输",
      "仓储",
      "跨境物流",
    ],
    submittedEn: "Submitted today",
    submittedZh: "今天提交",
    documents: [
      {
        id: "demo-guangzhou-doc-1",
        nameEn: "Business Registration",
        nameZh: "企业注册证明",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "2.4 MB",
        fileName: "business-registration.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Official business registration document.",
        descriptionZh: "正式的企业注册证明文件。",
      },
      {
        id: "demo-guangzhou-doc-2",
        nameEn: "Company Profile",
        nameZh: "公司简介",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.8 MB",
        fileName: "company-profile.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Company profile and business overview.",
        descriptionZh: "公司简介及企业概况。",
      },
      {
        id: "demo-guangzhou-doc-3",
        nameEn: "Director / Representative ID",
        nameZh: "董事 / 企业代表身份证明",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.1 MB",
        fileName: "director-id.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Identification document for the business representative.",
        descriptionZh: "企业代表身份证明文件。",
      },
    ],
    gallery: [
      {
        id: "demo-guangzhou-media-1",
        type: "image",
        titleEn: "Equipment transportation",
        titleZh: "设备运输",
        descriptionEn:
          "Supporting project and logistics media.",
        descriptionZh: "支持项目和物流工作的媒体资料。",
        dataUrl: "",
      },
      {
        id: "demo-guangzhou-media-2",
        type: "image",
        titleEn: "Warehouse operations",
        titleZh: "仓储运营",
        descriptionEn:
          "Warehouse and distribution operations.",
        descriptionZh: "仓储和配送运营。",
        dataUrl: "",
      },
      {
        id: "demo-guangzhou-media-3",
        type: "image",
        titleEn: "Cross-border logistics",
        titleZh: "跨境物流",
        descriptionEn:
          "Cross-border logistics activity.",
        descriptionZh: "跨境物流活动。",
        dataUrl: "",
      },
      {
        id: "demo-guangzhou-media-4",
        type: "video",
        titleEn: "Company introduction",
        titleZh: "企业介绍",
        descriptionEn:
          "Participant introduction video.",
        descriptionZh: "参与者企业介绍视频。",
        dataUrl: "",
      },
    ],
    projects: [
      {
        id: "demo-guangzhou-project-1",
        titleEn: "Industrial Equipment Shipment",
        titleZh: "工业设备运输",
        referenceEn: "South African Manufacturing Partner",
        referenceZh: "南非制造业合作伙伴",
      },
      {
        id: "demo-guangzhou-project-2",
        titleEn: "Warehouse & Distribution Support",
        titleZh: "仓储与配送支持",
        referenceEn: "Johannesburg Importer",
        referenceZh: "约翰内斯堡进口商",
      },
    ],
    partners: [
      {
        id: "demo-guangzhou-partner-1",
        name: "South African Manufacturing Partner",
      },
      {
        id: "demo-guangzhou-partner-2",
        name: "Johannesburg Importer",
      },
    ],
    references: [
      {
        id: "demo-guangzhou-reference-1",
        name: "Demo Reference Contact",
        company: "South Africa Manufacturing Group",
        contact: "reference@example.com",
      },
    ],
  },

  {
    id: "demo-thabo-mokoena",
    status: "pending",
    name: "Thabo Mokoena",
    businessName: "",
    typeEn: "Independent Professional",
    typeZh: "独立专业人士",
    locationEn: "Johannesburg, South Africa",
    locationZh: "南非约翰内斯堡",
    email: "thabo.mokoena@example.com",
    phone: "+27 71 555 0182",
    servicesEn: [
      "Business consulting",
      "Project management",
      "Market research",
    ],
    servicesZh: [
      "商业咨询",
      "项目管理",
      "市场研究",
    ],
    submittedEn: "Submitted yesterday",
    submittedZh: "昨天提交",
    documents: [
      {
        id: "demo-thabo-doc-1",
        nameEn: "Identity Document",
        nameZh: "身份证明文件",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.2 MB",
        fileName: "identity-document.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Valid identity document.",
        descriptionZh: "有效身份证明文件。",
      },
      {
        id: "demo-thabo-doc-2",
        nameEn: "Professional Profile / CV",
        nameZh: "专业简介 / 简历",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.6 MB",
        fileName: "professional-cv.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Professional profile and CV.",
        descriptionZh: "专业简介和简历。",
      },
      {
        id: "demo-thabo-doc-3",
        nameEn: "Reference Information",
        nameZh: "推荐信息",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "0.8 MB",
        fileName: "reference-information.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Supporting reference information.",
        descriptionZh: "支持性的推荐信息。",
      },
    ],
    gallery: [
      {
        id: "demo-thabo-media-1",
        type: "image",
        titleEn: "Project work",
        titleZh: "项目工作",
        descriptionEn:
          "Professional project supporting media.",
        descriptionZh: "专业项目支持媒体。",
        dataUrl: "",
      },
      {
        id: "demo-thabo-media-2",
        type: "image",
        titleEn: "Business consulting",
        titleZh: "商业咨询",
        descriptionEn:
          "Consulting and project management work.",
        descriptionZh: "咨询和项目管理工作。",
        dataUrl: "",
      },
      {
        id: "demo-thabo-media-3",
        type: "video",
        titleEn: "Professional introduction",
        titleZh: "专业介绍",
        descriptionEn:
          "Professional introduction video.",
        descriptionZh: "专业人士介绍视频。",
        dataUrl: "",
      },
    ],
    projects: [
      {
        id: "demo-thabo-project-1",
        titleEn: "SME Market Expansion Project",
        titleZh: "中小企业市场拓展项目",
        referenceEn: "Growth Partners SA",
        referenceZh: "Growth Partners SA",
      },
    ],
    partners: [
      {
        id: "demo-thabo-partner-1",
        name: "Mokoena Business Advisory",
      },
    ],
    references: [
      {
        id: "demo-thabo-reference-1",
        name: "Lerato Molefe",
        company: "Growth Partners SA",
        contact: "+27 82 555 0144",
      },
    ],
  },

  {
    id: "demo-shenzhen-trade",
    status: "pending",
    name: "Shenzhen Trade Connect",
    businessName: "Shenzhen Trade Connect",
    typeEn: "Business",
    typeZh: "企业",
    locationEn: "Shenzhen, China",
    locationZh: "中国深圳",
    email: "hello@shenzhentrade.example",
    phone: "+86 755 555 0136",
    servicesEn: [
      "Import and export",
      "Supplier sourcing",
      "Trade facilitation",
    ],
    servicesZh: [
      "进出口",
      "供应商采购",
      "贸易促进",
    ],
    submittedEn: "Submitted 2 days ago",
    submittedZh: "2天前提交",
    documents: [
      {
        id: "demo-shenzhen-doc-1",
        nameEn: "Business Registration",
        nameZh: "企业注册证明",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "2.1 MB",
        fileName: "business-registration.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Official business registration document.",
        descriptionZh: "正式的企业注册证明文件。",
      },
      {
        id: "demo-shenzhen-doc-2",
        nameEn: "Company Profile",
        nameZh: "公司简介",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.4 MB",
        fileName: "company-profile.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Company profile and business overview.",
        descriptionZh: "公司简介及企业概况。",
      },
      {
        id: "demo-shenzhen-doc-3",
        nameEn: "Director / Representative ID",
        nameZh: "董事 / 企业代表身份证明",
        statusEn: "Submitted",
        statusZh: "已提交",
        type: "PDF",
        size: "1.0 MB",
        fileName: "representative-id.pdf",
        mimeType: "application/pdf",
        dataUrl: "",
        descriptionEn:
          "Identification for the business representative.",
        descriptionZh: "企业代表身份证明。",
      },
    ],
    gallery: [
      {
        id: "demo-shenzhen-media-1",
        type: "image",
        titleEn: "Supplier network",
        titleZh: "供应商网络",
        descriptionEn:
          "Supplier and manufacturing network.",
        descriptionZh: "供应商和制造网络。",
        dataUrl: "",
      },
      {
        id: "demo-shenzhen-media-2",
        type: "image",
        titleEn: "Trade operations",
        titleZh: "贸易运营",
        descriptionEn:
          "Trade facilitation activity.",
        descriptionZh: "贸易促进活动。",
        dataUrl: "",
      },
    ],
    projects: [
      {
        id: "demo-shenzhen-project-1",
        titleEn: "China-Africa Supplier Network",
        titleZh: "中非供应商网络",
        referenceEn: "Pearl River Manufacturing Group",
        referenceZh: "珠江制造集团",
      },
    ],
    partners: [
      {
        id: "demo-shenzhen-partner-1",
        name: "Pearl River Manufacturing Group",
      },
    ],
    references: [
      {
        id: "demo-shenzhen-reference-1",
        name: "Wei Zhang",
        company: "Shenzhen Export Association",
        contact: "wei.zhang@example.com",
      },
    ],
  },
];

export function normalizeRegistration(registration) {
  const isProfessional =
    registration.accountType === "professional";

  const isSouthAfrican =
    registration.accountType === "south-african";

  const typeEn = isProfessional
    ? "Independent Professional"
    : isSouthAfrican
    ? "South African Business"
    : "Chinese Business / Entrepreneur / Investor";

  const typeZh = isProfessional
    ? "独立专业人士"
    : isSouthAfrican
    ? "南非企业"
    : "中国企业 / 企业家 / 投资者";

  const locationEn =
    registration.province || "South Africa";

  const locationZh =
    registration.province || "南非";

  const submittedEn =
    registration.submittedAt === "Just now"
      ? "Submitted just now"
      : registration.submittedAt || "Recently submitted";

  const submittedZh =
    registration.submittedAt === "Just now"
      ? "刚刚提交"
      : "最近提交";

  const documents = (registration.documents || []).map(
    (document, index) => ({
      id:
        document.id ||
        `${registration.id}-document-${index}`,

      nameEn:
        document.name ||
        document.fileName ||
        "Verification Document",

      nameZh:
        document.nameZh ||
        document.name ||
        document.fileName ||
        "验证文件",

      statusEn: "Submitted",
      statusZh: "已提交",

      type:
        document.type === "application/pdf"
          ? "PDF"
          : document.type || "File",

      mimeType:
        document.type || "",

      fileName:
        document.fileName || "",

      dataUrl:
        document.dataUrl || "",

      size:
        document.size
          ? `${Math.max(
              1,
              Math.round(document.size / 1024)
            )} KB`
          : "Submitted",

      descriptionEn:
        `Document submitted by ${registration.name}.`,

      descriptionZh:
        `${registration.name} 提交的验证文件。`,
    })
  );

  const gallery = (registration.gallery || []).map(
    (media, index) => {
      const mimeType = media.type || "";

      const isVideo =
        mimeType.startsWith("video") ||
        media.type === "video";

      return {
        id:
          media.id ||
          `${registration.id}-media-${index}`,

        type: isVideo ? "video" : "image",

        titleEn:
          media.name ||
          media.fileName ||
          "Submitted Media",

        titleZh:
          media.name ||
          media.fileName ||
          "提交的媒体",

        descriptionEn:
          `Media submitted by ${registration.name}.`,

        descriptionZh:
          `${registration.name} 提交的媒体。`,

        mimeType,

        fileName:
          media.fileName ||
          media.name ||
          "",

        dataUrl:
          media.dataUrl || "",
      };
    }
  );

  const projects = (registration.projects || []).map(
    (project, index) => ({
      id:
        project.id ||
        `${registration.id}-project-${index}`,

      titleEn:
        typeof project === "string"
          ? project
          : project.title ||
            project.name ||
            "Previous Project",

      titleZh:
        typeof project === "string"
          ? project
          : project.title ||
            project.name ||
            "过往项目",

      referenceEn:
        typeof project === "string"
          ? "Participant submission"
          : project.details ||
            project.description ||
            project.reference ||
            "Participant submission",

      referenceZh:
        typeof project === "string"
          ? "参与者提交的信息"
          : project.details ||
            project.description ||
            project.reference ||
            "参与者提交的信息",
    })
  );

  const partners = (registration.partners || []).map(
    (partner, index) => {
      if (typeof partner === "string") {
        return {
          id:
            `${registration.id}-partner-${index}`,
          name: partner,
        };
      }

      return {
        id:
          partner.id ||
          `${registration.id}-partner-${index}`,
        name:
          partner.name ||
          partner.company ||
          partner.title ||
          "Partner",
      };
    }
  );

  const references = (registration.references || []).map(
    (reference, index) => ({
      id:
        reference.id ||
        `${registration.id}-reference-${index}`,

      name:
        reference.name ||
        "Reference Contact",

      company:
        reference.company ||
        "Participant Reference",

      contact:
        reference.contact ||
        "",
    })
  );

  return {
    ...registration,

    typeEn,
    typeZh,

    locationEn,
    locationZh,

    submittedEn,
    submittedZh,

    servicesEn:
      registration.services || [],

    servicesZh:
      registration.services || [],

    documents,
    gallery,
    projects,
    partners,
    references,
  };
}

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const { language } = useLanguage();

  const {
    registrations,
    updateRegistrationStatus,
  } = useRegistration();

  const isChinese = language === "zh";

  const [selectedVerification, setSelectedVerification] =
    useState(null);

  const [verificationStatuses, setVerificationStatuses] =
    useState({});

  const [verificationNotice, setVerificationNotice] =
    useState("");

  const [selectedDocument, setSelectedDocument] =
    useState(null);

  const [selectedMedia, setSelectedMedia] =
    useState(null);

  useEffect(() => {
    const verification = location.state?.verification;

    if (!verification) {
      return;
    }

    setSelectedVerification(verification);
    setVerificationNotice("");
    setSelectedDocument(null);
    setSelectedMedia(null);

    setTimeout(() => {
      document
        .getElementById("verification-workspace")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }, [location.state]);

  const text = (english, chinese) =>
    isChinese ? chinese : english;

  const allSubmissions = [
    ...VERIFICATION_SUBMISSIONS,

    ...registrations
      .filter(
        (registration) =>
          !VERIFICATION_SUBMISSIONS.some(
            (submission) =>
              submission.name === registration.name
          )
      )
      .map(normalizeRegistration),
  ];

  function getSubmissionStatus(submission) {
    return (
      verificationStatuses[submission.id] ||
      submission.status ||
      "pending"
    );
  }

  const pendingSubmissions =
    allSubmissions.filter(
      (submission) =>
        getSubmissionStatus(submission) === "pending"
    );

  function scrollToVerification() {
    document
      .getElementById("verification")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function openVerification(submission) {
    setSelectedVerification(submission);
    setVerificationNotice("");
    setSelectedDocument(null);
    setSelectedMedia(null);

    setTimeout(() => {
      document
        .getElementById("verification-workspace")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function closeVerification() {
    setSelectedVerification(null);
    setSelectedDocument(null);
    setSelectedMedia(null);
    setVerificationNotice("");
  }

  function updateVerificationStatus(
    submission,
    status,
    notice
  ) {
    setVerificationStatuses((current) => ({
      ...current,
      [submission.id]: status,
    }));

    if (
      submission.id &&
      !submission.id.startsWith("demo-")
    ) {
      updateRegistrationStatus(
        submission.id,
        status
      );
    }

    setVerificationNotice(notice);
  }

  function getStatusLabel(status) {
    if (status === "approved") {
      return text("Approved", "已批准");
    }

    if (status === "changes") {
      return text(
        "Changes Requested",
        "要求修改"
      );
    }

    if (status === "rejected") {
      return text("Rejected", "已拒绝");
    }

    return text("Pending Verification", "待验证");
  }

  function getStatusClass(status) {
    if (status === "approved") {
      return "is-approved";
    }

    if (status === "changes") {
      return "is-changes";
    }

    if (status === "rejected") {
      return "is-rejected";
    }

    return "is-pending";
  }

  function isPdf(document) {
    return (
      document?.mimeType === "application/pdf" ||
      document?.type === "PDF"
    );
  }

  function isImage(document) {
    return (
      document?.mimeType?.startsWith("image/")
    );
  }

  function openFileInNewTab(dataUrl) {
    if (!dataUrl) {
      return;
    }

    window.open(
      dataUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <PageContainer className="admin-page">
      <div className="admin-dashboard">
        <section className="admin-dashboard__hero">
          <div>
            <span className="admin-dashboard__eyebrow">
              {text(
                "Administrator",
                "管理员"
              )}
            </span>

            <h1>
              {text(
                "Welcome back, Platform Administrator",
                "欢迎回来，平台管理员"
              )}
            </h1>

            <p>
              {text(
                "Manage users, verification, opportunities and platform activity from one central workspace.",
                "在一个中央工作区管理用户、验证、商业机会和平台活动。"
              )}
            </p>
          </div>

          <div className="admin-dashboard__hero-status">
            <ShieldCheck size={18} />

            <div>
              <span>
                {text(
                  "Administrator",
                  "管理员"
                )}
              </span>

              <strong>
                {text(
                  "Platform Active",
                  "平台运行中"
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="admin-dashboard__intro">
          <div>
            <span className="admin-dashboard__section-eyebrow">
              {text(
                "Platform overview",
                "平台概览"
              )}
            </span>

            <h2>
              {text(
                "One place to oversee the China–South Africa business ecosystem.",
                "在一个地方管理中南商业生态系统。"
              )}
            </h2>

            <p>
              {text(
                "Review registrations, verify participants, manage opportunities and monitor requests across the platform.",
                "查看注册信息、验证参与者、管理商业机会并监控平台请求。"
              )}
            </p>
          </div>

          <button
            type="button"
            className="admin-dashboard__primary-button"
            onClick={scrollToVerification}
          >
            {text(
              "Review Verifications",
              "审核验证"
            )}
            <ArrowRight size={17} />
          </button>
        </section>

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-heading">
            <div>
              <span className="admin-dashboard__section-eyebrow">
                {text(
                  "Platform Overview",
                  "平台概览"
                )}
              </span>

              <h2>
                {text(
                  "A quick view of the current platform activity.",
                  "快速查看当前平台活动。"
                )}
              </h2>
            </div>
          </div>

          <div className="admin-dashboard__stats">
            {STATS.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  className="admin-dashboard__stat"
                  key={stat.labelEn}
                >
                  <div className="admin-dashboard__stat-top">
                    <span>
                      {isChinese
                        ? stat.labelZh
                        : stat.labelEn}
                    </span>

                    <Icon size={19} />
                  </div>

                  <strong>{stat.value}</strong>

                  <small>{stat.change}</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-heading">
            <div>
              <span className="admin-dashboard__section-eyebrow">
                {text(
                  "Management",
                  "管理"
                )}
              </span>

              <h2>
                {text(
                  "Access the main areas of platform administration.",
                  "访问平台管理的主要区域。"
                )}
              </h2>
            </div>
          </div>

          <div className="admin-dashboard__management-grid">
            {MANAGEMENT.map((item) => {
              const Icon = item.icon;

              if (item.route) {
                return (
                  <Link
                    key={item.titleEn}
                    to={item.route}
                    className="admin-dashboard__management-card"
                  >
                    <div className="admin-dashboard__management-icon">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3>
                        {isChinese
                          ? item.titleZh
                          : item.titleEn}
                      </h3>

                      <p>
                        {isChinese
                          ? item.descriptionZh
                          : item.descriptionEn}
                      </p>
                    </div>

                    <ArrowRight size={17} />
                  </Link>
                );
              }

              return (
                <div
                  className="admin-dashboard__management-card"
                  key={item.titleEn}
                  role="button"
                  tabIndex={0}
                  onClick={() => {}}
                  onKeyDown={() => {}}
                >
                  <div className="admin-dashboard__management-icon">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3>
                      {isChinese
                        ? item.titleZh
                        : item.titleEn}
                    </h3>

                    <p>
                      {isChinese
                        ? item.descriptionZh
                        : item.descriptionEn}
                    </p>
                  </div>

                  <ArrowRight size={17} />
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="verification"
          className="admin-dashboard__section"
        >
          <div className="admin-dashboard__section-heading">
            <div>
              <span className="admin-dashboard__section-eyebrow">
                {text(
                  "Pending Verification",
                  "待验证"
                )}
              </span>

              <h2>
                {text(
                  "Profiles waiting for administrator review.",
                  "等待管理员审核的资料。"
                )}
              </h2>
            </div>

            <div className="admin-dashboard__pending-count">
              {pendingSubmissions.length}
            </div>
          </div>

          <div className="admin-dashboard__verification-list">
            {pendingSubmissions.slice(0, 3).map((submission) => (
              <div
                className="admin-dashboard__verification-row"
                key={submission.id}
              >
                <div className="admin-dashboard__verification-main">
                  <div className="admin-dashboard__verification-icon">
                    {submission.typeEn ===
                    "Independent Professional" ? (
                      <BriefcaseBusiness size={19} />
                    ) : (
                      <Building2 size={19} />
                    )}
                  </div>

                  <div>
                    <strong>
                      {submission.name}
                    </strong>

                    <span>
                      {isChinese
                        ? submission.typeZh
                        : submission.typeEn}{" "}
                      •{" "}
                      {isChinese
                        ? submission.locationZh
                        : submission.locationEn}
                    </span>
                  </div>
                </div>

                <span className="admin-dashboard__verification-submitted">
                  {isChinese
                    ? submission.submittedZh
                    : submission.submittedEn}
                </span>

                <button
                  type="button"
                  className="admin-dashboard__secondary-button"
                  onClick={() =>
                    openVerification(submission)
                  }
                >
                  {text("Review", "审核")}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="admin-dashboard__workflow-footer">
            <button
              type="button"
              className="admin-dashboard__secondary-button"
              onClick={() =>
                navigate("/admin/verification")
              }
            >
              {text(
                "View All Pending Verifications",
                "查看所有待验证资料"
              )}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="admin-dashboard__workflow">
          <div>
            <span className="admin-dashboard__section-eyebrow">
              {text(
                "Verification Workflow",
                "验证流程"
              )}
            </span>

            <h2>
              {text(
                "The administrator reviews each participant before approval.",
                "管理员在批准前审核每位参与者。"
              )}
            </h2>
          </div>

          <div className="admin-dashboard__workflow-grid">
            <div className="admin-dashboard__workflow-step">
              <span>01</span>

              <strong>
                {text(
                  "Submission",
                  "提交"
                )}
              </strong>

              <p>
                {text(
                  "Participant submits profile and supporting information.",
                  "参与者提交资料和支持信息。"
                )}
              </p>
            </div>

            <div className="admin-dashboard__workflow-step">
              <span>02</span>

              <strong>
                {text(
                  "Administrator Review",
                  "管理员审核"
                )}
              </strong>

              <p>
                {text(
                  "Admin reviews documents, gallery media, references and profile information.",
                  "管理员审核文件、图片媒体、推荐人和资料信息。"
                )}
              </p>
            </div>

            <div className="admin-dashboard__workflow-step">
              <span>03</span>

              <strong>
                {text(
                  "Decision",
                  "决定"
                )}
              </strong>

              <p>
                {text(
                  "Approve, request changes or reject the submission.",
                  "批准、要求修改或拒绝提交。"
                )}
              </p>
            </div>
          </div>

          <div className="admin-dashboard__workflow-footer">
            <CheckCircle2 size={18} />

            <span>
              {text(
                "Verified participants become visible across the platform.",
                "经过验证的参与者将在平台中展示。"
              )}
            </span>
          </div>
        </section>

        {selectedVerification && (
          <section
            id="verification-workspace"
            className="admin-dashboard__review"
          >
            <div className="admin-dashboard__review-header">
              <div>
                <span className="admin-dashboard__section-eyebrow">
                  {text(
                    "Verification Workspace",
                    "验证工作区"
                  )}
                </span>

                <h2>
                  {text(
                    "Verification Review",
                    "验证审核"
                  )}
                </h2>

                <p>
                  {text(
                    "Review the participant's information and supporting evidence before making a verification decision.",
                    "在作出验证决定之前审核参与者的信息和支持材料。"
                  )}
                </p>
              </div>

              <button
                type="button"
                className="admin-dashboard__icon-close"
                onClick={closeVerification}
                aria-label={text(
                  "Close",
                  "关闭"
                )}
              >
                <X size={19} />
              </button>
            </div>

            <div className="admin-dashboard__review-profile">
              <div className="admin-dashboard__review-profile-icon">
                {selectedVerification.typeEn ===
                "Independent Professional" ? (
                  <BriefcaseBusiness size={25} />
                ) : (
                  <Building2 size={25} />
                )}
              </div>

              <div>
                <span>
                  {isChinese
                    ? selectedVerification.typeZh
                    : selectedVerification.typeEn}
                  {" • "}
                  {isChinese
                    ? selectedVerification.locationZh
                    : selectedVerification.locationEn}
                </span>

                <h3>
                  {selectedVerification.name}
                </h3>

                <small>
                  {isChinese
                    ? selectedVerification.submittedZh
                    : selectedVerification.submittedEn}
                </small>
              </div>

              <div
                className={`admin-dashboard__status-pill ${getStatusClass(
                  getSubmissionStatus(
                    selectedVerification
                  )
                )}`}
              >
                {getStatusLabel(
                  getSubmissionStatus(
                    selectedVerification
                  )
                )}
              </div>
            </div>

            <div className="admin-dashboard__review-grid">
              <div className="admin-dashboard__review-card">
                <div className="admin-dashboard__review-card-header">
                  <div>
                    <span>
                      {text(
                        "Contact Information",
                        "联系信息"
                      )}
                    </span>
                  </div>
                </div>

                <div className="admin-dashboard__contact-grid">
                  <div>
                    <small>
                      {text(
                        "Email",
                        "电子邮箱"
                      )}
                    </small>

                    <strong>
                      {selectedVerification.email}
                    </strong>
                  </div>

                  <div>
                    <small>
                      {text(
                        "Phone",
                        "电话"
                      )}
                    </small>

                    <strong>
                      {selectedVerification.phone}
                    </strong>
                  </div>

                  <div>
                    <small>
                      {text(
                        "Location",
                        "所在地"
                      )}
                    </small>

                    <strong>
                      {isChinese
                        ? selectedVerification.locationZh
                        : selectedVerification.locationEn}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="admin-dashboard__review-card">
                <div className="admin-dashboard__review-card-header">
                  <div>
                    <span>
                      {text(
                        "Services",
                        "服务"
                      )}
                    </span>
                  </div>
                </div>

                <div className="admin-dashboard__tag-list">
                  {(isChinese
                    ? selectedVerification.servicesZh
                    : selectedVerification.servicesEn
                  ).map((service) => (
                    <span key={service}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-dashboard__review-card">
              <div className="admin-dashboard__review-card-header">
                <div>
                  <span>
                    {text(
                      "Verification Documents",
                      "验证文件"
                    )}
                  </span>

                  <p>
                    {text(
                      "Review the documents submitted by the participant.",
                      "审核参与者提交的文件。"
                    )}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard__review-list">
                {selectedVerification.documents.length ===
                0 ? (
                  <div className="admin-dashboard__empty">
                    {text(
                      "No documents were submitted.",
                      "未提交文件。"
                    )}
                  </div>
                ) : (
                  selectedVerification.documents.map(
                    (document) => {
                      const isMissing =
                        document.statusEn ===
                        "Missing";

                      return (
                        <div
                          className="admin-dashboard__review-list-item"
                          key={document.id}
                        >
                          <div className="admin-dashboard__review-list-icon">
                            <FileText size={19} />
                          </div>

                          <div className="admin-dashboard__review-list-content">
                            <strong>
                              {text(
                                document.nameEn,
                                document.nameZh
                              )}
                            </strong>

                            <span>
                              {document.type} •{" "}
                              {document.size}
                            </span>

                            {document.fileName && (
                              <small>
                                {document.fileName}
                              </small>
                            )}
                          </div>

                          <span
                            className={`admin-dashboard__document-status ${
                              isMissing
                                ? "is-missing"
                                : ""
                            }`}
                          >
                            {isChinese
                              ? document.statusZh
                              : document.statusEn}
                          </span>

                          <button
                            type="button"
                            className="admin-dashboard__secondary-button"
                            onClick={() =>
                              setSelectedDocument(
                                document
                              )
                            }
                          >
                            {text(
                              "View Document",
                              "查看文件"
                            )}
                          </button>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>

            <div className="admin-dashboard__review-card">
              <div className="admin-dashboard__review-card-header">
                <div>
                  <span>
                    {text(
                      "Verification Gallery",
                      "验证图片 / 媒体"
                    )}
                  </span>

                  <p>
                    {text(
                      "Photos and media submitted as supporting evidence.",
                      "作为支持证据提交的图片和媒体。"
                    )}
                  </p>
                </div>
              </div>

              {selectedVerification.gallery.length ===
              0 ? (
                <div className="admin-dashboard__empty">
                  {text(
                    "No gallery media was submitted.",
                    "未提交图片或媒体。"
                  )}
                </div>
              ) : (
                <>
                  <div className="admin-dashboard__gallery-summary">
                    <ImageIcon size={20} />

                    <div>
                      <strong>
                        {selectedVerification.gallery.length}{" "}
                        {text(
                          selectedVerification.gallery.length ===
                            1
                            ? "media item submitted"
                            : "media items submitted",
                          selectedVerification.gallery.length ===
                            1
                            ? "个媒体项目已提交"
                            : "个媒体项目已提交"
                        )}
                      </strong>

                      <span>
                        {text(
                          "Submitted media is available for administrator review.",
                          "已提交的媒体可供管理员审核。"
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="admin-dashboard__secondary-button"
                      onClick={() =>
                        setSelectedMedia(
                          selectedVerification
                            .gallery[0]
                        )
                      }
                    >
                      {text(
                        "View Gallery",
                        "查看图片"
                      )}
                    </button>
                  </div>

                  <div className="admin-dashboard__gallery-grid">
                    {selectedVerification.gallery.map(
                      (media) => (
                        <button
                          type="button"
                          className="admin-dashboard__gallery-item"
                          key={media.id}
                          onClick={() =>
                            setSelectedMedia(
                              media
                            )
                          }
                        >
                          {media.dataUrl &&
                          media.type ===
                            "image" ? (
                            <img
                              src={media.dataUrl}
                              alt={
                                isChinese
                                  ? media.titleZh
                                  : media.titleEn
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <>
                              {media.type ===
                              "video" ? (
                                <PlayCircle
                                  size={24}
                                />
                              ) : (
                                <ImageIcon
                                  size={24}
                                />
                              )}

                              <span>
                                {isChinese
                                  ? media.titleZh
                                  : media.titleEn}
                              </span>
                            </>
                          )}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="admin-dashboard__review-card">
              <div className="admin-dashboard__review-card-header">
                <div>
                  <span>
                    {text(
                      "Projects Worked On",
                      "参与过的项目"
                    )}
                  </span>
                </div>
              </div>

              {selectedVerification.projects.length ===
              0 ? (
                <div className="admin-dashboard__empty">
                  {text(
                    "No projects were submitted.",
                    "未提交项目。"
                  )}
                </div>
              ) : (
                <div className="admin-dashboard__review-list">
                  {selectedVerification.projects.map(
                    (project) => (
                      <div
                        className="admin-dashboard__review-list-item"
                        key={project.id}
                      >
                        <div className="admin-dashboard__review-list-icon">
                          <BriefcaseBusiness
                            size={19}
                          />
                        </div>

                        <div className="admin-dashboard__review-list-content">
                          <strong>
                            {text(
                              project.titleEn,
                              project.titleZh
                            )}
                          </strong>

                          <span>
                            {text(
                              "Reference:",
                              "参考："
                            )}{" "}
                            {text(
                              project.referenceEn,
                              project.referenceZh
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="admin-dashboard__review-card">
              <div className="admin-dashboard__review-card-header">
                <div>
                  <span>
                    {text(
                      "Partnered Companies / Individuals",
                      "合作过的企业 / 个人"
                    )}
                  </span>
                </div>
              </div>

              {selectedVerification.partners.length ===
              0 ? (
                <div className="admin-dashboard__empty">
                  {text(
                    "No partner information was submitted.",
                    "未提交合作伙伴信息。"
                  )}
                </div>
              ) : (
                <div className="admin-dashboard__tag-list">
                  {selectedVerification.partners.map(
                    (partner) => (
                      <span
                        key={partner.id}
                      >
                        <Handshake
                          size={14}
                        />

                        {partner.name}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="admin-dashboard__review-card">
              <div className="admin-dashboard__review-card-header">
                <div>
                  <span>
                    {text(
                      "References",
                      "推荐人"
                    )}
                  </span>

                  <p>
                    {text(
                      "Reference contacts supplied by the participant.",
                      "参与者提供的推荐人联系信息。"
                    )}
                  </p>
                </div>
              </div>

              {selectedVerification.references.length ===
              0 ? (
                <div className="admin-dashboard__empty">
                  {text(
                    "No references were submitted.",
                    "未提交推荐人。"
                  )}
                </div>
              ) : (
                <div className="admin-dashboard__review-list">
                  {selectedVerification.references.map(
                    (reference) => (
                      <div
                        className="admin-dashboard__review-list-item"
                        key={reference.id}
                      >
                        <div className="admin-dashboard__review-list-icon">
                          <Users size={19} />
                        </div>

                        <div className="admin-dashboard__review-list-content">
                          <strong>
                            {reference.name}
                          </strong>

                          <span>
                            {reference.company}
                          </span>

                          {reference.contact && (
                            <small>
                              {reference.contact}
                            </small>
                          )}
                        </div>

                        {reference.contact && (
                          <a
                            href={
                              reference.contact.includes(
                                "@"
                              )
                                ? `mailto:${reference.contact}`
                                : `tel:${reference.contact}`
                            }
                            className="admin-dashboard__secondary-button"
                          >
                            {text(
                              "View Reference",
                              "查看推荐人"
                            )}
                          </a>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="admin-dashboard__decision">
              <div>
                <span className="admin-dashboard__section-eyebrow">
                  {text(
                    "Verification Decision",
                    "验证决定"
                  )}
                </span>

                <h3>
                  {text(
                    "Choose an action after reviewing the submitted information and supporting evidence.",
                    "审核提交的信息和支持材料后选择操作。"
                  )}
                </h3>
              </div>

              <div className="admin-dashboard__decision-actions">
                <button
                  type="button"
                  className="admin-dashboard__decision-button is-approved"
                  onClick={() =>
                    updateVerificationStatus(
                      selectedVerification,
                      "approved",
                      text(
                        "Verification approved successfully.",
                        "验证已成功批准。"
                      )
                    )
                  }
                >
                  <CheckCircle2 size={17} />
                  {text(
                    "Approve",
                    "批准"
                  )}
                </button>

                <button
                  type="button"
                  className="admin-dashboard__decision-button is-changes"
                  onClick={() =>
                    updateVerificationStatus(
                      selectedVerification,
                      "changes",
                      text(
                        "Changes have been requested from the participant.",
                        "已要求参与者进行修改。"
                      )
                    )
                  }
                >
                  <FileCheck2 size={17} />
                  {text(
                    "Request Changes",
                    "要求修改"
                  )}
                </button>

                <button
                  type="button"
                  className="admin-dashboard__decision-button is-rejected"
                  onClick={() =>
                    updateVerificationStatus(
                      selectedVerification,
                      "rejected",
                      text(
                        "Verification has been rejected.",
                        "验证已被拒绝。"
                      )
                    )
                  }
                >
                  <X size={17} />
                  {text(
                    "Reject",
                    "拒绝"
                  )}
                </button>
              </div>

              {verificationNotice && (
                <div className="admin-dashboard__decision-notice">
                  {verificationNotice}
                </div>
              )}
            </div>
          </section>
        )}

        {selectedDocument && (
          <div
            className="admin-dashboard__modal-backdrop"
            onClick={() =>
              setSelectedDocument(null)
            }
          >
            <div
              className="admin-dashboard__modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="admin-dashboard__modal-header">
                <div>
                  <span>
                    {text(
                      "Submitted Document",
                      "已提交文件"
                    )}
                  </span>

                  <h3>
                    {text(
                      selectedDocument.nameEn,
                      selectedDocument.nameZh
                    )}
                  </h3>
                </div>

                <button
                  type="button"
                  className="admin-dashboard__icon-close"
                  onClick={() =>
                    setSelectedDocument(null)
                  }
                >
                  <X size={19} />
                </button>
              </div>

              <div className="admin-dashboard__document-preview">
                {selectedDocument.dataUrl &&
                isPdf(selectedDocument) ? (
                  <iframe
                    src={selectedDocument.dataUrl}
                    title={
                      selectedDocument.fileName ||
                      selectedDocument.nameEn
                    }
                    className="admin-dashboard__document-frame"
                    style={{
                      width: "100%",
                      height: "70vh",
                      border: "none",
                    }}
                  />
                ) : selectedDocument.dataUrl &&
                  isImage(selectedDocument) ? (
                  <img
                    src={selectedDocument.dataUrl}
                    alt={
                      selectedDocument.fileName ||
                      selectedDocument.nameEn
                    }
                    className="admin-dashboard__document-image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div className="admin-dashboard__document-page">
                    <FileText size={42} />

                    <strong>
                      {text(
                        "Submitted Document",
                        "已提交文件"
                      )}
                    </strong>

                    <span>
                      {text(
                        selectedDocument.nameEn,
                        selectedDocument.nameZh
                      )}
                    </span>

                    {selectedDocument.fileName && (
                      <small>
                        {selectedDocument.fileName}
                      </small>
                    )}

                    <small>
                      {selectedDocument.type} •{" "}
                      {selectedDocument.size}
                    </small>

                    <p>
                      {text(
                        "A live preview is not available for this demo document.",
                        "此演示文件无法提供实时预览。"
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="admin-dashboard__modal-footer">
                <div>
                  <strong>
                    {selectedDocument.type}
                  </strong>

                  <span>
                    {selectedDocument.size}
                  </span>
                </div>

                {selectedDocument.dataUrl && (
                  <button
                    type="button"
                    className="admin-dashboard__secondary-button"
                    onClick={() =>
                      openFileInNewTab(
                        selectedDocument.dataUrl
                      )
                    }
                  >
                    {text(
                      "Open in New Tab",
                      "在新标签页打开"
                    )}
                  </button>
                )}

                <button
                  type="button"
                  className="admin-dashboard__primary-button"
                  onClick={() =>
                    setSelectedDocument(null)
                  }
                >
                  {text(
                    "Close",
                    "关闭"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedMedia && (
          <div
            className="admin-dashboard__modal-backdrop"
            onClick={() =>
              setSelectedMedia(null)
            }
          >
            <div
              className="admin-dashboard__modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="admin-dashboard__modal-header">
                <div>
                  <span>
                    {text(
                      "Submitted Media",
                      "已提交媒体"
                    )}
                  </span>

                  <h3>
                    {isChinese
                      ? selectedMedia.titleZh
                      : selectedMedia.titleEn}
                  </h3>
                </div>

                <button
                  type="button"
                  className="admin-dashboard__icon-close"
                  onClick={() =>
                    setSelectedMedia(null)
                  }
                >
                  <X size={19} />
                </button>
              </div>

              <div className="admin-dashboard__media-preview">
                {selectedMedia.dataUrl &&
                selectedMedia.type ===
                  "image" ? (
                  <img
                    src={selectedMedia.dataUrl}
                    alt={
                      isChinese
                        ? selectedMedia.titleZh
                        : selectedMedia.titleEn
                    }
                    className="admin-dashboard__media-preview-image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                    }}
                  />
                ) : selectedMedia.dataUrl &&
                  selectedMedia.type ===
                    "video" ? (
                  <video
                    controls
                    src={selectedMedia.dataUrl}
                    className="admin-dashboard__media-preview-video"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                    }}
                  />
                ) : (
                  <div className="admin-dashboard__media-placeholder">
                    {selectedMedia.type ===
                    "video" ? (
                      <PlayCircle
                        size={46}
                      />
                    ) : (
                      <ImageIcon
                        size={46}
                      />
                    )}

                    <strong>
                      {isChinese
                        ? selectedMedia.titleZh
                        : selectedMedia.titleEn}
                    </strong>

                    <span>
                      {text(
                        "Preview media submitted by the participant.",
                        "预览参与者提交的媒体。"
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="admin-dashboard__modal-footer">
                <div>
                  <strong>
                    {selectedMedia.type ===
                    "video"
                      ? text(
                          "Video",
                          "视频"
                        )
                      : text(
                          "Image",
                          "图片"
                        )}
                  </strong>

                  {selectedMedia.fileName && (
                    <span>
                      {selectedMedia.fileName}
                    </span>
                  )}
                </div>

                {selectedMedia.dataUrl && (
                  <button
                    type="button"
                    className="admin-dashboard__secondary-button"
                    onClick={() =>
                      openFileInNewTab(
                        selectedMedia.dataUrl
                      )
                    }
                  >
                    {text(
                      "Open in New Tab",
                      "在新标签页打开"
                    )}
                  </button>
                )}

                <button
                  type="button"
                  className="admin-dashboard__primary-button"
                  onClick={() =>
                    setSelectedMedia(null)
                  }
                >
                  {text(
                    "Close",
                    "关闭"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-heading">
            <div>
              <span className="admin-dashboard__section-eyebrow">
                {text(
                  "Recent Activity",
                  "最近活动"
                )}
              </span>

              <h2>
                {text(
                  "Latest activity across the platform.",
                  "平台最新活动。"
                )}
              </h2>
            </div>

            <Activity size={21} />
          </div>

          <div className="admin-dashboard__activity-list">
            {ACTIVITY.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  className="admin-dashboard__activity-item"
                  key={activity.titleEn}
                >
                  <div className="admin-dashboard__activity-icon">
                    <Icon size={18} />
                  </div>

                  <div>
                    <strong>
                      {isChinese
                        ? activity.titleZh
                        : activity.titleEn}
                    </strong>

                    <span>
                      {isChinese
                        ? activity.timeZh
                        : activity.timeEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-dashboard__platform-notice">
          <div>
            <span className="admin-dashboard__section-eyebrow">
              {text(
                "Platform Areas",
                "平台区域"
              )}
            </span>

            <h2>
              {text(
                "Key areas currently represented in the prototype.",
                "当前原型中展示的主要区域。"
              )}
            </h2>
          </div>

          <div className="admin-dashboard__platform-tags">
            <span>
              {text(
                "Businesses",
                "企业"
              )}
            </span>

            <span>
              {text(
                "Independent Professionals",
                "独立专业人士"
              )}
            </span>

            <span>
              {text(
                "Opportunities",
                "商业机会"
              )}
            </span>

            <span>
              {text(
                "Help Requests",
                "帮助请求"
              )}
            </span>
          </div>
        </section>

        <div className="admin-dashboard__prototype-note">
          {text(
            "Prototype notice: The figures, profiles and activity shown here are fictional sample data for sponsor and investor demonstration purposes. New registration submissions are shared within this prototype session. Production data will come from the secure platform backend.",
            "原型说明：此处显示的数据、资料和活动均为用于向赞助商和投资者展示的虚构示例数据。新的注册提交内容会在此原型会话中共享。正式平台的数据将来自安全的后端系统。"
          )}
        </div>
      </div>
    </PageContainer>
  );
}