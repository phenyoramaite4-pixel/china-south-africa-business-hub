
import { opportunities as demoOpportunities } from "./demoData";

export const OPPORTUNITIES_STORAGE_KEY =
  "chinaHubOpportunities";

export const OPPORTUNITIES_UPDATED_EVENT =
  "chinaHubOpportunitiesUpdated";

export const SAVED_OPPORTUNITIES_STORAGE_KEY =
  "chinaHubSavedOpportunities";

export const SAVED_OPPORTUNITIES_UPDATED_EVENT =
  "chinaHubSavedOpportunitiesUpdated";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function safeParse(value) {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
}

function createOpportunityId() {
  return `opp-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function normalizeOpportunity(
  opportunity,
  index = 0
) {
  return {
    id:
      opportunity.id ||
      `opp-${Date.now()}-${index}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,

    type: opportunity.type || "Partnership",

    title: opportunity.title || "",

    titleZh: opportunity.titleZh || "",

    description: opportunity.description || "",

    descriptionZh: opportunity.descriptionZh || "",

    organisation: opportunity.organisation || "",

    organisationZh: opportunity.organisationZh || "",

    location: opportunity.location || "",

    locationZh: opportunity.locationZh || "",

    category: opportunity.category || "",

    budget: opportunity.budget || "",

    budgetZh: opportunity.budgetZh || "",

    deadline: opportunity.deadline || "",

    eligibility: opportunity.eligibility || "",

    eligibilityZh: opportunity.eligibilityZh || "",

    expressionsOfInterest: Number(
      opportunity.expressionsOfInterest || 0
    ),

    status: opportunity.status || "active",
  };
}

/*
|--------------------------------------------------------------------------
| GET ALL OPPORTUNITIES
|--------------------------------------------------------------------------
*/

export function getAllOpportunities() {
  if (typeof window === "undefined") {
    return demoOpportunities.map(
      normalizeOpportunity
    );
  }

  try {
    const stored = safeParse(
      window.localStorage.getItem(
        OPPORTUNITIES_STORAGE_KEY
      )
    );

    if (stored) {
      return stored.map(normalizeOpportunity);
    }

    const seeded = demoOpportunities.map(
      normalizeOpportunity
    );

    window.localStorage.setItem(
      OPPORTUNITIES_STORAGE_KEY,
      JSON.stringify(seeded)
    );

    return seeded;
  } catch (error) {
    console.error(
      "Unable to read opportunities:",
      error
    );

    return demoOpportunities.map(
      normalizeOpportunity
    );
  }
}

/*
|--------------------------------------------------------------------------
| GET ACTIVE OPPORTUNITIES
|--------------------------------------------------------------------------
*/

export function getActiveOpportunities() {
  return getAllOpportunities().filter(
    (opportunity) =>
      opportunity.status === "active"
  );
}

/*
|--------------------------------------------------------------------------
| SAVE ALL OPPORTUNITIES
|--------------------------------------------------------------------------
*/

export function saveAllOpportunities(
  opportunities
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalized = opportunities.map(
      normalizeOpportunity
    );

    window.localStorage.setItem(
      OPPORTUNITIES_STORAGE_KEY,
      JSON.stringify(normalized)
    );

    window.dispatchEvent(
      new CustomEvent(
        OPPORTUNITIES_UPDATED_EVENT
      )
    );
  } catch (error) {
    console.error(
      "Unable to save opportunities:",
      error
    );
  }
}

/*
|--------------------------------------------------------------------------
| ADD OPPORTUNITY
|--------------------------------------------------------------------------
*/

export function addOpportunity(opportunity) {
  const current = getAllOpportunities();

  const newOpportunity = normalizeOpportunity({
    ...opportunity,

    id: opportunity.id || createOpportunityId(),

    expressionsOfInterest:
      opportunity.expressionsOfInterest || 0,

    status: opportunity.status || "active",
  });

  const updated = [
    ...current,
    newOpportunity,
  ];

  saveAllOpportunities(updated);

  return newOpportunity;
}

