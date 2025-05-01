// import directories
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// react app container element
const container = document.getElementById('root');

// make root
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);