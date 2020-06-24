import React from 'react';

import NumberDisplay from '../NumberDisplay';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <span className="Face" role="img" aria-label="face">
          🙂{' '}
        </span>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">Body</div>
    </div>
  );
};

export default App;
