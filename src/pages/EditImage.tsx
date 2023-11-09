import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/useStore";
import AppLayout from "../layouts/AppLayout";
import { Box, Card, Center, Image, Text, Title } from "@mantine/core";
import Cropper from "react-easy-crop";
import ControlsSideBar from "../components/ControlsSideBar";
import { IImageCropState } from "../types/ImageCropState";
import { IImageSize } from "../types/ImageSize";
import FileSaver from 'file-saver'
import editImage from "../utils/edit-image";
import AppModal from "../components/AppModal";
import useImageSelectedGuard from "../hooks/useImageSelectedGuard";
import {
  DEFAULT_CROP_POSITION,
  DEFAULT_CROP_SIZE,
  DEFAULT_ROTATION,
  DEFAULT_ZOOM,
} from "../constants/settings";
import useUploadCroppedImage from "../hooks/requests/useUploadCroppedImage";
import { showNotification } from "@mantine/notifications";
import { IUploadCroppedImageResp } from "../types/responses/ImageAddFrameResponseData";

const INIT_STATE = {
  crop: DEFAULT_CROP_POSITION,
  cropSize: DEFAULT_CROP_SIZE,
  zoom: DEFAULT_ZOOM,
  rotation: DEFAULT_ROTATION,
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
  const [frameImage, setFrameImage] = useState<IUploadCroppedImageResp | null>(
    null
  );

  const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleShowImage = useCallback(async () => {
    setCroppedImage({ image: null, loading: true });
    const transformedImage = await editImage(
      imageBlobURL,
      croppedAreaPixels!,
      imageControls.rotation
    );
    setCroppedImage({ image: transformedImage, loading: false });
  }, [imageControls, croppedAreaPixels]);
  const handleUploadImage = useUploadCroppedImage({
    onSuccess: (data) => {
      setCroppedImage({ image: null, loading: false });
      setFrameImage(data);
    },
    onError(err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Error While uploading image",
        color: "red",
      });
    },
  });

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
          setFrameImage(null);
        }}
        onYes={() => {
          FileSaver.saveAs(frameImage?.link ?? "", `${fileName}.png`)
          setFrameImage(null);
        }}
        loading={false}
        opened={!!frameImage}
        modalText={`Here is your framed image! It took around ${Math.ceil(
          frameImage?.timeTaken ?? 0
        )} ms to process it. Do you want to download it ?`}
      >
        <Image src={frameImage?.link ?? ""} />
      </AppModal>
      <AppModal
        onClose={() => {
          setCroppedImage({ image: null, loading: false });
        }}
        onYes={() => {
          handleUploadImage.mutate({
            imageData: croppedImage.image,
            fileName,
          });
        }}
        loading={handleUploadImage.isLoading}
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
