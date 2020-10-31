#!/usr/bin/env node

let package = require('package')(module);

const chalk = require('chalk');
const log = console.log;

// CPU-stat
const os = require('os');
const cpuStat = require('cpu-stat');
const parse_ms = require('parse-ms');
const process = require('process');

function formatBytes (a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  } // Create MB, KB, TB or something in the back of your memory counters.

/*
const cores = os.cpus().length // Counting how many cores your hosting has.
const cpuModel = os.cpus()[0].model // Your hosting CPU model.
const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
const Node = process.version // Your node version.
const CPU = percent.toFixed(2) // Your CPU usage.
*/
function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
  
    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {
  
      //Select CPU core
      var cpu = cpus[i];
  
      //Total up the time in the cores tick
      for(type in cpu.times) {
        totalTick += cpu.times[type];
     }     
  
      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }
  
    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }

var startMeasure = cpuAverage();

setTimeout(function() { 

    //Grab second Measure
    let endMeasure = cpuAverage(); 
  
    //Calculate the difference in idle and total time between the measures
    let idleDifference = endMeasure.idle - startMeasure.idle;
    let totalDifference = endMeasure.total - startMeasure.total;
  
    //Calculate the average percentage CPU usage
    let percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
  
    //Output result to console
    


log(('\nCPU: ') + (chalk.bold.rgb(114, 137, 218)(`${percentageCPU}%`)));
  
  }, 100);

const usage = formatBytes(process.memoryUsage().heapUsed)

log(('\nUsage: ') + (chalk.bold.rgb(114, 137, 218)(`${usage}`)));

const cpuModel = os.cpus()[0].model

log(('\nCPU Model: ') + (chalk.bold.rgb(114, 137, 218)(`${cpuModel}`)));

const Node = process.version

log(('\nNode Version: ') + (chalk.bold.rgb(114, 137, 218)(`${Node}`)));

const cores = os.cpus().length

log(('\nCPU Cores: ') + (chalk.bold.rgb(114, 137, 218)(`${cores}`)));