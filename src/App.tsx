import { DEFAULT_THEME, MantineProvider, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/carousel/styles.css';
import UploadImage from "./pages/UploadImage";
import EditImage from "./pages/EditImage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={DEFAULT_THEME}>
        <QueryClientProvider client={queryClient}>
        <Notifications />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/add-image" element={<UploadImage />}></Route>
            <Route path="/edit-image" element={<EditImage />}></Route>
            
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Router>
        </QueryClientProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
