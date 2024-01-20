import { DevAppFactory } from "src/__dev__/app/app";
import ReactDOM from "react-dom/client";

const App = () => {
  console.log("Render Main");
  return (
    <>
      <DevAppFactory />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
