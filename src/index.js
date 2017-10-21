import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Legend from './Legend';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Legend />, document.getElementById('legendTop'));
ReactDOM.render(<Legend />, document.getElementById('legendBottom'));

registerServiceWorker();