async function writeArrayWithExponentialDelay(array) {
  for (let i = 0; i < array.length; i++) {
    const delay = Math.pow(2, i) * 1000;

    console.log(array[i]);

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
