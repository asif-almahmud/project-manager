export const localValues = {
  set: <T>(key: string, value: T) => {
    // this will create new key:value pair in the local storage
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string): any => {
    // this will return the value for the given key
    return JSON.parse(localStorage.getItem(key) as string);
  },
  remove: (key: string) => {
    // this will remove the specific key:value pair from the localStorage
    localStorage.removeItem(key);
  },
  clear: () => {
    // this will clear everything from the localStorage
    localStorage.clear();
  },
  keys: () => {
    // this will retun an array of all the keys of the localStorage
    return Object.keys(localStorage);
  },
};

export const setLocalValue = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalValue = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
