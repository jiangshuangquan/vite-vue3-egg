const { Model, STRING } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class albums extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    albums.init(
        {
            id: {
                type: STRING(20),
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: STRING(100),
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'albums'
        }
    )
    return albums
}
