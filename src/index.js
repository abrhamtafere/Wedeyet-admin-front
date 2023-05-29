import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from './redux/auth';
import mainCategory from './redux/mainCategory';
import Services from './redux/Services';
import tab, { tabSlice } from './redux/tab';
import Faq from './redux/Faq';
import EmailTemplate from './redux/EmailTemplate';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const tabReducer = persistReducer(persistConfig, tab);
const rootReducer = {
  // tabstate:tab,
  mainCategoryState: mainCategory,
  serviceState:Services,
  faqSate:Faq,
  emailState:EmailTemplate,
  persistedReducer: persistReducer(persistConfig, persistedReducer),
  tabstate: persistReducer(persistConfig, tab),
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
