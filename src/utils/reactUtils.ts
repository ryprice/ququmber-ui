export const shallowDifference = (a: any, b: any): {[key: string]: boolean} => {
  const diff: {[key: string]: boolean} = {};
  for (const key in a) {
    if(!(key in b) || a[key] !== b[key]) {
      diff[key] = true;
    }
  }
  for (const key in b) {
    if(!(key in a) || a[key] !== b[key]) {
      diff[key] = true;
    }
  }
  return diff;
};
