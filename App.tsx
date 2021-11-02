import React from 'react';
import { Navigator } from './src/navigation/routes';
import { DataProvider } from './src/stores/providers';

export default function App() {
  return (
    <DataProvider>
      <Navigator/>
    </DataProvider>
  );
}