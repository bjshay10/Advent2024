const fs = require('fs')
const readline = require('readline')

var isIncreasing
var isDecreasing

function checkSafety(checkArray) {
    let isSafe = 'safe';
    let isIncreasing = true
    let isDecreasing = true

    //check increasing/decreasing
    for (j = 1; j < checkArray.length; j++){
        if (parseInt(checkArray[j]) > parseInt(checkArray[j-1])) {
            isDecreasing = false
        } else if (parseInt(checkArray[j]) < parseInt(checkArray[j-1])) {
            isIncreasing = false;
        }
    }

    if (isDecreasing === false && isIncreasing === false){
        isSafe = 'unsafe'
        //return isSafe
    } else if (isDecreasing === true && isIncreasing === true){
        console.log(`broken`)
    } else if (isDecreasing === true) {
            for (let k = 1; k < checkArray.length; k++){
                const diff = Math.abs(parseInt(checkArray[k-1]) - parseInt(checkArray[k]))

                if (diff < 1 || diff > 3) {
                    isSafe = 'unsafe'
                    break
                }
            }
    } else if (isIncreasing === true) {
        for (let k = 1; k < checkArray.length; k++){
            const diff = Math.abs(parseInt(checkArray[k]) - parseInt(checkArray[k-1]))

            if (diff < 1 || diff > 3) {
                isSafe = 'unsafe'
                break
            }
        }
    }
    
    
    return isSafe

}

fs.readFile('input.txt', function(err, data){
    console.log(`STARTING`)

    var cntSafe = 0

    var array = data.toString().split('\r\n')

    for (i = 0; i < array.length; i++){
        var rptArray = array[i].split(' ')

        var safetyResult = checkSafety(rptArray)
        //console.log(safetyResult)

        //console.log(`Report ${rptArray}  is ${safetyResult}`)
        if (safetyResult === 'safe' ) {
            cntSafe++
        }
    }

    console.log(`ENDING Count Safe = ${cntSafe}`)
})