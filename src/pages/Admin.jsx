import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  Handshake,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundCog,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import "./Admin.css";

const STATS = [
  {
    icon: Building2,
    value: "128",
    change: "+12",
    titleEn: "Businesses",
    titleZh: "企业",
  },
  {
    icon: Users,
    value: "86",
    change: "+8",
    titleEn: "Independent Professionals",
    titleZh: "独立专业人士",
  },
  {
    icon: ShieldCheck,
    value: "14",
    change: "Pending",
    titleEn: "Pending Verifications",
    titleZh: "待验证",
  },
  {
    icon: BriefcaseBusiness,
    value: "32",
    change: "+5",
    titleEn: "Active Opportunities",
    titleZh: "活跃商业机会",
  },
];

const MANAGEMENT = [
  {
    icon: UserRoundCog,
    titleEn: "User Management",
    titleZh: "用户管理",
    textEn: "Review businesses and independent professionals.",
    textZh: "查看和管理企业及独立专业人士。",
  },
  {
    icon: ShieldCheck,
    titleEn: "Verification Centre",
    titleZh: "验证中心",
    textEn: "Review profiles, documents and verification submissions.",
    textZh: "审核资料、文件和验证申请。",
  },
  {
    icon: BriefcaseBusiness,
    titleEn: "Opportunities",
    titleZh: "商业机会",
    textEn: "Manage investment, supplier and partnership opportunities.",
    textZh: "管理投资、供应商和合作机会。",
  },
  {
    icon: MessageCircleQuestion,
    titleEn: "Help Requests",
    titleZh: "帮助请求",
    textEn: "Monitor requests and provider responses.",
    textZh: "查看帮助请求和服务商回复。",
  },
];

const ACTIVITY = [
  {
    icon: ShieldCheck,
    titleEn: "New business submitted for verification",
    titleZh: "一家新企业提交了验证申请",
    metaEn: "Today • 10:42",
    metaZh: "今天 • 10:42",
  },
  {
    icon: Users,
    titleEn: "Independent professional profile created",
    titleZh: "一名独立专业人士创建了资料",
    metaEn: "Today • 09:18",
    metaZh: "今天 • 09:18",
  },
  {
    icon: BriefcaseBusiness,
    titleEn: "New partnership opportunity submitted",
    titleZh: "新的合作机会已提交",
    metaEn: "Yesterday • 16:25",
    metaZh: "昨天 • 16:25",
  },
  {
    icon: MessageCircleQuestion,
    titleEn: "New logistics help request received",
    titleZh: "收到新的物流帮助请求",
    metaEn: "Yesterday • 14:10",
    metaZh: "昨天 • 14:10",
  },
];

const PENDING_VERIFICATIONS = [
  {
    name: "Guangzhou Logistics Solutions",
    typeEn: "Business",
    typeZh: "企业",
    submittedEn: "Submitted today",
    submittedZh: "今天提交",
  },
  {
    name: "Thabo Mokoena",
    typeEn: "Independent Professional",
    typeZh: "独立专业人士",
    submittedEn: "Submitted yesterday",
    submittedZh: "昨天提交",
  },
  {
    name: "Shenzhen Trade Connect",
    typeEn: "Business",
    typeZh: "企业",
    submittedEn: "Submitted 2 days ago",
    submittedZh: "2 天前提交",
  },
];

