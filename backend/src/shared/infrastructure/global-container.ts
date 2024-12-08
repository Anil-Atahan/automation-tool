import { Container } from "inversify";

const globalContainer = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

export default globalContainer;
