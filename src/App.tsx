import { DEFAULT_THEME, MantineProvider, Text } from "@mantine/core";
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
import Landing from "./pages/Landing";
import EditImage from "./pages/EditImage";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={DEFAULT_THEME}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/edit-image" element={<EditImage />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
