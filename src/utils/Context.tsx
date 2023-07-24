import { createContext, useState } from 'react';

type ResponseData = {
  file_name: string;
  predictions: string;
  score: number;
  'index number': string;
}[];

interface IAppContext {
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
  forPreview: boolean;
  setForPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const appContext = createContext<IAppContext>({
  responseData: [],
  setResponseData: () => {},
  forPreview: false,
  setForPreview: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [responseData, setResponseData] = useState<ResponseData>([]);
  const [forPreview, setForPreview] = useState(false);

  const value = {
    responseData,
    setResponseData,
    forPreview,
    setForPreview,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
