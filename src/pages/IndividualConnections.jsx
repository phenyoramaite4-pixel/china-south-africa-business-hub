import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  MessageCircle,
  Search,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import IndividualNavigation from "../components/IndividualNavigation";
import { useLanguage } from "../context/LanguageContext";
import "./IndividualConnections.css";

const STORAGE_KEY = "chinaHubIndividualConnections";

const DEMO_PEOPLE = [
  {
    id: "person-1",
    name: "Lerato Mokoena",
    role: "Independent Business Consultant",
    location: "Johannesburg, South Africa",
    type: "Individual",
    description:
      "Helps small businesses build partnerships and explore new opportunities.",
  },
  {
    id: "person-2",
    name: "Daniel Chen",
    role: "Import & Export Specialist",
    location: "Shenzhen, China",
    type: "Individual",
    description:
      "Interested in connecting with South African suppliers and entrepreneurs.",
  },
  {
    id: "business-1",
    name: "Horizon Trade Solutions",
    role: "International Trade & Logistics",
    location: "Johannesburg, South Africa",
    type: "Business",
    description:
      "A demo business profile interested in cross-border trade partnerships.",
  },
  {
    id: "business-2",
    name: "Pearl Bridge Consulting",
    role: "Business Advisory",
    location: "Guangzhou, China",
    type: "Business",
    description:
      "A demo consulting profile focused on international business opportunities.",
  },
  {
    id: "person-3",
    name: "Thabo Nkosi",
    role: "Independent IT Professional",
    location: "Pretoria, South Africa",
    type: "Individual",
    description:
      "Interested in technology projects, professional networking and collaboration.",
  },
  {
    id: "business-3",
    name: "Southern Cross Suppliers",
    role: "Wholesale & Distribution",
    location: "Cape Town, South Africa",
    type: "Business",
    description:
      "A demo supplier profile looking to build relationships with independent professionals.",
  },
];

const INITIAL_CONNECTIONS = [
  { id: "connection-1", personId: "person-1", status: "connected" },
  { id: "connection-2", personId: "business-1", status: "incoming" },
  { id: "connection-3", personId: "person-2", status: "outgoing" },
];

function readConnections() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : INITIAL_CONNECTIONS;
    }
  } catch (error) {
    console.error("Could not load connections:", error);
  }

  return INITIAL_CONNECTIONS;
}

