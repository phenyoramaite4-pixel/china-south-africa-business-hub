
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkX,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import IndividualNavigation from "../components/IndividualNavigation";

import {
  getActiveOpportunities,
  getSavedOpportunityIds,
  removeSavedOpportunity,
  subscribeToOpportunities,
  subscribeToSavedOpportunities,
} from "../data/opportunityStore";

import "./IndividualSaved.css";

function isChineseLanguage(language) {
  return String(language || "")
    .toLowerCase()
    .startsWith("zh");
}

function getOpportunityText(opportunity, key, isChinese) {
  if (isChinese) {
    const chineseKey = `${key}Zh`;

    if (
      opportunity[chineseKey] &&
      String(opportunity[chineseKey]).trim()
    ) {
      return opportunity[chineseKey];
    }
  }

  return opportunity[key] || "";
}

export default function IndividualSaved() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isChinese = isChineseLanguage(language);

  const [opportunities, setOpportunities] = useState(
    () => getActiveOpportunities()
  );

  const [savedIds, setSavedIds] = useState(
    () => getSavedOpportunityIds()
  );

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const unsubscribeOpportunities =
      subscribeToOpportunities((updated) => {
        setOpportunities(updated);
      });

    const unsubscribeSaved =
      subscribeToSavedOpportunities((updatedIds) => {
        setSavedIds(updatedIds);
      });

    return () => {
      unsubscribeOpportunities();
      unsubscribeSaved();
    };
  }, []);

  const savedOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) =>
      savedIds.includes(String(opportunity.id))
    );
  }, [opportunities, savedIds]);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return savedOpportunities.filter((opportunity) => {
      const matchesType =
        selectedType === "all" ||
        opportunity.type === selectedType;

      if (!matchesType) return false;

      if (!query) return true;

      const searchableText = [
        opportunity.title,
        opportunity.titleZh,
        opportunity.description,
        opportunity.descriptionZh,
        opportunity.organisation,
        opportunity.organisationZh,
        opportunity.location,
        opportunity.locationZh,
        opportunity.category,
        opportunity.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [savedOpportunities, search, selectedType]);

  function handleRemove(id) {
    removeSavedOpportunity(id);
    setSavedIds(getSavedOpportunityIds());
  }

  function handleBrowse() {
    navigate("/opportunities", {
      state: { fromIndividualDashboard: true },
    });
  }

  function handleOpenOpportunity(opportunity) {
    /*
     * Open the existing opportunity detail view.
     * The existing Opportunities page reads this state
     * to display the selected opportunity.
     */
    navigate("/opportunities", {
      state: {
        fromIndividualDashboard: true,
        selectedOpportunityId: opportunity.id,
      },
    });
  }

  function clearFilters() {
    setSearch("");
    setSelectedType("all");
  }

  const typeLabels = {
    Partnership: isChinese ? "合作伙伴" : "Partnership",
    Investment: isChinese ? "投资机会" : "Investment",
    Supplier: isChinese ? "供应商机会" : "Supplier",
    "Joint Venture": isChinese ? "合资企业" : "Joint Venture",
  };

  return (
    <div className="individual-saved-page">
      <div className="individual-saved-layout">
        <IndividualNavigation />

        <main className="individual-saved-content">
          <button
            type="button"
            className="individual-saved-back"
            onClick={() => navigate("/individual-dashboard")}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            {isChinese ? "返回个人首页" : "Back to Dashboard"}
          </button>

          <section className="individual-saved-hero">
            <div className="individual-saved-hero__icon">
              <Bookmark size={28} aria-hidden="true" />
            </div>

            <span className="individual-saved-eyebrow">
              {isChinese ? "个人门户" : "INDIVIDUAL PORTAL"}
            </span>

            <h1>
              {isChinese ? "已收藏的机会" : "Saved Opportunities"}
            </h1>

            <p>
              {isChinese
                ? "在这里查看您收藏的商业机会，随时回来继续探索。"
                : "Keep track of business opportunities you have bookmarked and return to them whenever you're ready."}
            </p>

            <div className="individual-saved-total">
              <Bookmark size={17} aria-hidden="true" />
              <strong>{savedOpportunities.length}</strong>
              <span>
                {isChinese ? "个已收藏机会" : "saved opportunities"}
              </span>
            </div>
          </section>

          <section className="individual-saved-controls">
            <div className="individual-saved-search">
              <Search size={19} aria-hidden="true" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  isChinese
                    ? "搜索已收藏的机会..."
                    : "Search saved opportunities..."
                }
                aria-label={
                  isChinese
                    ? "搜索已收藏的机会"
                    : "Search saved opportunities"
                }
              />
            </div>

            <div className="individual-saved-filter">
              <label htmlFor="saved-opportunity-type">
                {isChinese ? "机会类型" : "Opportunity type"}
              </label>

              <select
                id="saved-opportunity-type"
                value={selectedType}
                onChange={(event) =>
                  setSelectedType(event.target.value)
                }
              >
                <option value="all">
                  {isChinese ? "全部类型" : "All types"}
                </option>
                <option value="Partnership">
                  {typeLabels.Partnership}
                </option>
                <option value="Investment">
                  {typeLabels.Investment}
                </option>
                <option value="Supplier">
                  {typeLabels.Supplier}
                </option>
                <option value="Joint Venture">
                  {typeLabels["Joint Venture"]}
                </option>
              </select>
            </div>

            {(search || selectedType !== "all") && (
              <button
                type="button"
                className="individual-saved-clear"
                onClick={clearFilters}
              >
                {isChinese ? "清除筛选" : "Clear filters"}
              </button>
            )}
          </section>

          <section className="individual-saved-results">
            <div className="individual-saved-results__heading">
              <div>
                <span className="individual-saved-eyebrow">
                  {isChinese ? "您的收藏" : "YOUR BOOKMARKS"}
                </span>

                <h2>
                  {isChinese ? "收藏列表" : "Your saved list"}
                </h2>
              </div>

              <span className="individual-saved-results__count">
                {filteredOpportunities.length}{" "}
                {isChinese ? "个结果" : "results"}
              </span>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="individual-saved-grid">
                {filteredOpportunities.map((opportunity) => (
                  <article
                    key={opportunity.id}
                    className="individual-saved-card"
                  >
                    <div className="individual-saved-card__top">
                      <span className="individual-saved-card__type">
                        <BriefcaseBusiness
                          size={15}
                          aria-hidden="true"
                        />
                        {typeLabels[opportunity.type] ||
                          getOpportunityText(
                            opportunity,
                            "type",
                            isChinese
                          )}
                      </span>

                      <button
                        type="button"
                        className="individual-saved-remove-icon"
                        onClick={() =>
                          handleRemove(opportunity.id)
                        }
                        aria-label={
                          isChinese
                            ? `取消收藏：${getOpportunityText(
                                opportunity,
                                "title",
                                true
                              )}`
                            : `Remove ${opportunity.title} from saved opportunities`
                        }
                        title={
                          isChinese
                            ? "取消收藏"
                            : "Remove saved opportunity"
                        }
                      >
                        <BookmarkX
                          size={19}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <h3>
                      {getOpportunityText(
                        opportunity,
                        "title",
                        isChinese
                      )}
                    </h3>

                    <p className="individual-saved-card__description">
                      {getOpportunityText(
                        opportunity,
                        "description",
                        isChinese
                      )}
                    </p>

                    <div className="individual-saved-card__details">
                      <span>
                        <MapPin size={15} aria-hidden="true" />
                        {getOpportunityText(
                          opportunity,
                          "location",
                          isChinese
                        )}
                      </span>

                      {getOpportunityText(
                        opportunity,
                        "organisation",
                        isChinese
                      ) && (
                        <span>
                          <Building2
                            size={15}
                            aria-hidden="true"
                          />
                          {getOpportunityText(
                            opportunity,
                            "organisation",
                            isChinese
                          )}
                        </span>
                      )}
                    </div>

                    {getOpportunityText(
                      opportunity,
                      "category",
                      isChinese
                    ) && (
                      <span className="individual-saved-card__category">
                        {getOpportunityText(
                          opportunity,
                          "category",
                          isChinese
                        )}
                      </span>
                    )}

                    <div className="individual-saved-card__actions">
                      <button
                        type="button"
                        className="individual-saved-open"
                        onClick={() =>
                          handleOpenOpportunity(opportunity)
                        }
                      >
                        {isChinese ? "查看详情" : "View details"}
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        className="individual-saved-remove"
                        onClick={() =>
                          handleRemove(opportunity.id)
                        }
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        {isChinese ? "移除" : "Remove"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="individual-saved-empty">
                <div className="individual-saved-empty__icon">
                  {savedOpportunities.length === 0 ? (
                    <Bookmark size={30} aria-hidden="true" />
                  ) : (
                    <Search size={30} aria-hidden="true" />
                  )}
                </div>

                <h3>
                  {savedOpportunities.length === 0
                    ? isChinese
                      ? "您还没有收藏任何机会"
                      : "No saved opportunities yet"
                    : isChinese
                      ? "没有找到匹配的机会"
                      : "No matching opportunities found"}
                </h3>

                <p>
                  {savedOpportunities.length === 0
                    ? isChinese
                      ? "浏览商业机会，点击“收藏”按钮，就可以将感兴趣的机会保存在这里。"
                      : "Browse business opportunities and select Save on anything you want to revisit. It will appear here."
                    : isChinese
                      ? "尝试更改关键词或清除筛选条件。"
                      : "Try a different search or clear your filters."}
                </p>

                {savedOpportunities.length === 0 ? (
                  <button
                    type="button"
                    className="individual-saved-browse"
                    onClick={handleBrowse}
                  >
                    {isChinese ? "浏览商业机会" : "Browse Opportunities"}
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="individual-saved-browse"
                    onClick={clearFilters}
                  >
                    {isChinese ? "清除筛选" : "Clear filters"}
                  </button>
                )}
              </div>
            )}
          </section>

          <p className="individual-saved-notice">
            {isChinese
              ? "原型演示：收藏记录保存在当前浏览器中，尚未连接后端。"
              : "Prototype demo: Saved items are stored in this browser and are not connected to a backend yet."}
          </p>
        </main>
      </div>
    </div>
  );
}