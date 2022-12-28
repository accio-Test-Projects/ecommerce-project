import "./App.css";
import Navs from "./Navs";
// import { ReactNotifications } from 'react-notifications-component';
// import { ThemeProvider } from '@mui/material';
// import { appTheme } from './themes';
import store from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Navs />
    </Provider>
  );
}

export default App;
