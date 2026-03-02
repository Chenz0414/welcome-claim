/**
 * API 配置 - 替换为你的实际接口地址
 */
const API_BASE = "https://your-api-domain.com";
const REDIRECT_URL = "https://your-app-domain.com/workspace";

export const config = {
  apiBase: API_BASE,
  redirectUrl: REDIRECT_URL,
};

/** 发送短信验证码 */
export async function sendSmsCode(phone: string): Promise<{ success: boolean; message: string }> {
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
  try {
    // Step 1: 验证手机号 + 验证码，注册/登录
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

    // Step 2: 兑换会员
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
      // 常见边界：已领取过、活动过期、库存不足
      throw new Error(redeemData.message || "兑换失败");
    }

    return { success: true, message: "领取成功" };
  } catch (e: any) {
    return { success: false, message: e.message || "网络异常，请稍后重试" };
  }
}
