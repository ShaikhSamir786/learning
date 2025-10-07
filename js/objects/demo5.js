// Group your shorthand properties at the beginning of your object declaration.

// Why? It’s easier to tell which properties are using the shorthand.


const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
// const obj = {
//   episodeOne: 1,
//   twoJediWalkIntoACantina: 2,
//   lukeSkywalker,
//   episodeThree: 3,
//   mayTheFourth: 4,
//   anakinSkywalker,
// };

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};

console.log(obj);
