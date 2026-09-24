const {test}=require('node:test');
const assert=require('node:assert/strict');
const calculate=require('../assets/calculator.js');
test('Create uses labeled serving, not rounded-up 5 g intake',()=>{const x=calculate(48,90,1.5,3);assert.equal(x.servingGrams,4.5);assert.equal(x.completeServings,30);assert.equal(x.servingCost,1.6);assert.ok(Math.abs(x.normalizedCost-1.7777777778)<1e-8);});
test('500 g powder preset means 100 scoops, not 500 scoops',()=>{const x=calculate(24.99,100,5,1);assert.equal(x.completeServings,100);assert.ok(Math.abs(x.normalizedCost-.2499)<1e-9);});
test('leftover units do not invent a complete serving',()=>{const x=calculate(30,62,1,6);assert.equal(x.completeServings,10);assert.equal(x.leftoverUnits,2);});
test('invalid, negative, fractional counts and missing values are rejected',()=>{for(const args of [[0,90,1.5,3],[-4,90,1.5,3],[48,0,1,3],[48,90,NaN,3],[48,90,1,0],[48,90.5,1,3],[48,90,1,100],[Infinity,90,1,3]])assert.equal(calculate(...args),null);});
