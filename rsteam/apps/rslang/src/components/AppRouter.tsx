import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {routes} from '../router';
import Page404 from '../pages/page404/Page404';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route key={route.path} path={route.path} element={<route.element/>} />
      )}
      <Route path="/page404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/page404" />}/>
    </Routes>
  );
};

export default AppRouter;