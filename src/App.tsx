import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import routing from './routes';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <>
      <RouterProvider router={routing} />
    </>
  );
}

export default App;
