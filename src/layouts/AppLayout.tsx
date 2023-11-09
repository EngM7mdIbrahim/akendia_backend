import { ActionIcon, AppShell, Box, ScrollArea, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
interface AppLayoutProps {
  children: React.ReactNode;
  center?: boolean;
  sideBar?: React.ReactNode;
  headerText?: React.ReactNode;
  showBackButton?: boolean;
}
export default function AppLayout({
  children,
  center = false,
  sideBar,
  headerText,
  showBackButton = false,
}: AppLayoutProps) {
  const router = useNavigate();
  return (
    <AppShell
      navbar={!!sideBar ? { width: 300, breakpoint: "md" } : undefined}
      header={!!headerText ? { height: 70 } : undefined}
      padding="md"
    >
      {sideBar && <AppShell.Navbar>{sideBar}</AppShell.Navbar>}
      {headerText && (
        <AppShell.Header>
          <Box
            p="sm"
            className="flex justify-start items-center w-full h-full gap-5"
          >
            {showBackButton && (
              <ActionIcon
                onClick={() => {
                  router(-1);
                }}
              >
                <IconArrowLeft
                  size={30}
                  onClick={() => {
                    router("/");
                  }}
                />
              </ActionIcon>
            )}
            <Title order={1}> {headerText}</Title>
          </Box>
        </AppShell.Header>
      )}
      <AppShell.Main>
        <ScrollArea
          style={{
            minHeight: "calc(100vh - 40px)",
          }}
          className={` flex gap-5 flex-col ${
            center
              ? "justify-center items-center"
              : "justify-start items-stretch"
          }`}
        >
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
