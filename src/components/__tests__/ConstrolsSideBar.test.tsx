import "@testing-library/jest-dom/extend-expect";

import ControlsSideBar from "../ControlsSideBar";
import { act, render, screen, userEvent } from "../../test-utils";

test("Controls side bar renders successfully", () => {
  render(
    <ControlsSideBar
      imageControls={{
        crop: { x: 0, y: 0 },
        cropSize: { width: 300, height: 300 },
        zoom: 1,
        rotation: 1,
      }}
      setImageControls={() => {}}
      onPublish={() => {}}
      onReset={() => {}}
      imageSize={{ width: 300, height: 300 }}
    />
  );

  const element = screen.getByText(/Crop Controls/i);

  expect(element).toBeInTheDocument();
});

test("Image Controls changes when a new input is entered!", async () => {
    // Mocking useState
  const mockSetImageControls = jest.fn();
  
  render(
    <ControlsSideBar
      imageControls={{
        crop: { x: 0, y: 0 },
        cropSize: { width: 300, height: 300 },
        zoom: 1,
        rotation: 1,
      }}
      setImageControls={mockSetImageControls}
      onPublish={() => {}}
      onReset={() => {}}
      imageSize={{ width: 300, height: 300 }}
    />
  );

  const element = screen.getByLabelText(/Crop Width/i);
  expect(element).toBeInTheDocument();
  act(()=>{
    userEvent.type(element, "100");
  })
  expect(mockSetImageControls).toBeCalled();
});
