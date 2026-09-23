import { Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PlaceholderSection from "../components/PlaceholderSection";

export default function NotFound() {
const { t } = useLanguage();

return (
<PlaceholderSection
title={t("notFound.title")}
description={t("notFound.description")}
icon={Compass}
/>
);
}
