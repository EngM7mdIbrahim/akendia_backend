import { Box, Center, Group, Image, Text, Title, rem } from "@mantine/core";
import AppLayout from "../layouts/AppLayout";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import AppModal from "../components/AppModal";
import { useAppDispatch } from "../hooks/useStore";
import { setFileName, setImagePath } from "../store/slices/imageSlice";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [image, setImage] = useState<FileWithPath | null>(null);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const handleDrop = (files: FileWithPath[]) => {
    setImage(files[0]);
  };
  return (
    <AppLayout center>
      <AppModal
        loading={false}
        onClose={() => setImage(null)}
        onYes={() => {
          dispatch(setImagePath(URL.createObjectURL(image!) ?? ""));
          dispatch(setFileName(image!.name))
          router("/edit-image");
        }}
        modalText="Are you sure you want to proceed with this image?"
        opened={!!image}
      >
        <Image
          src={image ? URL.createObjectURL(image) : ""}
          className="w-full h-full"
          fit="contain"
        />
      </AppModal>
      <Center className="flex flex-col gap-5">
        <Title order={1} style={{ textAlign: "center" }}>
          Please choose an image to edit.
        </Title>
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={10 * 1024 ** 2}
          maxFiles={1}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Center>
    </AppLayout>
  );
}
