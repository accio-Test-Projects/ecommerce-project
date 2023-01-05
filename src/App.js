import "./App.css";
import Navs from "./Navs";
// import { ReactNotifications } from 'react-notifications-component';
// import { ThemeProvider } from '@mui/material';
// import { appTheme } from './themes';
import {UserContextProvider} from "./Context/userContext";
import store from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <UserContextProvider>
      <Navs />
      </UserContextProvider>
    </Provider>

  );
}

export default App;
