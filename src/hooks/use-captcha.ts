/**
 * 阿里云验证码 2.0（智能验证）Hook
 * 文档：https://help.aliyun.com/document_detail/193141.html
 */

declare global {
  interface Window {
    AWSC: {
      use: (
        type: string,
        callback: (state: string, module: any) => void
      ) => void;
    };
  }
}

export interface CaptchaResult {
  sessionId: string;
  sig: string;
  token: string;
}

const CAPTCHA_CONFIG = {
  appkey: "FFFF0N00000000013BD3",
  scene: "ic_login",
  prefix: "jp8onp",
  ekey: "oizKtH72PMAal4+lfN6ysl1N9FomTT6kCVQmaQyrHAc=",
  renderTo: "captcha-container",
  sceneId: "13rmuqqq",
};

/**
 * 初始化并弹出智能验证
 * 返回 Promise，成功时 resolve CaptchaResult，用户关闭/失败时 reject
 */
export function invokeCaptcha(): Promise<CaptchaResult> {
  return new Promise((resolve, reject) => {
    if (!window.AWSC) {
      reject(new Error("验证码 SDK 未加载，请刷新页面重试"));
      return;
    }

    // 确保容器存在
    let container = document.getElementById(CAPTCHA_CONFIG.renderTo);
    if (!container) {
      container = document.createElement("div");
      container.id = CAPTCHA_CONFIG.renderTo;
      container.style.display = "none";
      document.body.appendChild(container);
    }

    window.AWSC.use("ic", function (state: string, module: any) {
      if (state !== "loaded") {
        reject(new Error("验证码模块加载失败"));
        return;
      }

      const China = module.China;
      China({
        appkey: CAPTCHA_CONFIG.appkey,
        scene: CAPTCHA_CONFIG.scene,
        prefix: CAPTCHA_CONFIG.prefix,
        renderTo: CAPTCHA_CONFIG.renderTo,
        width: 300,
        guideTip: "请按住滑块，拖动到最右边",
        language: "cn",
        success: (data: CaptchaResult) => {
          resolve(data);
        },
        fail: (failCode: string) => {
          reject(new Error(`验证失败(${failCode})，请重试`));
        },
        error: (errorCode: string) => {
          reject(new Error(`验证异常(${errorCode})，请刷新重试`));
        },
      });
    });
  });
}
