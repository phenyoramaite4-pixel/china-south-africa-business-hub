import { useMemo, useState } from "react";
import {
Search,
SlidersHorizontal,
MapPin,
Building2,
BadgeCheck,
X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import ProviderCard from "../components/ProviderCard";
import { providers } from "../data/demoData";

const PROVINCES = [
{ value: "all", translationKey: "findBusiness.allProvinces" },
{ value: "Gauteng", translationKey: "findBusiness.gauteng" },
{ value: "KwaZulu-Natal", translationKey: "findBusiness.kwazuluNatal" },
{ value: "Western Cape", translationKey: "findBusiness.westernCape" },
{ value: "Eastern Cape", translationKey: "findBusiness.easternCape" },
{ value: "Limpopo", translationKey: "findBusiness.limpopo" },
{ value: "Mpumalanga", translationKey: "findBusiness.mpumalanga" },
{ value: "North West", translationKey: "findBusiness.northWest" },
{ value: "Free State", translationKey: "findBusiness.freeState" },
{ value: "Northern Cape", translationKey: "findBusiness.northernCape" },
];

const CATEGORY_LABELS = {
"Agricultural Technology": "data.providers.p20.category",
Agriculture: "data.providers.p11.category",
"Business Consulting": "data.providers.p9.category",
Construction: "data.providers.p5.category",
"Construction Materials Sourcing": "data.providers.p14.category",
"Customs & Trade Compliance": "data.providers.p19.category",
"Electronics Manufacturing": "data.providers.p16.category",
"Import & Export": "data.providers.p2.category",
"Import & Export Consulting": "data.providers.p10.category",
"Industrial Equipment": "data.providers.p6.category",
"Legal & Compliance Consulting": "data.providers.p3.category",
"Logistics & Freight": "data.providers.p1.category",
Manufacturing: "data.providers.p18.category",
"Manufacturing Sourcing": "data.providers.p4.category",
"Market Entry Consulting": "data.providers.p17.category",
"Mining & Industrial Services": "data.providers.p15.category",
Packaging: "data.providers.p12.category",
"Renewable Energy": "data.providers.p7.category",
Technology: "data.providers.p13.category",
"Supplier Sourcing": "data.providers.p50.category",
};

export default function FindBusiness() {
const { t } = useLanguage();

const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [province, setProvince] = useState("all");
const [providerType, setProviderType] = useState("all");
const [verifiedOnly, setVerifiedOnly] = useState(false);

const categories = useMemo(() => {
return [...new Set(providers.map((provider) => provider.category))].sort();
}, []);

const filteredProviders = useMemo(() => {
const query = search.trim().toLowerCase();

return providers.filter((provider) => {
  const searchableText = [
    provider.name,
    provider.category,
    provider.description,
    provider.location,
    ...(provider.services || []),
  ]
    .join(" ")
    .toLowerCase();

  const matchesSearch =
    !query || searchableText.includes(query);

  const matchesCategory =
    category === "all" || provider.category === category;

  const providerProvince = provider.location
    .split(",")
    .slice(-1)[0]
    .trim();

  const matchesProvince =
    province === "all" ||
    providerProvince.toLowerCase() === province.toLowerCase();

  const matchesType =
    providerType === "all" ||
    provider.type === providerType;

  const matchesVerified =
    !verifiedOnly || provider.verified;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesProvince &&
    matchesType &&
    matchesVerified
  );
});

}, [
search,
category,
province,
providerType,
verifiedOnly,
]);

const hasActiveFilters =
Boolean(search) ||
category !== "all" ||
province !== "all" ||
providerType !== "all" ||
verifiedOnly;

function clearFilters() {
setSearch("");
setCategory("all");
setProvince("all");
setProviderType("all");
setVerifiedOnly(false);
}

return ( <PageContainer> <section style={styles.hero}> <div style={styles.heroContent}> <div style={styles.eyebrow}> <Building2 size={16} aria-hidden="true" /> <span>{t("findBusiness.businessDirectory")}</span> </div>

      <h1 style={styles.title}>
        {t("findBusiness.title")}
      </h1>

      <p style={styles.description}>
        {t("findBusiness.description")}
      </p>
    </div>
  </section>

  <section style={styles.searchSection}>
    <div style={styles.searchBox}>
      <Search size={21} aria-hidden="true" />

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={t("findBusiness.searchPlaceholder")}
        aria-label={t("findBusiness.searchLabel")}
        style={styles.searchInput}
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          style={styles.clearSearch}
          aria-label={t("findBusiness.clearFilters")}
        >
          <X size={18} />
        </button>
      )}
    </div>

    <div style={styles.filterHeader}>
      <div style={styles.filterTitle}>
        <SlidersHorizontal size={18} aria-hidden="true" />
        <strong>{t("findBusiness.filterResults")}</strong>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          style={styles.clearFilters}
        >
          {t("findBusiness.clearAll")}
        </button>
      )}
    </div>

    <div style={styles.filters}>
      <label style={styles.filterField}>
        <span>{t("findBusiness.industryCategory")}</span>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={styles.select}
        >
          <option value="all">
            {t("findBusiness.allIndustries")}
          </option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {CATEGORY_LABELS[item]
                ? t(CATEGORY_LABELS[item])
                : item}
            </option>
          ))}
        </select>
      </label>

      <label style={styles.filterField}>
        <span>{t("findBusiness.location")}</span>

        <select
          value={province}
          onChange={(event) => setProvince(event.target.value)}
          style={styles.select}
        >
          {PROVINCES.map((item) => (
            <option key={item.value} value={item.value}>
              {t(item.translationKey)}
            </option>
          ))}
        </select>
      </label>

      <label style={styles.filterField}>
        <span>{t("findBusiness.providerType")}</span>

        <select
          value={providerType}
          onChange={(event) => setProviderType(event.target.value)}
          style={styles.select}
        >
          <option value="all">
            {t("findBusiness.companiesProfessionals")}
          </option>

          <option value="company">
            {t("home.providers.typeCompany")}
          </option>

          <option value="independent">
            {t("home.providers.typeIndependent")}
          </option>
        </select>
      </label>

      <label style={styles.checkboxField}>
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(event) => setVerifiedOnly(event.target.checked)}
        />

        <span style={styles.checkboxText}>
          <BadgeCheck size={17} aria-hidden="true" />
          {t("findBusiness.verifiedOnly")}
        </span>
      </label>
    </div>
  </section>

  <section style={styles.resultsSection}>
    <div style={styles.resultsHeader}>
      <div>
        <h2 style={styles.resultsTitle}>
          {t("findBusiness.businessesProfessionals")}
        </h2>

        <p style={styles.resultsCount}>
          {t("findBusiness.showing")} {filteredProviders.length}{" "}
          {t("findBusiness.of")} {providers.length}{" "}
          {t("findBusiness.providers")}
        </p>
      </div>

      <div style={styles.resultBadge}>
        <MapPin size={15} aria-hidden="true" />
        {t("findBusiness.southAfrica")}
      </div>
    </div>

    {filteredProviders.length > 0 ? (
      <div style={styles.grid}>
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
          />
        ))}
      </div>
    ) : (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>
          <Search size={28} aria-hidden="true" />
        </div>

        <h3 style={styles.emptyTitle}>
          {t("findBusiness.noResults")}
        </h3>

        <p style={styles.emptyText}>
          {t("findBusiness.noResultsDescription")}
        </p>

        <button
          type="button"
          onClick={clearFilters}
          style={styles.emptyButton}
        >
          {t("findBusiness.clearFilters")}
        </button>
      </div>
    )}
  </section>
