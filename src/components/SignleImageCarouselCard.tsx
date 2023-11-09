import {
  Button,
  Card,
  Overlay,
  Paper,
  Skeleton,
  Text,
  Title,
  rem,
} from "@mantine/core";
import FileSaver from 'file-saver'

interface SingleImageCarouselCardProps {
  previewLink?: string;
  link?: string;
  timeTaken?: number;
  loading?: boolean;
}

export default function SingleImageCarouselCard({
  previewLink,
  timeTaken,
  link,
  loading,
}: SingleImageCarouselCardProps) {
  const fileName = (previewLink?.split("/").pop() ?? "image.png").split(".")[0];
  return (
    <Card
      withBorder
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundImage: `url(${previewLink})`,
        backgroundColor: "black",
        height: rem(440),
      }}
      className=" bg-cover bg-center"
    >
      <Overlay backgroundOpacity={0.35} blur={1} p="xl" className="flex flex-col justify-end items-start">
        <Title
          mt="xs"
          style={{
            fontFamily: "Greycliff CF, sans-serif",
            lineHeight: 1.2,
          }}
          className="font-extrabold text-2xl text-white uppercase"
          order={5}
        >
          It took {Number((Math.ceil(timeTaken ?? 0)/1000).toFixed(2))}s to process.
        </Title>
        <Title
          mt="xs"
          style={{
            fontFamily: "Greycliff CF, sans-serif",
            lineHeight: 1.2,
          }}
          className="font-extrabold text-2xl text-white "
          order={3}
        >
          {fileName}
        </Title>

        <Button onClick={() => {
          FileSaver.saveAs(link ?? "", `${fileName}.png`);
        }} variant="white" color="dark">
          Download Image
        </Button>
      </Overlay>
    </Card>
  );
}
