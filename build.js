const fs = require('fs-extra');
const concat = require('concat');    
const osfs = require('fs');

async function copyAndUpdateJson(){
    return fs.readJson('./package.json', (err, packageObj) => {
        if (err) console.error(err)
        packageObj.dependencies = {};
        packageObj.devDependencies = {};
        packageObj.main = './ng-dropdown-element.js';
      
        osfs.writeFile('./dist/elements/package.json', JSON.stringify(packageObj, null, 4), (e)=>{
            if (e) console.error(e);
        });
    });    
}

(async function build() {

    const files =[
        'dist/angular-elements-dropdown/runtime.js',
        'dist/angular-elements-dropdown/polyfills.js',
        'dist/angular-elements-dropdown/main.js',
        'dist/angular-elements-dropdown/scripts.js',
    ]
    
    await fs.ensureDir('dist/elements')
    
    await concat(files, './dist/elements/ng-dropdown-element.js')
    await copyAndUpdateJson();
    await fs.copy('./web-example', './dist/elements/demo');
    await fs.copy('./src/dropdown', './dist/elements/src');
    console.info('dropdown element created successfully!')
})()