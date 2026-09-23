import { MapPinned } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PlaceholderSection from "../components/PlaceholderSection";

export default function ArrivalGuide() {
const { t } = useLanguage();

return (
<PlaceholderSection
title={t("arrivalGuide.title")}
description={t("arrivalGuide.description")}
icon={MapPinned}
/>
);
}
