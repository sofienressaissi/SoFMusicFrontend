import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useLoading, BallTriangle } from '@agney/react-loading';
import './App.css';

const LPView = lazy(() => import("./pages/landingPage"));
const NotFoundView = lazy(() => import("./pages/notFound"));
const maitenance = lazy(() => import("./pages/maintenance"));

function App() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="50" color="#9E002B"/>,
  });
  return (
    <BrowserRouter>
      <React.Fragment>
          <Suspense fallback={
             <div align = "center">
             <section {...containerProps}>{indicatorEl}</section></div>}>
            <Switch>
              <Route exact path="/" component={LPView} />
              <Route path="*" component={NotFoundView} />
            </Switch>
          </Suspense>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
