import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleUserRound,
  FileCheck2,
  Handshake,
  LayoutDashboard,
  Mail,
  MessageCircleQuestion,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import "./BusinessDashboard.css";

const DEMO_OPPORTUNITIES = [
  {
    typeEn: "Partnership",
    typeZh: "合作伙伴",
    titleEn: "South African Distribution Partner",
    titleZh: "寻找南非分销合作伙伴",
    metaEn: "Johannesburg • Distribution",
    metaZh: "约翰内斯堡 • 分销",
  },
  {
    typeEn: "Investment",
    typeZh: "投资",
    titleEn: "Renewable Energy Investment",
    titleZh: "可再生能源投资机会",
    metaEn: "Cape Town • Renewable Energy",
    metaZh: "开普敦 • 可再生能源",
  },
];

const DEMO_ACTIVITY = [
  {
    icon: Send,
    titleEn: "You expressed interest in a distribution opportunity",
    titleZh: "您已对一个分销机会表达兴趣",
    metaEn: "Today • 10:24",
    metaZh: "今天 • 10:24",
  },
  {
    icon: MessageCircleQuestion,
    titleEn: "New response received from a logistics provider",
    titleZh: "收到物流服务商的新回复",
    metaEn: "Yesterday • 16:40",
    metaZh: "昨天 • 16:40",
  },
  {
    icon: Search,
    titleEn: "You viewed 3 business profiles",
    titleZh: "您查看了 3 个企业资料",
    metaEn: "Yesterday • 11:15",
    metaZh: "昨天 • 11:15",
  },
  {
    icon: Bell,
    titleEn: "Your profile verification was updated",
    titleZh: "您的资料验证状态已更新",
    metaEn: "2 days ago",
    metaZh: "2 天前",
  },
];

const QUICK_ACTIONS = [
  {
    to: "/find-business",
    icon: Search,
    titleEn: "Find a Business",
    titleZh: "寻找企业",
    textEn: "Discover verified businesses and professionals.",
    textZh: "寻找经过验证的企业和专业人士。",
  },
  {
    to: "/find-partner",
    icon: Handshake,
    titleEn: "Find a Partner",
    titleZh: "寻找合作伙伴",
    textEn: "Explore partnership and market-entry connections.",
    textZh: "探索合作伙伴和市场进入机会。",
  },
  {
    to: "/need-help",
    icon: MessageCircleQuestion,
    titleEn: "I Need Help",
    titleZh: "我需要帮助",
    textEn: "Describe what you need and find matching providers.",
    textZh: "描述您的需求并寻找匹配的服务商。",
  },
  {
    to: "/opportunities",
    icon: TrendingUp,
    titleEn: "Opportunities",
    titleZh: "商业机会",
    textEn: "Browse investment, supplier and partnership opportunities.",
    textZh: "浏览投资、供应商和合作机会。",
  },
  {
    to: "/my-business-profile",
    icon: CircleUserRound,
    titleEn: "My Business Profile",
    titleZh: "我的企业资料",
    textEn: "View and manage your business profile.",
    textZh: "查看和管理您的企业资料。",
  },
  {
    to: "/business-documents",
    icon: FileCheck2,
    titleEn: "Business Documents",
    titleZh: "企业文件",
    textEn: "Upload and manage your business verification documents.",
    textZh: "上传和管理您的企业验证文件。",
  },
  {
    to: "/notifications",
    icon: Bell,
    titleEn: "Notifications",
    titleZh: "通知",
    textEn: "View enquiries, messages, opportunities and account updates.",
    textZh: "查看询盘、消息、商业机会和账户更新。",
  },
];

