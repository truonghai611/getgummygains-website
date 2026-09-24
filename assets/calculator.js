/* Label arithmetic. No recommended dose is inferred from these inputs. */
(function (root) {
  'use strict';
  function calculate(price, count, gramsPerUnit, unitsPerServing) {
    var values = [price, count, gramsPerUnit, unitsPerServing];
    if (!values.every(function (n) { return Number.isFinite(n) && n > 0; }) ||
        !Number.isInteger(count) || !Number.isInteger(unitsPerServing) || unitsPerServing > count) {
      return null;
    }
    var totalGrams = count * gramsPerUnit;
    return { servingGrams: gramsPerUnit * unitsPerServing,
      completeServings: Math.floor(count / unitsPerServing),
      leftoverUnits: count % unitsPerServing,
      servingCost: price * unitsPerServing / count,
      normalizedCost: price * 5 / totalGrams };
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = calculate; }
  else { root.gummyLabelCost = calculate; }
})(typeof window !== 'undefined' ? window : this);
