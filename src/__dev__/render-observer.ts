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
const logrenderTraces = false;

export const observeRender = (componentName: string, appId: string) => {
  if (!window.renderTrace) {
    window.renderTrace = {};
  }
  if (!window.renderTrace[appId]) {
    window.renderTrace[appId] = {};
  }
  if (typeof window.renderTrace[componentName] !== "number") {
    window.renderTrace[appId][componentName] = 0;
  }
  window.renderTrace[appId][componentName] += 1;
  if (logRenderMessages) {
    console.log(`Render <${componentName} appId="${appId}" />`);
  }
  if (logrenderTraces) {
    console.log(window.renderTrace);
  }
};
