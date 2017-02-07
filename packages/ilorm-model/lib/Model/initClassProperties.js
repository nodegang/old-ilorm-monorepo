/**
 * Created by guillaume on 01/01/2017.
 */
const queryInjector = require('ilorm-query');
const Id = require('../Id');
const initHook = require('./initHook');

/**
 * Init properties associated with your class
 * @param {Model} Model Model you want to init
 * @param {Object} modelsMap The current map of all your model associated with your project
 * @param {Object} schema The schema associated with your current model
 * @param {Object} name The name of your model
 * @param {Connector} connector The connector used to connect to the database
 * @returns {Model} Return the initialized model
 */
function initProperties({ Model, modelsMap, schema, name, connector, }) {

  let ModelQuery = queryInjector({
    Model,
    Id,
    schema,
    modelsMap,
    connector,
  });

  // If the connector have an query overload:
  if (connector.query) {
    ModelQuery = connector.query({
      schema,
      Query: ModelQuery,
    });
  }

  Object.defineProperties(Model, {
    __ilormName: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: name,
    },
    __ilormSchema: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: schema,
    },
    __ilormConnector: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: connector,
    },
    __ilormQuery: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: ModelQuery,
    },
    hook: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: initHook(),
    }
  });

  return Model;
}

module.exports = initProperties;
