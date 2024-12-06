const fs = require('fs')
const readline = require('readline')

function findMultiplications(inputString) {
    const regex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g; // Match mul(X, Y) with up to 3-digit numbers
    let matches
    const results = []
  
    while ((matches = regex.exec(inputString)) !== null) {
      const x = parseInt(matches[1], 10) // Extract X
      const y = parseInt(matches[2], 10) // Extract Y
      results.push({ x, y })
    }
  
    return results
  }


fs.readFile('input.txt', function(err, data){
    console.log(`STARTING`)
    
    var resultsArray = findMultiplications(data)
    var total = 0
    
    for (a = 0; a < resultsArray.length; a++) {
        var X = resultsArray[a].x
        var Y = resultsArray[a].y
        var temp = X * Y
        total += temp
    }

    console.log(`ENDING Toal = ${total}`)
})