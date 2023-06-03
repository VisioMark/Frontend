import path from 'path';
import { createBrowserRouter } from 'react-router-dom';
import { Constants } from './utils/constants';
import SignUp from './pages/auth-pages/sign-up';
import Dashboard from './pages/dashboard/dashboard';
import AllFiles from './pages/all-files/AllFiles';
import Settings from './pages/settings/Settings';

const ROUTE = Constants.PATHS;

const routing = createBrowserRouter([
  {
    path: ROUTE.home,
    element: <Dashboard />,
  },
  {
    path: ROUTE.signUp,
    element: <SignUp />,
  },
  {
    path: ROUTE.allfiles,
    element: <AllFiles />,
  },
  {
    path: ROUTE.settings,
    element: <Settings />,
  },
]);

export default routing;
