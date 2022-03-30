/**
 * Returns true if the passed `thing` is an Object type (but not Array, Map, etc).
 * @param {*} thing The item to check
 * @returns Boolean
 */
function isObject(thing) {
  return (
    thing instanceof Object && Object.getPrototypeOf(thing) === Object.prototype
  );
}

/**
 * Ensures `obj` has the same fields as `template`, recursing for nested objects
 * Note: does not handle type changes
 * @param {Object} obj Object to normalise
 * @param {Object} template Basis
 */
export function normaliseObject(obj, template) {
  obj = { ...obj };

  // Copy over missing values from the template
  Object.entries(template).forEach(([key, value]) => {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = value;
    } else if (isObject(template[key])) {
      obj[key] = normaliseObject(obj[key], template[key]);
    }
  });

  // Remove values not in the template
  Object.entries(obj).forEach(([key, value]) => {
    if (!template.hasOwnProperty(key)) {
      delete obj[key];
    }
  });

  return obj;
}
