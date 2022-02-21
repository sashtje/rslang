import Home from '../pages/home/Home';
import Ourteam from '../pages/our-team/Ourteam';
import Textbook from '../pages/textbook/Textbook';
import Sprint from '../pages/sprint/sprint';
import Audiocall from '../pages/audiocall/Audiocall';
import Statistics from '../pages/statistics/Statistics';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SingUp';
import Words from '../pages/textbook/Words';
import SprintGame from '../pages/sprint/sprintGame';
import AudiocallGame from "../pages/audiocall/AudiocallGame";

const MAX_PAGES = 30;

export const routes = [
  {path: "/", element: Home},
  {path: "/our-team", element: Ourteam},
  {path: "/textbook", element: Textbook},
  {path: "/textbook/hard", element: Words},
  {path: "/sprint", element: Sprint},
  {path: "/sprint-game/:chosenLvl", element: SprintGame},
  {path: "/audiocall", element: Audiocall},
  {path: "/audiocall/:chosenLvl", element: AudiocallGame},
  {path: "/statistics", element: Statistics},
  {path: "/login", element: Login},
  {path: "/sign-up", element: SignUp},
];

for (let i = 1; i <= MAX_PAGES; i++) {
  routes.push({
      path: `/textbook/a1/${i}`,
      element: Words
    },
    {
      path: `/textbook/a2/${i}`,
      element: Words
    },
    {
      path: `/textbook/b1/${i}`,
      element: Words
    },
    {
      path: `/textbook/b2/${i}`,
      element: Words
    },
    {
      path: `/textbook/c1/${i}`,
      element: Words
    },
    {
      path: `/textbook/c2/${i}`,
      element: Words
    }
  );
}