export default function Admin() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const text = (english, chinese) => (isChinese ? chinese : english);

  return (
    <PageContainer className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div>
          <span className="admin-dashboard__eyebrow">
            <ShieldCheck size={14} aria-hidden="true" />
            {text("Admin Control Centre", "管理员控制中心")}
          </span>

          <h1 className="admin-dashboard__title">
            {text(
              "Welcome back, Platform Administrator",
              "欢迎回来，平台管理员"
            )}
          </h1>

          <p className="admin-dashboard__subtitle">
            {text(
              "Manage users, verification, opportunities and platform activity from one central workspace.",
              "在一个中央工作空间中管理用户、验证、商业机会和平台活动。"
            )}
          </p>
        </div>

        <div className="admin-dashboard__header-meta">
          <span className="admin-dashboard__status admin-dashboard__status--admin">
            <ShieldCheck size={14} aria-hidden="true" />
            {text("Administrator", "管理员")}
          </span>

          <span className="admin-dashboard__status">
            <Activity size={14} aria-hidden="true" />
            {text("Platform Active", "平台运行中")}
          </span>
        </div>
      </header>

      <section className="admin-dashboard__hero">
        <div className="admin-dashboard__hero-content">
          <span className="admin-dashboard__hero-label">
            {text("Platform overview", "平台概览")}
          </span>

          <h2 className="admin-dashboard__hero-title">
            {text(
              "One place to oversee the China–South Africa business ecosystem.",
              "在一个平台中管理中南非商业生态系统。"
            )}
          </h2>

          <p className="admin-dashboard__hero-text">
            {text(
              "Review registrations, verify participants, manage opportunities and monitor requests across the platform.",
              "审核注册、验证平台参与者、管理商业机会并监控平台请求。"
            )}
          </p>

          <div className="admin-dashboard__hero-actions">
            <a href="#verification" className="admin-dashboard__hero-button">
              {text("Review Verifications", "审核验证")}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="admin-dashboard__hero-icon">
          <ShieldCheck size={64} strokeWidth={1.4} aria-hidden="true" />
        </div>
      </section>

      <section className="admin-dashboard__section">
        <div className="admin-dashboard__section-heading">
          <div>
            <h2 className="admin-dashboard__section-title">
              {text("Platform Overview", "平台概览")}
            </h2>

            <p className="admin-dashboard__section-description">
              {text(
                "A quick view of the current platform activity.",
                "快速查看当前平台活动。"
              )}
            </p>
          </div>
        </div>

        <div className="admin-dashboard__stats">
          {STATS.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="admin-dashboard__stat" key={stat.titleEn}>
                <div className="admin-dashboard__stat-top">
                  <span className="admin-dashboard__stat-icon">
                    <Icon size={17} aria-hidden="true" />
                  </span>

                  <span className="admin-dashboard__stat-change">
                    {stat.change}
                  </span>
                </div>

                <div className="admin-dashboard__stat-value">
                  {stat.value}
                </div>

                <span className="admin-dashboard__stat-label">
                  {text(stat.titleEn, stat.titleZh)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="admin-dashboard__section">
        <div className="admin-dashboard__section-heading">
          <div>
            <h2 className="admin-dashboard__section-title">
              {text("Management", "管理")}
            </h2>

            <p className="admin-dashboard__section-description">
              {text(
                "Access the main areas of platform administration.",
                "进入平台管理的主要功能区域。"
              )}
            </p>
          </div>
        </div>

        <div className="admin-dashboard__management">
          {MANAGEMENT.map((item) => {
            const Icon = item.icon;

            return (
              <a
                href="#"
                className="admin-dashboard__management-card"
                key={item.titleEn}
              >
                <span className="admin-dashboard__management-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>

                <span className="admin-dashboard__management-content">
                  <span className="admin-dashboard__management-title">
                    {text(item.titleEn, item.titleZh)}
                  </span>

                  <span className="admin-dashboard__management-text">
                    {text(item.textEn, item.textZh)}
                  </span>
                </span>

                <ArrowRight
                  className="admin-dashboard__management-arrow"
                  size={17}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </section>

      <section
        className="admin-dashboard__section"
        id="verification"
      >
        <div className="admin-dashboard__content-grid">
          <div className="admin-dashboard__panel">
            <div className="admin-dashboard__panel-header">
              <div>
                <h2 className="admin-dashboard__panel-title">
                  {text("Pending Verification", "待审核验证")}
                </h2>

                <p className="admin-dashboard__panel-description">
                  {text(
                    "Profiles waiting for administrator review.",
                    "等待管理员审核的资料。"
                  )}
                </p>
              </div>

              <span className="admin-dashboard__panel-count">
                14
              </span>
            </div>

            <div className="admin-dashboard__verification-list">
              {PENDING_VERIFICATIONS.map((item) => (
                <div
                  className="admin-dashboard__verification-item"
                  key={item.name}
                >
                  <div className="admin-dashboard__verification-avatar">
                    <Building2 size={17} aria-hidden="true" />
                  </div>

                  <div className="admin-dashboard__verification-info">
                    <strong>{item.name}</strong>

                    <span>
                      {text(item.typeEn, item.typeZh)} •{" "}
                      {text(item.submittedEn, item.submittedZh)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="admin-dashboard__review-button"
                  >
                    {text("Review", "审核")}
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="admin-dashboard__view-all"
            >
              {text("View all verification requests", "查看全部验证请求")}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="admin-dashboard__panel">
            <div className="admin-dashboard__panel-header">
              <div>
                <h2 className="admin-dashboard__panel-title">
                  {text("Verification Workflow", "验证流程")}
                </h2>

                <p className="admin-dashboard__panel-description">
                  {text(
                    "The administrator reviews each participant before approval.",
                    "管理员在批准每位参与者之前进行审核。"
                  )}
                </p>
              </div>

              <FileCheck2 size={19} aria-hidden="true" />
            </div>

            <div className="admin-dashboard__workflow">
              <div className="admin-dashboard__workflow-step">
                <span className="admin-dashboard__workflow-number">
                  01
                </span>

                <div>
                  <strong>
                    {text("Submission", "提交")}
                  </strong>

                  <p>
                    {text(
                      "Participant submits profile and supporting information.",
                      "参与者提交资料和相关信息。"
                    )}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard__workflow-step">
                <span className="admin-dashboard__workflow-number">
                  02
                </span>

                <div>
                  <strong>
                    {text("Administrator Review", "管理员审核")}
                  </strong>

                  <p>
                    {text(
                      "Admin reviews documents, references and verification video where required.",
                      "管理员审核文件、参考资料以及需要的验证视频。"
                    )}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard__workflow-step">
                <span className="admin-dashboard__workflow-number">
                  03
                </span>

                <div>
                  <strong>
                    {text("Decision", "审核决定")}
                  </strong>

                  <p>
                    {text(
                      "Approve, request changes or reject the submission.",
                      "批准、要求修改或拒绝申请。"
                    )}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard__workflow-complete">
                <CheckCircle2 size={16} aria-hidden="true" />

                {text(
                  "Verified participants become visible across the platform.",
                  "通过验证的参与者将在平台中显示。"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-dashboard__section">
        <div className="admin-dashboard__content-grid">
          <div className="admin-dashboard__panel">
            <div className="admin-dashboard__panel-header">
              <div>
                <h2 className="admin-dashboard__panel-title">
                  {text("Recent Activity", "最近活动")}
                </h2>

                <p className="admin-dashboard__panel-description">
                  {text(
                    "Latest activity across the platform.",
                    "平台最新活动。"
                  )}
                </p>
              </div>

              <Activity size={19} aria-hidden="true" />
            </div>

            <div className="admin-dashboard__activity-list">
              {ACTIVITY.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    className="admin-dashboard__activity"
                    key={`${item.titleEn}-${index}`}
                  >
                    <span className="admin-dashboard__activity-icon">
                      <Icon size={15} aria-hidden="true" />
                    </span>

                    <div className="admin-dashboard__activity-content">
                      <p className="admin-dashboard__activity-title">
                        {text(item.titleEn, item.titleZh)}
                      </p>

                      <p className="admin-dashboard__activity-meta">
                        {text(item.metaEn, item.metaZh)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-dashboard__panel">
            <div className="admin-dashboard__panel-header">
              <div>
                <h2 className="admin-dashboard__panel-title">
                  {text("Platform Areas", "平台功能")}
                </h2>

                <p className="admin-dashboard__panel-description">
                  {text(
                    "Key areas currently represented in the prototype.",
                    "原型中目前展示的主要功能区域。"
                  )}
                </p>
              </div>

              <Handshake size={19} aria-hidden="true" />
            </div>

            <div className="admin-dashboard__area-list">
              <div className="admin-dashboard__area">
                <Building2 size={16} aria-hidden="true" />
                <span>{text("Businesses", "企业")}</span>
              </div>

              <div className="admin-dashboard__area">
                <Users size={16} aria-hidden="true" />
                <span>
                  {text(
                    "Independent Professionals",
                    "独立专业人士"
                  )}
                </span>
              </div>

              <div className="admin-dashboard__area">
                <BriefcaseBusiness size={16} aria-hidden="true" />
                <span>{text("Opportunities", "商业机会")}</span>
              </div>

              <div className="admin-dashboard__area">
                <MessageCircleQuestion
                  size={16}
                  aria-hidden="true"
                />
                <span>{text("Help Requests", "帮助请求")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="admin-dashboard__demo-note">
        <Sparkles size={16} aria-hidden="true" />

        <span>
          {text(
            "Prototype notice: The figures, profiles and activity shown here are fictional sample data for sponsor and investor demonstration purposes. Production data will come from the secure platform backend.",
            "原型说明：此处显示的数字、资料和活动均为用于赞助商和投资者演示的虚构示例数据。正式平台将从安全的平台后端获取真实数据。"
          )}
        </span>
      </div>
    </PageContainer>
  );
}