const fs = require('fs');

// Read the grid from input_test.txt
function readGridFromFile(filename) {
  const fileContent = fs.readFileSync(filename, 'utf-8'); // Read file
  return fileContent
    .trim() // Remove trailing newlines/spaces
    .split('\n') // Split by line
    .map(line => line.split('')); // Convert each line into an array of characters
}

// Search for all instances of the word in the grid
function findAllInstances(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const wordLength = word.length;

  const directions = [
    [0, 1],   // Right
    [0, -1],  // Left
    [1, 0],   // Down
    [-1, 0],  // Up
    [1, 1],   // Down-right
    [-1, -1], // Up-left
    [1, -1],  // Down-left
    [-1, 1]   // Up-right
  ];

  function isValid(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function searchFrom(x, y, dirX, dirY) {
    for (let i = 0; i < wordLength; i++) {
      const newX = x + i * dirX;
      const newY = y + i * dirY;
      if (!isValid(newX, newY) || grid[newX][newY] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  const matches = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === word[0]) {
        for (let [dirX, dirY] of directions) {
          if (searchFrom(r, c, dirX, dirY)) {
            matches.push({ start: [r, c], direction: [dirX, dirY] });
          }
        }
      }
    }
  }

  return matches;
}

// Main script
const grid = readGridFromFile('input.txt'); // File name
const instances = findAllInstances(grid, "XMAS");

console.log(`XMAS appears ${instances.length} times in the grid.`);
