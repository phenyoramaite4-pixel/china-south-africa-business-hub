
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MessageCircleQuestion,
  RotateCcw,
  Search,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { providers } from "../data/demoData";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Card from "../components/Card";
import "./INeedHelp.css";

const CATEGORY_RULES = [
  {
    category: "Logistics & Freight",
    keywords: [
      "move",
      "moving",
      "relocate",
      "relocation",
      "transport",
      "transportation",
      "equipment",
      "cargo",
      "freight",
      "warehouse",
      "warehousing",
      "delivery",
      "shipping",
      "搬运",
      "运输",
      "设备",
      "货物",
      "物流",
    ],
  },
  {
    category: "Import & Export",
    keywords: [
      "import",
      "export",
      "trade",
      "trading",
      "customs",
      "customs clearance",
      "进口",
      "出口",
      "贸易",
      "海关",
    ],
  },
  {
    category: "Construction",
    keywords: [
      "construction",
      "building",
      "builder",
      "contractor",
      "renovation",
      "施工",
      "建筑",
      "承包商",
      "装修",
    ],
  },
  {
    category: "Renewable Energy",
    keywords: [
      "solar",
      "renewable",
      "energy",
      "battery",
      "power",
      "electricity",
      "太阳能",
      "可再生能源",
      "电力",
      "电池",
    ],
  },
  {
    category: "Legal & Compliance Consulting",
    keywords: [
      "lawyer",
      "legal",
      "law",
      "attorney",
      "legal assistance",
      "legal advice",
      "compliance",
      "contract",
      "regulation",
      "visa",
      "律师",
      "法律",
      "合规",
      "合同",
    ],
  },
  {
    category: "Supplier Sourcing",
    keywords: [
      "supplier",
      "suppliers",
      "source",
      "sourcing",
      "find a supplier",
      "找供应商",
      "供应商",
      "采购",
    ],
  },
  {
    category: "Manufacturing Sourcing",
    keywords: [
      "manufacturer",
      "manufacturing",
      "factory",
      "production",
      "manufacture",
      "制造商",
      "制造",
      "工厂",
      "生产",
    ],
  },
  {
    category: "Industrial Equipment",
    keywords: [
      "industrial equipment",
      "machinery",
      "machine",
      "machines",
      "industrial",
      "机械",
      "工业设备",
    ],
  },
  {
    category: "Agriculture",
    keywords: [
      "agriculture",
      "agricultural",
      "farming",
      "farm",
      "farmer",
      "农业",
      "农场",
      "种植",
    ],
  },
  {
    category: "Business Consulting",
    keywords: [
      "consulting",
      "consultant",
      "business advice",
      "strategy",
      "market research",
      "咨询",
      "顾问",
      "商业咨询",
      "市场研究",
    ],
  },
];

const MAX_SERVICES = 3;
const MAX_PROVIDERS_PER_SERVICE = 8;

function getSearchableText(provider) {
  return [
    provider.name,
    provider.category,
    provider.description,
    provider.location,
    ...(provider.services || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Break a request into separate parts, identify the best category
 * for each part, and return no more than three unique categories.
 */
function detectCategories(text) {
  const normalized = text.trim().toLowerCase();

  if (!normalized) return [];

  const segments = normalized
    .split(
      /[,;.!?\n]+|\b(?:as well as|and|also|plus|additionally)\b|以及|并且|还有|另外|同时/gi
    )
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 1);

  const detected = [];

  for (const segment of segments) {
    const scores = CATEGORY_RULES.map((rule, index) => {
      const matchingKeywords = rule.keywords.filter((keyword) =>
        segment.includes(keyword.toLowerCase())
      );

      return {
        category: rule.category,
        score: matchingKeywords.length,
        index,
      };
    });

    scores.sort(
      (a, b) => b.score - a.score || a.index - b.index
    );

    const bestMatch = scores[0];

    if (
      bestMatch &&
      bestMatch.score > 0 &&
      !detected.includes(bestMatch.category)
    ) {
      detected.push(bestMatch.category);
    }

    if (detected.length >= MAX_SERVICES) {
      break;
    }
  }

  // If a request has no clear conjunctions, examine the whole request.
  // This also helps when the user enters a single, detailed sentence.
  if (detected.length === 0) {
    const scores = CATEGORY_RULES.map((rule, index) => ({
      category: rule.category,
      score: rule.keywords.filter((keyword) =>
        normalized.includes(keyword.toLowerCase())
      ).length,
      index,
    }));

    scores
      .filter((item) => item.score > 0)
      .sort(
        (a, b) => b.score - a.score || a.index - b.index
      )
      .slice(0, MAX_SERVICES)
      .forEach((item) => {
        if (!detected.includes(item.category)) {
          detected.push(item.category);
        }
      });
  }

  return detected.slice(0, MAX_SERVICES);
}

function matchesRequest(provider, request) {
  const normalized = request.trim().toLowerCase();

  if (!normalized) return false;

  const searchableText = getSearchableText(provider);

  const words = normalized
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}&-]/gu, ""))
    .filter((word) => word.length > 2);

  return words.some((word) => searchableText.includes(word));
}

