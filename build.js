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
        'dist/angular-element-dropdown/runtime.js',
        'dist/angular-element-dropdown/polyfills.js',
        'dist/angular-element-dropdown/main.js',
        'dist/angular-element-dropdown/scripts.js',
    ]
    
    await fs.ensureDir('dist/elements')
    
    await concat(files, './dist/elements/index.js')
    await copyAndUpdateJson();
    await fs.copy('./web-example', './dist/package/demo');
    await fs.copy('./src/dropdown', './dist/package/src');
    await fs.copy('./README.md', './dist/package/README.md');
    console.info('dropdown element created successfully!')
})()