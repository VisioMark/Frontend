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
}

export const appContext = createContext<IAppContext>({
  responseData: [],
  setResponseData: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [responseData, setResponseData] = useState<ResponseData>([]);

  const value = {
    responseData,
    setResponseData,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
