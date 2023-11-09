import { useEffect, useMemo } from "react";
import { ImagesCarousel } from "../components/ImagesCraousel";
import ImageInsights from "../components/ImagesInsights";
import useGetInsights from "../hooks/requests/useGetInsights";
import AppLayout from "../layouts/AppLayout";
import { Box } from "@mantine/core";

export default function Landing() {
  const { data: images, isLoading } = useGetInsights();

  const imagesInsights = useMemo(() => {
    let currTimeTaken = 0;
    images?.forEach((element: any) => {
      currTimeTaken += Math.ceil(element.timeTaken);
    });
    return {
      count: images?.length ?? 0,
      time: Number((currTimeTaken / 1000).toFixed(2)),
    };
  }, [images]);
  return (
    <AppLayout center headerText="App Dashboard">
      <Box className="flex items-center flex-col gap-10 w-full">
        {images && (
          <ImageInsights
            imagesCount={imagesInsights.count}
            timeTaken={imagesInsights.time}
          />
        )}
        <ImagesCarousel images={images} loading={isLoading} />
      </Box>
    </AppLayout>
  );
}
