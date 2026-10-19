import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useRegistration } from "../context/RegistrationContext";
import PageContainer from "../components/PageContainer";
import "./UserManagement.css";

export default function UserManagement() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { registrations } = useRegistration();

  const isChinese = language === "zh";

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const text = (english, chinese) =>
    isChinese ? chinese : english;

  const users = useMemo(() => {
    return registrations || [];
  }, [registrations]);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.companyName?.toLowerCase().includes(search) ||
      user.businessName?.toLowerCase().includes(search);

    const accountType = user.accountType || "";

    const matchesFilter =
      filter === "all" ||
      (filter === "business" &&
        accountType !== "professional") ||
      (filter === "professional" &&
        accountType === "professional");

    return matchesSearch && matchesFilter;
  });

  function getUserType(user) {
    if (user.accountType === "professional") {
      return text(
        "Independent Professional",
        "独立专业人士"
      );
    }

    if (user.accountType === "south-african") {
      return text(
        "South African Business",
        "南非企业"
      );
    }

    return text(
      "Business / Entrepreneur / Investor",
      "企业 / 企业家 / 投资者"
    );
  }

  function getStatus(user) {
    return user.status || "pending";
  }

  function getStatusLabel(status) {
    if (status === "approved") {
      return text("Verified", "已验证");
    }

    if (status === "rejected") {
      return text("Rejected", "已拒绝");
    }

    if (status === "changes") {
      return text("Changes Requested", "要求修改");
    }

    return text("Pending Review", "待审核");
  }

  function getIcon(user) {
    if (user.accountType === "professional") {
      return <BriefcaseBusiness size={20} />;
    }

    return <Building2 size={20} />;
  }

  return (
    <PageContainer className="user-management-page">
      <div className="user-management">
        <section className="user-management__hero">
          <button
            type="button"
            className="user-management__back-button"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft size={17} />

            {text(
              "Back to Admin",
              "返回管理员中心"
            )}
          </button>

          <div className="user-management__hero-content">
            <div>
              <span className="user-management__eyebrow">
                {text(
                  "User Management",
                  "用户管理"
                )}
              </span>

              <h1>
                {text(
                  "Manage platform users",
                  "管理平台用户"
                )}
              </h1>

              <p>
                {text(
                  "Review businesses and independent professionals registered on the platform.",
                  "查看在平台注册的企业和独立专业人士。"
                )}
              </p>
            </div>

            <div className="user-management__hero-icon">
              <UserRound size={28} />
            </div>
          </div>
        </section>

        <section className="user-management__summary">
          <div className="user-management__summary-card">
            <span>
              {text("Total Users", "用户总数")}
            </span>

            <strong>{users.length}</strong>
          </div>

          <div className="user-management__summary-card">
            <span>
              {text("Businesses", "企业")}
            </span>

            <strong>
              {
                users.filter(
                  (user) =>
                    user.accountType !==
                    "professional"
                ).length
              }
            </strong>
          </div>

          <div className="user-management__summary-card">
            <span>
              {text(
                "Independent Professionals",
                "独立专业人士"
              )}
            </span>

            <strong>
              {
                users.filter(
                  (user) =>
                    user.accountType ===
                    "professional"
                ).length
              }
            </strong>
          </div>

          <div className="user-management__summary-card">
            <span>
              {text(
                "Pending Review",
                "待审核"
              )}
            </span>

            <strong>
              {
                users.filter(
                  (user) =>
                    !user.status ||
                    user.status === "pending"
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="user-management__workspace">
          <div className="user-management__workspace-header">
            <div>
              <span className="user-management__section-eyebrow">
                {text(
                  "Registered Users",
                  "已注册用户"
                )}
              </span>

              <h2>
                {text(
                  "Platform users",
                  "平台用户"
                )}
              </h2>
            </div>

            <ShieldCheck size={21} />
          </div>

          <div className="user-management__controls">
            <div className="user-management__search">
              <Search size={18} />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder={text(
                  "Search users...",
                  "搜索用户..."
                )}
              />
            </div>

            <div className="user-management__filters">
              <button
                type="button"
                className={
                  filter === "all"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                {text("All", "全部")}
              </button>

              <button
                type="button"
                className={
                  filter === "business"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setFilter("business")
                }
              >
                {text(
                  "Businesses",
                  "企业"
                )}
              </button>

              <button
                type="button"
                className={
                  filter === "professional"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setFilter("professional")
                }
              >
                {text(
                  "Professionals",
                  "专业人士"
                )}
              </button>
            </div>
          </div>

          <div className="user-management__list">
            {filteredUsers.length === 0 ? (
              <div className="user-management__empty">
                <UserRound size={30} />

                <strong>
                  {searchTerm
                    ? text(
                        "No users match your search.",
                        "没有符合搜索条件的用户。"
                      )
                    : text(
                        "No registered users yet.",
                        "目前还没有注册用户。"
                      )}
                </strong>

                <span>
                  {text(
                    "New registrations will appear here.",
                    "新的注册用户会显示在这里。"
                  )}
                </span>
              </div>
            ) : (
              filteredUsers.map((user) => {
                const status =
                  getStatus(user);

                return (
                  <div
                    className="user-management__user-card"
                    key={user.id}
                  >
                    <div className="user-management__user-icon">
                      {getIcon(user)}
                    </div>

                    <div className="user-management__user-main">
                      <strong>
                        {user.name ||
                          text(
                            "Unnamed User",
                            "未命名用户"
                          )}
                      </strong>

                      <span>
                        {getUserType(user)}
                      </span>

                      {user.email && (
                        <small>
                          {user.email}
                        </small>
                      )}
                    </div>

                    <div className="user-management__user-location">
                      <span>
                        {text(
                          "Location",
                          "所在地"
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

                    <span
                      className={`user-management__status is-${status}`}
                    >
                      {getStatusLabel(
                        status
                      )}
                    </span>

                    <button
                      type="button"
                      className="user-management__view-button"
                      onClick={() =>
                        navigate(
                          `/admin/users/${user.id}`
                        )
                      }
                    >
                      {text(
                        "View",
                        "查看"
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}