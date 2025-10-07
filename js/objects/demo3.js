//  Use object method shorthand. eslint: object-shorthand

// bad
{
const atom = {
  value: 1,

  addValue: function (value) {
    return console.log('Adding value...', atom.value + value);
  },
};}

// good
{
    const atom = {
  value: 1,

  addValue(value) {
    return console.log('Adding value...', this.value + value);
  },
};
}