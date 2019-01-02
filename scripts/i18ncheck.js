#!/usr/bin node
const standardTransName = 'zh.i18n';
const standardTrans = require(`../i18n/${standardTransName}`);
const requireDir = require('require-dir');
const _allTrans = requireDir('../i18n/');

const tmp = Object.entries(_allTrans)
  .filter(([key, value]) => key !== standardTransName)

const allTrans = {};
for (let [key, value] of tmp) {
  allTrans[key] = value;
}

function objToArr(obj) {
  let res = [];
  for (let key in obj) {
    let value = obj[key];

    if(typeof value === 'object') {
      res.push(...objToArr(value).map(x => `${key}.${x}`));
    }else {
      res.push(key);
    }

  }

  return res;
}
let standardTransKeys = objToArr(standardTrans);
console.log('标准语言:', standardTransName);
console.log('标准翻译列表:\n\t' + standardTransKeys.join('\n\t'));


console.log('比较结果:');

for (let name in allTrans) {
  let t = allTrans[name];
  let keys = objToArr(t);
  let losts = standardTransKeys.filter(st => keys.indexOf(st) === -1);
  console.log(`=====[${name}]=====:\n` + losts.map(x => `缺失:${x}`).join('\n'));
}

console.log('===================');
console.log('比较完成!');
