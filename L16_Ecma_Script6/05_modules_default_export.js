import Math from './05_modules_default_export_math';

var arg1 = process.argv[2];
var arg2 = process.argv[3];

console.log(Math.PI);
console.log(Math.sqrt(+arg1));
console.log(Math.square(+arg2));