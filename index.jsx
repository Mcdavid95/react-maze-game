import React, { Component } from 'react';
import { render } from 'react-dom';
import Game from './src/components/Game';
import ErrorBoundary from './src/components/ErrorBoundary';

const app = document.getElementById('root');

render(
    <ErrorBoundary>
      <Game/>
    </ErrorBoundary>,
  app
);
// render(
//   <HelloMessage name="Jane" />,
//   app
// );
