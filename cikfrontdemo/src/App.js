import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage/HomePage';
const LoadingIcon = () => (
  <div className="text-center">
      <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
      </div>
  </div>
);

const Page = () => {
  return (
      <Layout>
        <Switch>
        <Route exact path='/' component={HomePage} />
        </Switch>
      </Layout>
  );
};

function App() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Page />
    </Suspense>
  );
}

export default App;
