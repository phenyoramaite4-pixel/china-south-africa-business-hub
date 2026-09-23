import { useState } from "react";
import {
ArrowRight,
Eye,
EyeOff,
LockKeyhole,
Mail,
ShieldCheck,
UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PageContainer from "../components/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import "./Profile.css";

export default function Profile() {
const { language } = useLanguage();
const isChinese = language === "zh";
const navigate = useNavigate();

const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [forgotMode, setForgotMode] = useState(false);
const [submitted, setSubmitted] = useState(false);

function handleSubmit(event) {
event.preventDefault();

if (!identifier.trim()) return;

if (forgotMode) {
  setSubmitted(true);
  return;
}

if (!password.trim()) return;

navigate("/dashboard");

}

function switchForgotMode() {
setForgotMode(true);
setSubmitted(false);
}

function switchSignInMode() {
setForgotMode(false);
setSubmitted(false);
}

if (submitted) {
return ( <PageContainer width="sm" className="profile-page"> <section className="auth-page"> <div className="auth-brand"> <div className="auth-brand__mark"> <ShieldCheck size={27} aria-hidden="true" /> </div>

        <span className="auth-brand__eyebrow">
          {isChinese
            ? "中国—南非商业中心"
            : "China–South Africa Business Hub"}
        </span>
      </div>

      <Card className="auth-card auth-success">
        <div className="auth-success__icon">
          <ShieldCheck size={30} aria-hidden="true" />
        </div>

        <span className="auth-card__eyebrow">
          {isChinese ? "演示成功" : "Prototype Success"}
        </span>

        <h1>
          {forgotMode
            ? isChinese
              ? "重置链接已请求"
              : "Reset link requested"
            : isChinese
              ? "登录成功"
              : "Sign-in successful"}
        </h1>

        <p>
          {forgotMode
            ? isChinese
              ? "这是原型演示。正式平台将向您的注册邮箱发送密码重置链接。"
              : "This is a prototype demonstration. The live platform will send a password reset link to your registered email address."
            : isChinese
              ? "这是原型演示。正式平台将验证您的账户并将您带到相应的用户区域。"
              : "This is a prototype demonstration. The live platform will authenticate your account and take you to the appropriate user area."}
        </p>

        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setSubmitted(false);
            setForgotMode(false);
            setPassword("");
          }}
        >
          {isChinese ? "返回登录" : "Back to Sign In"}
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </Card>
    </section>
  </PageContainer>
);

}

return ( <PageContainer width="sm" className="profile-page"> <section className="auth-page"> <div className="auth-brand"> <div className="auth-brand__mark"> <ShieldCheck size={27} aria-hidden="true" /> </div>

      <span className="auth-brand__eyebrow">
        {isChinese
          ? "中国—南非商业中心"
          : "China–South Africa Business Hub"}
      </span>
    </div>

    <Card className="auth-card">
      <div className="auth-card__heading">
        <span className="auth-card__eyebrow">
          {forgotMode
            ? isChinese
              ? "账户恢复"
              : "Account Recovery"
            : isChinese
              ? "欢迎回来"
              : "Welcome Back"}
        </span>

        <h1>
          {forgotMode
            ? isChinese
              ? "重置您的密码"
              : "Reset your password"
            : isChinese
              ? "登录您的账户"
              : "Sign in to your account"}
        </h1>

        <p>
          {forgotMode
            ? isChinese
              ? "输入您的邮箱或手机号码，我们将帮助您恢复账户。"
              : "Enter your email or phone number and we'll help you recover your account."
            : isChinese
              ? "登录后连接企业、合作伙伴和商业机会。"
              : "Sign in to connect with businesses, partners and opportunities."}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="identifier">
            {isChinese
              ? "邮箱或手机号码"
              : "Email or phone number"}
          </label>

          <div className="auth-input">
            <Mail size={18} aria-hidden="true" />

            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(event) =>
                setIdentifier(event.target.value)
              }
              placeholder={
                isChinese
                  ? "输入邮箱或手机号码"
                  : "Enter your email or phone number"
              }
              autoComplete="username"
              required
            />
          </div>
        </div>

        {!forgotMode ? (
          <div className="auth-field">
            <div className="auth-field__label-row">
              <label htmlFor="password">
                {isChinese ? "密码" : "Password"}
              </label>

              <button
                type="button"
                className="auth-link"
                onClick={switchForgotMode}
              >
                {isChinese
                  ? "忘记密码？"
                  : "Forgot password?"}
              </button>
            </div>

            <div className="auth-input">
              <LockKeyhole size={18} aria-hidden="true" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder={
                  isChinese
                    ? "输入密码"
                    : "Enter your password"
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="auth-input__action"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? isChinese
                      ? "隐藏密码"
                      : "Hide password"
                    : isChinese
                      ? "显示密码"
                      : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        ) : null}

        {!forgotMode ? (
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
            />

            <span>
              {isChinese
                ? "记住我的登录状态"
                : "Remember me"}
            </span>
          </label>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          className="auth-submit"
          disabled={
            !identifier.trim() ||
            (!forgotMode && !password.trim())
          }
        >
          {forgotMode
            ? isChinese
              ? "请求重置链接"
              : "Request Reset Link"
            : isChinese
              ? "登录"
              : "Sign In"}
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </form>

      <div className="auth-divider">
        <span>
          {isChinese
            ? "还没有账户？"
            : "Don't have an account?"}
        </span>
      </div>

      <Link to="/register" className="auth-register-link">
        <UserRound size={17} aria-hidden="true" />
        {isChinese ? "创建账户" : "Create an Account"}
      </Link>

      <div className="auth-demo-note">
        {isChinese
          ? "原型说明：登录和密码恢复目前为演示流程。正式版本将使用安全的服务器端身份验证。"
          : "Prototype notice: Sign-in and password recovery are currently demonstration flows. The production version will use secure server-side authentication."}
      </div>
    </Card>
  </section>
</PageContainer>

);
}
