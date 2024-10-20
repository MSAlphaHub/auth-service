/**
 * Create an object composed of the picked object properties
 * @param {Record<string, any>} object
 * @param {string[]} keys
 * @returns {Record<string, any>}
 */
export const pick = (
  object: Record<string, any>,
  keys: string[]
): Record<string, any> => {
  return keys.reduce((obj: Record<string, any>, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Record<string, any>);
};
