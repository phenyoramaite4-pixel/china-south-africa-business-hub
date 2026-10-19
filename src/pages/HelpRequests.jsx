import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  NotebookPen,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../components/PageContainer";
import { useLanguage } from "../context/LanguageContext";

const DEMO_REQUESTS = [
  {
    id: "HR-001",
    requester: "Shanghai Trade & Logistics",
    contact: "Li Wei",
    email: "liwei@example.com",
    phone: "+86 138 0000 0000",
    accountType: "Business",
    country: "China",
    location: "Shanghai, China",
    categoryEn: "Business Registration",
    categoryZh: "企业注册",
    subjectEn: "Need help registering a South African business",
    subjectZh: "需要帮助注册南非企业",
    messageEn:
      "We are planning to establish a business in South Africa and would like assistance understanding the registration process and requirements.",
    messageZh:
      "我们计划在南非成立一家企业，希望了解企业注册流程及相关要求。",
    budget: "R50,000 - R100,000",
    timelineEn: "Within 1–3 months",
    timelineZh: "1–3个月内",
    preferredLanguageEn: "English / Mandarin",
    preferredLanguageZh: "英语 / 普通话",
    status: "new",
    priority: "high",
    assignedTo: "Unassigned",
    date: "2026-10-04",
    lastUpdated: "2026-10-04",
    internalNotes:
      "Initial request received. Need to identify a suitable South African registration and compliance provider.",
    resolutionReason: "",
    resolutionNotes: "",
    matches: [
      {
        name: "South Africa Business Advisory",
        typeEn: "Business Registration Provider",
        typeZh: "企业注册服务商",
        score: 94,
      },
      {
        name: "Cross-Border Compliance Group",
        typeEn: "Compliance Consultant",
        typeZh: "合规顾问",
        score: 87,
      },
    ],
    history: [
      {
        date: "2026-10-04 09:15",
        actionEn: "Request submitted",
        actionZh: "提交请求",
      },
    ],
  },
  {
    id: "HR-002",
    requester: "Johannesburg Industrial Supplies",
    contact: "Thabo Mokoena",
    email: "thabo@example.com",
    phone: "+27 71 000 0000",
    accountType: "Business",
    country: "South Africa",
    location: "Johannesburg, South Africa",
    categoryEn: "Finding a Partner",
    categoryZh: "寻找合作伙伴",
    subjectEn: "Looking for a Chinese distribution partner",
    subjectZh: "寻找中国经销合作伙伴",
    messageEn:
      "Our company is looking for a Chinese partner who can assist with distribution and market access.",
    messageZh:
      "我们正在寻找一家中国合作伙伴，帮助我们进行产品分销和市场拓展。",
    budget: "R100,000 - R250,000",
    timelineEn: "Within 3–6 months",
    timelineZh: "3–6个月内",
    preferredLanguageEn: "English",
    preferredLanguageZh: "英语",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Admin Team",
    date: "2026-10-03",
    lastUpdated: "2026-10-04",
    internalNotes:
      "Potential Chinese distribution partners are being reviewed. Awaiting confirmation from two potential matches.",
    resolutionReason: "",
    resolutionNotes: "",
    matches: [
      {
        name: "Guangzhou Distribution Network",
        typeEn: "Distribution Partner",
        typeZh: "经销合作伙伴",
        score: 91,
      },
      {
        name: "Shenzhen Market Access Group",
        typeEn: "Market Access Partner",
        typeZh: "市场拓展合作伙伴",
        score: 85,
      },
    ],
    history: [
      {
        date: "2026-10-03 14:20",
        actionEn: "Request submitted",
        actionZh: "提交请求",
      },
      {
        date: "2026-10-03 16:10",
        actionEn: "Request assigned to Admin Team",
        actionZh: "请求已分配给管理团队",
      },
      {
        date: "2026-10-04 10:30",
        actionEn: "Partner matching started",
        actionZh: "开始合作伙伴匹配",
      },
    ],
  },
  {
    id: "HR-003",
    requester: "Cape Business Advisory",
    contact: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+27 82 000 0000",
    accountType: "Business",
    country: "South Africa",
    location: "Cape Town, South Africa",
    categoryEn: "Professional Services",
    categoryZh: "专业服务",
    subjectEn: "Need accounting and tax support",
    subjectZh: "需要会计和税务支持",
    messageEn:
      "We need assistance finding a reliable accounting and tax service provider familiar with international businesses.",
    messageZh:
      "我们需要寻找一家熟悉国际企业的可靠会计和税务服务机构。",
    budget: "R20,000 - R50,000",
    timelineEn: "Within 1 month",
    timelineZh: "1个月内",
    preferredLanguageEn: "English",
    preferredLanguageZh: "英语",
    status: "resolved",
    priority: "low",
    assignedTo: "Admin Team",
    date: "2026-10-01",
    lastUpdated: "2026-10-03",
    internalNotes:
      "Requester was successfully connected with a suitable accounting and tax provider.",
    resolutionReason: "Provider successfully matched",
    resolutionNotes:
      "Introduced the requester to a professional services provider specialising in international businesses.",
    matches: [
      {
        name: "International Tax & Advisory",
        typeEn: "Accounting & Tax Provider",
        typeZh: "会计和税务服务商",
        score: 96,
      },
    ],
    history: [
      {
        date: "2026-10-01 11:05",
        actionEn: "Request submitted",
        actionZh: "提交请求",
      },
      {
        date: "2026-10-02 09:40",
        actionEn: "Provider identified",
        actionZh: "已找到服务商",
      },
      {
        date: "2026-10-03 15:20",
        actionEn: "Requester connected with provider",
        actionZh: "请求人与服务商已建立联系",
      },
      {
        date: "2026-10-03 16:00",
        actionEn: "Request resolved",
        actionZh: "请求已解决",
      },
    ],
  },
];

