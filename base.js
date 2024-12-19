const fs = require('fs')
const readline = require('readline')

fs.readFile('input.txt', function(err, data){
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    console.log(`STARTING`)
    
    console.log(`ENDING`)
})