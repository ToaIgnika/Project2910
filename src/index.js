import React from 'react';
import ReactDOM from 'react-dom';
import FolderDrop from './App';
import Login from './Login'
import BotNav from './BotNav'
import TopNav from './TopNav'
import './index.css';

ReactDom.render(
    <TopNav />,
    document.getElementsByTagName('header')
);

ReactDOM.render(
  <FolderDrop />,
  document.getElementById('root')
);

ReactDOM.render(
    <BotNav />,
    document.getElementsByTagName('footer')
);
