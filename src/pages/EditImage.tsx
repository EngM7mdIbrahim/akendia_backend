import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/useStore";
import AppLayout from "../layouts/AppLayout";
import { Box, Card, Center, Image, Text, Title } from "@mantine/core";
import Cropper from "react-easy-crop";
import ControlsSideBar from "../components/ControlsSideBar";
import { IImageCropState } from "../types/ImageCropState";
import { IImageSize } from "../types/ImageSize";
import { useNavigate } from "react-router";
import editImage from "../utils/edit-image";
import AppModal from "../components/AppModal";
import useImageSelectedGuard from "../hooks/useImageSelectedGuard";

const INIT_STATE = {
  crop: { x: 0, y: 0 },
  cropSize: { width: 300, height: 300 },
  zoom: 1,
  rotation: 0,
  aspect: 1,
};

export default function EditImage() {
  useImageSelectedGuard();
  const { imageBlobURL, fileName } = useAppSelector((state) => state.image);
  const [imageSize, setImageSize] = useState<IImageSize | null>(null);
  const [imageControls, setImageControls] =
    useState<IImageCropState>(INIT_STATE);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<{
    image: string | null;
    loading: boolean;
  }>({
    image: null,
    loading: false,
  });

  const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleShowImage = useCallback(async () => {
    setCroppedImage({ image: null, loading: true });
    console.log("Cropped Area Pixels", croppedAreaPixels);
    const transformedImage = await editImage(
      imageBlobURL,
      croppedAreaPixels!,
      imageControls.rotation
    );
    console.log("Transformed Image", transformedImage);
    setCroppedImage({ image: transformedImage, loading: false });
  }, [imageControls, croppedAreaPixels]);

  return (
    <AppLayout
      headerText="Edit your image"
      sideBar={
        <ControlsSideBar
          loading={croppedImage.loading}
          imageControls={imageControls}
          setImageControls={setImageControls}
          imageSize={imageSize}
          onPublish={() => {
            handleShowImage();
          }}
          onReset={() => {
            setImageControls(INIT_STATE);
          }}
        />
      }
    >
      <AppModal
        onClose={() => {
          setCroppedImage({ image: null, loading: false });
        }}
        onYes={() => {
          ///
        }}
        loading={false}
        opened={!!croppedImage.image}
        modalText="Here is the image you cropped. Do you want to publish it ?"
      >
        <Image src={croppedImage.image ?? ""} />
      </AppModal>
      <Card style={{ height: "calc(100vh - 100px)" }} withBorder shadow="xl">
        <Cropper
          image={imageBlobURL}
          crop={imageControls.crop}
          zoom={imageControls.zoom}
          cropSize={imageControls.cropSize}
          rotation={imageControls.rotation}
          onCropComplete={handleCropComplete}
          onCropSizeChange={(crop) => {
            setImageControls({ ...imageControls, cropSize: crop });
          }}
          aspect={1}
          onMediaLoaded={(media) => {
            setImageSize({
              width: media.width,
              height: media.height,
            });
          }}
          minZoom={1}
          onCropChange={(crop) => setImageControls({ ...imageControls, crop })}
          onZoomChange={(zoom) => setImageControls({ ...imageControls, zoom })}
        />
      </Card>
    </AppLayout>
  );
}
