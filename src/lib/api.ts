/**
 * API 配置 - 替换为你的实际接口地址
 */
const API_BASE = "https://your-api-domain.com";
const REDIRECT_URL = "https://your-app-domain.com/workspace";

// Mock 模式开关 - 上线前设为 false
const MOCK_ENABLED = true;
const MOCK_CORRECT_CODE = "123456";

export const config = {
  apiBase: API_BASE,
  redirectUrl: REDIRECT_URL,
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 发送短信验证码 */
export async function sendSmsCode(phone: string): Promise<{ success: boolean; message: string }> {
  if (MOCK_ENABLED) {
    await delay(800);
    // 模拟特定号码发送失败
    if (phone === "13800000000") {
      return { success: false, message: "该手机号发送过于频繁，请稍后再试" };
    }
    return { success: true, message: "验证码已发送" };
  }

  try {
    const res = await fetch(`${API_BASE}/api/sms/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "发送失败");
    return { success: true, message: "验证码已发送" };
  } catch (e: any) {
    return { success: false, message: e.message || "网络异常，请稍后重试" };
  }
}

/** 验证码校验 + 注册 + 兑换会员一体化接口 */
export async function claimMembership(
  phone: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  if (MOCK_ENABLED) {
    await delay(1200);
    // 验证码错误
    if (code !== MOCK_CORRECT_CODE) {
      return { success: false, message: "验证码错误，请重新输入" };
    }
    // 模拟：已注册且已参与活动
    if (phone === "13900000000") {
      return { success: false, message: "您已领取过此权益，无需重复领取" };
    }
    // 模拟：活动名额已满
    if (phone === "13700000000") {
      return { success: false, message: "活动领取已达到上限" };
    }
    // 未注册→注册+赠送 / 已注册未参与→赠送
    return { success: true, message: "领取成功" };
  }

  try {
    const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
      throw new Error(loginData.message || "验证失败，请检查验证码");
    }

    const token = loginData.token;

    const redeemRes = await fetch(`${API_BASE}/api/membership/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: "premium_30d" }),
    });
    const redeemData = await redeemRes.json();
    if (!redeemRes.ok) {
      throw new Error(redeemData.message || "兑换失败");
    }

    return { success: true, message: "领取成功" };
  } catch (e: any) {
    return { success: false, message: e.message || "网络异常，请稍后重试" };
  }
}
