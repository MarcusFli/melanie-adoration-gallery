// Depth-first search maze generation algorithm
// This creates perfect mazes (exactly one path between any two cells)

export interface Cell {
  x: number;
  y: number;
  visited: boolean;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  specialPosition?: string; // Add this optional property
}

export interface Maze {
  grid: Cell[][];
  width: number;
  height: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  level: number;
}

const createEmptyCell = (x: number, y: number): Cell => ({
  x,
  y,
  visited: false,
  walls: {
    top: true,
    right: true,
    bottom: true,
    left: true,
  },
  specialPosition: undefined
});

// Get random element from array
const randomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Get unvisited neighbors
const getUnvisitedNeighbors = (grid: Cell[][], cell: Cell): Cell[] => {
  const { x, y } = cell;
  const neighbors: Cell[] = [];
  const width = grid[0].length;
  const height = grid.length;

  // Top neighbor
  if (y > 0 && !grid[y - 1][x].visited) {
    neighbors.push(grid[y - 1][x]);
  }
  // Right neighbor
  if (x < width - 1 && !grid[y][x + 1].visited) {
    neighbors.push(grid[y][x + 1]);
  }
  // Bottom neighbor
  if (y < height - 1 && !grid[y + 1][x].visited) {
    neighbors.push(grid[y + 1][x]);
  }
  // Left neighbor
  if (x > 0 && !grid[y][x - 1].visited) {
    neighbors.push(grid[y][x - 1]);
  }

  return neighbors;
};

// Remove walls between two cells
const removeWallsBetween = (current: Cell, next: Cell, grid: Cell[][]) => {
  const dx = current.x - next.x;
  const dy = current.y - next.y;

  if (dx === 1) {
    // Next cell is to the left
    grid[current.y][current.x].walls.left = false;
    grid[next.y][next.x].walls.right = false;
  } else if (dx === -1) {
    // Next cell is to the right
    grid[current.y][current.x].walls.right = false;
    grid[next.y][next.x].walls.left = false;
  } else if (dy === 1) {
    // Next cell is above
    grid[current.y][current.x].walls.top = false;
    grid[next.y][next.x].walls.bottom = false;
  } else if (dy === -1) {
    // Next cell is below
    grid[current.y][current.x].walls.bottom = false;
    grid[next.y][next.x].walls.top = false;
  }
};

// Create a random maze using depth-first search
export const generateMaze = (width: number, height: number, level: number): Maze => {
  // Initialize the grid with cells
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push(createEmptyCell(x, y));
    }
    grid.push(row);
  }

  // Depth-first search maze generation algorithm
  const stack: Cell[] = [];
  const startX = 0;
  const startY = 0;
  const startCell = grid[startY][startX];
  startCell.visited = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(grid, current);

    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const next = randomElement(neighbors);
      next.visited = true;
      removeWallsBetween(current, next, grid);
      stack.push(next);
    }
  }

  // Make the maze more interesting based on level
  // As levels increase, create some loops by removing random walls
  const loopFactor = Math.min(level * 2, 20); // Max 20% walls removed to create loops
  const wallsToRemove = Math.floor((width * height * loopFactor) / 100);
  
  for (let i = 0; i < wallsToRemove; i++) {
    const x = Math.floor(Math.random() * (width - 1));
    const y = Math.floor(Math.random() * height);
    
    // Remove a random internal wall to create a loop
    grid[y][x].walls.right = false;
    grid[y][x + 1].walls.left = false;
  }

  // Set end position to be far from start
  const endX = width - 1;
  const endY = height - 1;

  // Reset visited flags
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      grid[y][x].visited = false;
    }
  }

  return {
    grid,
    width,
    height,
    startPosition: { x: startX, y: startY },
    endPosition: { x: endX, y: endY },
    level
  };
};