export default function BusinessDashboard() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const text = (english, chinese) => (isChinese ? chinese : english);

  return (
    <PageContainer className="business-dashboard">
      <header className="business-dashboard__header">
        <div>
          <span className="business-dashboard__eyebrow">
            <LayoutDashboard size={14} aria-hidden="true" />
            {text("Business Dashboard", "企业控制面板")}
          </span>

          <h1 className="business-dashboard__title">
            {text("Welcome back, Li Wei", "欢迎回来，李伟")}
          </h1>

          <p className="business-dashboard__subtitle">
            {text(
              "Manage your business activity, connections and opportunities from one place.",
              "在一个平台中管理您的企业活动、商业联系和机会。"
            )}
          </p>
        </div>

        <div className="business-dashboard__header-meta">
          <span className="business-dashboard__status business-dashboard__status--verified">
            <BadgeCheck size={14} aria-hidden="true" />
            {text("Verified Account", "已验证账户")}
          </span>

          <span className="business-dashboard__status">
            <Building2 size={14} aria-hidden="true" />
            {text("South Africa", "南非")}
          </span>
        </div>
      </header>

      <section className="business-dashboard__welcome">
        <div className="business-dashboard__welcome-card">
          <div className="business-dashboard__welcome-content">
            <p className="business-dashboard__welcome-label">
              {text("Your business space", "您的企业空间")}
            </p>

            <h2 className="business-dashboard__welcome-name">
              Shanghai Trade & Investment Ltd
            </h2>

            <p className="business-dashboard__welcome-business">
              {text(
                "Chinese Business / Entrepreneur / Investor",
                "中国企业 / 企业家 / 投资者"
              )}
            </p>

            <p className="business-dashboard__welcome-note">
              {text(
                "Your dashboard brings your profile, enquiries, opportunities and connections together. The information shown here is fictional demo data for the prototype.",
                "您的控制面板集中展示资料、询盘、商业机会和业务联系。这里显示的信息为原型演示使用的虚构示例数据。"
              )}
            </p>

            <div className="business-dashboard__welcome-actions">
              <Button to="/find-business" variant="secondary">
                {text("Explore Businesses", "探索企业")}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>

              <Button to="/account-settings" variant="secondary">
                {text("Account Settings", "账户设置")}
                <Settings size={17} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <div className="business-dashboard__profile-card">
          <div className="business-dashboard__profile-top">
            <div className="business-dashboard__profile-icon">
              <CircleUserRound size={21} aria-hidden="true" />
            </div>

            <strong className="business-dashboard__profile-percent">
              85%
            </strong>
          </div>

          <div>
            <p className="business-dashboard__profile-label">
              {text("Profile completion", "资料完成度")}
            </p>

            <h3 className="business-dashboard__profile-title">
              {text("Business profile", "企业资料")}
            </h3>

            <div
              className="business-dashboard__progress"
              aria-label={text(
                "Profile completion 85 percent",
                "资料完成度 85%"
              )}
            >
              <div className="business-dashboard__progress-bar" />
            </div>

            <p className="business-dashboard__profile-hint">
              {text(
                "Add your company introduction and references to complete your profile.",
                "添加企业介绍和参考资料以完成您的资料。"
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="business-dashboard__section">
        <div className="business-dashboard__section-heading">
          <div>
            <h2 className="business-dashboard__section-title">
              {text("Quick Actions", "快捷操作")}
            </h2>

            <p className="business-dashboard__section-description">
              {text(
                "Get to the most important parts of the platform quickly.",
                "快速进入平台最重要的功能。"
              )}
            </p>
          </div>
        </div>

        <div className="business-dashboard__quick-actions">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <a
                key={action.to}
                href={action.to}
                className="business-dashboard__quick-action"
              >
                <span className="business-dashboard__quick-action-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>

                <span className="business-dashboard__quick-action-content">
                  <span className="business-dashboard__quick-action-title">
                    {text(action.titleEn, action.titleZh)}
                  </span>

                  <span className="business-dashboard__quick-action-text">
                    {text(action.textEn, action.textZh)}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="business-dashboard__section">
        <div className="business-dashboard__section-heading">
          <div>
            <h2 className="business-dashboard__section-title">
              {text("Your Activity", "您的活动")}
            </h2>

            <p className="business-dashboard__section-description">
              {text(
                "A quick view of what is happening around your account.",
                "快速查看您的账户动态。"
              )}
            </p>
          </div>
        </div>

        <div className="business-dashboard__stats">
          <div className="business-dashboard__stat">
            <div className="business-dashboard__stat-top">
              <span className="business-dashboard__stat-icon">
                <Mail size={17} aria-hidden="true" />
              </span>

              <span className="business-dashboard__stat-change">
                +2
              </span>
            </div>

            <div className="business-dashboard__stat-value">3</div>

            <span className="business-dashboard__stat-label">
              {text("New enquiries", "新询盘")}
            </span>
          </div>

          <a
            href="/messages"
            className="business-dashboard__stat"
            aria-label={text(
              "Open unread messages",
              "打开未读消息"
            )}
          >
            <div className="business-dashboard__stat-top">
              <span className="business-dashboard__stat-icon">
                <MessageCircleQuestion
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <span className="business-dashboard__stat-change">
                +4
              </span>
            </div>

            <div className="business-dashboard__stat-value">4</div>

            <span className="business-dashboard__stat-label">
              {text("Unread messages", "未读消息")}
            </span>
          </a>

          <div className="business-dashboard__stat">
            <div className="business-dashboard__stat-top">
              <span className="business-dashboard__stat-icon">
                <BriefcaseBusiness
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <span className="business-dashboard__stat-change">
                +1
              </span>
            </div>

            <div className="business-dashboard__stat-value">2</div>

            <span className="business-dashboard__stat-label">
              {text("Active opportunities", "活跃机会")}
            </span>
          </div>

          <div className="business-dashboard__stat">
            <div className="business-dashboard__stat-top">
              <span className="business-dashboard__stat-icon">
                <TrendingUp size={17} aria-hidden="true" />
              </span>

              <span className="business-dashboard__stat-change">
                +18%
              </span>
            </div>

            <div className="business-dashboard__stat-value">18</div>

            <span className="business-dashboard__stat-label">
              {text("Profile views", "资料浏览量")}
            </span>
          </div>
        </div>
      </section>

      <section className="business-dashboard__section">
        <div className="business-dashboard__content-grid">
          <div className="business-dashboard__panel">
            <div className="business-dashboard__panel-header">
              <h2 className="business-dashboard__panel-title">
                {text("Recent Activity", "最近活动")}
              </h2>

              <a
                href="/notifications"
                className="business-dashboard__panel-link"
              >
                {text("View all", "查看全部")}
              </a>
            </div>

            <div className="business-dashboard__activity-list">
              {DEMO_ACTIVITY.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    className="business-dashboard__activity"
                    key={`${activity.titleEn}-${index}`}
                  >
                    <span className="business-dashboard__activity-icon">
                      <Icon size={15} aria-hidden="true" />
                    </span>

                    <div className="business-dashboard__activity-content">
                      <p className="business-dashboard__activity-title">
                        {text(
                          activity.titleEn,
                          activity.titleZh
                        )}
                      </p>

                      <p className="business-dashboard__activity-meta">
                        {text(
                          activity.metaEn,
                          activity.metaZh
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="business-dashboard__panel">
            <div className="business-dashboard__panel-header">
              <h2 className="business-dashboard__panel-title">
                {text("Verification", "验证状态")}
              </h2>

              <ShieldCheck size={18} aria-hidden="true" />
            </div>

            <div className="business-dashboard__verification">
              <div className="business-dashboard__verification-status">
                <span className="business-dashboard__verification-icon">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>

                <div>
                  <p className="business-dashboard__verification-title">
                    {text("Verified business", "已验证企业")}
                  </p>

                  <p className="business-dashboard__verification-text">
                    {text(
                      "Your business identity has passed the prototype verification stage.",
                      "您的企业身份已通过原型验证阶段。"
                    )}
                  </p>
                </div>
              </div>

              <div className="business-dashboard__checklist">
                <div className="business-dashboard__check">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {text("Business information", "企业信息")}
                </div>

                <div className="business-dashboard__check">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {text("Contact details", "联系方式")}
                </div>

                <div className="business-dashboard__check">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {text("Business references", "企业参考资料")}
                </div>

                <div className="business-dashboard__check">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {text("Profile review", "资料审核")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="business-dashboard__section">
        <div className="business-dashboard__panel">
          <div className="business-dashboard__panel-header">
            <div>
              <h2 className="business-dashboard__panel-title">
                {text(
                  "Recommended Opportunities",
                  "推荐商业机会"
                )}
              </h2>
            </div>

            <a
              href="/opportunities"
              className="business-dashboard__panel-link"
            >
              {text("Browse all", "查看全部")}
            </a>
          </div>

          <div className="business-dashboard__opportunities">
            {DEMO_OPPORTUNITIES.map((opportunity) => (
              <div
                className="business-dashboard__opportunity"
                key={opportunity.titleEn}
              >
                <span className="business-dashboard__opportunity-type">
                  {text(
                    opportunity.typeEn,
                    opportunity.typeZh
                  )}
                </span>

                <h3 className="business-dashboard__opportunity-title">
                  {text(
                    opportunity.titleEn,
                    opportunity.titleZh
                  )}
                </h3>

                <p className="business-dashboard__opportunity-meta">
                  {text(
                    opportunity.metaEn,
                    opportunity.metaZh
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="business-dashboard__demo-note">
        <Sparkles size={16} aria-hidden="true" />

        <span>
          {text(
            "Prototype notice: Dashboard activity, statistics, verification status and opportunities are fictional sample data. Production data will come from the user's secure account and backend database.",
            "原型说明：控制面板中的活动、统计数据、验证状态和商业机会均为虚构示例数据。正式平台将从用户的安全账户和后端数据库中读取真实数据。"
          )}
        </span>
      </div>
    </PageContainer>
  );
}