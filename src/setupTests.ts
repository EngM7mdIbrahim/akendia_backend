import "@testing-library/jest-dom/extend-expect";
import MatchMediaMock from "jest-matchmedia-mock";

new MatchMediaMock();

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
