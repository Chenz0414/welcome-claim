/**
 * 阿里云验证码 2.0（V2架构）- 弹出式
 * 文档：https://help.aliyun.com/zh/captcha/captcha2-0/user-guide/client-access
 */

declare global {
  interface Window {
    initAliyunCaptcha: (config: any) => Promise<void>;
  }
}

export interface CaptchaResult {
  captchaVerifyParam: string;
}

const SCENE_ID = "13rmuqqq";

let captchaInstance: any = null;
let isInitialized = false;
let initPromise: Promise<void> | null = null;

/**
 * 初始化验证码（只调用一次）
 * 通过 resolveCallback 模式，在 captchaVerifyCallback 触发时 resolve promise
 */
function initCaptcha(
  elementId: string,
  buttonId: string,
  onVerify: (param: string) => Promise<{ captchaResult: boolean; bizResult: boolean }>,
  onBizResult: (bizResult: boolean) => void
): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = window.initAliyunCaptcha({
    SceneId: SCENE_ID,
    mode: "popup",
    element: `#${elementId}`,
    button: `#${buttonId}`,
    captchaVerifyCallback: async (captchaVerifyParam: string) => {
      const result = await onVerify(captchaVerifyParam);
      return result;
    },
    onBizResultCallback: (bizResult: boolean) => {
      onBizResult(bizResult);
    },
    getInstance: (instance: any) => {
      captchaInstance = instance;
    },
    slideStyle: {
      width: 360,
      height: 40,
    },
    language: "cn",
  }).then(() => {
    isInitialized = true;
  });

  return initPromise;
}

/** 重置验证码状态（允许重新初始化） */
export function resetCaptcha() {
  if (captchaInstance) {
    try {
      captchaInstance.refresh();
    } catch {
      // ignore
    }
  }
}

export { initCaptcha, isInitialized };
