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
    console.log("🏪 StoreProvider: Initializing store...");
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<div>Loading theme...</div>}
        persistor={persistorRef.current!}
        onBeforeLift={() => {
          console.log("🚀 PersistGate: State has been rehydrated");
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
