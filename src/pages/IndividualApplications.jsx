
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Search,
  Clock3,
  CheckCircle2,
  XCircle,
  ClipboardList,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import IndividualNavigation from "../components/IndividualNavigation";

import "./IndividualApplications.css";

const SAMPLE_APPLICATIONS = [
  {
    id: "APP-001",
    title: "China–South Africa Trade Partnership",
    titleZh: "中南贸易合作伙伴关系",
    organisation: "International Trade Network",
    organisationZh: "国际贸易网络",
    category: "Partnership",
    categoryZh: "合作伙伴",
    status: "Under Review",
    date: "2026-09-18",
  },
  {
    id: "APP-002",
    title: "Technology Supplier Programme",
    titleZh: "技术供应商计划",
    organisation: "Digital Solutions Group",
    organisationZh: "数字解决方案集团",
    category: "Supplier",
    categoryZh: "供应商",
    status: "Pending",
    date: "2026-09-24",
  },
  {
    id: "APP-003",
    title: "Small Business Development Initiative",
    titleZh: "小型企业发展计划",
    organisation: "Business Growth Centre",
    organisationZh: "企业发展中心",
    category: "Business Support",
    categoryZh: "商业支持",
    status: "Approved",
    date: "2026-09-29",
  },
];

const FILTERS = [
  { id: "all", en: "All Applications", zh: "全部申请" },
  { id: "Pending", en: "Pending", zh: "待处理" },
  { id: "Under Review", en: "Under Review", zh: "审核中" },
  { id: "Approved", en: "Approved", zh: "已批准" },
  { id: "Declined", en: "Declined", zh: "已拒绝" },
];

function getStatusText(status, isChinese) {
  if (!isChinese) {
    return status;
  }

  const translations = {
    Pending: "待处理",
    "Under Review": "审核中",
    Approved: "已批准",
    Declined: "已拒绝",
  };

  return translations[status] || status;
}

