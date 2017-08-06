const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let i = 0;
    let value;
    return {
      next() {
        i++;
        if (i % 15 === 0) {
          value = 'FizzBuzz'
        } else if (i % 3 === 0) {
          value = 'Fizz'
        } else if (i % 5 === 0) {
          value = 'Buzz'
        } else {
          value = i
        }
        if (i <= max) return {
          done: false,
          value
        }
        else return {
          done: true
        }
      }
    }
  }
}

for (let n of FizzBuzz) {
  console.log(n);
}