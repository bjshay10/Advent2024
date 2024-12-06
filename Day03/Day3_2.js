const fs = require('fs')
const readline = require('readline')

function findMultiplications(inputString) {
    const regex = /mul\((\d{1,3}),\s*(\d{1,3})\)|do\(\)|don't\(\)/g; // Match mul(X, Y) with up to 3-digit numbers
    let matches
    const results = []
  
    while ((matches = regex.exec(inputString)) !== null) {
        if (matches[0].startsWith('mul')) {
          // Extract numbers for mul
          const x = parseInt(matches[1], 10);
          const y = parseInt(matches[2], 10);
          results.push({ type: 'mul', x, y });
        } else if (matches[0] === 'do()') {
          // Handle do()
          results.push({ type: 'do' });
        } else if (matches[0] === "don't()") {
          // Handle don't()
          results.push({ type: "don't" });
        }
      }
    
      return results;
    
  }


fs.readFile('input.txt', function(err, data){
    console.log(`STARTING`)
    
    var resultsArray = findMultiplications(data)
    var total = 0
    var enabled = 'yes'
    var X = 0
    var Y = 0
    var temp = 0
    
    //console.log(resultsArray)

    for (a = 0; a < resultsArray.length; a++) {
        if (resultsArray[a].type === "don't"){
            //console.log("don't")
            enabled = 'no'
        } else if (resultsArray[a].type === 'do') {
            //console.log('do')
            enabled = 'yes'
        } else {
            if (enabled === 'yes'){
                X = resultsArray[a].x
                Y = resultsArray[a].y
                temp = X * Y
                //console.log(temp)
                total += temp
            }
        }
    }

    console.log(`ENDING Toal = ${total}`)
})