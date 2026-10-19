import { useMemo, useState } from "react";
import {
  Archive,
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Edit3,
  Eye,
  FileText,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { opportunities as demoOpportunities } from "../data/demoData";

import PageContainer from "../components/PageContainer";

import "./AdminOpportunities.css";

const STORAGE_KEY = "chinaHubAdminOpportunities";

const TYPE_OPTIONS = [
  "Partnership",
  "Investment",
  "Supplier",
  "Joint Venture",
];

const STATUS_OPTIONS = ["active", "draft", "closed"];

const EMPTY_FORM = {
  type: "Partnership",
  title: "",
  titleZh: "",
  description: "",
  descriptionZh: "",
  organisation: "",
  organisationZh: "",
  location: "",
  locationZh: "",
  category: "",
  budget: "",
  budgetZh: "",
  deadline: "",
  eligibility: "",
  eligibilityZh: "",
  expressionsOfInterest: 0,
  status: "draft",
};

function isChineseLanguage(language) {
  return String(language || "")
    .toLowerCase()
    .startsWith("zh");
}

function createOpportunityId() {
  return `o${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

function normalizeOpportunity(item) {
  return {
    id: item.id || createOpportunityId(),
    type: item.type || "Partnership",

    title: item.title || "",
    titleZh: item.titleZh || "",

    description: item.description || "",
    descriptionZh: item.descriptionZh || "",

    organisation: item.organisation || "",
    organisationZh: item.organisationZh || "",

    location: item.location || "",
    locationZh: item.locationZh || "",

    category: item.category || "",

    budget: item.budget || "",
    budgetZh: item.budgetZh || "",

    deadline: item.deadline || "",

    eligibility: item.eligibility || "",
    eligibilityZh: item.eligibilityZh || "",

    expressionsOfInterest: Number(item.expressionsOfInterest || 0),

    status: item.status || "active",

    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

function loadOpportunities() {
  if (typeof window === "undefined") {
    return demoOpportunities.map(normalizeOpportunity);
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        return parsed.map(normalizeOpportunity);
      }
    }
  } catch {
    // Fall back to demo data.
  }

  return demoOpportunities.map(normalizeOpportunity);
}

function saveOpportunities(items) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch {
    // Prototype storage can fail silently.
  }
}

function formatDate(date) {
  if (!date) return "—";

  try {
    return new Intl.DateTimeFormat("en-ZA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function getStatusLabel(status, isChinese) {
  const labels = {
    active: isChinese ? "活跃" : "Active",
    draft: isChinese ? "草稿" : "Draft",
    closed: isChinese ? "已关闭" : "Closed",
  };

  return labels[status] || status;
}

function getTypeLabel(type, isChinese) {
  const labels = {
    Partnership: isChinese ? "合作伙伴关系" : "Partnership",
    Investment: isChinese ? "投资" : "Investment",
    Supplier: isChinese ? "供应商" : "Supplier",
    "Joint Venture": isChinese ? "合资企业" : "Joint Venture",
  };

  return labels[type] || type;
}

export default function AdminOpportunities() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isChinese = isChineseLanguage(language);

  const [items, setItems] = useState(loadOpportunities);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalMode, setModalMode] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.title,
          item.titleZh,
          item.description,
          item.descriptionZh,
          item.organisation,
          item.organisationZh,
          item.location,
          item.locationZh,
          item.category,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          );

      const matchesType =
        typeFilter === "all" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, searchTerm, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((item) => item.status === "active").length,
      draft: items.filter((item) => item.status === "draft").length,
      closed: items.filter((item) => item.status === "closed").length,
      expressions: items.reduce(
        (total, item) =>
          total + Number(item.expressionsOfInterest || 0),
        0
      ),
    };
  }, [items]);

  function updateItems(nextItems) {
    setItems(nextItems);
    saveOpportunities(nextItems);
  }

  function openCreate() {
    setSelectedOpportunity(null);
    setForm(EMPTY_FORM);
    setModalMode("create");
  }

  function openEdit(item) {
    setSelectedOpportunity(item);
    setForm({
      type: item.type || "Partnership",
      title: item.title || "",
      titleZh: item.titleZh || "",
      description: item.description || "",
      descriptionZh: item.descriptionZh || "",
      organisation: item.organisation || "",
      organisationZh: item.organisationZh || "",
      location: item.location || "",
      locationZh: item.locationZh || "",
      category: item.category || "",
      budget: item.budget || "",
      budgetZh: item.budgetZh || "",
      deadline: item.deadline || "",
      eligibility: item.eligibility || "",
      eligibilityZh: item.eligibilityZh || "",
      expressionsOfInterest: Number(
        item.expressionsOfInterest || 0
      ),
      status: item.status || "draft",
    });

    setModalMode("edit");
  }

  function openView(item) {
    setSelectedOpportunity(item);
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setSelectedOpportunity(null);
    setForm(EMPTY_FORM);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      window.alert(
        isChinese
          ? "请输入商业机会标题。"
          : "Please enter an opportunity title."
      );
      return;
    }

    if (!form.description.trim()) {
      window.alert(
        isChinese
          ? "请输入商业机会描述。"
          : "Please enter an opportunity description."
      );
      return;
    }

    const now = new Date().toISOString();

    if (modalMode === "create") {
      const newOpportunity = normalizeOpportunity({
        ...form,
        id: createOpportunityId(),
        expressionsOfInterest: Number(
          form.expressionsOfInterest || 0
        ),
        createdAt: now,
        updatedAt: now,
      });

      updateItems([newOpportunity, ...items]);
      closeModal();
      return;
    }

    if (modalMode === "edit" && selectedOpportunity) {
      const updated = items.map((item) => {
        if (item.id !== selectedOpportunity.id) {
          return item;
        }

        return normalizeOpportunity({
          ...item,
          ...form,
          expressionsOfInterest: Number(
            form.expressionsOfInterest || 0
          ),
          updatedAt: now,
        });
      });

      updateItems(updated);
      closeModal();
    }
  }

  function archiveOpportunity(item) {
    const nextStatus =
      item.status === "closed" ? "active" : "closed";

    const updated = items.map((current) =>
      current.id === item.id
        ? {
            ...current,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          }
        : current
    );

    updateItems(updated);
  }

  function deleteOpportunity() {
    if (!deleteTarget) return;

    const updated = items.filter(
      (item) => item.id !== deleteTarget.id
    );

    updateItems(updated);
    setDeleteTarget(null);
  }

  function resetDemoData() {
    const confirmed = window.confirm(
      isChinese
        ? "这将删除当前管理页面中的修改，并恢复12个演示商业机会。继续吗？"
        : "This will remove your current Admin changes and restore the original 12 demo opportunities. Continue?"
    );

    if (!confirmed) return;

    const restored = demoOpportunities.map(normalizeOpportunity);

    updateItems(restored);
  }

  return (
    <PageContainer>
      <div className="admin-opportunities">
        <div className="admin-opportunities__topbar">
          <button
            type="button"
            className="admin-opportunities__back"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft size={17} />

            <span>
              {isChinese ? "返回管理后台" : "Back to Admin"}
            </span>
          </button>

          <button
            type="button"
            className="admin-opportunities__create"
            onClick={openCreate}
          >
            <Plus size={18} />

            <span>
              {isChinese
                ? "创建商业机会"
                : "Create Opportunity"}
            </span>
          </button>
        </div>

        <section className="admin-opportunities__heading">
          <div>
            <div className="admin-opportunities__eyebrow">
              <BriefcaseBusiness size={16} />

              <span>
                {isChinese
                  ? "商业机会管理"
                  : "Opportunity Management"}
              </span>
            </div>

            <h1>
              {isChinese
                ? "商业机会管理"
                : "Opportunities Management"}
            </h1>

            <p>
              {isChinese
                ? "创建、审核、编辑和管理平台上的商业机会。"
                : "Create, review, edit and manage business opportunities across the platform."}
            </p>
          </div>
        </section>

        <section className="admin-opportunities__stats">
          <StatCard
            icon={BriefcaseBusiness}
            label={isChinese ? "全部机会" : "Total Opportunities"}
            value={stats.total}
          />

          <StatCard
            icon={CheckCircle2}
            label={isChinese ? "活跃" : "Active"}
            value={stats.active}
          />

          <StatCard
            icon={FileText}
            label={isChinese ? "草稿" : "Draft"}
            value={stats.draft}
          />

          <StatCard
            icon={Archive}
            label={isChinese ? "已关闭" : "Closed"}
            value={stats.closed}
          />

          <StatCard
            icon={Users}
            label={
              isChinese
                ? "意向表达"
                : "Expressions of Interest"
            }
            value={stats.expressions}
          />
        </section>

        <section className="admin-opportunities__toolbar">
          <div className="admin-opportunities__search">
            <Search size={18} />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder={
                isChinese
                  ? "搜索商业机会..."
                  : "Search opportunities..."
              }
            />
          </div>

          <div className="admin-opportunities__filters">
            <div className="admin-opportunities__select">
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
              >
                <option value="all">
                  {isChinese ? "所有类型" : "All Types"}
                </option>

                {TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {getTypeLabel(type, isChinese)}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>

            <div className="admin-opportunities__select">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="all">
                  {isChinese ? "所有状态" : "All Statuses"}
                </option>

                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status, isChinese)}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />
            </div>
          </div>
        </section>

        <section className="admin-opportunities__content">
          <div className="admin-opportunities__content-header">
            <div>
              <h2>
                {isChinese
                  ? "商业机会列表"
                  : "Opportunity Listings"}
              </h2>

              <span>
                {isChinese
                  ? `${filteredItems.length} 个机会`
                  : `${filteredItems.length} opportunities`}
              </span>
            </div>

            <button
              type="button"
              className="admin-opportunities__reset"
              onClick={resetDemoData}
            >
              {isChinese
                ? "恢复演示数据"
                : "Restore Demo Data"}
            </button>
          </div>

          {filteredItems.length === 0 ? (
            <div className="admin-opportunities__empty">
              <BriefcaseBusiness size={42} />

              <h3>
                {isChinese
                  ? "没有找到商业机会"
                  : "No opportunities found"}
              </h3>

              <p>
                {isChinese
                  ? "尝试调整搜索或筛选条件。"
                  : "Try changing your search or filter settings."}
              </p>

              <button
                type="button"
                onClick={openCreate}
              >
                <Plus size={17} />

                {isChinese
                  ? "创建第一个机会"
                  : "Create First Opportunity"}
              </button>
            </div>
          ) : (
            <div className="admin-opportunities__table-wrap">
              <table className="admin-opportunities__table">
                <thead>
                  <tr>
                    <th>
                      {isChinese ? "机会" : "Opportunity"}
                    </th>

                    <th>
                      {isChinese ? "类型" : "Type"}
                    </th>

                    <th>
                      {isChinese ? "组织" : "Organisation"}
                    </th>

                    <th>
                      {isChinese ? "地点" : "Location"}
                    </th>

                    <th>
                      {isChinese ? "截止日期" : "Deadline"}
                    </th>

                    <th>
                      {isChinese ? "状态" : "Status"}
                    </th>

                    <th>
                      {isChinese ? "操作" : "Actions"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="opportunity-table-title">
                          <strong>
                            {isChinese
                              ? item.titleZh || item.title
                              : item.title}
                          </strong>

                          <span>
                            {item.category || "—"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="opportunity-type">
                          {getTypeLabel(
                            item.type,
                            isChinese
                          )}
                        </span>
                      </td>

                      <td>
                        {isChinese
                          ? item.organisationZh ||
                            item.organisation ||
                            "—"
                          : item.organisation || "—"}
                      </td>

                      <td>
                        <div className="opportunity-location">
                          <MapPin size={14} />

                          <span>
                            {isChinese
                              ? item.locationZh ||
                                item.location ||
                                "—"
                              : item.location || "—"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="opportunity-date">
                          <CalendarDays size={14} />

                          <span>
                            {formatDate(item.deadline)}
                          </span>
                        </div>
                      </td>

                      <td>
                        <StatusBadge
                          status={item.status}
                          isChinese={isChinese}
                        />
                      </td>

                      <td>
                        <div className="opportunity-actions">
                          <button
                            type="button"
                            title={
                              isChinese ? "查看" : "View"
                            }
                            onClick={() =>
                              openView(item)
                            }
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            title={
                              isChinese ? "编辑" : "Edit"
                            }
                            onClick={() =>
                              openEdit(item)
                            }
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            title={
                              item.status === "closed"
                                ? isChinese
                                  ? "重新激活"
                                  : "Reactivate"
                                : isChinese
                                ? "关闭"
                                : "Archive"
                            }
                            onClick={() =>
                              archiveOpportunity(item)
                            }
                          >
                            <Archive size={16} />
                          </button>

                          <button
                            type="button"
                            className="danger"
                            title={
                              isChinese ? "删除" : "Delete"
                            }
                            onClick={() =>
                              setDeleteTarget(item)
                            }
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {(modalMode === "create" ||
        modalMode === "edit") && (
        <OpportunityFormModal
          mode={modalMode}
          form={form}
          isChinese={isChinese}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {modalMode === "view" && selectedOpportunity && (
        <OpportunityViewModal
          opportunity={selectedOpportunity}
          isChinese={isChinese}
          onClose={closeModal}
          onEdit={() => openEdit(selectedOpportunity)}
        />
      )}

      {deleteTarget && (
        <div className="admin-opportunities__modal-overlay">
          <div className="admin-opportunities__confirm">
            <button
              type="button"
              className="admin-opportunities__modal-close"
              onClick={() => setDeleteTarget(null)}
            >
              <X size={19} />
            </button>

            <div className="confirm-icon">
              <Trash2 size={23} />
            </div>

            <h2>
              {isChinese
                ? "删除商业机会？"
                : "Delete opportunity?"}
            </h2>

            <p>
              {isChinese
                ? "此操作无法撤销。该商业机会将从管理列表中永久删除。"
                : "This action cannot be undone. The opportunity will be permanently removed from the management list."}
            </p>

            <strong>
              {isChinese
                ? deleteTarget.titleZh ||
                  deleteTarget.title
                : deleteTarget.title}
            </strong>

            <div className="confirm-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setDeleteTarget(null)}
              >
                {isChinese ? "取消" : "Cancel"}
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={deleteOpportunity}
              >
                <Trash2 size={16} />

                {isChinese ? "永久删除" : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="admin-opportunities__stat">
      <div className="admin-opportunities__stat-icon">
        <Icon size={20} />
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function StatusBadge({ status, isChinese }) {
  return (
    <span
      className={`opportunity-status opportunity-status--${status}`}
    >
      <span className="opportunity-status__dot" />

      {getStatusLabel(status, isChinese)}
    </span>
  );
}

function OpportunityFormModal({
  mode,
  form,
  isChinese,
  onChange,
  onSubmit,
  onClose,
}) {
  const isEditing = mode === "edit";

  return (
    <div className="admin-opportunities__modal-overlay">
      <div className="admin-opportunities__modal admin-opportunities__modal--large">
        <div className="admin-opportunities__modal-header">
          <div>
            <span>
              {isEditing
                ? isChinese
                  ? "编辑商业机会"
                  : "Edit Opportunity"
                : isChinese
                ? "创建商业机会"
                : "Create Opportunity"}
            </span>

            <h2>
              {isEditing
                ? isChinese
                  ? "更新商业机会"
                  : "Update Opportunity"
                : isChinese
                ? "发布新的商业机会"
                : "Create a New Opportunity"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="admin-opportunities__form"
          onSubmit={onSubmit}
        >
          <div className="form-section">
            <div className="form-section__heading">
              <h3>
                {isChinese
                  ? "基本信息"
                  : "Basic Information"}
              </h3>

              <p>
                {isChinese
                  ? "填写商业机会的主要信息。"
                  : "Provide the main information about this opportunity."}
              </p>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={isChinese ? "机会类型" : "Opportunity Type"}
                required
              >
                <select
                  name="type"
                  value={form.type}
                  onChange={onChange}
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {getTypeLabel(type, isChinese)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label={isChinese ? "状态" : "Status"}
                required
              >
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status, isChinese)}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "机会标题（英文）"
                    : "Opportunity Title (English)"
                }
                required
              >
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="e.g. Distribution partner sought"
                  required
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "机会标题（中文）"
                    : "Opportunity Title (Chinese)"
                }
              >
                <input
                  name="titleZh"
                  value={form.titleZh}
                  onChange={onChange}
                  placeholder="例如：寻找经销合作伙伴"
                />
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "描述（英文）"
                    : "Description (English)"
                }
                required
              >
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={5}
                  placeholder="Describe the opportunity..."
                  required
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "描述（中文）"
                    : "Description (Chinese)"
                }
              >
                <textarea
                  name="descriptionZh"
                  value={form.descriptionZh}
                  onChange={onChange}
                  rows={5}
                  placeholder="描述商业机会..."
                />
              </FormField>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section__heading">
              <h3>
                {isChinese
                  ? "组织与地点"
                  : "Organisation & Location"}
              </h3>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "组织名称（英文）"
                    : "Organisation (English)"
                }
              >
                <input
                  name="organisation"
                  value={form.organisation}
                  onChange={onChange}
                  placeholder="Organisation name"
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "组织名称（中文）"
                    : "Organisation (Chinese)"
                }
              >
                <input
                  name="organisationZh"
                  value={form.organisationZh}
                  onChange={onChange}
                  placeholder="组织名称"
                />
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "地点（英文）"
                    : "Location (English)"
                }
              >
                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  placeholder="e.g. Johannesburg, Gauteng"
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "地点（中文）"
                    : "Location (Chinese)"
                }
              >
                <input
                  name="locationZh"
                  value={form.locationZh}
                  onChange={onChange}
                  placeholder="例如：约翰内斯堡，豪登省"
                />
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={isChinese ? "类别" : "Category"}
              >
                <input
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  placeholder="e.g. Renewable Energy"
                />
              </FormField>

              <FormField
                label={isChinese ? "截止日期" : "Deadline"}
              >
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={onChange}
                />
              </FormField>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section__heading">
              <h3>
                {isChinese
                  ? "投资与资格"
                  : "Investment & Eligibility"}
              </h3>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "预算 / 投资（英文）"
                    : "Budget / Investment (English)"
                }
              >
                <input
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                  placeholder="e.g. R2,000,000"
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "预算 / 投资（中文）"
                    : "Budget / Investment (Chinese)"
                }
              >
                <input
                  name="budgetZh"
                  value={form.budgetZh}
                  onChange={onChange}
                  placeholder="例如：200万兰特"
                />
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "资格要求（英文）"
                    : "Eligibility (English)"
                }
              >
                <textarea
                  name="eligibility"
                  value={form.eligibility}
                  onChange={onChange}
                  rows={4}
                  placeholder="Who is eligible to apply?"
                />
              </FormField>

              <FormField
                label={
                  isChinese
                    ? "资格要求（中文）"
                    : "Eligibility (Chinese)"
                }
              >
                <textarea
                  name="eligibilityZh"
                  value={form.eligibilityZh}
                  onChange={onChange}
                  rows={4}
                  placeholder="谁可以申请？"
                />
              </FormField>
            </div>

            <div className="form-grid form-grid--2">
              <FormField
                label={
                  isChinese
                    ? "意向表达数量"
                    : "Expressions of Interest"
                }
              >
                <input
                  type="number"
                  min="0"
                  name="expressionsOfInterest"
                  value={form.expressionsOfInterest}
                  onChange={onChange}
                />
              </FormField>
            </div>
          </div>

          <div className="admin-opportunities__form-actions">
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              {isChinese ? "取消" : "Cancel"}
            </button>

            <button
              type="submit"
              className="primary"
            >
              <CheckCircle2 size={17} />

              {isEditing
                ? isChinese
                  ? "保存更改"
                  : "Save Changes"
                : isChinese
                ? "创建机会"
                : "Create Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <label className="admin-opportunities__field">
      <span>
        {label}

        {required && (
          <em>*</em>
        )}
      </span>

      {children}
    </label>
  );
}

function OpportunityViewModal({
  opportunity,
  isChinese,
  onClose,
  onEdit,
}) {
  const title = isChinese
    ? opportunity.titleZh || opportunity.title
    : opportunity.title;

  const description = isChinese
    ? opportunity.descriptionZh ||
      opportunity.description
    : opportunity.description;

  const organisation = isChinese
    ? opportunity.organisationZh ||
      opportunity.organisation
    : opportunity.organisation;

  const location = isChinese
    ? opportunity.locationZh ||
      opportunity.location
    : opportunity.location;

  const budget = isChinese
    ? opportunity.budgetZh || opportunity.budget
    : opportunity.budget;

  const eligibility = isChinese
    ? opportunity.eligibilityZh ||
      opportunity.eligibility
    : opportunity.eligibility;

  return (
    <div className="admin-opportunities__modal-overlay">
      <div className="admin-opportunities__modal admin-opportunities__modal--view">
        <div className="admin-opportunities__modal-header">
          <div>
            <span>
              {isChinese
                ? "商业机会详情"
                : "Opportunity Details"}
            </span>

            <h2>{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="opportunity-detail">
          <div className="opportunity-detail__top">
            <StatusBadge
              status={opportunity.status}
              isChinese={isChinese}
            />

            <span className="opportunity-detail__type">
              {getTypeLabel(
                opportunity.type,
                isChinese
              )}
            </span>
          </div>

          <div className="opportunity-detail__description">
            <h3>
              {isChinese ? "机会描述" : "Description"}
            </h3>

            <p>{description || "—"}</p>
          </div>

          <div className="opportunity-detail__grid">
            <DetailItem
              icon={BriefcaseBusiness}
              label={
                isChinese
                  ? "组织"
                  : "Organisation"
              }
              value={organisation}
            />

            <DetailItem
              icon={MapPin}
              label={isChinese ? "地点" : "Location"}
              value={location}
            />

            <DetailItem
              icon={FileText}
              label={isChinese ? "类别" : "Category"}
              value={opportunity.category}
            />

            <DetailItem
              icon={CircleDollarSign}
              label={
                isChinese
                  ? "预算 / 投资"
                  : "Budget / Investment"
              }
              value={budget}
            />

            <DetailItem
              icon={CalendarDays}
              label={
                isChinese
                  ? "截止日期"
                  : "Deadline"
              }
              value={formatDate(opportunity.deadline)}
            />

            <DetailItem
              icon={Users}
              label={
                isChinese
                  ? "意向表达"
                  : "Expressions of Interest"
              }
              value={opportunity.expressionsOfInterest}
            />
          </div>

          <div className="opportunity-detail__description">
            <h3>
              {isChinese
                ? "资格要求"
                : "Eligibility"}
            </h3>

            <p>{eligibility || "—"}</p>
          </div>

          <div className="opportunity-detail__meta">
            <span>
              {isChinese ? "机会 ID" : "Opportunity ID"}:
              {" "}
              {opportunity.id}
            </span>

            <span>
              {isChinese
                ? "最后更新"
                : "Last Updated"}:
              {" "}
              {formatDate(opportunity.updatedAt)}
            </span>
          </div>
        </div>

        <div className="admin-opportunities__form-actions">
          <button
            type="button"
            className="secondary"
            onClick={onClose}
          >
            {isChinese ? "关闭" : "Close"}
          </button>

          <button
            type="button"
            className="primary"
            onClick={onEdit}
          >
            <Edit3 size={17} />

            {isChinese
              ? "编辑机会"
              : "Edit Opportunity"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="opportunity-detail__item">
      <div className="opportunity-detail__item-icon">
        <Icon size={17} />
      </div>

      <div>
        <span>{label}</span>

        <strong>{value || "—"}</strong>
      </div>
    </div>
  );
}