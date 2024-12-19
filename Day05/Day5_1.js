const fs = require('fs');

// Read and process the file
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Helper to parse data
    const parseData = (data) => {
        const lines = data.trim().split('\n');
        const rules = lines.filter(line => line.includes('|'));
        const updates = lines.filter(line => line.includes(','));
        return { rules, updates };
    };

    // Build graph and in-degree tracker
    const buildGraph = (rules) => {
        const graph = {};
        const inDegree = {};

        rules.forEach(rule => {
            const [from, to] = rule.split('|').map(Number);
            if (!graph[from]) graph[from] = [];
            if (!inDegree[from]) inDegree[from] = 0;
            if (!inDegree[to]) inDegree[to] = 0;

            graph[from].push(to);
            inDegree[to]++;
        });

        return { graph, inDegree };
    };

    // Perform topological sort
    const topologicalSort = (graph, inDegree) => {
        const sortedOrder = [];
        const zeroInDegreeQueue = Object.keys(inDegree).filter(node => inDegree[node] === 0).map(Number);

        while (zeroInDegreeQueue.length > 0) {
            const current = zeroInDegreeQueue.shift();
            sortedOrder.push(current);

            (graph[current] || []).forEach(neighbor => {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    zeroInDegreeQueue.push(neighbor);
                }
            });
        }

        if (sortedOrder.length !== Object.keys(inDegree).length) {
            throw new Error('Cycle detected in rules. Cannot determine a valid order.');
        }

        return sortedOrder;
    };

    // Validate updates
    const validateUpdates = (updates, sortedOrder) => {
        return updates.filter(update => {
            const updateNums = update.split(',').map(Number);
            for (let i = 0; i < updateNums.length - 1; i++) {
                if (sortedOrder.indexOf(updateNums[i]) > sortedOrder.indexOf(updateNums[i + 1])) {
                    return false;
                }
            }
            return true;
        });
    };

    // Calculate the sum of middle numbers
    const calculateMiddleSum = (updates) => {
        return updates.reduce((sum, update) => {
            const updateNums = update.split(',').map(Number);
            const middleIndex = Math.floor(updateNums.length / 2);
            return sum + updateNums[middleIndex];
        }, 0);
    };

    // Main execution
    try {
        const { rules, updates } = parseData(data);
        const { graph, inDegree } = buildGraph(rules);
        const sortedOrder = topologicalSort(graph, inDegree);
        const correctUpdates = validateUpdates(updates, sortedOrder);
        const middleSum = calculateMiddleSum(correctUpdates);

        console.log('Rules:', rules);
        console.log('Updates:', updates);
        console.log('Sorted Order:', sortedOrder);
        console.log('Correctly Ordered Updates:', correctUpdates);
        console.log('Sum of Middle Page Numbers:', middleSum);
    } catch (error) {
        console.error(error.message);
    }
});
