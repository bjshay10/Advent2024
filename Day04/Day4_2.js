const fs = require('fs');

// Read the grid from input_test.txt
function readGridFromFile(filename) {
  const fileContent = fs.readFileSync(filename, 'utf-8'); // Read file
  return fileContent
    .trim() // Remove trailing newlines/spaces
    .split('\n') // Split by line
    .map(line => line.split('')); // Convert each line into an array of characters
}

// Search for "MAS" in the specified diagonal pattern
function findDiagonalMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  function isValid(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  const matches = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Check if current cell is 'A'
      if (grid[r][c] === 'A') {
        // Validate diagonal pattern
        const topLeft = isValid(r - 1, c - 1) && grid[r - 1][c - 1] === 'M';
        const bottomLeft = isValid(r + 1, c - 1) && grid[r + 1][c - 1] === 'M';
        const topRight = isValid(r - 1, c + 1) && grid[r - 1][c + 1] === 'S';
        const bottomRight = isValid(r + 1, c + 1) && grid[r + 1][c + 1] === 'S';

        if (topLeft && bottomLeft && topRight && bottomRight) {
          matches.push({ center: [r, c] });
        }
      }
    }
  }

  return matches;
}

// Main script
const grid = readGridFromFile('input.txt'); // File name
const instances = findDiagonalMAS(grid);

if (instances.length > 0) {
  console.log(`MAS appears in the diagonal pattern ${instances.length} times:`);
  instances.forEach((instance, index) => {
    console.log(`Instance ${index + 1}: Center at ${instance.center}`);
  });
} else {
  console.log("No diagonal MAS patterns found.");
}
