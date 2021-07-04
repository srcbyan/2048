import React, { useState, useEffect } from "react";
import Block from "./Block";
import { cloneDeep } from "lodash";
import { useEvent } from "./util";

function App() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false);

  const initialize = () => {
    let newGrid = cloneDeep(data);
    console.log(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }
      let random1 = Math.floor(Math.random() * 4);
      let random2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[random1][random2] === 0) {
        newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOver = checkGameOver();
        if (gameOver) {
          alert("Game Over!");
        }
      }
    }
  };

  const swipeLeft = (dummy) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy) => {
    console.log("swiped right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeUp = (dummy) => {
    console.log("swiped up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeDown = (dummy) => {
    console.log("swiped down");
    console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const checkGameOver = () => {
    let checkLeft = swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(checkLeft)) {
      return false;
    }
    let checkRight = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checkRight)) {
      return false;
    }
    let checckUp = swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(checckUp)) {
      return false;
    }
    let checkDown = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checkDown)) {
      return false;
    }
    return true;
  };

  const resetGame = () => {
    const newGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  const handleKey = (event) => {
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }

    let gameOver = checkGameOver();
    if (gameOver) {
      alert("GAME OVER!");
      setGameOver(true);
      return;
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEvent("keydown", handleKey);

  return (
    <div className=" flex flex-col justify-around text-center items-center m-2">
      <div className="flex flex-col justify-around">
        <h1 className="font-extrabold text-7xl">2048</h1>
        <div className="flex flex-col m-5 md:flex-row md:justify-between">
          <button className="md:mx-2 w-36 my-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Score:
          </button>
          <button onClick={resetGame} className="md:mx-2 w-36 my-1 disable bg-pink-500 hover:bg-blue-400 text-white font-bold py-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            New Game
          </button>
          <button className="md:mx-2 w-36 my-1 disable bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Best:
          </button>
        </div>
      </div>
      <div className="bg-red-900 rounded bg-opacity-60 p-1">
        {data.map((row, i) => {
          return (
            <div className="flex">
              {row.map((digit, index) => (
                <Block num={digit} key={index} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
