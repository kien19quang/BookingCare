'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Clinic.hasMany(models.Doctor_Infor, { foreignKey: 'specialtyId' })
        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        contentHTML: DataTypes.TEXT,
        contentMarkdown: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};