/*
|--------------------------------------------------------------------------
| UPDATE OPPORTUNITY
|--------------------------------------------------------------------------
*/

export function updateOpportunity(id, changes) {
  const current = getAllOpportunities();

  const updated = current.map(
    (opportunity) =>
      opportunity.id === id
        ? normalizeOpportunity({
            ...opportunity,
            ...changes,
            id: opportunity.id,
          })
        : opportunity
  );

  saveAllOpportunities(updated);

  return (
    updated.find(
      (opportunity) => opportunity.id === id
    ) || null
  );
}

/*
|--------------------------------------------------------------------------
| DELETE OPPORTUNITY
|--------------------------------------------------------------------------
*/

export function deleteOpportunity(id) {
  const current = getAllOpportunities();

  const updated = current.filter(
    (opportunity) => opportunity.id !== id
  );

  saveAllOpportunities(updated);

  return updated;
}

/*
|--------------------------------------------------------------------------
| CHANGE OPPORTUNITY STATUS
|--------------------------------------------------------------------------
*/

export function setOpportunityStatus(id, status) {
  return updateOpportunity(id, { status });
}

/*
|--------------------------------------------------------------------------
| INCREMENT INTEREST
|--------------------------------------------------------------------------
*/

export function incrementOpportunityInterest(id) {
  const current = getAllOpportunities();

  const updated = current.map(
    (opportunity) =>
      opportunity.id === id
        ? {
            ...opportunity,
            expressionsOfInterest:
              Number(
                opportunity.expressionsOfInterest || 0
              ) + 1,
          }
        : opportunity
  );

  saveAllOpportunities(updated);

  return (
    updated.find(
      (opportunity) => opportunity.id === id
    ) || null
  );
}

/*
|--------------------------------------------------------------------------
| RESET TO DEMO DATA
|--------------------------------------------------------------------------
*/

export function resetOpportunitiesToDemo() {
  const seeded = demoOpportunities.map(
    normalizeOpportunity
  );

  saveAllOpportunities(seeded);

  return seeded;
}

/*
|--------------------------------------------------------------------------
| SUBSCRIBE TO ALL OPPORTUNITY CHANGES
|--------------------------------------------------------------------------
*/

export function subscribeToOpportunityChanges(
  callback
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => {
    callback(getAllOpportunities());
  };

  const handleStorage = (event) => {
    if (
      event.key === OPPORTUNITIES_STORAGE_KEY
    ) {
      notify();
    }
  };

  const handleCustomEvent = () => {
    notify();
  };

  window.addEventListener(
    "storage",
    handleStorage
  );

  window.addEventListener(
    OPPORTUNITIES_UPDATED_EVENT,
    handleCustomEvent
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage
    );

    window.removeEventListener(
      OPPORTUNITIES_UPDATED_EVENT,
      handleCustomEvent
    );
  };
}

/*
|--------------------------------------------------------------------------
| SUBSCRIBE TO ACTIVE PUBLIC OPPORTUNITIES
|--------------------------------------------------------------------------
*/

export function subscribeToOpportunities(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => {
    callback(getActiveOpportunities());
  };

  const handleStorage = (event) => {
    if (
      event.key === OPPORTUNITIES_STORAGE_KEY
    ) {
      notify();
    }
  };

  const handleCustomEvent = () => {
    notify();
  };

  window.addEventListener(
    "storage",
    handleStorage
  );

  window.addEventListener(
    OPPORTUNITIES_UPDATED_EVENT,
    handleCustomEvent
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage
    );

    window.removeEventListener(
      OPPORTUNITIES_UPDATED_EVENT,
      handleCustomEvent
    );
  };
}

/*
|--------------------------------------------------------------------------
| SAVED OPPORTUNITIES — INDIVIDUAL PORTAL
|--------------------------------------------------------------------------
| Saved IDs are stored separately from the opportunity records.
| This prevents bookmarking from changing the public opportunity data.
|--------------------------------------------------------------------------
*/

