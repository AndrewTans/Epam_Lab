function askFoo() {
  return new Promise(function(resolve, reject) {
    resolve('foo');
  });
}

function run(generator) {
  let it = generator();

  function go(res) {
    res.value.then(function(res) {
      it.next(res);
    }, function(err) {
      it.next(err);
    });
  }

  go(it.next());
}

run(function* () {
  try {
    var foo = yield askFoo();
    console.log(foo);
  } catch (err) {
    console.log(error);
  }
});