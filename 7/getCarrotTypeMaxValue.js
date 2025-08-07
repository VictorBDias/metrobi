function getCarrotTypeMaxValue(carrotTypes, capacity) {
  if (!carrotTypes || carrotTypes.length === 0 || capacity <= 0) {
    return 0;
  }
  const dp = new Array(capacity + 1).fill(0);

  for (let weight = 1; weight <= capacity; weight++) {
    for (const carrot of carrotTypes) {
      if (carrot.kg <= weight) {
        const value = carrot.price + dp[weight - carrot.kg];
        dp[weight] = Math.max(dp[weight], value);
      }
    }
  }

  return dp[capacity];
}