/*
| GET SAVED OPPORTUNITY IDS
*/

export function getSavedOpportunityIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = safeParse(
      window.localStorage.getItem(
        SAVED_OPPORTUNITIES_STORAGE_KEY
      )
    );

    if (!stored) {
      return [];
    }

    return [
      ...new Set(
        stored.filter(
          (id) => typeof id === "string"
        )
      ),
    ];
  } catch (error) {
    console.error(
      "Unable to read saved opportunities:",
      error
    );

    return [];
  }
}

/*
| GET SAVED OPPORTUNITY RECORDS
| Only currently active opportunities are returned.
*/

export function getSavedOpportunities() {
  const savedIds = getSavedOpportunityIds();
  const activeOpportunities = getActiveOpportunities();

  return activeOpportunities.filter(
    (opportunity) =>
      savedIds.includes(String(opportunity.id))
  );
}

/*
| SAVE SAVED OPPORTUNITY IDS
*/

export function saveSavedOpportunityIds(ids) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const uniqueIds = [
      ...new Set(
        ids.filter(
          (id) => typeof id === "string"
        )
      ),
    ];

    window.localStorage.setItem(
      SAVED_OPPORTUNITIES_STORAGE_KEY,
      JSON.stringify(uniqueIds)
    );

    window.dispatchEvent(
      new CustomEvent(
        SAVED_OPPORTUNITIES_UPDATED_EVENT
      )
    );

    return uniqueIds;
  } catch (error) {
    console.error(
      "Unable to save saved opportunities:",
      error
    );

    return getSavedOpportunityIds();
  }
}

/*
| CHECK WHETHER AN OPPORTUNITY IS SAVED
*/

export function isOpportunitySaved(id) {
  return getSavedOpportunityIds().includes(
    String(id)
  );
}

/*
| SAVE OR REMOVE AN OPPORTUNITY
| Returns true if saved, false if removed.
*/

export function toggleSavedOpportunity(id) {
  const opportunityId = String(id);

  const opportunityExists =
    getAllOpportunities().some(
      (opportunity) =>
        String(opportunity.id) === opportunityId &&
        opportunity.status === "active"
    );

  if (!opportunityExists) {
    return false;
  }

  const currentIds = getSavedOpportunityIds();

  const isSaved = currentIds.includes(
    opportunityId
  );

  const updatedIds = isSaved
    ? currentIds.filter(
        (savedId) => savedId !== opportunityId
      )
    : [...currentIds, opportunityId];

  saveSavedOpportunityIds(updatedIds);

  return !isSaved;
}

/*
| REMOVE A SAVED OPPORTUNITY
*/

export function removeSavedOpportunity(id) {
  const opportunityId = String(id);

  const currentIds = getSavedOpportunityIds();

  const updatedIds = currentIds.filter(
    (savedId) => savedId !== opportunityId
  );

  saveSavedOpportunityIds(updatedIds);

  return updatedIds;
}

/*
| CLEAR ALL SAVED OPPORTUNITIES
*/

export function clearSavedOpportunities() {
  return saveSavedOpportunityIds([]);
}

/*
| SUBSCRIBE TO SAVED OPPORTUNITY CHANGES
*/

export function subscribeToSavedOpportunities(
  callback
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => {
    callback(getSavedOpportunityIds());
  };

  const handleStorage = (event) => {
    if (
      event.key === SAVED_OPPORTUNITIES_STORAGE_KEY
    ) {
      notify();
    }
  };

  window.addEventListener(
    "storage",
    handleStorage
  );

  window.addEventListener(
    SAVED_OPPORTUNITIES_UPDATED_EVENT,
    notify
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage
    );

    window.removeEventListener(
      SAVED_OPPORTUNITIES_UPDATED_EVENT,
      notify
    );
  };
}