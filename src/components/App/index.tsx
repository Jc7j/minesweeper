import React, { useEffect, useState } from 'react';

import Button from '../Button';
import NumberDisplay from '../NumberDisplay';
import { Face, Cell, CellState, CellValue } from '../../types';
import { generateCells, openMultipleCells } from '../../utils/index';

import './App.scss';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    // Start the game
    if (!live) {
      setLive(true);
    }

    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    if (
      currentCell.state === CellState.flagged ||
      currentCell.state === CellState.visible
    ) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      // TODO: Take care of obmb click
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
      setCells(newCells);
    }
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          col={colIndex}
          key={`${rowIndex}-${colIndex}`}
          onClick={handleCellClick}
          onContext={handleCellContext}
          row={rowIndex}
          state={cell.state}
          value={cell.value}
        />
      )),
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <span
          className="Face"
          role="img"
          aria-label="face"
          onClick={handleFaceClick}
        >
          {face}
        </span>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