</PageContainer>

);
}

const styles = {
hero: {
padding: "42px 0 30px",
},

heroContent: {
maxWidth: "760px",
},

eyebrow: {
display: "inline-flex",
alignItems: "center",
gap: "8px",
fontSize: "13px",
fontWeight: 700,
letterSpacing: "0.08em",
textTransform: "uppercase",
marginBottom: "14px",
},

title: {
margin: 0,
fontSize: "clamp(32px, 5vw, 48px)",
lineHeight: 1.08,
},

description: {
margin: "16px 0 0",
maxWidth: "680px",
fontSize: "17px",
lineHeight: 1.7,
opacity: 0.78,
},

searchSection: {
marginBottom: "42px",
padding: "24px",
borderRadius: "18px",
border: "1px solid rgba(11, 37, 69, 0.10)",
background: "#ffffff",
boxShadow: "0 12px 30px rgba(11, 37, 69, 0.06)",
},

searchBox: {
display: "flex",
alignItems: "center",
gap: "12px",
minHeight: "54px",
padding: "0 16px",
borderRadius: "12px",
border: "1px solid rgba(11, 37, 69, 0.16)",
background: "#f8fafc",
},

searchInput: {
width: "100%",
border: 0,
outline: 0,
background: "transparent",
fontSize: "15px",
color: "inherit",
},

clearSearch: {
display: "grid",
placeItems: "center",
border: 0,
background: "transparent",
cursor: "pointer",
padding: "4px",
},

filterHeader: {
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "16px",
marginTop: "24px",
marginBottom: "16px",
},

filterTitle: {
display: "flex",
alignItems: "center",
gap: "8px",
},

clearFilters: {
border: 0,
background: "transparent",
cursor: "pointer",
fontWeight: 700,
fontSize: "13px",
textDecoration: "underline",
},

filters: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
gap: "14px",
},

filterField: {
display: "flex",
flexDirection: "column",
gap: "7px",
fontSize: "13px",
fontWeight: 700,
},

select: {
width: "100%",
minHeight: "44px",
padding: "0 12px",
borderRadius: "9px",
border: "1px solid rgba(11, 37, 69, 0.16)",
background: "#ffffff",
fontSize: "14px",
cursor: "pointer",
},

checkboxField: {
display: "flex",
alignItems: "flex-end",
minHeight: "68px",
cursor: "pointer",
},

checkboxText: {
display: "inline-flex",
alignItems: "center",
gap: "7px",
},

resultsSection: {
paddingBottom: "50px",
},

resultsHeader: {
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "20px",
marginBottom: "22px",
},

resultsTitle: {
margin: 0,
fontSize: "24px",
},

resultsCount: {
margin: "5px 0 0",
fontSize: "14px",
opacity: 0.68,
},

resultBadge: {
display: "inline-flex",
alignItems: "center",
gap: "7px",
padding: "8px 12px",
borderRadius: "999px",
background: "rgba(22, 160, 133, 0.10)",
fontSize: "12px",
fontWeight: 700,
whiteSpace: "nowrap",
},

grid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
gap: "20px",
},

emptyState: {
textAlign: "center",
padding: "70px 24px",
borderRadius: "18px",
border: "1px dashed rgba(11, 37, 69, 0.18)",
background: "#f8fafc",
},

emptyIcon: {
width: "58px",
height: "58px",
margin: "0 auto 16px",
display: "grid",
placeItems: "center",
borderRadius: "50%",
background: "rgba(11, 37, 69, 0.08)",
},

emptyTitle: {
margin: 0,
fontSize: "20px",
},

emptyText: {
maxWidth: "450px",
margin: "10px auto 20px",
lineHeight: 1.6,
opacity: 0.7,
},

emptyButton: {
border: 0,
borderRadius: "9px",
padding: "11px 18px",
fontWeight: 700,
cursor: "pointer",
background: "#0B2545",
color: "#ffffff",
},
};
