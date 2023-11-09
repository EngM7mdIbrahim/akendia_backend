import { Button, Card, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";

interface ImageInsightsProps {
    imagesCount: number;
    timeTaken: number;
}

export default function ImageInsights({imagesCount, timeTaken}:ImageInsightsProps) {
    const router = useNavigate();

    return <Card p="md" withBorder shadow="xl" className="flex w-96 flex-col gap-5">
        <Title order={3}>Uploaded Images: </Title>
        <Text>{imagesCount}</Text>
        <Title order={4}>Total processing time for all images: </Title>
        <Text>{timeTaken}s</Text>
        <Button onClick={()=>{router('/add-image')}} fullWidth>Be my guest! Frame your photo</Button>
    </Card>
}