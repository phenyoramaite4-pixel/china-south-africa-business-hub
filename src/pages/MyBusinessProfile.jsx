import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Edit3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import "./MyBusinessProfile.css";

const SERVICES = [
  {
    en: "Market Entry Consulting",
    zh: "市场进入咨询",
  },
  {
    en: "Business Development",
    zh: "业务发展",
  },
  {
    en: "Import & Export",
    zh: "进出口",
  },
  {
    en: "Distribution Partnerships",
    zh: "分销合作伙伴关系",
  },
];

const PROJECTS = [
  {
    titleEn: "South Africa Market Entry Programme",
    titleZh: "南非市场进入项目",
    descriptionEn:
      "Supported a Chinese manufacturing business with local market research, partner identification and distribution planning.",
    descriptionZh:
      "协助一家中国制造企业进行南非市场调研、合作伙伴寻找和分销规划。",
    periodEn: "2025",
    periodZh: "2025年",
  },
  {
    titleEn: "Johannesburg Distribution Network",
    titleZh: "约翰内斯堡分销网络",
    descriptionEn:
      "Developed relationships with local distributors and commercial partners for expansion into Gauteng.",
    descriptionZh:
      "与当地分销商和商业合作伙伴建立关系，支持进入豪登省市场。",
    periodEn: "2025–2026",
    periodZh: "2025–2026年",
  },
  {
    titleEn: "China–South Africa Supplier Connection",
    titleZh: "中南供应商合作项目",
    descriptionEn:
      "Connected South African buyers with Chinese suppliers for equipment and commercial products.",
    descriptionZh:
      "为南非采购商与中国设备及商业产品供应商建立联系。",
    periodEn: "2026",
    periodZh: "2026年",
  },
];

const PARTNERS = [
  {
    name: "Ubuntu Distribution Group",
    typeEn: "South African Company",
    typeZh: "南非企业",
  },
  {
    name: "Johannesburg Trade Services",
    typeEn: "Business Services",
    typeZh: "商业服务",
  },
  {
    name: "Shanghai Industrial Network",
    typeEn: "Chinese Business Network",
    typeZh: "中国商业网络",
  },
];

