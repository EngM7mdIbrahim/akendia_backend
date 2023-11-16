import {
  Box,
  Button,
  NumberInput,
  Slider,
  Title,
} from "@mantine/core";
import { IImageCropState } from "../types/ImageCropState";
import { IImageSize } from "../types/ImageSize";
import { useNavigate } from "react-router";

interface ControlsSideBarProps {
  imageControls: IImageCropState;
  imageSize?: IImageSize | null;
  loading?: boolean;
  // Type: state setter function
  setImageControls: (state: IImageCropState) => void;
  onPublish: () => void;
  onReset: () => void;
}

export default function ControlsSideBar({
  imageControls,
  imageSize,
  loading,
  setImageControls,
  onPublish,
  onReset,
}: ControlsSideBarProps) {
  const router = useNavigate();
  return (
    <Box p="md" className="w-full h-full flex flex-col gap-10">
      <Box className="flex flex-col gap-2">
        <Title order={3}>Crop Controls</Title>
        <NumberInput
          className="flex-1"
          label="Crop Width"
          value={imageControls.cropSize.width}
          onChange={(value) =>
            setImageControls({
              ...imageControls,
              cropSize: {
                ...imageControls.cropSize,
                width: +value,
              },
            })
          }
          min={0}
          max={imageSize?.width ?? 1000}
        />
        {imageSize && (
          <Slider
            label="Width"
            value={imageControls.cropSize.width}
            onChange={(value) =>
              setImageControls({
                ...imageControls,
                cropSize: {
                  ...imageControls.cropSize,
                  width: value,
                },
              })
            }
            min={1}
            max={imageSize?.width}
          />
        )}
        <NumberInput
          className="flex-1"
          label="Crop Height"
          value={imageControls.cropSize.height}
          onChange={(value) =>
            setImageControls({
              ...imageControls,
              cropSize: {
                ...imageControls.cropSize,
                height: +value,
              },
            })
          }
          min={0}
          max={imageSize?.height ?? 1000}
        />
        {imageSize && (
          <>
            <Slider
              label="Height"
              value={imageControls.cropSize.height}
              onChange={(value) =>
                setImageControls({
                  ...imageControls,
                  cropSize: {
                    ...imageControls.cropSize,
                    height: value,
                  },
                })
              }
              min={1}
              max={imageSize?.height}
            />
          </>
        )}
      </Box>
      <Box>
        <Title order={3}>Zoom Controls</Title>
        <Slider
          label="Zoom"
          value={imageControls.zoom}
          onChange={(value) =>
            setImageControls({ ...imageControls, zoom: value })
          }
          min={1}
          max={3}
          step={0.1}
          marks={[
            { value: 1, label: "1x" },
            { value: 1.5, label: "1.5x" },
            { value: 2, label: "2x" },
            { value: 2.5, label: "2.5x" },
            { value: 3, label: "3x" },
          ]}
        />
      </Box>
      <Box>
        <Title order={3}>Rotation Controls</Title>
        <Slider
          label="Rotation"
          value={imageControls.rotation}
          onChange={(value) =>
            setImageControls({ ...imageControls, rotation: value })
          }
          min={0}
          max={359}
          step={5}
          marks={[
            { value: 0, label: "0°" },
            { value: 45, label: "45°" },
            { value: 90, label: "90°" },
            { value: 135, label: "135°" },
            { value: 180, label: "180°" },
            { value: 225, label: "225°" },
            { value: 270, label: "270°" },
            { value: 315, label: "315°" },
            { value: 359, label: "359°" },
          ]}
        />
      </Box>
      <Box className="flex flex-col gap-2 ">
        <Button
          variant="outline"
          onClick={() => {
            router("/");
          }}
        >
          Show Home
        </Button>
        <Button variant="outline" onClick={onReset}>
          Reset Edits
        </Button>
        <Button onClick={onPublish}>Show Edited Image</Button>
        <Button onClick={() => router("/add-image")} color="red">
          Select another image
        </Button>
      </Box>
    </Box>
  );
}
