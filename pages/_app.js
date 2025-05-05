import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";
import tweets from "../reducers/tweets";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({ users, tweets });
const persistConfig = { key: "hackatweet", storage: storage, whitelist: ['users'] };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Hackatweet - @Claire Mauguéret</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="description"
              content="Hackatweet - @Claire Mauguéret - La Capsule Bootcamp"
            ></meta>
            <meta charSet="UTF-8"></meta>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            ></meta>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