export default function IndividualApplications() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isChinese = String(language || "")
    .toLowerCase()
    .startsWith("zh");

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const applications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return SAMPLE_APPLICATIONS.filter((application) => {
      const matchesStatus =
        selectedFilter === "all" ||
        application.status === selectedFilter;

      const searchableText = [
        application.title,
        application.titleZh,
        application.organisation,
        application.organisationZh,
        application.category,
        application.categoryZh,
        application.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        (!query || searchableText.includes(query))
      );
    });
  }, [search, selectedFilter]);

  const countByStatus = (status) =>
    SAMPLE_APPLICATIONS.filter(
      (application) => application.status === status
    ).length;

  function getApplicationText(application, key) {
    if (isChinese) {
      const chineseKey = `${key}Zh`;

      if (application[chineseKey]) {
        return application[chineseKey];
      }
    }

    return application[key] || "";
  }

  return (
    <div className="individual-applications-page">
      <div className="individual-applications-layout">
        <IndividualNavigation />

        <main className="individual-applications-content">
          <button
            type="button"
            className="individual-applications-back"
            onClick={() => navigate("/individual-dashboard")}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            {isChinese ? "返回个人首页" : "Back to Dashboard"}
          </button>

          <section className="individual-applications-hero">
            <div className="individual-applications-hero__icon">
              <FileText size={28} aria-hidden="true" />
            </div>

            <span className="individual-applications-eyebrow">
              {isChinese ? "个人门户" : "INDIVIDUAL PORTAL"}
            </span>

            <h1>
              {isChinese ? "我的申请" : "My Applications"}
            </h1>

            <p>
              {isChinese
                ? "查看和跟踪您提交的商业机会及计划申请。"
                : "View and track your applications for business opportunities and programmes."}
            </p>
          </section>

          <section className="individual-applications-stats">
            <article className="individual-applications-stat">
              <span className="individual-applications-stat__icon">
                <ClipboardList size={20} aria-hidden="true" />
              </span>
              <span className="individual-applications-stat__label">
                {isChinese ? "全部申请" : "Total Applications"}
              </span>
              <strong>{SAMPLE_APPLICATIONS.length}</strong>
            </article>

            <article className="individual-applications-stat">
              <span className="individual-applications-stat__icon is-pending">
                <Clock3 size={20} aria-hidden="true" />
              </span>
              <span className="individual-applications-stat__label">
                {isChinese ? "待处理" : "Pending"}
              </span>
              <strong>{countByStatus("Pending")}</strong>
            </article>

            <article className="individual-applications-stat">
              <span className="individual-applications-stat__icon is-approved">
                <CheckCircle2 size={20} aria-hidden="true" />
              </span>
              <span className="individual-applications-stat__label">
                {isChinese ? "已批准" : "Approved"}
              </span>
              <strong>{countByStatus("Approved")}</strong>
            </article>

            <article className="individual-applications-stat">
              <span className="individual-applications-stat__icon is-review">
                <FileText size={20} aria-hidden="true" />
              </span>
              <span className="individual-applications-stat__label">
                {isChinese ? "审核中" : "Under Review"}
              </span>
              <strong>{countByStatus("Under Review")}</strong>
            </article>
          </section>

          <section className="individual-applications-list-section">
            <div className="individual-applications-list-header">
              <div>
                <h2>
                  {isChinese ? "申请记录" : "Application Records"}
                </h2>
                <p>
                  {isChinese
                    ? "搜索记录或按申请状态筛选。"
                    : "Search your records or filter by application status."}
                </p>
              </div>
            </div>

            <div className="individual-applications-search">
              <Search size={19} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  isChinese
                    ? "搜索申请、机构或编号..."
                    : "Search applications, organisations or ID..."
                }
                aria-label={
                  isChinese
                    ? "搜索申请"
                    : "Search applications"
                }
              />
            </div>

            <div className="individual-applications-filters">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={
                    selectedFilter === filter.id
                      ? "is-selected"
                      : ""
                  }
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  {isChinese ? filter.zh : filter.en}
                </button>
              ))}
            </div>

            <div className="individual-applications-list">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <article
                    className="individual-application-card"
                    key={application.id}
                  >
                    <div className="individual-application-card__icon">
                      <FileText size={22} aria-hidden="true" />
                    </div>

                    <div className="individual-application-card__main">
                      <span className="individual-application-card__id">
                        {application.id}
                      </span>

                      <h3>
                        {getApplicationText(application, "title")}
                      </h3>

                      <p>
                        {getApplicationText(
                          application,
                          "organisation"
                        )}
                      </p>

                      <div className="individual-application-card__meta">
                        <span>
                          {getApplicationText(application, "category")}
                        </span>
                        <span>
                          {isChinese ? "提交日期：" : "Submitted: "}
                          {application.date}
                        </span>
                      </div>
                    </div>

                    <div className="individual-application-card__side">
                      <span
                        className={`individual-application-status status-${application.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {getStatusText(application.status, isChinese)}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="individual-applications-empty">
                  {selectedFilter === "Declined" ? (
                    <XCircle size={28} aria-hidden="true" />
                  ) : (
                    <FileText size={28} aria-hidden="true" />
                  )}

                  <h3>
                    {isChinese
                      ? "没有找到申请"
                      : "No applications found"}
                  </h3>

                  <p>
                    {isChinese
                      ? "请尝试其他搜索词或筛选条件。"
                      : "Try a different search term or status filter."}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSelectedFilter("all");
                    }}
                  >
                    {isChinese ? "清除筛选" : "Clear Filters"}
                  </button>
                </div>
              )}
            </div>

            <p className="individual-applications-notice">
              {isChinese
                ? "原型演示：此页面中的申请记录为示例数据，尚未连接后端。"
                : "Prototype demo: These are sample application records. This page is not connected to a backend yet."}
            </p>

            <button
              type="button"
              className="individual-applications-browse"
              onClick={() => navigate("/opportunities", {
                state: { fromIndividualDashboard: true },
              })}
            >
              {isChinese ? "浏览商业机会" : "Browse Opportunities"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}