import path from 'path';
import { createBrowserRouter } from 'react-router-dom';
import { Constants } from './utils/constants';
import SignUp from './pages/auth-pages/sign-up';
import Dashboard from './pages/dashboard/dashboard';
import AllFiles from './pages/all-files/AllFiles';
import Settings from './pages/settings/Settings';
import SignIn from './pages/auth-pages/sign-in';
import SignOut from './pages/auth-pages/sign-out';
import Upload from './pages/upload/upload';
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
  {
    path: ROUTE.settings,
    element: <Settings />,
  },
  {
    path: ROUTE.signIn,
    element: <SignIn />,
  },
  {
    path: ROUTE.signOut,
    element: <SignOut />,
  },
]);

export default routing;
