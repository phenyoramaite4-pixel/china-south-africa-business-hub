import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useRegistration } from "../context/RegistrationContext";
import PageContainer from "../components/PageContainer";
import "./UserManagementUser.css";

export default function UserManagementUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { language } = useLanguage();
  const { registrations } = useRegistration();

  const isChinese = language === "zh";

  const text = (english, chinese) =>
    isChinese ? chinese : english;

  const user = (registrations || []).find(
    (item) => String(item.id) === String(id)
  );

  if (!user) {
    return (
      <PageContainer className="user-management-user-page">
        <div className="user-management-user__not-found">
          <UserRound size={34} />

          <h1>
            {text(
              "User Not Found",
              "未找到用户"
            )}
          </h1>

          <p>
            {text(
              "The selected user could not be found.",
              "找不到所选用户。"
            )}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            <ArrowLeft size={17} />

            {text(
              "Back to User Management",
              "返回用户管理"
            )}
          </button>
        </div>
      </PageContainer>
    );
  }

  const isProfessional =
    user.accountType === "professional";

  const status = user.status || "pending";

  const statusLabel =
    status === "approved"
      ? text("Verified", "已验证")
      : status === "rejected"
      ? text("Rejected", "已拒绝")
      : status === "changes"
      ? text(
          "Changes Requested",
          "要求修改"
        )
      : text(
          "Pending Review",
          "待审核"
        );

  const userType = isProfessional
    ? text(
        "Independent Professional",
        "独立专业人士"
      )
    : text(
        "Business / Entrepreneur / Investor",
        "企业 / 企业家 / 投资者"
      );

  const Icon = isProfessional
    ? BriefcaseBusiness
    : Building2;

  return (
    <PageContainer className="user-management-user-page">
      <div className="user-management-user">
        {/* HERO */}

        <section className="user-management-user__hero">
          <button
            type="button"
            className="user-management-user__back"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            <ArrowLeft size={17} />

            {text(
              "Back to User Management",
              "返回用户管理"
            )}
          </button>

          <div className="user-management-user__hero-content">
            <div className="user-management-user__avatar">
              <Icon size={30} />
            </div>

            <div>
              <span className="user-management-user__eyebrow">
                {text(
                  "User Profile",
                  "用户资料"
                )}
              </span>

              <h1>
                {user.name ||
                  text(
                    "Unnamed User",
                    "未命名用户"
                  )}
              </h1>

              <p>{userType}</p>
            </div>

            <div
              className={`user-management-user__status is-${status}`}
            >
              <ShieldCheck size={16} />
              {statusLabel}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <div className="user-management-user__grid">
          {/* BASIC INFORMATION */}

          <section className="user-management-user__card">
            <div className="user-management-user__card-header">
              <div>
                <span>
                  {text(
                    "Account Information",
                    "账户信息"
                  )}
                </span>

                <h2>
                  {text(
                    "Basic details",
                    "基本信息"
                  )}
                </h2>
              </div>

              <UserRound size={20} />
            </div>

            <div className="user-management-user__details">
              <div className="user-management-user__detail">
                <span>
                  {text("Full Name", "姓名")}
                </span>

                <strong>
                  {user.name ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text("Email", "电子邮箱")}
                </span>

                <strong>
                  {user.email ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Account Type",
                    "账户类型"
                  )}
                </span>

                <strong>{userType}</strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Status",
                    "状态"
                  )}
                </span>

                <strong>{statusLabel}</strong>
              </div>
            </div>
          </section>

          {/* LOCATION */}

          <section className="user-management-user__card">
            <div className="user-management-user__card-header">
              <div>
                <span>
                  {text(
                    "Location",
                    "所在地"
                  )}
                </span>

                <h2>
                  {text(
                    "Location details",
                    "位置详情"
                  )}
                </h2>
              </div>

              <MapPin size={20} />
            </div>

            <div className="user-management-user__details">
              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Province / Region",
                    "省 / 地区"
                  )}
                </span>

                <strong>
                  {user.province ||
                    user.location ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text("City", "城市")}
                </span>

                <strong>
                  {user.city ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text("Country", "国家")}
                </span>

                <strong>
                  {user.country ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>
            </div>
          </section>

          {/* CONTACT */}

          <section className="user-management-user__card">
            <div className="user-management-user__card-header">
              <div>
                <span>
                  {text(
                    "Contact",
                    "联系方式"
                  )}
                </span>

                <h2>
                  {text(
                    "Contact information",
                    "联系信息"
                  )}
                </h2>
              </div>

              <Mail size={20} />
            </div>

            <div className="user-management-user__details">
              <div className="user-management-user__detail">
                <span>
                  {text("Email", "电子邮箱")}
                </span>

                <strong>
                  {user.email ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Phone",
                    "电话号码"
                  )}
                </span>

                <strong>
                  {user.phone ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>
            </div>
          </section>

          {/* BUSINESS INFORMATION */}

          <section className="user-management-user__card">
            <div className="user-management-user__card-header">
              <div>
                <span>
                  {text(
                    "Organisation",
                    "组织"
                  )}
                </span>

                <h2>
                  {text(
                    "Business information",
                    "企业信息"
                  )}
                </h2>
              </div>

              <Building2 size={20} />
            </div>

            <div className="user-management-user__details">
              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Business Name",
                    "企业名称"
                  )}
                </span>

                <strong>
                  {user.businessName ||
                    user.companyName ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>

              <div className="user-management-user__detail">
                <span>
                  {text(
                    "Industry",
                    "行业"
                  )}
                </span>

                <strong>
                  {user.industry ||
                    text(
                      "Not provided",
                      "未提供"
                    )}
                </strong>
              </div>
            </div>
          </section>
        </div>

        {/* ADMIN ACTIONS */}

        <section className="user-management-user__actions">
          <div>
            <span>
              {text(
                "Administrator",
                "管理员"
              )}
            </span>

            <h2>
              {text(
                "User management actions",
                "用户管理操作"
              )}
            </h2>

            <p>
              {text(
                "Administrative actions can be connected here as the platform moves from prototype to production.",
                "随着平台从原型发展到正式版本，管理员操作可以在这里连接。"
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            <ArrowLeft size={17} />

            {text(
              "Back to Users",
              "返回用户"
            )}
          </button>
        </section>
      </div>
    </PageContainer>
  );
}