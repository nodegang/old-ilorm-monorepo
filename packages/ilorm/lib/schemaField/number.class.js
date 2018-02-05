'use strict';

const { OPERATIONS, FIELDS, } = require('ilorm-constants').QUERY;
const declareOperation = require('./helpers/declareOperation');
const SchemaField = require('./schemaField.class');

const NUMBER_OPERATIONS = [
  OPERATIONS.BETWEEN,
  OPERATIONS.GREATER_THAN,
  OPERATIONS.GREATER_OR_EQUAL_THAN,
  OPERATIONS.LOWER_THAN,
  OPERATIONS.LOWER_OR_EQUAL_THAN,
];

/**
 * Class representing a Number field
 */
class Number extends SchemaField {

  /**
   * Return the query operation associated with the given schema field
   * @param {Query} query the instance of query to use
   * @param {Array.<String>} additionalOperations Add operations to the field builder
   * @return {Object} The query operations
   */
  getQueryOperations({ query, additionalOperations = [], }) {
    const queryOperations = super.getQueryOperations({
      query,
      additionalOperations: NUMBER_OPERATIONS.concat(additionalOperations),
    });

    queryOperations[OPERATIONS.ADD] = declareOperation({
      query,
      operation: OPERATIONS.ADD,
      key: this._name,
      field: FIELDS.UPDATE,
    });

    return queryOperations;
  }


  /**
   * Cast a value to match the specific field or throw an exception
   * @param {Mixed} value the value to cast
   * @returns {Number} value the value casted to the specific schemaField type configuration
   */
  castValue(value) {
    if (typeof value === 'number') {
      return value;
    }

    const result = parseFloat(value);

    if (isNaN(result)) {
      throw new Error(`${value} is not a valid number.`);
    }

    return result;
  }
}

module.exports = Number;
