import Home from '../pages/home/Home';
import Ourteam from '../pages/our-team/Ourteam';
import Textbook from '../pages/textbook/Textbook';
import Sprint from '../pages/sprint/sprint';
import Audiocall from '../pages/Audiocall';
import Statistics from '../pages/statistics/Statistics';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SingUp';
import Words from '../pages/textbook/Words';

export const routes = [
  {path: "/", element: Home},
  {path: "/our-team", element: Ourteam},
  {path: "/textbook", element: Textbook},
  {path: "/textbook/a1/:id", element: Words},
  {path: "/textbook/a2/:id", element: Words},
  {path: "/textbook/b1/:id", element: Words},
  {path: "/textbook/b2/:id", element: Words},
  {path: "/textbook/c1/:id", element: Words},
  {path: "/textbook/c2/:id", element: Words},
  {path: "/textbook/hard", element: Words},
  {path: "/sprint", element: Sprint},
  {path: "/audiocall", element: Audiocall},
  {path: "/statistics", element: Statistics},
  {path: "/login", element: Login},
  {path: "/sign-up", element: SignUp},
];