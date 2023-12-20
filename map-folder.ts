import mapfolder from 'map-folder';
import fs from 'fs';
import path from 'path';
 
// sync
const options = {
    include: ['.jsx', 'js', '.tsx', '.ts', '.css', '.ico' ],
    skipEmpty: false,
    exclude: ['node_modules/', 'env/' ]
}
const result = mapfolder('./', {options});
 
// Async
const resultPromise = mapfolder('./reports/', {async: true});

console.log(result)
fs.writeFile(path.join(__dirname, 'result.json'), result, (err) => {
    if (err) throw err;
})

resultPromise(options)
.then(console.log)
.catch(console.error)
.fs.writeFile(path.join(__dirname, 'result2.json'), result, (err) => {
    if (err) throw err;
    
});