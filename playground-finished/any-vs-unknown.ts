/* eslint-disable */
let anyVal: any;
let unknownVal: unknown;

anyVal();
unknownVal();

if(typeof unknownVal === 'function') {
  unknownVal();
}

anyVal++;
unknownVal++;

if(typeof unknownVal === 'number') {
  unknownVal++;
}
