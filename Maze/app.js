const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
const { world } = engine;

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const CELLS = 3;
const WIDTH = 600;
const HEIGHT = 600;

const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

const walls = [
  Bodies.rectangle(WIDTH / 2, 0, WIDTH, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(WIDTH, HEIGHT / 2, 20, HEIGHT, {
    isStatic: true,
  }),
  Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(0, HEIGHT / 2, 20, HEIGHT, {
    isStatic: true,
  }),
];

World.add(world, walls);

const grid = Array(CELLS)
  .fill(null)
  .map(() => Array(CELLS).fill(false));

const verticals = Array(CELLS)
  .fill(null)
  .map(() => Array(CELLS - 1).fill(false));

const horizontals = Array(CELLS - 1)
  .fill(null)
  .map(() => Array(CELLS).fill(false));

const startRow = Math.floor(Math.random() * CELLS);
const startCol = Math.floor(Math.random() * CELLS);

const cellIteration = (row, col) => {
  if (grid[row][col]) {
    return;
  }

  grid[row][col] = true;

  const neighbours = shuffle([
    [row - 1, col, "up"],
    [row, col + 1, "right"],
    [row + 1, col, "down"],
    [row, col - 1, "left"],
  ]);

  for (let neighbour of neighbours) {
    const [nextRow, nextCol, direction] = neighbour;

    if (nextRow < 0 || nextRow >= CELLS || nextCol < 0 || nextCol >= CELLS) {
      continue;
    }

    if (grid[nextRow][nextCol]) {
      continue;
    }
  }
};
