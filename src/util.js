/**
 * If the given value is not an array, wrap it in one.
 *
 * @param  {Any} value
 * @return {Array}
 */
export function arrayWrap (value) {
  return Array.isArray(value) ? value : [value]
}