function ConnectionAvatar({ person }) {
  return (
    <div className="individual-connection-avatar">
      {person.type === "Business" ? (
        <Building2 size={26} />
      ) : (
        <span>
          {person.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default function IndividualConnections() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isChinese = String(language || "").toLowerCase().startsWith("zh");

  const copy = isChinese
    ? {
        title: "我的人脉",
        subtitle: "管理您的专业联系，发现新的合作机会。",
        connections: "已建立联系",
        incoming: "收到的请求",
        outgoing: "已发送请求",
        discover: "发现人脉",
        search: "搜索姓名、公司或地点...",
        all: "全部",
        individuals: "个人",
        businesses: "企业",
        connected: "已连接",
        incomingRequests: "收到的请求",
        outgoingRequests: "已发送请求",
        accept: "接受",
        decline: "拒绝",
        cancel: "取消请求",
        connect: "建立联系",
        message: "发送消息",
        view: "查看联系",
        noResults: "没有找到符合条件的人脉。",
        empty: "这里还没有人脉。",
        emptyIncoming: "没有待处理的联系请求。",
        emptyOutgoing: "没有待回复的请求。",
        browse: "发现人脉",
        individual: "个人",
        business: "企业",
        location: "地点",
        success: "已接受联系请求。",
      }
    : {
        title: "My Connections",
        subtitle:
          "Manage your professional network and discover new opportunities to collaborate.",
        connections: "Connections",
        incoming: "Incoming Requests",
        outgoing: "Sent Requests",
        discover: "Discover People",
        search: "Search by name, business or location...",
        all: "All",
        individuals: "Individuals",
        businesses: "Businesses",
        connected: "Connected",
        incomingRequests: "Incoming Requests",
        outgoingRequests: "Sent Requests",
        accept: "Accept",
        decline: "Decline",
        cancel: "Cancel Request",
        connect: "Connect",
        message: "Message",
        view: "View Connection",
        noResults: "No matching people or businesses found.",
        empty: "No connections to display yet.",
        emptyIncoming: "You have no pending connection requests.",
        emptyOutgoing: "You have no outgoing requests awaiting a response.",
        browse: "Discover People",
        individual: "Individual",
        business: "Business",
        location: "Location",
        success: "Connection request accepted.",
      };

  const [connections, setConnections] = useState(readConnections);
  const [activeTab, setActiveTab] = useState("connected");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
    } catch (error) {
      console.error("Could not save connections:", error);
    }
  }, [connections]);

  const connectionCounts = useMemo(
    () => ({
      connected: connections.filter((item) => item.status === "connected").length,
      incoming: connections.filter((item) => item.status === "incoming").length,
      outgoing: connections.filter((item) => item.status === "outgoing").length,
    }),
    [connections],
  );

  const visiblePeople = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (activeTab === "discover") {
      return DEMO_PEOPLE.filter((person) => {
        const alreadyRequested = connections.some(
          (item) => item.personId === person.id,
        );

        const matchesType =
          typeFilter === "all" || person.type.toLowerCase() === typeFilter;

        const matchesSearch =
          !query ||
          `${person.name} ${person.role} ${person.location} ${person.description}`
            .toLowerCase()
            .includes(query);

        return !alreadyRequested && matchesType && matchesSearch;
      }).map((person) => ({ ...person, status: "discover" }));
    }

    return connections
      .filter((item) => item.status === activeTab)
      .map((item) => {
        const person = DEMO_PEOPLE.find(
          (candidate) => candidate.id === item.personId,
        );

        return person ? { ...person, status: item.status } : null;
      })
      .filter(Boolean)
      .filter((person) => {
        const matchesType =
          typeFilter === "all" || person.type.toLowerCase() === typeFilter;

        const matchesSearch =
          !query ||
          `${person.name} ${person.role} ${person.location} ${person.description}`
            .toLowerCase()
            .includes(query);

        return matchesType && matchesSearch;
      });
  }, [activeTab, connections, searchTerm, typeFilter]);

  function updateConnection(personId, status) {
    setConnections((current) => {
      const existing = current.find((item) => item.personId === personId);

      if (status === "remove") {
        return current.filter((item) => item.personId !== personId);
      }

      if (existing) {
        return current.map((item) =>
          item.personId === personId ? { ...item, status } : item,
        );
      }

      return [
        ...current,
        {
          id: `connection-${personId}`,
          personId,
          status,
        },
      ];
    });
  }

  function renderActions(person) {
    if (person.status === "incoming") {
      return (
        <div className="individual-connection-actions">
          <button
            className="individual-connection-button individual-connection-button--primary"
            onClick={() => updateConnection(person.id, "connected")}
            type="button"
          >
            <Check size={16} />
            {copy.accept}
          </button>

          <button
            className="individual-connection-button"
            onClick={() => updateConnection(person.id, "remove")}
            type="button"
          >
            <X size={16} />
            {copy.decline}
          </button>
        </div>
      );
    }

    if (person.status === "outgoing") {
      return (
        <button
          className="individual-connection-button"
          onClick={() => updateConnection(person.id, "remove")}
          type="button"
        >
          <X size={16} />
          {copy.cancel}
        </button>
      );
    }

    if (person.status === "connected") {
      return (
        <button
          className="individual-connection-button individual-connection-button--primary"
          onClick={() => navigate("/messages")}
          type="button"
        >
          <MessageCircle size={16} />
          {copy.message}
        </button>
      );
    }

    return (
      <button
        className="individual-connection-button individual-connection-button--primary"
        onClick={() => updateConnection(person.id, "outgoing")}
        type="button"
      >
        <UserPlus size={16} />
        {copy.connect}
      </button>
    );
  }

  return (
    <div className="individual-connections-page">
      <IndividualNavigation />

      <main className="individual-connections-main">
        <header className="individual-connections-header">
          <div>
            <span className="individual-connections-eyebrow">
              <UsersRound size={16} />
              {isChinese ? "专业网络" : "PROFESSIONAL NETWORK"}
            </span>

            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
          </div>

          <button
            className="individual-connection-button individual-connection-button--primary individual-connections-discover-button"
            onClick={() => {
              setActiveTab("discover");
              setSearchTerm("");
            }}
            type="button"
          >
            <UserPlus size={18} />
            {copy.discover}
          </button>
        </header>

        <section
          className="individual-connections-stats"
          aria-label={isChinese ? "人脉统计" : "Connection statistics"}
        >
          <button
            className={`individual-connections-stat ${
              activeTab === "connected" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("connected")}
            type="button"
          >
            <span className="individual-connections-stat-icon">
              <UsersRound size={21} />
            </span>
            <span className="individual-connections-stat-copy">
              <strong>{connectionCounts.connected}</strong>
              <span>{copy.connections}</span>
            </span>
          </button>

          <button
            className={`individual-connections-stat ${
              activeTab === "incoming" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("incoming")}
            type="button"
          >
            <span className="individual-connections-stat-icon">
              <UserPlus size={21} />
            </span>
            <span className="individual-connections-stat-copy">
              <strong>{connectionCounts.incoming}</strong>
              <span>{copy.incoming}</span>
            </span>
          </button>

          <button
            className={`individual-connections-stat ${
              activeTab === "outgoing" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("outgoing")}
            type="button"
          >
            <span className="individual-connections-stat-icon">
              <Clock3 size={21} />
            </span>
            <span className="individual-connections-stat-copy">
              <strong>{connectionCounts.outgoing}</strong>
              <span>{copy.outgoing}</span>
            </span>
          </button>
        </section>

        <section className="individual-connections-content">
          <div className="individual-connections-toolbar">
            <div className="individual-connections-tabs">
              {[
                ["connected", copy.connections],
                ["incoming", copy.incomingRequests],
                ["outgoing", copy.outgoingRequests],
                ["discover", copy.discover],
              ].map(([tab, label]) => (
                <button
                  key={tab}
                  className={`individual-connections-tab ${
                    activeTab === tab ? "is-active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <label className="individual-connections-search">
              <Search size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={copy.search}
              />
            </label>
          </div>

          <div className="individual-connections-filters">
            <span>{isChinese ? "筛选：" : "Filter:"}</span>

            {[
              ["all", copy.all],
              ["individual", copy.individuals],
              ["business", copy.businesses],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`individual-connections-filter ${
                  typeFilter === value ? "is-active" : ""
                }`}
                onClick={() => setTypeFilter(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          {visiblePeople.length > 0 ? (
            <div className="individual-connections-grid">
              {visiblePeople.map((person) => (
                <article
                  className="individual-connection-card"
                  key={person.id}
                >
                  <div className="individual-connection-card-top">
                    <ConnectionAvatar person={person} />

                    <span
                      className={`individual-connection-status individual-connection-status--${person.status}`}
                    >
                      {person.status === "connected"
                        ? copy.connected
                        : person.status === "incoming"
                          ? copy.incomingRequests
                          : person.status === "outgoing"
                            ? copy.outgoingRequests
                            : person.type === "Business"
                              ? copy.business
                              : copy.individual}
                    </span>
                  </div>

                  <h2>{person.name}</h2>
                  <p className="individual-connection-role">{person.role}</p>

                  <p className="individual-connection-location">
                    <Building2 size={15} />
                    {person.location}
                  </p>

                  <p className="individual-connection-description">
                    {person.description}
                  </p>

                  <div className="individual-connection-card-footer">
                    {renderActions(person)}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="individual-connections-empty">
              <span className="individual-connections-empty-icon">
                <UsersRound size={30} />
              </span>

              <h2>
                {activeTab === "incoming"
                  ? copy.emptyIncoming
                  : activeTab === "outgoing"
                    ? copy.emptyOutgoing
                    : activeTab === "discover"
                      ? copy.noResults
                      : copy.empty}
              </h2>

              <p>
                {activeTab === "discover"
                  ? isChinese
                    ? "尝试更改搜索条件，或稍后再查看。"
                    : "Try changing your search or filters, or check back later."
                  : isChinese
                    ? "您可以发现新的个人和企业，拓展您的专业人脉。"
                    : "Discover individuals and businesses to grow your professional network."}
              </p>

              {activeTab !== "discover" && (
                <button
                  className="individual-connection-button individual-connection-button--primary"
                  onClick={() => setActiveTab("discover")}
                  type="button"
                >
                  {copy.browse}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </section>

        <p className="individual-connections-demo-note">
          {isChinese
            ? "演示模式：人脉和请求保存在此浏览器中。"
            : "Prototype mode: demo connections and requests are saved in this browser."}
        </p>
      </main>
    </div>
  );
}
