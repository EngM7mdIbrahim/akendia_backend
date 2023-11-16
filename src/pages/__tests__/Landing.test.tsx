import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "../../test-utils";
import Landing from "../Landing";
import * as services from "../../api/get-insights";
import { ImageInsightResp } from "../../types/responses/ImageInsight";

const mockData = [
  {
    _id: "654cb21a155d1b8888515e0f",
    name: "test 1.png",
    width: 442,
    height: 442,
    link: "http://localhost:8080/downloads/woman-8339755_1280.png",
    previewLink: "http://localhost:8080/preview/woman-8339755_1280.png",
    timeTaken: 42.8363589644432,
  },
  {
    _id: "654cb21a155d1b8888515e0f",
    name: "test 2.png",
    width: 442,
    height: 442,
    link: "http://localhost:8080/downloads/woman-8339755_1280.png",
    previewLink: "http://localhost:8080/preview/woman-8339755_1280.png",
    timeTaken: 21.8363589644432,
  },
  {
    _id: "654cb21a155d1b8888515e0f",
    name: "test 3.png",
    width: 123,
    height: 122,
    link: "http://localhost:8080/downloads/woman-8339755_1280.png",
    previewLink: "http://localhost:8080/preview/woman-8339755_1280.png",
    timeTaken: 12.8363589644432,
  },
];
const mockFetchData = jest.spyOn(services, "default" as never);
beforeEach(() => {
  mockFetchData.mockClear();
  mockFetchData.mockResolvedValue(mockData as never);
});
test("Landing page renders correctly!", async () => {
  render(<Landing />);
  const element = screen.getByText(/App Dashboard/i);
  expect(element).toBeInTheDocument();
});

test("Images show from the content", async () => {
  mockFetchData.mockResolvedValue(mockData as never);
  render(<Landing />);
  await waitFor(() => {
    expect(mockFetchData).toBeCalled();
  });
  expect(screen.getAllByText("Download Image").length).toBe(mockData.length);
});

test("Renders the same time and uploads from the server", async () => {
  const mockFetchData = jest.spyOn(services, "default" as never);
  mockFetchData.mockResolvedValue(mockData as never);
  render(<Landing />);
  await waitFor(() => {
    expect(mockFetchData).toBeCalled();
  });
  expect(screen.getByText(mockData.length)).toBeInTheDocument();
});
