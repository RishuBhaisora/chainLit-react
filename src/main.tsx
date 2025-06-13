import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChainlitAPI, ChainlitContext } from '@chainlit/react-client';
import { RecoilRoot } from "recoil";

const CHAINLIT_SERVER = "http://localhost:80/chainlit";

const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "webapp");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChainlitContext.Provider value={apiClient}>
    <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChainlitContext.Provider>
  </StrictMode>
);