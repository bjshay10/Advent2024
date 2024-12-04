const fs = require('fs')
const readline = require('readline')

var firstArray = []
var secondArray = []
var totalDistance = 0

fs.readFile('input.txt', function(err, data){
    console.log(`STARTING`)

    var array = data.toString().split('\r\n')

    for (i = 0; i < array.length; i++){
        var tempArray = array[i].toString().split(' ')

        firstArray.push(tempArray[0])
        secondArray.push(tempArray[3])
    }
    
    firstArray = firstArray.sort()
    secondArray = secondArray.sort()

    for (j = 0; j < firstArray.length; j++){
        //console.log(Math.abs(parseInt(firstArray[j]) - parseInt(secondArray[j])))
        totalDistance += Math.abs(parseInt(firstArray[j]) - parseInt(secondArray[j]))
    }

    console.log(`ENDING Distance = ${totalDistance}`)
})