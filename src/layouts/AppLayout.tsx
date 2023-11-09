import { AppShell, Box, ScrollArea, Title } from "@mantine/core";
interface AppLayoutProps {
  children: React.ReactNode;
  center?: boolean;
  sideBar?: React.ReactNode;
  headerText?: React.ReactNode;
}
export default function AppLayout({
  children,
  center = false,
  sideBar,
  headerText,
}: AppLayoutProps) {
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
