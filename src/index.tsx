import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);