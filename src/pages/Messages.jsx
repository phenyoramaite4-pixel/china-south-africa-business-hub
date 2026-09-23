import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  User,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";

import "./Messages.css";

const conversations = [
  {
    id: "conversation-1",
    name: "Ubuntu Freight & Logistics",
    type: "company",
    category: "Logistics & Freight",
    location: "Durban, KwaZulu-Natal",
    verified: true,
    contextEn: "Quote Request · Equipment Transport",
    contextZh: "报价请求 · 设备运输",
    lastMessageEn:
      "Please send the equipment dimensions and estimated weight.",
    lastMessageZh: "请发送设备尺寸和预计重量。",
    time: "10:42",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "me",
        textEn:
          "Hello, I need to move manufacturing equipment from Johannesburg to Durban.",
        textZh: "您好，我需要将制造设备从约翰内斯堡运往德班。",
        time: "10:18",
      },
      {
        id: 2,
        sender: "them",
        textEn:
          "Hello. Yes, we can assist with the transportation.",
        textZh: "您好，可以的。我们可以协助运输。",
        time: "10:25",
      },
      {
        id: 3,
        sender: "me",
        textEn:
          "Great. I would like to request a quotation.",
        textZh: "很好。我想请求一份报价。",
        time: "10:31",
      },
      {
        id: 4,
        sender: "them",
        textEn:
          "Please send the equipment dimensions and estimated weight.",
        textZh: "请发送设备尺寸和预计重量。",
        time: "10:42",
      },
    ],
  },
  {
    id: "conversation-2",
    name: "Johannesburg Trade Services",
    type: "company",
    category: "Import & Export",
    location: "Johannesburg, Gauteng",
    verified: true,
    contextEn: "Enquiry · Import Support",
    contextZh: "询价 · 进口支持",
    lastMessageEn:
      "We can help you understand the import requirements.",
    lastMessageZh: "我们可以帮助您了解进口要求。",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "me",
        textEn:
          "I am looking for assistance with importing products into South Africa.",
        textZh: "我正在寻找将产品进口到南非的相关帮助。",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "them",
        textEn:
          "We can help you understand the import requirements.",
        textZh: "我们可以帮助您了解进口要求。",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "conversation-3",
    name: "Mpho Mokoena Consulting",
    type: "professional",
    category: "Business Consulting",
    location: "Johannesburg, Gauteng",
    verified: true,
    contextEn: "Enquiry · Market Entry",
    contextZh: "询价 · 市场进入",
    lastMessageEn:
      "I can arrange an introductory consultation.",
    lastMessageZh: "我可以安排一次介绍性咨询。",
    time: "Mon",
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "me",
        textEn:
          "We are exploring the South African market and need local guidance.",
        textZh: "我们正在探索南非市场，需要当地的指导。",
        time: "Mon",
      },
      {
        id: 2,
        sender: "them",
        textEn:
          "I can arrange an introductory consultation.",
        textZh: "我可以安排一次介绍性咨询。",
        time: "Mon",
      },
    ],
  },
  {
    id: "conversation-4",
    name: "Cape Construction Materials",
    type: "company",
    category: "Construction Materials Sourcing",
    location: "Cape Town, Western Cape",
    verified: true,
    contextEn: "Enquiry · Supplier Partnership",
    contextZh: "询价 · 供应商合作",
    lastMessageEn:
      "We would be interested in discussing your requirements.",
    lastMessageZh: "我们有兴趣进一步了解您的需求。",
    time: "Sun",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "me",
        textEn:
          "We are looking for a construction materials supplier in South Africa.",
        textZh: "我们正在寻找一家南非建筑材料供应商。",
        time: "Sun",
      },
      {
        id: 2,
        sender: "them",
        textEn:
          "We would be interested in discussing your requirements.",
        textZh: "我们有兴趣进一步了解您的需求。",
        time: "Sun",
      },
    ],
  },
];

function getPendingConversation() {
  const saved = sessionStorage.getItem(
    "chinaHubPendingConversation"
  );

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    sessionStorage.removeItem(
      "chinaHubPendingConversation"
    );

    return null;
  }
}