const ADMIN_OPTIONS = [
  "Unassigned",
  "Admin Team",
  "Business Development",
  "Partnerships Team",
];

const RESOLUTION_REASONS = [
  {
    value: "Provider successfully matched",
    labelEn: "Provider successfully matched",
    labelZh: "已成功匹配服务商",
  },
  {
    value: "Partner introduction completed",
    labelEn: "Partner introduction completed",
    labelZh: "已完成合作伙伴介绍",
  },
  {
    value: "Information provided",
    labelEn: "Information provided",
    labelZh: "已提供相关信息",
  },
  {
    value: "Requester no longer requires assistance",
    labelEn: "Requester no longer requires assistance",
    labelZh: "请求人不再需要帮助",
  },
  {
    value: "Other",
    labelEn: "Other",
    labelZh: "其他",
  },
];

export default function HelpRequests() {
  // IMPORTANT:
  // LanguageContext provides "language", not "isChinese".
  // The rest of the application uses the language code from context.
  const { language } = useLanguage();

  const isChinese = language === "zh";

  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showResolution, setShowResolution] = useState(false);

  const t = {
    title: isChinese ? "帮助请求中心" : "Help Requests",
    subtitle: isChinese
      ? "管理来自平台用户的业务帮助请求。"
      : "Manage business help requests submitted by platform users.",
    back: isChinese ? "返回管理中心" : "Back to Admin",
    adminCentre: isChinese ? "管理中心" : "ADMIN CENTRE",

    total: isChinese ? "全部请求" : "Total Requests",
    new: isChinese ? "新请求" : "New",
    inProgress: isChinese ? "处理中" : "In Progress",
    resolved: isChinese ? "已解决" : "Resolved",

    requests: isChinese ? "帮助请求" : "Help Requests",
    request: isChinese ? "请求" : "request(s)",
    noRequests: isChinese
      ? "没有找到帮助请求。"
      : "No help requests found.",

    search: isChinese ? "搜索帮助请求..." : "Search help requests...",
    status: isChinese ? "状态" : "Status",
    priority: isChinese ? "优先级" : "Priority",
    all: isChinese ? "全部" : "All",

    high: isChinese ? "高" : "High",
    medium: isChinese ? "中" : "Medium",
    low: isChinese ? "低" : "Low",

    view: isChinese ? "查看" : "View",
    requestDetails: isChinese ? "请求详情" : "Request Details",
    close: isChinese ? "关闭" : "Close",

    requester: isChinese ? "提交人" : "Requester",
    contact: isChinese ? "联系人" : "Contact",
    email: isChinese ? "邮箱" : "Email",
    phone: isChinese ? "电话" : "Phone",
    accountType: isChinese ? "账户类型" : "Account Type",
    country: isChinese ? "国家" : "Country",
    location: isChinese ? "所在地" : "Location",
    category: isChinese ? "类别" : "Category",
    subject: isChinese ? "主题" : "Subject",
    message: isChinese ? "请求内容" : "Request",
    budget: isChinese ? "预算" : "Budget",
    timeline: isChinese ? "时间要求" : "Timeline",
    language: isChinese ? "语言" : "Preferred Language",
    submitted: isChinese ? "提交日期" : "Submitted",
    lastUpdated: isChinese ? "最后更新" : "Last Updated",

    management: isChinese ? "请求管理" : "Request Management",
    assignedTo: isChinese ? "负责人" : "Assigned To",
    updateAssignment: isChinese ? "更新负责人" : "Update Assignment",

    matches: isChinese ? "推荐匹配" : "Recommended Matches",
    matchScore: isChinese ? "匹配度" : "Match",
    viewProvider: isChinese ? "查看服务商" : "View Provider",

    notes: isChinese ? "内部备注" : "Internal Notes",
    saveNotes: isChinese ? "保存备注" : "Save Notes",
    notesSaved: isChinese ? "备注已保存" : "Notes saved",

    history: isChinese ? "请求记录" : "Request History",

    actions: isChinese ? "请求操作" : "Request Actions",
    startRequest: isChinese ? "开始处理" : "Start Request",
    resolveRequest: isChinese ? "解决请求" : "Resolve Request",
    reopenRequest: isChinese ? "重新打开" : "Reopen Request",

    resolution: isChinese ? "解决信息" : "Resolution",
    resolutionReason: isChinese ? "解决原因" : "Resolution Reason",
    resolutionNotes: isChinese ? "解决备注" : "Resolution Notes",
    selectReason: isChinese ? "选择解决原因" : "Select resolution reason",
    saveResolution: isChinese ? "保存并解决" : "Save & Resolve",

    prototype: isChinese ? "原型模式" : "Prototype Mode",
    prototypeText: isChinese
      ? "这些帮助请求目前使用演示数据。生产版本将连接后端数据库、消息和通知系统。"
      : "These help requests currently use prototype data. The production version will connect to the backend database, messaging and notification systems.",

    assigned: isChinese ? "已分配" : "Assigned",
    unassigned: isChinese ? "未分配" : "Unassigned",

    provider: isChinese ? "服务商" : "Provider",
    businessPartner: isChinese ? "商业伙伴" : "Business Partner",
  };

  const filteredRequests = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || request.priority === priorityFilter;

      const matchesSearch =
        !term ||
        request.id.toLowerCase().includes(term) ||
        request.requester.toLowerCase().includes(term) ||
        request.contact.toLowerCase().includes(term) ||
        request.email.toLowerCase().includes(term) ||
        request.categoryEn.toLowerCase().includes(term) ||
        request.categoryZh.toLowerCase().includes(term) ||
        request.subjectEn.toLowerCase().includes(term) ||
        request.subjectZh.toLowerCase().includes(term) ||
        request.location.toLowerCase().includes(term);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [requests, searchTerm, statusFilter, priorityFilter]);

  const counts = {
    all: requests.length,
    new: requests.filter((item) => item.status === "new").length,
    "in-progress": requests.filter(
      (item) => item.status === "in-progress"
    ).length,
    resolved: requests.filter((item) => item.status === "resolved").length,
  };

  const getStatusLabel = (status) => {
    if (status === "new") return t.new;
    if (status === "in-progress") return t.inProgress;
    return t.resolved;
  };

  const getPriorityLabel = (priority) => {
    if (priority === "high") return t.high;
    if (priority === "medium") return t.medium;
    return t.low;
  };

  const getStatusColors = (status) => {
    if (status === "new") {
      return {
        background: "#fff4e5",
        color: "#b76500",
      };
    }

    if (status === "in-progress") {
      return {
        background: "#eef6ff",
        color: "#2563a8",
      };
    }

    return {
      background: "#eaf8f3",
      color: "#16755b",
    };
  };

  const getPriorityColors = (priority) => {
    if (priority === "high") {
      return {
        background: "#fff0f0",
        color: "#b42318",
      };
    }

    if (priority === "medium") {
      return {
        background: "#fff8e8",
        color: "#946200",
      };
    }

    return {
      background: "#f2f4f7",
      color: "#667085",
    };
  };

  const updateRequest = (
    id,
    updates,
    historyActionEn,
    historyActionZh
  ) => {
    const historyEntry = historyActionEn
      ? {
          date: new Date().toLocaleString("en-ZA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          actionEn: historyActionEn,
          actionZh: historyActionZh || historyActionEn,
        }
      : null;

    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              ...updates,
              lastUpdated: "2026-10-05",
              history: historyEntry
                ? [...request.history, historyEntry]
                : request.history,
            }
          : request
      )
    );

    setSelectedRequest((current) =>
      current && current.id === id
        ? {
            ...current,
            ...updates,
            lastUpdated: "2026-10-05",
            history: historyEntry
              ? [...current.history, historyEntry]
              : current.history,
          }
        : current
    );
  };

  const changeStatus = (request, newStatus) => {
    if (newStatus === "resolved") {
      setShowResolution(true);
      return;
    }

    const action =
      newStatus === "in-progress"
        ? "Request moved to In Progress"
        : "Request reopened";

    const actionZh =
      newStatus === "in-progress"
        ? "请求已进入处理中"
        : "请求已重新打开";

    updateRequest(
      request.id,
      { status: newStatus },
      action,
      actionZh
    );
  };

  const saveNotes = () => {
    if (!selectedRequest) return;

    updateRequest(
      selectedRequest.id,
      {
        internalNotes: selectedRequest.internalNotes,
      },
      "Internal notes updated",
      "内部备注已更新"
    );

    window.setTimeout(() => {
      window.alert(t.notesSaved);
    }, 50);
  };

  const saveAssignment = (event) => {
    if (!selectedRequest) return;

    const value = event.target.value;

    updateRequest(
      selectedRequest.id,
      {
        assignedTo: value,
      },
      value === "Unassigned"
        ? "Request assignment removed"
        : `Request assigned to ${value}`,
      value === "Unassigned"
        ? "已取消请求负责人"
        : `请求已分配给${value}`
    );
  };

  const saveResolution = () => {
    if (!selectedRequest) return;

    if (!selectedRequest.resolutionReason) {
      window.alert(
        isChinese
          ? "请选择解决原因。"
          : "Please select a resolution reason."
      );
      return;
    }

    updateRequest(
      selectedRequest.id,
      {
        status: "resolved",
        resolutionReason: selectedRequest.resolutionReason,
        resolutionNotes: selectedRequest.resolutionNotes,
      },
      "Request resolved",
      "请求已解决"
    );

    setShowResolution(false);
  };

  const renderStatCard = (
    value,
    label,
    icon,
    iconBackground,
    iconColor,
    filterValue
  ) => (
    <button
      type="button"
      onClick={() => setStatusFilter(filterValue)}
      style={{
        border:
          statusFilter === filterValue
            ? "1px solid #0B2545"
            : "1px solid #e5e9ef",
        background: "#fff",
        borderRadius: "14px",
        padding: "18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        textAlign: "left",
        cursor: "pointer",
        boxShadow:
          statusFilter === filterValue
            ? "0 5px 16px rgba(11,37,69,0.07)"
            : "none",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "11px",
          background: iconBackground,
          color: iconColor,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <strong
          style={{
            display: "block",
            fontSize: "22px",
            color: "#0B2545",
          }}
        >
          {value}
        </strong>

        <span
          style={{
            color: "#667085",
            fontSize: "13px",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );

  return (
    <PageContainer>
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "25px" }}>
          <Link
            to="/admin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              textDecoration: "none",
              color: "#0B2545",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <ArrowLeft size={17} />
            {t.back}
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#16A085",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            <HelpCircle size={16} />
            {t.adminCentre}
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              color: "#0B2545",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#667085",
              fontSize: "15px",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Prototype notice */}
        <div
          style={{
            marginBottom: "22px",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #dfe9e6",
            background: "#f4fbf8",
            display: "flex",
            alignItems: "flex-start",
            gap: "11px",
          }}
        >
          <HelpCircle
            size={18}
            color="#16A085"
            style={{ marginTop: "1px", flexShrink: 0 }}
          />

          <div>
            <strong
              style={{
                display: "block",
                color: "#0B2545",
                fontSize: "13px",
                marginBottom: "3px",
              }}
            >
              {t.prototype}
            </strong>

            <span
              style={{
                color: "#667085",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {t.prototypeText}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "15px",
            marginBottom: "28px",
          }}
        >
          {renderStatCard(
            counts.all,
            t.total,
            <HelpCircle size={21} />,
            "#eef4fa",
            "#0B2545",
            "all"
          )}

          {renderStatCard(
            counts.new,
            t.new,
            <MessageCircle size={21} />,
            "#fff4e5",
            "#b76500",
            "new"
          )}

          {renderStatCard(
            counts["in-progress"],
            t.inProgress,
            <Clock3 size={21} />,
            "#eef6ff",
            "#2563a8",
            "in-progress"
          )}

          {renderStatCard(
            counts.resolved,
            t.resolved,
            <CheckCircle2 size={21} />,
            "#eaf8f3",
            "#16755b",
            "resolved"
          )}
        </div>

        {/* Main Requests */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #e5e9ef",
            borderRadius: "16px",
            padding: "22px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  color: "#0B2545",
                  fontSize: "21px",
                }}
              >
                {t.requests}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#667085",
                  fontSize: "13px",
                }}
              >
                {filteredRequests.length} {t.request}
              </p>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#667085",
                padding: "7px 10px",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              {t.assigned}:{" "}
              {
                requests.filter(
                  (item) => item.assignedTo !== "Unassigned"
                ).length
              }
            </div>
          </div>

          {/* Search + Filters */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: "1 1 320px",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#667085",
                }}
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder={t.search}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  border: "1px solid #dfe5ec",
                  borderRadius: "10px",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Filter size={17} color="#667085" />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                style={{
                  padding: "12px 14px",
                  border: "1px solid #dfe5ec",
                  borderRadius: "10px",
                  background: "#fff",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <option value="all">{t.all}</option>
                <option value="new">{t.new}</option>
                <option value="in-progress">
                  {t.inProgress}
                </option>
                <option value="resolved">{t.resolved}</option>
              </select>
            </div>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              style={{
                padding: "12px 14px",
                border: "1px solid #dfe5ec",
                borderRadius: "10px",
                background: "#fff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              <option value="all">
                {t.priority}: {t.all}
              </option>
              <option value="high">
                {t.priority}: {t.high}
              </option>
              <option value="medium">
                {t.priority}: {t.medium}
              </option>
              <option value="low">
                {t.priority}: {t.low}
              </option>
            </select>
          </div>

          {/* Request List */}
          {filteredRequests.length === 0 ? (
            <div
              style={{
                padding: "50px 20px",
                textAlign: "center",
                border: "1px dashed #dfe5ec",
                borderRadius: "14px",
              }}
            >
              <HelpCircle
                size={36}
                color="#98A2B3"
                style={{
                  marginBottom: "12px",
                }}
              />

              <h3
                style={{
                  margin: 0,
                  color: "#344054",
                }}
              >
                {t.noRequests}
              </h3>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "14px",
              }}
            >
              {filteredRequests.map((request) => {
                const statusColors = getStatusColors(
                  request.status
                );
                const priorityColors = getPriorityColors(
                  request.priority
                );

                return (
                  <div
                    key={request.id}
                    style={{
                      border: "1px solid #e7ebf0",
                      borderRadius: "14px",
                      padding: "18px",
                      background: "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginBottom: "8px",
                          }}
                        >
                          <strong
                            style={{
                              color: "#0B2545",
                            }}
                          >
                            {request.id}
                          </strong>

                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              padding: "5px 9px",
                              borderRadius: "999px",
                              background:
                                statusColors.background,
                              color: statusColors.color,
                            }}
                          >
                            {getStatusLabel(request.status)}
                          </span>

                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              padding: "5px 9px",
                              borderRadius: "999px",
                              background:
                                priorityColors.background,
                              color: priorityColors.color,
                            }}
                          >
                            {getPriorityLabel(request.priority)}
                          </span>
                        </div>

                        <h3
                          style={{
                            margin: "0 0 7px",
                            fontSize: "17px",
                            color: "#0B2545",
                          }}
                        >
                          {isChinese
                            ? request.subjectZh
                            : request.subjectEn}
                        </h3>

                        <p
                          style={{
                            margin: "0 0 11px",
                            color: "#667085",
                            fontSize: "14px",
                          }}
                        >
                          {request.requester} · {request.contact}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            gap: "18px",
                            flexWrap: "wrap",
                            color: "#7a8492",
                            fontSize: "13px",
                          }}
                        >
                          <span>
                            {isChinese
                              ? request.categoryZh
                              : request.categoryEn}
                          </span>

                          <span>{request.location}</span>

                          <span>{request.date}</span>

                          <span>
                            {request.assignedTo ===
                            "Unassigned"
                              ? t.unassigned
                              : request.assignedTo}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRequest({
                            ...request,
                          })
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          border: "1px solid #dfe5ec",
                          background: "#fff",
                          borderRadius: "9px",
                          padding: "10px 14px",
                          cursor: "pointer",
                          fontWeight: 600,
                          color: "#0B2545",
                        }}
                      >
                        <Eye size={17} />
                        {t.view}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Details Modal */}
        {selectedRequest && (
          <div
            role="presentation"
            onClick={() => setSelectedRequest(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(11, 37, 69, 0.48)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="help-request-title"
              onClick={(event) =>
                event.stopPropagation()
              }
              style={{
                width: "min(900px, 100%)",
                maxHeight: "92vh",
                overflowY: "auto",
                background: "#fff",
                borderRadius: "18px",
                boxShadow:
                  "0 24px 70px rgba(0,0,0,0.22)",
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: "20px 22px",
                  borderBottom:
                    "1px solid #edf0f3",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  alignItems: "flex-start",
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 3,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      flexWrap: "wrap",
                      marginBottom: "7px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#16A085",
                      }}
                    >
                      {selectedRequest.id}
                    </span>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: "999px",
                        ...getStatusColors(
                          selectedRequest.status
                        ),
                      }}
                    >
                      {getStatusLabel(
                        selectedRequest.status
                      )}
                    </span>
                  </div>

                  <h2
                    id="help-request-title"
                    style={{
                      margin: 0,
                      fontSize: "21px",
                      color: "#0B2545",
                    }}
                  >
                    {isChinese
                      ? selectedRequest.subjectZh
                      : selectedRequest.subjectEn}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(null)
                  }
                  aria-label={t.close}
                  style={{
                    border: 0,
                    background: "#f4f6f8",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <X size={19} />
                </button>
              </div>

              <div
                style={{
                  padding: "22px",
                  display: "grid",
                  gap: "20px",
                }}
              >
                {/* Requester information */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "13px",
                    }}
                  >
                    <UserRound
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.requester}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(190px, 1fr))",
                      gap: "16px",
                      padding: "16px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                    }}
                  >
                    <InfoItem
                      label={t.requester}
                      value={selectedRequest.requester}
                    />

                    <InfoItem
                      label={t.contact}
                      value={selectedRequest.contact}
                    />

                    <InfoItem
                      label={t.email}
                      value={selectedRequest.email}
                      icon={<Mail size={14} />}
                    />

                    <InfoItem
                      label={t.phone}
                      value={selectedRequest.phone}
                    />

                    <InfoItem
                      label={t.accountType}
                      value={
                        isChinese
                          ? "企业"
                          : selectedRequest.accountType
                      }
                    />

                    <InfoItem
                      label={t.country}
                      value={
                        isChinese
                          ? selectedRequest.country === "China"
                            ? "中国"
                            : "南非"
                          : selectedRequest.country
                      }
                    />

                    <InfoItem
                      label={t.location}
                      value={
                        isChinese
                          ? selectedRequest.location
                              .replace(
                                "Shanghai, China",
                                "上海，中国"
                              )
                              .replace(
                                "Johannesburg, South Africa",
                                "约翰内斯堡，南非"
                              )
                              .replace(
                                "Cape Town, South Africa",
                                "开普敦，南非"
                              )
                          : selectedRequest.location
                      }
                      icon={<MapPin size={14} />}
                    />
                  </div>
                </div>

                {/* Request information */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "13px",
                    }}
                  >
                    <BriefcaseBusiness
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.message}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(190px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <InfoItem
                      label={t.category}
                      value={
                        isChinese
                          ? selectedRequest.categoryZh
                          : selectedRequest.categoryEn
                      }
                    />

                    <InfoItem
                      label={t.budget}
                      value={selectedRequest.budget}
                    />

                    <InfoItem
                      label={t.timeline}
                      value={
                        isChinese
                          ? selectedRequest.timelineZh
                          : selectedRequest.timelineEn
                      }
                    />

                    <InfoItem
                      label={t.language}
                      value={
                        isChinese
                          ? selectedRequest.preferredLanguageZh
                          : selectedRequest.preferredLanguageEn
                      }
                    />
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "16px",
                      lineHeight: 1.7,
                      color: "#475467",
                      fontSize: "14px",
                    }}
                  >
                    {isChinese
                      ? selectedRequest.messageZh
                      : selectedRequest.messageEn}
                  </div>
                </div>

                {/* Assignment */}
                <div
                  style={{
                    border: "1px solid #e7ebf0",
                    borderRadius: "13px",
                    padding: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "10px",
                    }}
                  >
                    <Users
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.management}
                    </h3>
                  </div>

                  <label
                    style={{
                      display: "block",
                      color: "#667085",
                      fontSize: "12px",
                      marginBottom: "7px",
                    }}
                  >
                    {t.assignedTo}
                  </label>

                  <select
                    value={selectedRequest.assignedTo}
                    onChange={saveAssignment}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
                      padding: "11px 13px",
                      border: "1px solid #dfe5ec",
                      borderRadius: "9px",
                      background: "#fff",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {ADMIN_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option === "Unassigned"
                          ? t.unassigned
                          : isChinese
                          ? option === "Admin Team"
                            ? "管理团队"
                            : option === "Business Development"
                            ? "商务发展"
                            : option === "Partnerships Team"
                            ? "合作伙伴团队"
                            : option
                          : option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recommended matches */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "13px",
                    }}
                  >
                    <Users
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.matches}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    {selectedRequest.matches.map(
                      (match) => (
                        <div
                          key={match.name}
                          style={{
                            border:
                              "1px solid #e7ebf0",
                            borderRadius: "12px",
                            padding: "14px",
                            display: "flex",
                            justifyContent:
                              "space-between",
                            gap: "15px",
                            alignItems:
                              "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "12px",
                              minWidth: 0,
                            }}
                          >
                            <div
                              style={{
                                width: "38px",
                                height: "38px",
                                borderRadius:
                                  "10px",
                                background:
                                  "#eef6f4",
                                color:
                                  "#16A085",
                                display:
                                  "grid",
                                placeItems:
                                  "center",
                                flexShrink: 0,
                              }}
                            >
                              <BriefcaseBusiness
                                size={18}
                              />
                            </div>

                            <div>
                              <strong
                                style={{
                                  display:
                                    "block",
                                  color:
                                    "#0B2545",
                                  fontSize:
                                    "14px",
                                }}
                              >
                                {match.name}
                              </strong>

                              <span
                                style={{
                                  color:
                                    "#667085",
                                  fontSize:
                                    "12px",
                                }}
                              >
                                {isChinese
                                  ? match.typeZh
                                  : match.typeEn}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "12px",
                                fontWeight: 700,
                                color:
                                  "#16755b",
                                background:
                                  "#eaf8f3",
                                padding:
                                  "6px 9px",
                                borderRadius:
                                  "999px",
                              }}
                            >
                              {match.score}%{" "}
                              {t.matchScore}
                            </span>

                            <button
                              type="button"
                              style={{
                                border:
                                  "1px solid #dfe5ec",
                                background:
                                  "#fff",
                                borderRadius:
                                  "8px",
                                padding:
                                  "8px 10px",
                                color:
                                  "#0B2545",
                                fontSize:
                                  "12px",
                                fontWeight: 600,
                                cursor:
                                  "pointer",
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: "5px",
                              }}
                              onClick={() =>
                                window.alert(
                                  `${match.name}`
                                )
                              }
                            >
                              {t.viewProvider}
                              <ChevronRight
                                size={14}
                              />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Internal notes */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "10px",
                    }}
                  >
                    <NotebookPen
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.notes}
                    </h3>
                  </div>

                  <textarea
                    value={
                      selectedRequest.internalNotes
                    }
                    onChange={(event) =>
                      setSelectedRequest(
                        (current) => ({
                          ...current,
                          internalNotes:
                            event.target.value,
                        })
                      )
                    }
                    rows={4}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "vertical",
                      padding: "12px 13px",
                      border:
                        "1px solid #dfe5ec",
                      borderRadius: "10px",
                      outline: "none",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                  />

                  <button
                    type="button"
                    onClick={saveNotes}
                    style={{
                      marginTop: "9px",
                      padding: "9px 13px",
                      border: 0,
                      borderRadius: "8px",
                      background: "#0B2545",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  >
                    {t.saveNotes}
                  </button>
                </div>

                {/* Resolution information */}
                {selectedRequest.status === "resolved" &&
                  (selectedRequest.resolutionReason ||
                    selectedRequest.resolutionNotes) && (
                    <div
                      style={{
                        border:
                          "1px solid #cfe9df",
                        background: "#f4fbf8",
                        borderRadius: "13px",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: "9px",
                          marginBottom:
                            "12px",
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          color="#16755b"
                        />

                        <h3
                          style={{
                            margin: 0,
                            color: "#0B2545",
                            fontSize: "16px",
                          }}
                        >
                          {t.resolution}
                        </h3>
                      </div>

                      {selectedRequest.resolutionReason && (
                        <div
                          style={{
                            marginBottom: "10px",
                          }}
                        >
                          <small
                            style={{
                              color: "#667085",
                            }}
                          >
                            {t.resolutionReason}
                          </small>

                          <strong
                            style={{
                              display: "block",
                              marginTop: "4px",
                              color: "#0B2545",
                              fontSize: "14px",
                            }}
                          >
                            {RESOLUTION_REASONS.find(
                              (item) =>
                                item.value ===
                                selectedRequest.resolutionReason
                            )?.[
                              isChinese
                                ? "labelZh"
                                : "labelEn"
                            ] ||
                              selectedRequest.resolutionReason}
                          </strong>
                        </div>
                      )}

                      {selectedRequest.resolutionNotes && (
                        <div>
                          <small
                            style={{
                              color: "#667085",
                            }}
                          >
                            {t.resolutionNotes}
                          </small>

                          <p
                            style={{
                              margin: "4px 0 0",
                              color: "#475467",
                              fontSize: "14px",
                              lineHeight: 1.6,
                            }}
                          >
                            {
                              selectedRequest.resolutionNotes
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                {/* History */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "13px",
                    }}
                  >
                    <Clock3
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.history}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "9px",
                    }}
                  >
                    {[...selectedRequest.history]
                      .reverse()
                      .map((item, index) => (
                        <div
                          key={`${item.date}-${index}`}
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems:
                              "flex-start",
                            padding: "10px 0",
                            borderBottom:
                              index <
                              selectedRequest.history
                                .length -
                                1
                                ? "1px solid #edf0f3"
                                : "none",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background:
                                "#16A085",
                              marginTop: "6px",
                              flexShrink: 0,
                            }}
                          />

                          <div>
                            <strong
                              style={{
                                display:
                                  "block",
                                color:
                                  "#344054",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {isChinese
                                ? item.actionZh
                                : item.actionEn}
                            </strong>

                            <span
                              style={{
                                color:
                                  "#98A2B3",
                                fontSize:
                                  "12px",
                              }}
                            >
                              {item.date}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    borderTop:
                      "1px solid #edf0f3",
                    paddingTop: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "11px",
                    }}
                  >
                    <MessageCircle
                      size={18}
                      color="#16A085"
                    />

                    <h3
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "16px",
                      }}
                    >
                      {t.actions}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {selectedRequest.status ===
                      "new" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(
                            selectedRequest,
                            "in-progress"
                          )
                        }
                        style={primaryButtonStyle}
                      >
                        <Clock3 size={16} />
                        {t.startRequest}
                      </button>
                    )}

                    {selectedRequest.status ===
                      "in-progress" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(
                            selectedRequest,
                            "resolved"
                          )
                        }
                        style={successButtonStyle}
                      >
                        <CheckCircle2 size={16} />
                        {t.resolveRequest}
                      </button>
                    )}

                    {selectedRequest.status ===
                      "resolved" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(
                            selectedRequest,
                            "in-progress"
                          )
                        }
                        style={primaryButtonStyle}
                      >
                        <Clock3 size={16} />
                        {t.reopenRequest}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: "16px 22px",
                  borderTop:
                    "1px solid #edf0f3",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(null)
                  }
                  style={{
                    padding: "10px 16px",
                    border:
                      "1px solid #dfe5ec",
                    borderRadius: "9px",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resolution Modal */}
        {showResolution &&
          selectedRequest && (
            <div
              role="presentation"
              onClick={() =>
                setShowResolution(false)
              }
              style={{
                position: "fixed",
                inset: 0,
                background:
                  "rgba(11, 37, 69, 0.48)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                zIndex: 1100,
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                onClick={(event) =>
                  event.stopPropagation()
                }
                style={{
                  width: "min(520px, 100%)",
                  background: "#fff",
                  borderRadius: "16px",
                  boxShadow:
                    "0 24px 70px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    padding: "19px 20px",
                    borderBottom:
                      "1px solid #edf0f3",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        color: "#16A085",
                        fontSize: "11px",
                        fontWeight: 700,
                        marginBottom: "5px",
                      }}
                    >
                      {selectedRequest.id}
                    </span>

                    <h2
                      style={{
                        margin: 0,
                        color: "#0B2545",
                        fontSize: "19px",
                      }}
                    >
                      {t.resolution}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowResolution(false)
                    }
                    style={{
                      border: 0,
                      background: "#f4f6f8",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#667085",
                      marginBottom: "7px",
                    }}
                  >
                    {t.resolutionReason}
                  </label>

                  <select
                    value={
                      selectedRequest.resolutionReason
                    }
                    onChange={(event) =>
                      setSelectedRequest(
                        (current) => ({
                          ...current,
                          resolutionReason:
                            event.target.value,
                        })
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "11px 13px",
                      border:
                        "1px solid #dfe5ec",
                      borderRadius: "9px",
                      background: "#fff",
                      fontSize: "14px",
                      marginBottom: "16px",
                    }}
                  >
                    <option value="">
                      {t.selectReason}
                    </option>

                    {RESOLUTION_REASONS.map(
                      (reason) => (
                        <option
                          key={reason.value}
                          value={reason.value}
                        >
                          {isChinese
                            ? reason.labelZh
                            : reason.labelEn}
                        </option>
                      )
                    )}
                  </select>

                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#667085",
                      marginBottom: "7px",
                    }}
                  >
                    {t.resolutionNotes}
                  </label>

                  <textarea
                    value={
                      selectedRequest.resolutionNotes
                    }
                    onChange={(event) =>
                      setSelectedRequest(
                        (current) => ({
                          ...current,
                          resolutionNotes:
                            event.target.value,
                        })
                      )
                    }
                    rows={5}
                    placeholder={
                      isChinese
                        ? "说明请求是如何解决的..."
                        : "Explain how the request was resolved..."
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "vertical",
                      padding: "12px 13px",
                      border:
                        "1px solid #dfe5ec",
                      borderRadius: "10px",
                      outline: "none",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "15px 20px",
                    borderTop:
                      "1px solid #edf0f3",
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setShowResolution(false)
                    }
                    style={{
                      padding: "10px 15px",
                      border:
                        "1px solid #dfe5ec",
                      borderRadius: "9px",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "#344054",
                    }}
                  >
                    {t.close}
                  </button>

                  <button
                    type="button"
                    onClick={saveResolution}
                    style={successButtonStyle}
                  >
                    <CheckCircle2 size={16} />
                    {t.saveResolution}
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </PageContainer>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div>
      <small
        style={{
          color: "#98A2B3",
          fontSize: "11px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {icon}
        {label}
      </small>

      <strong
        style={{
          display: "block",
          marginTop: "5px",
          color: "#0B2545",
          fontSize: "13px",
          wordBreak: "break-word",
          lineHeight: 1.45,
        }}
      >
        {value || "—"}
      </strong>
    </div>
  );
}

const primaryButtonStyle = {
  padding: "10px 14px",
  border: 0,
  borderRadius: "9px",
  background: "#0B2545",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
};

const successButtonStyle = {
  padding: "10px 14px",
  border: 0,
  borderRadius: "9px",
  background: "#16A085",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
};