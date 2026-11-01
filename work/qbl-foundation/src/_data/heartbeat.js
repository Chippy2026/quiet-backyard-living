const core=require('../../scripts/core.cjs');module.exports=()=>{const key=core.read('data/editorial.json').activeSeason;return {key,...core.read('data/heartbeat.json')[key]}};