export default function MyBusinessProfile() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const text = (english, chinese) => (isChinese ? chinese : english);

  return (
    <PageContainer className="my-business-profile">
      <div className="my-business-profile__topbar">
        <Link
          to="/dashboard"
          className="my-business-profile__back"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          {text("Back to Dashboard", "返回控制面板")}
        </Link>

        <div className="my-business-profile__actions">
          <Button
            to="/edit-business-profile"
            variant="secondary"
            size="sm"
          >
            <Edit3 size={16} aria-hidden="true" />
            {text("Edit Profile", "编辑资料")}
          </Button>

          <Button
            to="/provider/p1"
            variant="primary"
            size="sm"
          >
            {text("View Public Profile", "查看公开资料")}
          </Button>
        </div>
      </div>

      <header className="my-business-profile__header">
        <div className="my-business-profile__identity">
          <div className="my-business-profile__avatar">
            <Building2 size={30} aria-hidden="true" />
          </div>

          <div>
            <div className="my-business-profile__name-row">
              <h1 className="my-business-profile__title">
                Shanghai Trade & Investment Ltd
              </h1>

              <span className="my-business-profile__verified">
                <BadgeCheck size={15} aria-hidden="true" />
                {text("Verified", "已验证")}
              </span>
            </div>

            <p className="my-business-profile__subtitle">
              {text(
                "Chinese Business / Entrepreneur / Investor",
                "中国企业 / 企业家 / 投资者"
              )}
            </p>

            <div className="my-business-profile__meta">
              <span>
                <MapPin size={14} aria-hidden="true" />
                {text("Johannesburg, Gauteng", "约翰内斯堡，豪登省")}
              </span>

              <span>
                <Globe2 size={14} aria-hidden="true" />
                {text(
                  "China–South Africa Business",
                  "中南商业"
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="my-business-profile__layout">
        <main className="my-business-profile__main">
          <section className="my-business-profile__card">
            <div className="my-business-profile__card-heading">
              <div>
                <span className="my-business-profile__eyebrow">
                  {text("About the business", "企业介绍")}
                </span>

                <h2>
                  {text("Business Overview", "企业概况")}
                </h2>
              </div>

              <Building2 size={20} aria-hidden="true" />
            </div>

            <p className="my-business-profile__description">
              {text(
                "Shanghai Trade & Investment Ltd is a fictional demonstration business representing a Chinese company exploring commercial opportunities, partnerships and market expansion in South Africa.",
                "上海贸易投资有限公司是一个虚构的演示企业，代表一家正在探索南非商业机会、合作伙伴关系和市场拓展的中国企业。"
              )}
            </p>

            <div className="my-business-profile__services">
              {SERVICES.map((service) => (
                <span
                  className="my-business-profile__service"
                  key={service.en}
                >
                  {text(service.en, service.zh)}
                </span>
              ))}
            </div>
          </section>

          <section className="my-business-profile__card">
            <div className="my-business-profile__card-heading">
              <div>
                <span className="my-business-profile__eyebrow">
                  {text("Track record", "业务记录")}
                </span>

                <h2>
                  {text(
                    "Projects & Experience",
                    "项目与经验"
                  )}
                </h2>
              </div>
            </div>

            <div className="my-business-profile__projects">
              {PROJECTS.map((project) => (
                <article
                  className="my-business-profile__project"
                  key={project.titleEn}
                >
                  <div className="my-business-profile__project-period">
                    {text(
                      project.periodEn,
                      project.periodZh
                    )}
                  </div>

                  <div>
                    <h3>
                      {text(
                        project.titleEn,
                        project.titleZh
                      )}
                    </h3>

                    <p>
                      {text(
                        project.descriptionEn,
                        project.descriptionZh
                      )}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="my-business-profile__card">
            <div className="my-business-profile__card-heading">
              <div>
                <span className="my-business-profile__eyebrow">
                  {text("Business network", "商业网络")}
                </span>

                <h2>
                  {text(
                    "Partners & Connections",
                    "合作伙伴与商业联系"
                  )}
                </h2>
              </div>

              <UserRound size={20} aria-hidden="true" />
            </div>

            <div className="my-business-profile__partners">
              {PARTNERS.map((partner) => (
                <div
                  className="my-business-profile__partner"
                  key={partner.name}
                >
                  <div className="my-business-profile__partner-icon">
                    <Building2 size={17} aria-hidden="true" />
                  </div>

                  <div>
                    <h3>{partner.name}</h3>
                    <p>
                      {text(
                        partner.typeEn,
                        partner.typeZh
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="my-business-profile__sidebar">
          <section className="my-business-profile__card my-business-profile__verification-card">
            <div className="my-business-profile__verification-icon">
              <ShieldCheck size={23} aria-hidden="true" />
            </div>

            <h2>
              {text(
                "Verification Status",
                "验证状态"
              )}
            </h2>

            <div className="my-business-profile__verification-status">
              <CheckCircle2 size={16} aria-hidden="true" />
              {text(
                "Business verified",
                "企业已验证"
              )}
            </div>

            <p>
              {text(
                "Your business profile has completed the prototype verification process.",
                "您的企业资料已完成原型验证流程。"
              )}
            </p>

            <Button
              to="/dashboard"
              variant="secondary"
              size="sm"
            >
              {text(
                "Manage Verification",
                "管理验证"
              )}
            </Button>
          </section>

          <section className="my-business-profile__card">
            <div className="my-business-profile__card-heading">
              <div>
                <span className="my-business-profile__eyebrow">
                  {text("Introduction video", "介绍视频")}
                </span>

                <h2>
                  {text(
                    "Business Introduction",
                    "企业介绍视频"
                  )}
                </h2>
              </div>

              <PlayCircle size={20} aria-hidden="true" />
            </div>

            <div className="my-business-profile__video">
              <div className="my-business-profile__video-overlay">
                <PlayCircle size={38} aria-hidden="true" />
              </div>

              <span>
                {text(
                  "Demo business video",
                  "演示企业视频"
                )}
              </span>
            </div>

            <p className="my-business-profile__video-language">
              {text(
                "Language: English + Chinese subtitles",
                "语言：英文 + 中文字幕"
              )}
            </p>
          </section>

          <section className="my-business-profile__card">
            <div className="my-business-profile__card-heading">
              <div>
                <span className="my-business-profile__eyebrow">
                  {text("Contact", "联系方式")}
                </span>

                <h2>
                  {text(
                    "Business Contact",
                    "企业联系方式"
                  )}
                </h2>
              </div>
            </div>

            <div className="my-business-profile__contact-list">
              <div>
                <Mail size={16} aria-hidden="true" />
                <span>contact@shanghaitrade.demo</span>
              </div>

              <div>
                <Phone size={16} aria-hidden="true" />
                <span>+27 11 000 2026</span>
              </div>

              <div>
                <MapPin size={16} aria-hidden="true" />
                <span>
                  {text(
                    "Johannesburg, Gauteng, South Africa",
                    "南非豪登省约翰内斯堡"
                  )}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </section>

      <div className="my-business-profile__demo-note">
        <ShieldCheck size={16} aria-hidden="true" />

        <span>
          {text(
            "Prototype notice: This business profile contains fictional sample information. Production profiles will be created and managed by authenticated users.",
            "原型说明：此企业资料包含虚构的示例信息。正式平台中的资料将由经过身份验证的用户创建和管理。"
          )}
        </span>
      </div>
    </PageContainer>
  );
}