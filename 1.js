const findDuplicates = (array) => {
  const seen = new Map();
  const duplicates = [];

  for (const item of array) {
    const key = JSON.stringify(item);

    if (seen.has(key)) {
      duplicates.push(item);
    } else {
      seen.set(key, item);
    }
  }

  return duplicates;
};
