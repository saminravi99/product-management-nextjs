"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "./store";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<ReturnType<typeof persistStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      {persistorRef.current && (
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      )}
    </Provider>
  );
}
