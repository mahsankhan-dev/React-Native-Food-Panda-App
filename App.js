import * as React from "react";

// import CustomCamera from './src/components/CustomCamera'
import MainNavigator from "./Src/Config/Navigation";

import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./Src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
