import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Handshake,
  MapPin,
  RotateCcw,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { opportunities } from "../data/demoData";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Card from "../components/Card";
import "./Opportunities.css";

const OPPORTUNITY_TYPES = [
  {
    id: "all",
    en: "All Opportunities",
    zh: "全部机会",
  },
  {
    id: "Partnership",
    en: "Partnership",
    zh: "合作伙伴",
  },
  {
    id: "Investment",
    en: "Investment",
    zh: "投资机会",
  },
  {
    id: "Supplier",
    en: "Supplier",
    zh: "供应商机会",
  },
  {
    id: "Joint Venture",
    en: "Joint Venture",
    zh: "合资企业",
  },
];

const TYPE_ICONS = {
  Partnership: Handshake,
  Investment: TrendingUp,
  Supplier: Building2,
  "Joint Venture": Users,
};

function getOpportunityText(opportunity, key, t) {
  const dataKey = `data.opportunities.${opportunity.id}.${key}`;
  const translated = t(dataKey);

  if (translated && translated !== dataKey) {
    return translated;
  }

  return opportunity[key] || "";
}

export default function Opportunities() {
  const { t, language } = useLanguage();
  const isChinese = language === "zh";
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const [interestForm, setInterestForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesType =
        selectedType === "all" || opportunity.type === selectedType;

      if (!matchesType) return false;

      if (!query) return true;

      const searchableText = [
        opportunity.title,
        opportunity.description,
        opportunity.location,
        opportunity.category,
        opportunity.type,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [selectedType, search]);

  function openOpportunity(opportunity) {
    setSelectedOpportunity(opportunity);
    setInterestSubmitted(false);

    setInterestForm({
      name: "",
      email: "",
      message: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeOpportunity() {
    setSelectedOpportunity(null);
    setInterestSubmitted(false);

    setInterestForm({
      name: "",
      email: "",
      message: "",
    });
  }

  function handleInterestChange(event) {
    const { name, value } = event.target;

    setInterestForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleExpressInterest(event) {
    event.preventDefault();

    if (!selectedOpportunity) {
      return;
    }

    const title = getOpportunityText(
      selectedOpportunity,
      "title",
      t
    );

    const description = getOpportunityText(
      selectedOpportunity,
      "description",
      t
    );

    const location = getOpportunityText(
      selectedOpportunity,
      "location",
      t
    );

    const category = getOpportunityText(
      selectedOpportunity,
      "category",
      t
    );

    const type = getOpportunityText(
      selectedOpportunity,
      "type",
      t
    );

    const message =
      interestForm.message.trim() ||
      (isChinese
        ? `您好，我对“${title}”这个机会感兴趣，希望进一步了解详情。`
        : `Hello, I am interested in "${title}" and would like to learn more about this opportunity.`);

    const conversation = {
      id: `opportunity-${selectedOpportunity.id}`,
      opportunityId: selectedOpportunity.id,
      opportunityTitle: title,
      opportunityType: type,
      opportunityCategory: category,
      opportunityLocation: location,
      opportunityDescription: description,
      contextType: "Opportunity Interest",
      subject: title,
      message,
      senderName: interestForm.name.trim(),
      senderEmail: interestForm.email.trim(),
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "chinaHubPendingOpportunityConversation",
      JSON.stringify(conversation)
    );

    setInterestSubmitted(true);

    setTimeout(() => {
      navigate("/messages");
    }, 700);
  }

  function resetFilters() {
    setSelectedType("all");
    setSearch("");
  }

  if (selectedOpportunity) {
    const TypeIcon =
      TYPE_ICONS[selectedOpportunity.type] || BriefcaseBusiness;

    const title = getOpportunityText(
      selectedOpportunity,
      "title",
      t
    );

    const description = getOpportunityText(
      selectedOpportunity,
      "description",
      t
    );

    const location = getOpportunityText(
      selectedOpportunity,
      "location",
      t
    );

    const category = getOpportunityText(
      selectedOpportunity,
      "category",
      t
    );

    const type = getOpportunityText(
      selectedOpportunity,
      "type",
      t
    );

    return (
      <PageContainer width="lg" className="opportunities-page">
        <button
          type="button"
          className="opportunities-back"
          onClick={closeOpportunity}
        >
          <ArrowLeft size={17} aria-hidden="true" />
          {isChinese
            ? "返回机会列表"
            : "Back to Opportunities"}
        </button>

        <section className="opportunity-detail">
          <div className="opportunity-detail__top">
            <div className="opportunity-detail__icon">
              <TypeIcon size={28} aria-hidden="true" />
            </div>

            <div className="opportunity-detail__type">
              {type}
            </div>
          </div>

          <h1>{title}</h1>

          <div className="opportunity-detail__meta">
            <span>
              <MapPin size={16} aria-hidden="true" />
              {location}
            </span>

            <span>
              <BriefcaseBusiness
                size={16}
                aria-hidden="true"
              />
              {category}
            </span>
          </div>

          <div className="opportunity-detail__content">
            <div>
              <span className="opportunity-detail__eyebrow">
                {isChinese
                  ? "机会详情"
                  : "Opportunity Details"}
              </span>

              <h2>
                {isChinese
                  ? "关于此机会"
                  : "About this opportunity"}
              </h2>

              <p>{description}</p>
            </div>

            <Card className="opportunity-detail__action-card">
              {interestSubmitted ? (
                <div className="opportunity-interest-success">
                  <CheckCircle2
                    size={30}
                    aria-hidden="true"
                  />

                  <h3>
                    {isChinese
                      ? "您的兴趣已记录"
                      : "Your interest has been recorded"}
                  </h3>

                  <p>
                    {isChinese
                      ? "您的意向正在进入消息中心。"
                      : "Your interest is being added to your Messages."}
                  </p>
                </div>
              ) : (
                <>
                  <span className="opportunity-detail__action-eyebrow">
                    {isChinese ? "有兴趣？" : "Interested?"}
                  </span>

                  <h3>
                    {isChinese
                      ? "表达您的合作意向"
                      : "Express your interest"}
                  </h3>

                  <p>
                    {isChinese
                      ? "填写您的联系方式和留言，向机会发布者表明您希望进一步了解或参与此机会。"
                      : "Share your contact details and message so the opportunity owner knows you would like to learn more or participate."}
                  </p>

                  <form
                    className="opportunity-interest-form"
                    onSubmit={handleExpressInterest}
                  >
                    <label>
                      <span>
                        {isChinese ? "姓名" : "Name"}
                      </span>

                      <input
                        type="text"
                        name="name"
                        value={interestForm.name}
                        onChange={handleInterestChange}
                        placeholder={
                          isChinese
                            ? "请输入您的姓名"
                            : "Enter your name"
                        }
                        required
                      />
                    </label>

                    <label>
                      <span>
                        {isChinese
                          ? "邮箱"
                          : "Email"}
                      </span>

                      <input
                        type="email"
                        name="email"
                        value={interestForm.email}
                        onChange={handleInterestChange}
                        placeholder={
                          isChinese
                            ? "请输入您的邮箱"
                            : "Enter your email"
                        }
                        required
                      />
                    </label>

                    <label>
                      <span>
                        {isChinese
                          ? "留言"
                          : "Message"}
                      </span>

                      <textarea
                        name="message"
                        value={interestForm.message}
                        onChange={handleInterestChange}
                        placeholder={
                          isChinese
                            ? "告诉机会发布者您为什么感兴趣，以及您希望了解什么..."
                            : "Tell the opportunity owner why you are interested and what you would like to know..."
                        }
                        rows={5}
                      />
                    </label>

                    <Button
                      type="submit"
                      variant="primary"
                    >
                      {isChinese
                        ? "提交并发送"
                        : "Submit & Send"}
                      <ArrowRight
                        size={17}
                        aria-hidden="true"
                      />
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>

          <div className="opportunity-detail__notice">
            <span>
              {isChinese
                ? "演示说明：此机会为原型演示用虚构示例内容。"
                : "Demo notice: This opportunity contains fictional sample information for prototype purposes."}
            </span>
          </div>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      width="lg"
      className="opportunities-page"
    >
      <section className="opportunities-hero">
        <div className="opportunities-hero__icon">
          <BriefcaseBusiness
            size={30}
            aria-hidden="true"
          />
        </div>

        <span className="opportunities-hero__eyebrow">
          {isChinese
            ? "商业机会"
            : "Business Opportunities"}
        </span>

        <h1>
          {isChinese
            ? "探索商业机会"
            : "Explore Business Opportunities"}
        </h1>

        <p>
          {isChinese
            ? "发现投资、供应、合作、合资和贸易机会，连接中国与南非市场。"
            : "Discover investment, supplier, partnership, joint venture and trade opportunities connecting China and South Africa."}
        </p>
      </section>

      <Card className="opportunities-controls">
        <div className="opportunities-search">
          <Search size={19} aria-hidden="true" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={
              isChinese
                ? "搜索机会、行业、地点..."
                : "Search opportunities, industries, locations..."
            }
            aria-label={
              isChinese
                ? "搜索商业机会"
                : "Search business opportunities"
            }
          />
        </div>

        <div className="opportunities-filter-row">
          <div className="opportunities-filter-label">
            {isChinese
              ? "机会类型"
              : "Opportunity Type"}
          </div>

          <div className="opportunities-filters">
            {OPPORTUNITY_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`opportunities-filter ${
                  selectedType === type.id
                    ? "is-selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedType(type.id)
                }
              >
                {isChinese ? type.zh : type.en}
              </button>
            ))}
          </div>

          {(selectedType !== "all" || search) && (
            <button
              type="button"
              className="opportunities-clear"
              onClick={resetFilters}
            >
              <RotateCcw
                size={14}
                aria-hidden="true"
              />
              {isChinese
                ? "清除筛选"
                : "Clear Filters"}
            </button>
          )}
        </div>
      </Card>

      <section className="opportunities-results">
        <div className="opportunities-results__header">
          <div>
            <span className="opportunities-results__eyebrow">
              {isChinese
                ? "机会目录"
                : "Opportunity Directory"}
            </span>

            <h2>
              {isChinese
                ? "找到适合您的机会"
                : "Find an opportunity that fits"}
            </h2>

            <p>
              {isChinese
                ? "浏览当前原型中的商业机会，并选择您感兴趣的机会查看详情。"
                : "Browse the business opportunities in this prototype and select one to view the full details."}
            </p>
          </div>

          <span className="opportunities-results__count">
            {filteredOpportunities.length}{" "}
            {isChinese
              ? "个机会"
              : "opportunities"}
          </span>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="opportunities-grid">
            {filteredOpportunities.map(
              (opportunity) => {
                const TypeIcon =
                  TYPE_ICONS[opportunity.type] ||
                  BriefcaseBusiness;

                return (
                  <Card
                    key={opportunity.id}
                    className="opportunity-list-card"
                    accent={
                      opportunity.type === "Investment"
                        ? "gold"
                        : opportunity.type === "Supplier"
                          ? "green"
                          : opportunity.type ===
                              "Joint Venture"
                            ? "red"
                            : "navy"
                    }
                  >
                    <div className="opportunity-list-card__top">
                      <span className="opportunity-list-card__type">
                        <TypeIcon
                          size={15}
                          aria-hidden="true"
                        />

                        {getOpportunityText(
                          opportunity,
                          "type",
                          t
                        )}
                      </span>

                      <span className="opportunity-list-card__category">
                        {getOpportunityText(
                          opportunity,
                          "category",
                          t
                        )}
                      </span>
                    </div>

                    <h3>
                      {getOpportunityText(
                        opportunity,
                        "title",
                        t
                      )}
                    </h3>

                    <p className="opportunity-list-card__description">
                      {getOpportunityText(
                        opportunity,
                        "description",
                        t
                      )}
                    </p>

                    <div className="opportunity-list-card__meta">
                      <span>
                        <MapPin
                          size={14}
                          aria-hidden="true"
                        />

                        {getOpportunityText(
                          opportunity,
                          "location",
                          t
                        )}
                      </span>
                    </div>

                    <div className="opportunity-list-card__footer">
                      <span>
                        {isChinese
                          ? "查看机会详情"
                          : "View opportunity details"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          openOpportunity(
                            opportunity
                          )
                        }
                      >
                        {isChinese
                          ? "查看详情"
                          : "View Details"}

                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Card>
                );
              }
            )}
          </div>
        ) : (
          <Card className="opportunities-empty">
            <BriefcaseBusiness
              size={28}
              aria-hidden="true"
            />

            <h3>
              {isChinese
                ? "没有找到商业机会"
                : "No opportunities found"}
            </h3>

            <p>
              {isChinese
                ? "尝试使用其他关键词或清除筛选条件。"
                : "Try another keyword or clear the filters to see more opportunities."}
            </p>

            <Button
              type="button"
              variant="secondary"
              onClick={resetFilters}
            >
              {isChinese
                ? "清除筛选"
                : "Clear Filters"}
            </Button>
          </Card>
        )}

        <p className="opportunities-demo-note">
          {isChinese
            ? "演示说明：以上机会为原型演示用虚构示例内容，并不代表真实商业机会。"
            : "Demo notice: The opportunities shown are fictional sample listings for prototype purposes and do not represent real commercial opportunities."}
        </p>
      </section>
    </PageContainer>
  );
}
