import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return <div>Working</div>;
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
