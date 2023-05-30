import path from 'path';
import { createBrowserRouter } from 'react-router-dom';
import { Constants } from './utils/constants';
import SignUp from './pages/auth-pages/sign-up';
import Dashboard from './pages/dashboard/dashboard';

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
]);

export default routing;