function getPendingOpportunityConversation() {
  const saved = sessionStorage.getItem(
    "chinaHubPendingOpportunityConversation"
  );

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    sessionStorage.removeItem(
      "chinaHubPendingOpportunityConversation"
    );

    return null;
  }
}

function buildPendingConversation(pending) {
  const isQuote = pending.contextType === "Quote Request";

  const contextEn = isQuote
    ? `Quote Request · ${pending.subject}`
    : `Enquiry · ${pending.subject}`;

  const contextZh = isQuote
    ? `报价请求 · ${pending.subject}`
    : `询价 · ${pending.subject}`;

  return {
    id: pending.id,
    name: pending.providerName,
    type: pending.providerType,
    category: pending.providerCategory,
    location: pending.providerLocation,
    verified: true,
    contextEn,
    contextZh,
    lastMessageEn: pending.message,
    lastMessageZh: pending.message,
    time: "Now",
    unread: 0,
    messages: [
      {
        id: `pending-${Date.now()}`,
        sender: "me",
        textEn: pending.message,
        textZh: pending.message,
        time: "Now",
      },
    ],
    pendingSubject: pending.subject,
    senderName: pending.senderName,
    senderEmail: pending.senderEmail,
    isNewConversation: true,
  };
}

function buildPendingOpportunityConversation(pending) {
  return {
    id: pending.id,
    name: pending.opportunityTitle,
    type: "company",
    category:
      pending.opportunityCategory ||
      "Business Opportunity",
    location:
      pending.opportunityLocation ||
      "China & South Africa",
    verified: true,
    contextEn: `Opportunity Interest · ${pending.opportunityTitle}`,
    contextZh: `机会意向 · ${pending.opportunityTitle}`,
    lastMessageEn: pending.message,
    lastMessageZh: pending.message,
    time: "Now",
    unread: 0,
    messages: [
      {
        id: `opportunity-pending-${Date.now()}`,
        sender: "me",
        textEn: pending.message,
        textZh: pending.message,
        time: "Now",
      },
    ],
    opportunityId: pending.opportunityId,
    opportunityTitle: pending.opportunityTitle,
    opportunityType: pending.opportunityType,
    opportunityDescription:
      pending.opportunityDescription,
    pendingSubject: pending.subject,
    senderName: pending.senderName,
    senderEmail: pending.senderEmail,
    isOpportunityConversation: true,
    isNewConversation: true,
  };
}

