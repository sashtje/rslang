import Home from '../pages/home/Home';
import Ourteam from '../pages/Ourteam';
import Textbook from '../pages/Textbook';
import Savannah from '../pages/Savannah';
import Audiocall from '../pages/Audiocall';
import Statistics from '../pages/Statistics';
import Login from '../pages/Login';
import SignUp from '../pages/SingUp';

export const routes = [
  {path: "/", element: Home},
  {path: "/our-team", element: Ourteam},
  {path: "/textbook", element: Textbook},
  {path: "/savannah", element: Savannah},
  {path: "/audiocall", element: Audiocall},
  {path: "/statistics", element: Statistics},
  {path: "/login", element: Login},
  {path: "/sign-up", element: SignUp},
];