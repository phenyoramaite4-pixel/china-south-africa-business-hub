import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { useRegistration } from "../context/RegistrationContext";
import PageContainer from "../components/PageContainer";

import {
  VERIFICATION_SUBMISSIONS,
  normalizeRegistration,
} from "./Admin";

export default function VerificationCentre() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const { registrations } = useRegistration();

  const isChinese = language === "zh";

  const text = (english, chinese) =>
    isChinese ? chinese : english;

  const allSubmissions = [
    ...VERIFICATION_SUBMISSIONS,

    ...registrations
      .filter(
        (registration) =>
          !VERIFICATION_SUBMISSIONS.some(
            (submission) =>
              submission.name === registration.name
          )
      )
      .map(normalizeRegistration),
  ];

  const pendingSubmissions = allSubmissions.filter(
    (submission) =>
      submission.status === "pending" ||
      !submission.status
  );

  function openVerification(submission) {
    navigate("/admin", {
      state: {
        verification: submission,
      },
    });
  }

  return (
    <PageContainer className="admin-page">
      <div className="admin-dashboard">
        <section className="admin-dashboard__hero">
          <div>
            <span className="admin-dashboard__eyebrow">
              {text(
                "Verification Centre",
                "验证中心"
              )}
            </span>

            <h1>
              {text(
                "Pending Verifications",
                "待验证资料"
              )}
            </h1>

            <p>
              {text(
                "Review all participant profiles waiting for administrator verification.",
                "查看所有等待管理员验证的参与者资料。"
              )}
            </p>
          </div>

          <div className="admin-dashboard__hero-status">
            <ShieldCheck size={18} />

            <div>
              <span>
                {text(
                  "Verification Queue",
                  "验证队列"
                )}
              </span>

              <strong>
                {pendingSubmissions.length}{" "}
                {text(
                  "Pending",
                  "待处理"
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="admin-dashboard__intro">
          <div>
            <span className="admin-dashboard__section-eyebrow">
              {text(
                "Verification Centre",
                "验证中心"
              )}
            </span>

            <h2>
              {text(
                "Review every pending submission from one central workspace.",
                "在一个中央工作区审核所有待验证提交。"
              )}
            </h2>

            <p>
              {text(
                "Select a participant to review their profile, documents, gallery, projects, partners and references.",
                "选择参与者以审核其资料、文件、图片、项目、合作伙伴和推荐人信息。"
              )}
            </p>
          </div>

          <button
            type="button"
            className="admin-dashboard__secondary-button"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft size={16} />

            {text(
              "Back to Dashboard",
              "返回仪表板"
            )}
          </button>
        </section>

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-heading">
            <div>
              <span className="admin-dashboard__section-eyebrow">
                {text(
                  "Pending Verification",
                  "待验证"
                )}
              </span>

              <h2>
                {text(
                  "All profiles waiting for review.",
                  "所有等待审核的资料。"
                )}
              </h2>
            </div>

            <div className="admin-dashboard__pending-count">
              {pendingSubmissions.length}
            </div>
          </div>

          <div className="admin-dashboard__verification-list">
            {pendingSubmissions.length === 0 ? (
              <div className="admin-dashboard__empty">
                {text(
                  "There are currently no pending verification submissions.",
                  "目前没有待验证的提交。"
                )}
              </div>
            ) : (
              pendingSubmissions.map((submission) => (
                <div
                  className="admin-dashboard__verification-row"
                  key={submission.id}
                >
                  <div className="admin-dashboard__verification-main">
                    <div className="admin-dashboard__verification-icon">
                      {submission.typeEn ===
                      "Independent Professional" ? (
                        <BriefcaseBusiness size={19} />
                      ) : (
                        <Building2 size={19} />
                      )}
                    </div>

                    <div>
                      <strong>
                        {submission.name}
                      </strong>

                      <span>
                        {isChinese
                          ? submission.typeZh
                          : submission.typeEn}{" "}
                        •{" "}
                        {isChinese
                          ? submission.locationZh
                          : submission.locationEn}
                      </span>
                    </div>
                  </div>

                  <span className="admin-dashboard__verification-submitted">
                    {isChinese
                      ? submission.submittedZh
                      : submission.submittedEn}
                  </span>

                  <button
                    type="button"
                    className="admin-dashboard__secondary-button"
                    onClick={() =>
                      openVerification(submission)
                    }
                  >
                    {text(
                      "Review",
                      "审核"
                    )}

                    <ArrowRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="admin-dashboard__prototype-note">
          {text(
            "Prototype notice: Verification submissions shown here are demonstration data for sponsor and investor presentation purposes. Production verification data will come from the secure platform backend.",
            "原型说明：此处显示的验证提交内容为用于向赞助商和投资者展示的演示数据。正式平台的验证数据将来自安全的后端系统。"
          )}
        </div>
      </div>
    </PageContainer>
  );
}