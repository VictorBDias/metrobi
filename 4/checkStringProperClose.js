function checkStringProperClose(string) {
  const stack = [];
  const bracketPairs = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (const char of string) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
