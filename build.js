const fs = require('fs-extra');
const concat = require('concat');    
const osfs = require('fs');

async function copyAndUpdateJson(){
    return fs.readJson('./package.json', (err, packageObj) => {
        if (err) console.error(err)
        packageObj.dependencies = {};
        packageObj.devDependencies = {};
        packageObj.main = './index.js';
      
        osfs.writeFile('./dist/package/package.json', JSON.stringify(packageObj, null, 4), (e)=>{
            if (e) console.error(e);
        });
    });    
}

(async function build() {

    const files =[
        'dist/angular-dropdown-element/runtime.js',
        'dist/angular-dropdown-element/polyfills.js',
        'dist/angular-dropdown-element/main.js',
        'dist/angular-dropdown-element/scripts.js',
    ]
    
    await fs.ensureDir('dist/package')
    
    await concat(files, './dist/package/index.js')
    await copyAndUpdateJson();
    await fs.copy('./web-example', './dist/package/demo');
    await fs.copy('./src/dropdown', './dist/package/src');
    await fs.copy('./README.md', './dist/package/README.md');
    console.info('dropdown element created successfully!')
})()