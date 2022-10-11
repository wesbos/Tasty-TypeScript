import convert from 'color-convert';

const age = 100;
// this should throw an error about string not being type of RGB
convert.rgb.hex('hello');
