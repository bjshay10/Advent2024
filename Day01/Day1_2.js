const fs = require('fs')
const readline = require('readline')

var firstArray = []
var secondArray = []
var totalDistance = 0

function countNumber(numArray, target) {
    return numArray.filter(num => num === target).length
}

fs.readFile('input.txt', function(err, data){
    console.log(`STARTING`)

    var array = data.toString().split('\r\n')

    for (i = 0; i < array.length; i++){
        var tempArray = array[i].toString().split(' ')

        firstArray.push(parseInt(tempArray[0]))
        secondArray.push(parseInt(tempArray[3]))
    }
    
    //firstArray = firstArray.sort()
    //secondArray = secondArray.sort()

    //console.log(firstArray)
    //console.log(secondArray)

    for (j = 0; j < firstArray.length; j++){
        var tempCount = countNumber(secondArray, firstArray[j])
        //console.log(firstArray[j] * tempCount)
        totalDistance += firstArray[j] * tempCount
    }

    console.log(`ENDING Distance = ${totalDistance}`)
})