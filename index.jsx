import React, { Component } from 'react';
import { render } from 'react-dom';
import Game from './src/components/Game';
import Consumer from './src/Consumer';
import ErrorBoundary from './src/components/ErrorBoundary';
import Provider from './src/Provider';

const app = document.getElementById('root');

render(
    <Consumer>
      <ErrorBoundary>
        <Game/>
      </ErrorBoundary>
    </Consumer>,
  app
);
// render(
//   <HelloMessage name="Jane" />,
//   app
// );
