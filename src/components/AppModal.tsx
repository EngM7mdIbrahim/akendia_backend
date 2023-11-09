import {
    Box,
    Button,
    Card,
    Modal,
    Title,
    useMantineTheme,
  } from "@mantine/core";
  export default function AppModal({
    opened,
    onClose,
    modalText,
    onYes,
    loading,
    children,
  }: {
    opened: boolean;
    onClose: () => void;
    modalText: string;
    children?: React.ReactNode;
    onYes: () => void;
    loading: boolean;
  }) {
    const theme = useMantineTheme();
    return (
      <Modal
        centered
        opened={opened}
        onClose={onClose}
        overlayProps={{
            blur: 3,
            backgroundOpacity: 0.55,
        }}
      >
        <Card>
          <Title className="text-center" order={3}>
            {modalText}
          </Title>
          {children}
          <Box className="flex justify-center gap-5 mt-5">
            <Button
              loading={loading}
              variant="outline"
              color="red"
              onClick={onYes}
            >
              Yes
            </Button>
            <Button disabled={loading} variant="outline" onClick={onClose}>
              No
            </Button>
          </Box>
        </Card>
      </Modal>
    );
  }
  