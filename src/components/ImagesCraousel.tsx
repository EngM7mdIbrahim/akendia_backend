import { Carousel } from "@mantine/carousel";
import { randomId, useMediaQuery } from "@mantine/hooks";
import { useMantineTheme, rem, Center, Title, Button } from "@mantine/core";
import { IUploadCroppedImageResp } from "../types/responses/ImageAddFrameResponseData";
import SingleImageCarouselCard from "./SignleImageCarouselCard";
import { IconSparkles } from "@tabler/icons-react";
import { useNavigate } from "react-router";
interface ImagesCarouselProps {
  images: IUploadCroppedImageResp[];
  loading?: boolean;
}

export function ImagesCarousel({
  images,
  loading = false,
}: ImagesCarouselProps) {
  const theme = useMantineTheme();
  const router = useNavigate();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = loading
    ? ["x", "x"].map((item) => (
        <Carousel.Slide key={randomId()}>
          <SingleImageCarouselCard loading />
        </Carousel.Slide>
      ))
    : (images ?? []).map((item) => (
        <Carousel.Slide key={randomId()}>
          <SingleImageCarouselCard {...item} />
        </Carousel.Slide>
      ));

  return images && images.length > 0 ? (
    <Carousel
      className="w-1/2"
      slideSize={{ base: "100%", sm: "50%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  ) : (
    <Center className="flex flex-col gap-5">
      <IconSparkles size={100} />
      <Title order={4}>
        The app is clean as new! Be my guest to share our first photo!
      </Title>
      <Button
        onClick={() => {
          router("/add-image");
        }}
      >
        Upload Photo
      </Button>
    </Center>
  );
}
