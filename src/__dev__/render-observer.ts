declare global {
  interface Window {
    renderTrace: {
      [appId: string]: {
        [componentName: string]: number;
      };
    };
  }
}

const logRenderMessages = false;
const logRenderTraces = false;

export const observeRender = (
  componentName: string,
  appId: string,
  opts?: {
    logRenderTraces?: boolean;
    logRenderMessages?: boolean;
  },
) => {
  if (!window.renderTrace) {
    window.renderTrace = {};
  }
  if (!window.renderTrace[appId]) {
    window.renderTrace[appId] = {};
  }
  if (typeof window.renderTrace[appId][componentName] !== "number") {
    window.renderTrace[appId][componentName] = 0;
  }
  window.renderTrace[appId][componentName] += 1;
  if (logRenderMessages || opts?.logRenderMessages) {
    console.log(
      `Render <${componentName} appId="${appId}" /> --> ${window.renderTrace[appId][componentName]}`,
    );
  }
  if (logRenderTraces || opts?.logRenderTraces) {
    console.log(window.renderTrace);
  }
};
