
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Download,
  File,
  FileText,
  FolderOpen,
  Image,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import IndividualNavigation from "../components/IndividualNavigation";
import { useLanguage } from "../context/LanguageContext";
import "./IndividualDocuments.css";

const STORAGE_KEY = "chinaHubIndividualDocuments";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".png",
  ".jpg",
  ".jpeg",
];

function readDocuments() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Could not load documents:", error);
  }

  return [];
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getFileIcon(name) {
  const extension = name.split(".").pop()?.toLowerCase();

  if (["png", "jpg", "jpeg"].includes(extension)) {
    return Image;
  }

  if (["doc", "docx", "txt"].includes(extension)) {
    return FileText;
  }

  return File;
}

export default function IndividualDocuments() {
  const { language } = useLanguage();
  const isChinese = String(language || "").toLowerCase().startsWith("zh");
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState(readDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const copy = isChinese
    ? {
        title: "我的文件",
        subtitle: "在一个地方管理您的专业文件和重要资料。",
        upload: "上传文件",
        total: "所有文件",
        pending: "待审核",
        approved: "已批准",
        search: "搜索文件名称或类型...",
        all: "全部文件",
        allStatus: "所有状态",
        emptyTitle: "暂无文件",
        emptyText: "上传您的第一个文件，让重要资料井然有序。",
        uploadFirst: "上传第一个文件",
        name: "文件名称",
        date: "上传日期",
        size: "文件大小",
        status: "状态",
        actions: "操作",
        demo: "演示状态",
        pendingStatus: "待审核",
        approvedStatus: "已批准",
        deleteConfirm: "确定要删除这个文件吗？",
        invalid: "此文件类型不受支持。",
        tooLarge: "文件超过 5 MB 的限制。",
        uploadError: "无法保存文件。浏览器存储空间可能不足。",
        uploaded: "文件上传成功。",
        deleted: "文件已删除。",
        uploading: "正在上传...",
        tip: "支持 PDF、Word、Excel、PowerPoint、TXT 和图片文件。每个文件最大 5 MB。",
      }
    : {
        title: "My Documents",
        subtitle:
          "Manage your professional documents and important files in one place.",
        upload: "Upload Documents",
        total: "Total Documents",
        pending: "Pending Review",
        approved: "Approved",
        search: "Search by document name or type...",
        all: "All Documents",
        allStatus: "All Statuses",
        emptyTitle: "No documents yet",
        emptyText:
          "Upload your first document to keep your important files organised.",
        uploadFirst: "Upload Your First Document",
        name: "Document Name",
        date: "Upload Date",
        size: "File Size",
        status: "Status",
        actions: "Actions",
        demo: "Demo status",
        pendingStatus: "Pending Review",
        approvedStatus: "Approved",
        deleteConfirm: "Are you sure you want to delete this document?",
        invalid: "This file type is not supported.",
        tooLarge: "The file exceeds the 5 MB limit.",
        uploadError:
          "The file could not be saved. Browser storage may be full.",
        uploaded: "Document uploaded successfully.",
        deleted: "Document deleted.",
        uploading: "Uploading...",
        tip:
          "Accepted formats: PDF, Word, Excel, PowerPoint, TXT and images. Maximum 5 MB per file.",
      };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error("Could not save documents:", error);
      setMessage(copy.uploadError);
    }
  }, [documents]);

  const visibleDocuments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesSearch =
        !query ||
        document.name.toLowerCase().includes(query) ||
        document.type.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" || document.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [documents, searchTerm, filter]);

  const pendingCount = documents.filter(
    (document) => document.status === "pending",
  ).length;

  const approvedCount = documents.filter(
    (document) => document.status === "approved",
  ).length;

  async function handleUpload(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    setMessage("");
    setIsUploading(true);

    const newDocuments = [];
    let lastError = "";

    for (const file of files) {
      const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;

      if (!ACCEPTED_TYPES.includes(extension)) {
        lastError = copy.invalid;
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        lastError = copy.tooLarge;
        continue;
      }

      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("File read failed"));
          reader.readAsDataURL(file);
        });

        newDocuments.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          name: file.name,
          type: extension.slice(1).toUpperCase(),
          size: file.size,
          uploadedAt: new Date().toISOString(),
          status: "pending",
          dataUrl,
        });
      } catch (error) {
        console.error("Could not read document:", error);
        lastError = copy.uploadError;
      }
    }

    if (newDocuments.length) {
      setDocuments((current) => [...newDocuments, ...current]);
      setMessage(
        lastError
          ? `${copy.uploaded} ${lastError}`
          : copy.uploaded,
      );
    } else if (lastError) {
      setMessage(lastError);
    }

    setIsUploading(false);
  }

  function downloadDocument(document) {
    if (!document.dataUrl) {
      setMessage(copy.uploadError);
      return;
    }

    const link = window.document.createElement("a");
    link.href = document.dataUrl;
    link.download = document.name;
    window.document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function deleteDocument(id) {
    if (!window.confirm(copy.deleteConfirm)) return;

    setDocuments((current) =>
      current.filter((document) => document.id !== id),
    );
    setMessage(copy.deleted);
  }

  return (
    <div className="individual-documents-page">
      <IndividualNavigation />

      <main className="individual-documents-main">
        <header className="individual-documents-header">
          <div>
            <span className="individual-documents-eyebrow">
              <FolderOpen size={16} />
              {isChinese ? "文件管理" : "DOCUMENT MANAGEMENT"}
            </span>

            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
          </div>

          <button
            className="individual-documents-upload-button"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload size={18} />
            {isUploading ? copy.uploading : copy.upload}
          </button>

          <input
            ref={fileInputRef}
            className="individual-documents-file-input"
            type="file"
            multiple
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleUpload}
          />
        </header>

        <section className="individual-documents-stats">
          <article className="individual-documents-stat">
            <span className="individual-documents-stat-icon">
              <FolderOpen size={21} />
            </span>
            <div>
              <strong>{documents.length}</strong>
              <span>{copy.total}</span>
            </div>
          </article>

          <article className="individual-documents-stat">
            <span className="individual-documents-stat-icon pending">
              <Clock3 size={21} />
            </span>
            <div>
              <strong>{pendingCount}</strong>
              <span>{copy.pending}</span>
            </div>
          </article>

          <article className="individual-documents-stat">
            <span className="individual-documents-stat-icon approved">
              <CheckCircle2 size={21} />
            </span>
            <div>
              <strong>{approvedCount}</strong>
              <span>{copy.approved}</span>
            </div>
          </article>
        </section>

        {message && (
          <div
            className="individual-documents-message"
            role="status"
          >
            <span>{message}</span>
            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="individual-documents-panel">
          <div className="individual-documents-toolbar">
            <label className="individual-documents-search">
              <Search size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={copy.search}
              />
            </label>

            <select
              className="individual-documents-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label={copy.status}
            >
              <option value="all">{copy.allStatus}</option>
              <option value="pending">{copy.pendingStatus}</option>
              <option value="approved">{copy.approvedStatus}</option>
            </select>
          </div>

          {visibleDocuments.length > 0 ? (
            <div className="individual-documents-list">
              <div className="individual-documents-list-header">
                <span>{copy.name}</span>
                <span>{copy.date}</span>
                <span>{copy.size}</span>
                <span>{copy.status}</span>
                <span>{copy.actions}</span>
              </div>

              {visibleDocuments.map((document) => {
                const FileIcon = getFileIcon(document.name);

                return (
                  <article
                    className="individual-document-row"
                    key={document.id}
                  >
                    <div className="individual-document-name">
                      <span className="individual-document-icon">
                        <FileIcon size={21} />
                      </span>
                      <div>
                        <strong title={document.name}>
                          {document.name}
                        </strong>
                        <span>{document.type}</span>
                      </div>
                    </div>

                    <span className="individual-document-date">
                      {formatDate(document.uploadedAt)}
                    </span>

                    <span className="individual-document-size">
                      {formatSize(document.size)}
                    </span>

                    <span
                      className={`individual-document-status individual-document-status--${document.status}`}
                    >
                      {document.status === "approved"
                        ? copy.approvedStatus
                        : copy.pendingStatus}
                    </span>

                    <div className="individual-document-actions">
                      <button
                        type="button"
                        onClick={() => downloadDocument(document)}
                        aria-label={`Download ${document.name}`}
                        title="Download"
                      >
                        <Download size={17} />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        onClick={() => deleteDocument(document.id)}
                        aria-label={`Delete ${document.name}`}
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="individual-documents-empty">
              <span className="individual-documents-empty-icon">
                <FileText size={30} />
              </span>

              <h2>{copy.emptyTitle}</h2>
              <p>{copy.emptyText}</p>

              <button
                type="button"
                className="individual-documents-upload-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload size={17} />
                {copy.uploadFirst}
              </button>
            </div>
          )}
        </section>

        <p className="individual-documents-note">
          <FileText size={17} />
          <span>{copy.tip}</span>
        </p>

        <p className="individual-documents-demo-note">
          {copy.demo}: document status is for demonstration only. No real
          verification is performed.
        </p>
      </main>
    </div>
  );
}
