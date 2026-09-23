import { useMemo, useState } from "react";
import {
  Bell,
  Building2,
  CheckCheck,
  ChevronRight,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";

import "./Notifications.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "enquiry",
    unread: true,
    time: "10 min ago",
    titleEn: "New enquiry received",
    titleZh: "收到新的咨询",
    textEn:
      "Ubuntu Freight & Logistics has received your equipment transport enquiry.",
    textZh:
      "Ubuntu Freight & Logistics 已收到您的设备运输咨询。",
    action: "/messages",
    actionLabelEn: "Open Messages",
    actionLabelZh: "打开消息",
  },
  {
    id: "n2",
    type: "quote",
    unread: true,
    time: "35 min ago",
    titleEn: "Quote request updated",
    titleZh: "报价请求已更新",
    textEn:
      "Your equipment transport request is now being reviewed by the provider.",
    textZh:
      "您的设备运输请求正在由服务提供商审核。",
    action: "/messages",
    actionLabelEn: "View Conversation",
    actionLabelZh: "查看对话",
  },
  {
    id: "n3",
    type: "message",
    unread: true,
    time: "1 hour ago",
    titleEn: "New message",
    titleZh: "新消息",
    textEn:
      "Mpho Mokoena Consulting sent you a message about your market entry enquiry.",
    textZh:
      "Mpho Mokoena Consulting 就您的市场进入咨询向您发送了一条消息。",
    action: "/messages",
    actionLabelEn: "Read Message",
    actionLabelZh: "阅读消息",
  },
  {
    id: "n4",
    type: "opportunity",
    unread: false,
    time: "Yesterday",
    titleEn: "New opportunity matches your profile",
    titleZh: "发现与您的资料匹配的新机会",
    textEn:
      "A South Africa distribution partnership opportunity may match your business profile.",
    textZh:
      "一个南非分销合作机会可能与您的企业资料相匹配。",
    action: "/opportunities",
    actionLabelEn: "View Opportunity",
    actionLabelZh: "查看机会",
  },
  {
    id: "n5",
    type: "verification",
    unread: false,
    time: "2 days ago",
    titleEn: "Business verification reminder",
    titleZh: "企业认证提醒",
    textEn:
      "Complete your business document uploads to strengthen your verification profile.",
    textZh:
      "完成企业文件上传，以完善您的认证资料。",
    action: "/business-documents",
    actionLabelEn: "Manage Documents",
    actionLabelZh: "管理文件",
  },
];

function getNotificationIcon(type) {
  if (type === "message") return MessageCircle;
  if (type === "quote") return FileText;
  if (type === "opportunity") return Sparkles;
  if (type === "verification") return ShieldCheck;
  return Building2;
}

export default function Notifications() {
  const { language } = useLanguage();
  const isChinese = language === "zh";
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS
  );
  const [filter, setFilter] = useState("all");

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((notification) => notification.unread);
    }

    return notifications;
  }, [notifications, filter]);

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function openNotification(notification) {
    markAsRead(notification.id);
    navigate(notification.action);
  }

  return (
    <PageContainer width="lg" className="notifications-page">
      <section className="notifications">
        <div className="notifications__header">
          <div>
            <span className="notifications__eyebrow">
              {isChinese ? "活动中心" : "Activity Centre"}
            </span>

            <h1>
              {isChinese ? "通知" : "Notifications"}
            </h1>

            <p>
              {isChinese
                ? "查看您的咨询、消息、机会和企业账户的重要更新。"
                : "Stay up to date with enquiries, messages, opportunities and important account updates."}
            </p>
          </div>

          <div className="notifications__header-actions">
            <div className="notifications__count">
              <Bell size={16} aria-hidden="true" />

              <span>
                {unreadCount}{" "}
                {isChinese ? "条未读" : "unread"}
              </span>
            </div>

            {unreadCount > 0 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={markAllAsRead}
              >
                <CheckCheck size={16} aria-hidden="true" />

                {isChinese
                  ? "全部标记为已读"
                  : "Mark All as Read"}
              </Button>
            ) : null}
          </div>
        </div>

        <Card className="notifications__card">
          <div className="notifications__filters">
            <button
              type="button"
              className={`notifications__filter ${
                filter === "all" ? "is-active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              {isChinese ? "全部通知" : "All Notifications"}
            </button>

            <button
              type="button"
              className={`notifications__filter ${
                filter === "unread" ? "is-active" : ""
              }`}
              onClick={() => setFilter("unread")}
            >
              {isChinese ? "未读" : "Unread"}

              {unreadCount > 0 ? (
                <span>{unreadCount}</span>
              ) : null}
            </button>
          </div>

          <div className="notifications__list">
            {visibleNotifications.length === 0 ? (
              <div className="notifications__empty">
                <div className="notifications__empty-icon">
                  <CheckCheck size={26} aria-hidden="true" />
                </div>

                <h2>
                  {isChinese
                    ? "您已查看所有通知"
                    : "You're all caught up"}
                </h2>

                <p>
                  {isChinese
                    ? "目前没有未读通知。"
                    : "There are no unread notifications right now."}
                </p>
              </div>
            ) : (
              visibleNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);

                return (
                  <article
                    key={notification.id}
                    className={`notification-item ${
                      notification.unread
                        ? "is-unread"
                        : ""
                    }`}
                  >
                    <div className="notification-item__icon">
                      <Icon size={19} aria-hidden="true" />
                    </div>

                    <div className="notification-item__content">
                      <div className="notification-item__top">
                        <h2>
                          {isChinese
                            ? notification.titleZh
                            : notification.titleEn}
                        </h2>

                        <span>{notification.time}</span>
                      </div>

                      <p>
                        {isChinese
                          ? notification.textZh
                          : notification.textEn}
                      </p>

                      <div className="notification-item__actions">
                        <button
                          type="button"
                          onClick={() =>
                            openNotification(notification)
                          }
                        >
                          {isChinese
                            ? notification.actionLabelZh
                            : notification.actionLabelEn}

                          <ChevronRight
                            size={15}
                            aria-hidden="true"
                          />
                        </button>

                        {notification.unread ? (
                          <button
                            type="button"
                            className="notification-item__read"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                          >
                            {isChinese
                              ? "标记为已读"
                              : "Mark as read"}
                          </button>
                        ) : (
                          <span className="notification-item__read-state">
                            <CheckCheck
                              size={14}
                              aria-hidden="true"
                            />

                            {isChinese
                              ? "已读"
                              : "Read"}
                          </span>
                        )}
                      </div>
                    </div>

                    {notification.unread ? (
                      <span
                        className="notification-item__dot"
                        aria-label={
                          isChinese ? "未读" : "Unread"
                        }
                      />
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </Card>

        <div className="notifications__notice">
          <span>
            {isChinese ? "原型说明" : "Prototype Notice"}
          </span>

          <p>
            {isChinese
              ? "这些通知是演示数据。正式平台将通过服务器端事件、消息、咨询、报价和认证流程实时生成通知。"
              : "These notifications are demonstration data. The production platform will generate notifications from real enquiries, messages, quotes, opportunities and verification events."}
          </p>
        </div>
      </section>
    </PageContainer>
  );
}