export default function Messages() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  const pendingConversation = useMemo(
    () => getPendingConversation(),
    []
  );

  const pendingOpportunityConversation = useMemo(
    () => getPendingOpportunityConversation(),
    []
  );

  const initialPendingConversation =
    pendingOpportunityConversation
      ? buildPendingOpportunityConversation(
          pendingOpportunityConversation
        )
      : pendingConversation
        ? buildPendingConversation(
            pendingConversation
          )
        : null;

  const [selectedId, setSelectedId] = useState(
    initialPendingConversation?.id ||
      "conversation-1"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const [localMessages, setLocalMessages] =
    useState(() => {
      const pendingProvider =
        getPendingConversation();

      const pendingOpportunity =
        getPendingOpportunityConversation();

      let result = conversations;

      if (pendingProvider) {
        const newConversation =
          buildPendingConversation(
            pendingProvider
          );

        result = [
          newConversation,
          ...result.filter(
            (conversation) =>
              conversation.id !==
              newConversation.id
          ),
        ];
      }

      if (pendingOpportunity) {
        const newConversation =
          buildPendingOpportunityConversation(
            pendingOpportunity
          );

        result = [
          newConversation,
          ...result.filter(
            (conversation) =>
              conversation.id !==
              newConversation.id
          ),
        ];
      }

      return result;
    });

  useEffect(() => {
    if (pendingConversation) {
      sessionStorage.removeItem(
        "chinaHubPendingConversation"
      );
    }

    if (pendingOpportunityConversation) {
      sessionStorage.removeItem(
        "chinaHubPendingOpportunityConversation"
      );
    }
  }, [
    pendingConversation,
    pendingOpportunityConversation,
  ]);

  const selectedConversation = localMessages.find(
    (conversation) =>
      conversation.id === selectedId
  );

  const filteredConversations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return localMessages;
    }

    return localMessages.filter(
      (conversation) => {
        return (
          conversation.name
            .toLowerCase()
            .includes(term) ||
          conversation.category
            .toLowerCase()
            .includes(term) ||
          conversation.location
            .toLowerCase()
            .includes(term)
        );
      }
    );
  }, [searchTerm, localMessages]);

  function selectConversation(id) {
    setSelectedId(id);

    setLocalMessages((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function sendMessage(event) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (
      !trimmedMessage ||
      !selectedConversation
    ) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "me",
      textEn: trimmedMessage,
      textZh: trimmedMessage,
      time: "Now",
    };

    setLocalMessages((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                newMessage,
              ],
              lastMessageEn: trimmedMessage,
              lastMessageZh: trimmedMessage,
              time: "Now",
            }
          : conversation
      )
    );

    setMessage("");
  }

  return (
    <PageContainer
      width="xl"
      className="messages-page"
    >
      <section className="messages">
        <div className="messages__header">
          <div>
            <span className="messages__eyebrow">
              {isChinese
                ? "商业沟通中心"
                : "Business Communication"}
            </span>

            <h1>
              {isChinese ? "消息" : "Messages"}
            </h1>

            <p>
              {isChinese
                ? "与企业、合作伙伴和专业人士直接沟通。"
                : "Communicate directly with businesses, partners and professionals."}
            </p>
          </div>

          <div className="messages__header-status">
            <MessageCircle size={18} />

            <span>
              {isChinese
                ? "安全的原型通信"
                : "Secure prototype messaging"}
            </span>
          </div>
        </div>

        <div className="messages__layout">
          <Card className="messages__conversations">
            <div className="messages__conversations-header">
              <div>
                <h2>
                  {isChinese
                    ? "您的对话"
                    : "Your Conversations"}
                </h2>

                <span>
                  {localMessages.length}{" "}
                  {isChinese
                    ? "个对话"
                    : "conversations"}
                </span>
              </div>
            </div>

            <div className="messages__search">
              <Search size={17} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder={
                  isChinese
                    ? "搜索对话..."
                    : "Search conversations..."
                }
              />
            </div>

            <div className="messages__conversation-list">
              {filteredConversations.map(
                (conversation) => {
                  const isSelected =
                    conversation.id ===
                    selectedId;

                  return (
                    <button
                      type="button"
                      key={conversation.id}
                      className={`messages__conversation ${
                        isSelected
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() =>
                        selectConversation(
                          conversation.id
                        )
                      }
                    >
                      <div className="messages__conversation-avatar">
                        {conversation.type ===
                        "company" ? (
                          <Building2
                            size={19}
                            aria-hidden="true"
                          />
                        ) : (
                          <User
                            size={19}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <div className="messages__conversation-content">
                        <div className="messages__conversation-top">
                          <strong>
                            {conversation.name}
                          </strong>

                          <span>
                            {conversation.time}
                          </span>
                        </div>

                        <span className="messages__conversation-context">
                          {isChinese
                            ? conversation.contextZh
                            : conversation.contextEn}
                        </span>

                        <p>
                          {isChinese
                            ? conversation.lastMessageZh
                            : conversation.lastMessageEn}
                        </p>
                      </div>

                      {conversation.unread >
                      0 ? (
                        <span className="messages__unread">
                          {conversation.unread}
                        </span>
                      ) : null}

                      <ChevronRight
                        size={16}
                        className="messages__conversation-arrow"
                        aria-hidden="true"
                      />
                    </button>
                  );
                }
              )}

              {!filteredConversations.length ? (
                <div className="messages__empty-list">
                  <Search size={22} />

                  <strong>
                    {isChinese
                      ? "没有找到对话"
                      : "No conversations found"}
                  </strong>

                  <span>
                    {isChinese
                      ? "尝试其他搜索内容。"
                      : "Try another search term."}
                  </span>
                </div>
              ) : null}
            </div>
          </Card>

          {selectedConversation ? (
            <Card className="messages__thread">
              <div className="messages__thread-header">
                <div className="messages__thread-person">
                  <div className="messages__thread-avatar">
                    {selectedConversation.type ===
                    "company" ? (
                      <Building2 size={22} />
                    ) : (
                      <User size={22} />
                    )}
                  </div>

                  <div>
                    <div className="messages__thread-name">
                      <h2>
                        {selectedConversation.name}
                      </h2>

                      {selectedConversation.verified ? (
                        <span className="messages__verified">
                          <CheckCheck size={14} />

                          {isChinese
                            ? "已验证"
                            : "Verified"}
                        </span>
                      ) : null}
                    </div>

                    <span>
                      {selectedConversation.category}{" "}
                      ·{" "}
                      {selectedConversation.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="messages__context">
                <div>
                  <span>
                    {isChinese
                      ? "对话主题"
                      : "Conversation Context"}
                  </span>

                  <strong>
                    {isChinese
                      ? selectedConversation.contextZh
                      : selectedConversation.contextEn}
                  </strong>
                </div>

                <span className="messages__context-badge">
                  {selectedConversation.isOpportunityConversation
                    ? isChinese
                      ? "机会意向"
                      : "Opportunity Interest"
                    : isChinese
                      ? "业务咨询"
                      : "Business enquiry"}
                </span>
              </div>

              <div className="messages__thread-body">
                <div className="messages__date-divider">
                  <span>
                    {isChinese
                      ? "今天"
                      : "Today"}
                  </span>
                </div>

                {selectedConversation.messages.map(
                  (item) => (
                    <div
                      key={item.id}
                      className={`messages__bubble-row ${
                        item.sender === "me"
                          ? "is-mine"
                          : ""
                      }`}
                    >
                      <div
                        className={`messages__bubble ${
                          item.sender === "me"
                            ? "is-mine"
                            : ""
                        }`}
                      >
                        <p>
                          {isChinese
                            ? item.textZh
                            : item.textEn}
                        </p>

                        <span>
                          {item.time}

                          {item.sender ===
                          "me" ? (
                            <CheckCheck
                              size={14}
                            />
                          ) : null}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              <form
                className="messages__composer"
                onSubmit={sendMessage}
              >
                <button
                  type="button"
                  className="messages__composer-icon"
                  aria-label={
                    isChinese
                      ? "添加附件"
                      : "Add attachment"
                  }
                  title={
                    isChinese
                      ? "附件功能将在正式版本启用"
                      : "Attachments will be available in the production version"
                  }
                >
                  <Paperclip size={19} />
                </button>

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  rows="1"
                  placeholder={
                    isChinese
                      ? "输入您的消息..."
                      : "Type your message..."
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      sendMessage(event);
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!message.trim()}
                >
                  <Send size={17} />

                  <span>
                    {isChinese
                      ? "发送"
                      : "Send"}
                  </span>
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="messages__thread messages__thread--empty">
              <MessageCircle size={36} />

              <h2>
                {isChinese
                  ? "选择一个对话"
                  : "Select a Conversation"}
              </h2>

              <p>
                {isChinese
                  ? "选择左侧的对话以查看消息。"
                  : "Select a conversation from the left to view messages."}
              </p>
            </Card>
          )}
        </div>

        <div className="messages__notice">
          <span>
            {isChinese
              ? "原型说明"
              : "Prototype Notice"}
          </span>

          <p>
            {isChinese
              ? "当前消息为演示数据。正式版本将使用安全的服务器端消息系统，并支持实时消息、附件、通知和消息历史记录。"
              : "Messages currently use demonstration data. The production platform will use a secure server-side messaging system with real-time messaging, attachments, notifications and message history."}
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

