import { JotaiApp } from "./__dev__/jotai-app";
import { RecoilApp } from "./__dev__/recoil-app";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <>
      <h1>Jotai App</h1>
      <JotaiApp />
      <br />
      <hr />
      <br />
      <h1>Recoil App</h1>
      <RecoilApp />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
