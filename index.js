#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var fs = require("fs");

function readJSON(p){
    var contents = fs.readFileSync(p);
    return JSON.parse(contents);
}
var mc_ids = {'water':1,
              'earth':2,
              'dense':4,
              'moderate':5,
              'sparse':6,
              'open':8,
              'partial':9,
              'cropland':10, 
              'wetland':11,
              'built':12};

if (argv._.length>0) { 
    for(var i = 0; i < argv._.length; i++){
        var jsonContent = readJSON(argv._[i]);
        var c = jsonContent.features.length;  
        for (var j = 0; j < c; j++) {
            var item = jsonContent.features[j];//https://github.com/developmentseed/unique/issues/12#issuecomment-382442848            
            item.properties.date=item.properties.date>2010?20017:2007;
            item.properties.MC_ID=mc_ids[item.properties.landcover]?mc_ids[item.properties.landcover]:mc_ids[item.properties.type];            
        }
        fs.writeFileSync('f_'+argv._[i], JSON.stringify(jsonContent));
        console.log('\x1b[32m%s\x1b[0m', argv._[i]+' Complete!'); 
    }
}else{
    console.log('\x1b[36m%s\x1b[0m', 'Without parameters Usually :'); 
    console.log('\x1b[33m%s\x1b[0m', 'addmc *dense.geojson');
    console.log('\x1b[33m%s\x1b[0m', 'addmc m*-f*.geojson');
}