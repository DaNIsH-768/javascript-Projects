const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;
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

const cellsHorizontal = 5;
const cellsVertical = 3;
const WIDTH = window.innerWidth - 20;
const HEIGHT = window.innerHeight - 20;
const unitLengthX = WIDTH / cellsHorizontal;
const unitLengthY = HEIGHT / cellsVertical;

const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: false,
    height: HEIGHT,
    width: WIDTH,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

const walls = [
  Bodies.rectangle(WIDTH / 2, 0, WIDTH, 5, {
    isStatic: true,
  }),
  Bodies.rectangle(WIDTH, HEIGHT / 2, 5, HEIGHT, {
    isStatic: true,
  }),
  Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 5, {
    isStatic: true,
  }),
  Bodies.rectangle(0, HEIGHT / 2, 5, HEIGHT, {
    isStatic: true,
  }),
];

World.add(world, walls);

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startCol = Math.floor(Math.random() * cellsHorizontal);

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

    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextCol < 0 ||
      nextCol >= cellsHorizontal
    ) {
      continue;
    }

    if (grid[nextRow][nextCol]) {
      continue;
    }

    if (direction === "left") {
      verticals[row][col - 1] = true;
    } else if (direction === "right") {
      verticals[row][col] = true;
    } else if (direction === "up") {
      horizontals[row - 1][col] = true;
    } else {
      horizontals[row][col] = true;
    }

    cellIteration(nextRow, nextCol);
  }
};

cellIteration(startRow, startCol);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, colIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      colIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      }
    );

    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, colIndex) => {
    if (open) {
      return;
    }

    const line = Bodies.rectangle(
      colIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      }
    );

    World.add(world, line);
  });
});

const goal = Bodies.rectangle(
  WIDTH - unitLengthX / 2,
  HEIGHT - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    label: "goal",
    isStatic: true,
    render: {
      fillStyle: "green",
    },
  }
);

World.add(world, goal);

const ballRadius = Math.min(unitLengthX, unitLengthY) / 3;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
  render: {
    fillStyle: "blue",
  },
});
World.add(world, ball);

document.addEventListener("keydown", (e) => {
  const { x, y } = ball.velocity;

  if (e.keyCode === 87) {
    Body.setVelocity(ball, { x, y: y - 5 });
  } else if (e.keyCode === 68) {
    Body.setVelocity(ball, { x: x + 5, y });
  } else if (e.keyCode === 83) {
    Body.setVelocity(ball, { x, y: y + 5 });
  } else if (e.keyCode === 65) {
    Body.setVelocity(ball, { x: x - 5, y });
  }
});

Events.on(engine, "collisionStart", (e) => {
  e.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden");
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
