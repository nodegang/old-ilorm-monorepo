
/**
 * Create a new Mongo Model class.
 * @param {Model} ParentModel The Model used as Parent
 * @returns {MongoModel} The MongoModel created
 */
const mongoModelFactory = ({ ParentModel, }) => (
  class MongoModel extends ParentModel {
    /**
     * Generate a query targeting the primary key of the instance
     * @returns {Object} Return the query to use to target the current instance
     */
    getQueryPrimary() {
      return this.constructor.query()
        ._id.is(this._id);
    }

    /**
     * Return a unique key to identify the current instance
     * @returns {ObjectId} Current primary key
     */
    getPrimary() {
      return this._id;
    }
  }
);

module.exports = mongoModelFactory;
