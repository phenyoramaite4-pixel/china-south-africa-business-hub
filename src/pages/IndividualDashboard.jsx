import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  MessageCircle,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import IndividualNavigation from "../components/IndividualNavigation";
import "./IndividualDashboard.css";

export default function IndividualDashboard() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const text = {
    eyebrow: isChinese ? "个人门户" : "Individual Portal",
    title: isChinese ? "欢迎回来，Li Wei" : "Welcome back, Li Wei",
    subtitle: isChinese
      ? "管理您的个人资料、机会、申请和商业联系。"
      : "Manage your profile, opportunities, applications and business connections.",

    verified: isChinese ? "个人资料已验证" : "Profile Verified",
    location: isChinese ? "南非" : "South Africa",

    profileCompletion: isChinese ? "个人资料完成度" : "Profile Completion",
    profileText: isChinese
      ? "完善您的资料以获得更多匹配机会。"
      : "Complete your profile to receive better opportunity matches.",

    settings: isChinese ? "账户设置" : "Account Settings",

    overview: isChinese ? "账户概览" : "Account Overview",
    overviewTitle: isChinese ? "您的账户活动" : "Your Account Activity",

    activeApplications: isChinese ? "活跃申请" : "Active Applications",
    savedOpportunities: isChinese ? "已保存机会" : "Saved Opportunities",
    connectionsCount: isChinese ? "联系人" : "Connections",
    unreadMessages: isChinese ? "未读消息" : "Unread Messages",

    recommended: isChinese ? "为您推荐" : "Recommended for You",
    recommendedTitle: isChinese ? "机会与匹配" : "Opportunities & Matches",
    recommendedText: isChinese
      ? "根据您的个人资料和兴趣为您推荐的机会。"
      : "Opportunities recommended based on your profile and interests.",

    opportunityOne: isChinese
      ? "中国—南非商业合作计划"
      : "China–South Africa Business Partnership Programme",

    opportunityOneText: isChinese
      ? "寻找具有国际商业合作兴趣的专业人士和企业家。"
      : "Seeking professionals and entrepreneurs interested in international business collaboration.",

    opportunityTwo: isChinese
      ? "独立专业人士合作机会"
      : "Independent Professional Collaboration",

    opportunityTwoText: isChinese
      ? "连接专业人士、服务提供者和企业。"
      : "Connect with professionals, service providers and businesses.",

    businessCollaboration: isChinese ? "商业合作" : "Business Collaboration",
    professionalNetwork: isChinese ? "专业人士网络" : "Professional Network",

    recentActivity: isChinese ? "最近活动" : "Recent Activity",
    latestUpdates: isChinese ? "最新动态" : "Latest Updates",

    activityOne: isChinese
      ? "您保存了一个新的商业机会"
      : "You saved a new business opportunity",

    activityTwo: isChinese
      ? "您的个人资料已更新"
      : "Your profile was updated",

    activityThree: isChinese
      ? "您收到了一条新消息"
      : "You received a new message",

    hoursAgo: isChinese ? "2小时前" : "2 hours ago",
    yesterday: isChinese ? "昨天" : "Yesterday",

    messages: isChinese ? "消息" : "Messages",
    notifications: isChinese ? "通知" : "Notifications",

    prototypeNotice: isChinese
      ? "原型说明：这是中国—南非商业中心的演示门户。账户数据和活动目前使用演示数据。"
      : "Prototype notice: This is a demonstration portal for the China–South Africa Business Hub. Account data and activity currently use fictional prototype data.",
  };

  const stats = [
    {
      icon: FileText,
      value: "3",
      label: text.activeApplications,
    },
    {
      icon: Heart,
      value: "7",
      label: text.savedOpportunities,
    },
    {
      icon: UsersRound,
      value: "12",
      label: text.connectionsCount,
    },
    {
      icon: MessageCircle,
      value: "2",
      label: text.unreadMessages,
    },
  ];

  return (
    <PageContainer
      width="xl"
      className="individual-dashboard-page"
    >
      <div className="individual-portal-layout">
        <IndividualNavigation />

        <main className="individual-dashboard">
          {/* Welcome and profile completion */}
          <section className="individual-hero">
            <div className="individual-hero__content">
              <span className="individual-eyebrow">
                <UserRound size={16} aria-hidden="true" />
                {text.eyebrow}
              </span>

              <h1>{text.title}</h1>
              <p>{text.subtitle}</p>

              <div className="individual-hero__meta">
                <span>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {text.verified}
                </span>

                <span>
                  <BriefcaseBusiness size={16} aria-hidden="true" />
                  {text.location}
                </span>
              </div>
            </div>

            <div className="individual-profile-progress">
              <div className="individual-profile-progress__top">
                <span>{text.profileCompletion}</span>
                <strong>80%</strong>
              </div>

              <div
                className="individual-progress-bar"
                role="progressbar"
                aria-label={text.profileCompletion}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: "80%" }} />
              </div>

              <p>{text.profileText}</p>

              {/* Keep Account Settings in its existing position */}
              <Button
                to="/account-settings?from=individual"
                variant="secondary"
                size="sm"
              >
                {text.settings}
                <Settings size={16} aria-hidden="true" />
              </Button>
            </div>
          </section>

          {/* Account overview and statistics */}
          <section className="individual-section">
            <div className="individual-section__heading">
              <div>
                <span className="individual-section__eyebrow">
                  {text.overview}
                </span>

                <h2>{text.overviewTitle}</h2>
              </div>
            </div>

            <div className="individual-stats-grid">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Card
                    key={stat.label}
                    className="individual-stat-card"
                  >
                    <div className="individual-stat-card__icon">
                      <Icon size={20} aria-hidden="true" />
                    </div>

                    <div className="individual-stat-card__content">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Recommended opportunities and recent activity */}
          <section className="individual-content-grid">
            <Card className="individual-panel individual-opportunities">
              <div className="individual-panel__header">
                <div>
                  <span className="individual-panel__eyebrow">
                    {text.recommended}
                  </span>

                  <h2>{text.recommendedTitle}</h2>
                  <p>{text.recommendedText}</p>
                </div>
              </div>

              <div className="individual-opportunity-list">
                <article className="individual-opportunity">
                  <div className="individual-opportunity__icon">
                    <BriefcaseBusiness size={22} aria-hidden="true" />
                  </div>

                  <div className="individual-opportunity__content">
                    <span className="individual-opportunity__tag">
                      {text.businessCollaboration}
                    </span>

                    <h3>{text.opportunityOne}</h3>
                    <p>{text.opportunityOneText}</p>
                  </div>
                </article>

                <article className="individual-opportunity">
                  <div className="individual-opportunity__icon">
                    <UsersRound size={22} aria-hidden="true" />
                  </div>

                  <div className="individual-opportunity__content">
                    <span className="individual-opportunity__tag">
                      {text.professionalNetwork}
                    </span>

                    <h3>{text.opportunityTwo}</h3>
                    <p>{text.opportunityTwoText}</p>
                  </div>
                </article>
              </div>
            </Card>

            {/* Recent activity */}
            <Card className="individual-panel individual-activity">
              <div className="individual-panel__header">
                <div>
                  <span className="individual-panel__eyebrow">
                    {text.recentActivity}
                  </span>

                  <h2>{text.latestUpdates}</h2>
                </div>
              </div>

              <div className="individual-activity-list">
                <div className="individual-activity-item">
                  <div className="individual-activity-item__icon">
                    <Heart size={17} aria-hidden="true" />
                  </div>

                  <div>
                    <p>{text.activityOne}</p>
                    <span>{text.hoursAgo}</span>
                  </div>
                </div>

                <div className="individual-activity-item">
                  <div className="individual-activity-item__icon">
                    <UserRound size={17} aria-hidden="true" />
                  </div>

                  <div>
                    <p>{text.activityTwo}</p>
                    <span>{text.yesterday}</span>
                  </div>
                </div>

                <div className="individual-activity-item">
                  <div className="individual-activity-item__icon">
                    <MessageCircle size={17} aria-hidden="true" />
                  </div>

                  <div>
                    <p>{text.activityThree}</p>
                    <span>{text.yesterday}</span>
                  </div>
                </div>
              </div>

              <div className="individual-activity-footer">
                <span>
                  <MessageCircle size={15} aria-hidden="true" />
                  {text.messages}
                </span>

                <span>
                  <Bell size={15} aria-hidden="true" />
                  {text.notifications}
                </span>
              </div>
            </Card>
          </section>

          {/* Prototype notice */}
          <div className="individual-prototype-notice">
            <Clock3 size={17} aria-hidden="true" />
            <span>{text.prototypeNotice}</span>
          </div>
        </main>
      </div>
    </PageContainer>
  );
}