function matchesCategory(provider, category) {
  const searchableText = getSearchableText(provider);
  const normalizedCategory = category.toLowerCase();

  // Prefer the provider's actual category.
  if (
    provider.category?.toLowerCase() === normalizedCategory
  ) {
    return true;
  }

  // Also match providers whose listed services name the category.
  if (
    (provider.services || []).some((service) =>
      service.toLowerCase().includes(normalizedCategory)
    )
  ) {
    return true;
  }

  // Use category-specific keywords for additional relevant matches.
  const rule = CATEGORY_RULES.find(
    (item) => item.category === category
  );

  if (!rule) return false;

  return rule.keywords.some((keyword) =>
    searchableText.includes(keyword.toLowerCase())
  );
}

function getCategoryLabel(category, t, isChinese) {
  if (!isChinese) return category;

  const keys = [
    `providerCategories.${category}`,
    `findBusiness.categories.${category}`,
  ];

  for (const key of keys) {
    const translated = t(key);

    if (translated && translated !== key) {
      return translated;
    }
  }

  return category;
}

function getProviderText(provider, field, t) {
  const key = `data.providers.${provider.id}.${field}`;
  const translated = t(key);

  if (translated && translated !== key) {
    return translated;
  }

  return provider[field] || "";
}

export default function INeedHelp() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [request, setRequest] = useState("");
  const [providerType, setProviderType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isChinese = language === "zh";

  const detectedCategories = useMemo(
    () => detectCategories(request),
    [request]
  );

  const resultsByService = useMemo(() => {
    if (!submitted || !providerType) return [];

    // If categories were detected, search for each service independently.
    if (detectedCategories.length > 0) {
      return detectedCategories.map((category) => {
        const matchingProviders = providers
          .filter((provider) => provider.type === providerType)
          .filter((provider) =>
            matchesCategory(provider, category)
          )
          .slice(0, MAX_PROVIDERS_PER_SERVICE);

        return {
          category,
          providers: matchingProviders,
        };
      });
    }

    // Fallback for requests that don't match a known category.
    const generalMatches = providers
      .filter((provider) => provider.type === providerType)
      .filter((provider) => matchesRequest(provider, request))
      .slice(0, MAX_PROVIDERS_PER_SERVICE);

    return [
      {
        category: null,
        providers: generalMatches,
      },
    ];
  }, [
    submitted,
    providerType,
    detectedCategories,
    request,
  ]);

  const totalMatches = resultsByService.reduce(
    (total, group) => total + group.providers.length,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!request.trim() || !providerType) return;

    setSubmitted(true);
  }

  function resetAssistant() {
    setRequest("");
    setProviderType("");
    setSubmitted(false);
  }

  return (
    <PageContainer width="lg" className="need-help-page">
      <section className="need-help-hero">
        <div className="need-help-hero__icon">
          <MessageCircleQuestion size={30} aria-hidden="true" />
        </div>

        <span className="need-help-hero__eyebrow">
          {isChinese ? "智能业务助手" : "Business Assistance"}
        </span>

        <h1 className="need-help-hero__title">
          {isChinese ? "我需要帮助" : "I Need Help"}
        </h1>

        <p className="need-help-hero__description">
          {isChinese
            ? "告诉我们您需要什么帮助。一次最多描述三种服务需求，我们会分别为您寻找相关服务提供商。"
            : "Tell us what your business needs. Describe up to three different services in one request, and we’ll search for relevant providers for each service."}
        </p>
      </section>

      <Card className="need-help-assistant">
        <form onSubmit={handleSubmit}>
          <label
            className="need-help-assistant__label"
            htmlFor="help-request"
          >
            {isChinese
              ? "您需要什么帮助？"
              : "What do you need help with?"}
          </label>

          <div className="need-help-assistant__input-wrap">
            <Search size={20} aria-hidden="true" />

            <textarea
              id="help-request"
              value={request}
              onChange={(event) => {
                setRequest(event.target.value);
                setSubmitted(false);
              }}
              placeholder={
                isChinese
                  ? "例如：我需要运输设备、法律协助以及清关服务。"
                  : "For example: I need to move my equipment, get legal assistance, and arrange customs clearance."
              }
              rows={4}
            />
          </div>

          <div className="need-help-detected">
            <span>
              {isChinese
                ? "识别的服务："
                : "Services identified:"}
            </span>

            {detectedCategories.length > 0 ? (
              <div className="need-help-detected__list">
                {detectedCategories.map((category) => (
                  <span
                    className="need-help-detected__item"
                    key={category}
                  >
                    {getCategoryLabel(category, t, isChinese)}
                  </span>
                ))}
              </div>
            ) : (
              <span>
                {isChinese
                  ? "请描述您的服务需求"
                  : "Describe your needs to identify services"}
              </span>
            )}
          </div>

          <p className="need-help-assistant__hint">
            {isChinese
              ? `最多识别 ${MAX_SERVICES} 种不同服务。`
              : `Up to ${MAX_SERVICES} different services can be identified in one request.`}
          </p>

          <div className="need-help-type">
            <span className="need-help-type__label">
              {isChinese
                ? "您希望与哪类服务提供商合作？"
                : "Who would you like to work with?"}
            </span>

            <div className="need-help-type__options">
              <button
                type="button"
                className={`need-help-type__option ${
                  providerType === "company" ? "is-selected" : ""
                }`}
                aria-pressed={providerType === "company"}
                onClick={() => {
                  setProviderType("company");
                  setSubmitted(false);
                }}
              >
                <Building2 size={22} aria-hidden="true" />

                <span>
                  <strong>
                    {isChinese ? "企业" : "Companies"}
                  </strong>
                  <small>
                    {isChinese
                      ? "注册的服务企业"
                      : "Registered service companies"}
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={`need-help-type__option ${
                  providerType === "independent"
                    ? "is-selected"
                    : ""
                }`}
                aria-pressed={providerType === "independent"}
                onClick={() => {
                  setProviderType("independent");
                  setSubmitted(false);
                }}
              >
                <User size={22} aria-hidden="true" />

                <span>
                  <strong>
                    {isChinese
                      ? "独立专业人士"
                      : "Independent Professionals"}
                  </strong>
                  <small>
                    {isChinese
                      ? "独立服务专业人士"
                      : "Independent service professionals"}
                  </small>
                </span>
              </button>
            </div>
          </div>

          <div className="need-help-assistant__actions">
            <Button
              type="submit"
              variant="primary"
              disabled={!request.trim() || !providerType}
            >
              {isChinese
                ? "查找服务提供商"
                : "Find Service Providers"}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>

            {(request || providerType || submitted) && (
              <Button
                type="button"
                variant="secondary"
                onClick={resetAssistant}
              >
                <RotateCcw size={16} aria-hidden="true" />
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            )}
          </div>
        </form>
      </Card>

      {submitted && (
        <section className="need-help-results">
          <div className="need-help-results__header">
            <div>
              <span className="need-help-results__eyebrow">
                {isChinese ? "匹配结果" : "Matching Providers"}
              </span>

              <h2>
                {isChinese
                  ? "您的服务需求匹配结果"
                  : "Results for your service needs"}
              </h2>
            </div>

            <span className="need-help-results__count">
              {totalMatches} {isChinese ? "个结果" : "results"}
            </span>
          </div>

          {totalMatches > 0 ? (
            <div className="need-help-results__services">
              {resultsByService.map((group, index) => (
                <section
                  className="need-help-results__group"
                  key={group.category || "general"}
                >
                  <div className="need-help-results__group-header">
                    <div>
                      <span className="need-help-results__service-number">
                        {isChinese
                          ? `服务 ${index + 1}`
                          : `SERVICE ${index + 1}`}
                      </span>

                      <h3>
                        {group.category
                          ? getCategoryLabel(
                              group.category,
                              t,
                              isChinese
                            )
                          : isChinese
                            ? "相关服务提供商"
                            : "Relevant Service Providers"}
                      </h3>
                    </div>

                    <span className="need-help-results__count">
                      {group.providers.length}{" "}
                      {isChinese ? "个结果" : "matches"}
                    </span>
                  </div>

                  {group.providers.length > 0 ? (
                    <div className="need-help-results__grid">
                      {group.providers.map((provider) => (
                        <Card
                          key={provider.id}
                          className="need-help-provider"
                          accent={provider.verified ? "gold" : null}
                        >
                          <div className="need-help-provider__top">
                            <span className="need-help-provider__type">
                              {provider.type === "company" ? (
                                <Building2
                                  size={15}
                                  aria-hidden="true"
                                />
                              ) : (
                                <User
                                  size={15}
                                  aria-hidden="true"
                                />
                              )}

                              {provider.type === "company"
                                ? isChinese
                                  ? "企业"
                                  : "Company"
                                : isChinese
                                  ? "独立专业人士"
                                  : "Independent Professional"}
                            </span>

                            {provider.verified && (
                              <span className="need-help-provider__verified">
                                <BadgeCheck
                                  size={14}
                                  aria-hidden="true"
                                />
                                {isChinese ? "已验证" : "Verified"}
                              </span>
                            )}
                          </div>

                          <h3>
                            {getProviderText(
                              provider,
                              "name",
                              t
                            )}
                          </h3>

                          <p className="need-help-provider__category">
                            {getProviderText(
                              provider,
                              "category",
                              t
                            )}
                          </p>

                          <p className="need-help-provider__description">
                            {getProviderText(
                              provider,
                              "description",
                              t
                            )}
                          </p>

                          <div className="need-help-provider__meta">
                            <span>
                              {getProviderText(
                                provider,
                                "location",
                                t
                              )}
                            </span>

                            <span>
                              {getProviderText(
                                provider,
                                "experience",
                                t
                              )}{" "}
                              {isChinese ? "经验" : "experience"}
                            </span>
                          </div>

                          <div className="need-help-provider__footer">
                            <span>
                              {getProviderText(
                                provider,
                                "pricing",
                                t
                              )}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/provider/${provider.id}`)
                              }
                            >
                              {isChinese
                                ? "查看资料"
                                : "View Profile"}
                              <ArrowRight
                                size={15}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="need-help-empty">
                      <p>
                        {isChinese
                          ? "暂时没有找到此类服务的匹配提供商。"
                          : "No matching providers were found for this service."}
                      </p>
                    </Card>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <Card className="need-help-empty">
              <MessageCircleQuestion
                size={26}
                aria-hidden="true"
              />

              <h3>
                {isChinese
                  ? "暂时没有找到匹配的服务提供商"
                  : "No matching providers found"}
              </h3>

              <p>
                {isChinese
                  ? "尝试描述更多细节，或选择其他服务提供商类型。"
                  : "Try describing your requirements differently, or choose another provider type."}
              </p>

              <Button
                type="button"
                variant="secondary"
                onClick={resetAssistant}
              >
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            </Card>
          )}

          <p className="need-help-demo-note">
            {isChinese
              ? "演示说明：以上企业和专业人士均为原型演示用示例数据，尚不能据此确认其真实身份或资质。"
              : "Demo notice: These are sample listings for the prototype. Their real-world identity and credentials have not been established by this demo."}
          </p>
        </section>
      )}
    </PageContainer>
  );
}
