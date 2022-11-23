import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={'en'}>
      <App />
    </IntlProvider>
  </React.StrictMode>
)
