function countQuery(input, query) {
  const result = [];

  for (let i = 0; i < query.length; i++) {
    let count = 0;
    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++;
      }
    }
    result.push(count);
  }

  return result;
}

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

console.log(countQuery(input, query));
