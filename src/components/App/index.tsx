import React, { useState } from 'react';

import Button from '../Button';
import NumberDisplay from '../NumberDisplay';
import { generateCells } from '../../utils/index';

import './App.scss';
import { Face } from '../../types';

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
        />
      )),
    );
  };

  console.log(cells);
  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <span className="Face" role="img" aria-label="face">
          {Face.smile}
        </span>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
