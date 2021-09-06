// Dependencies
const{Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    userPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            beforeUpdate(updateData) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
                return updateData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
);

module.exports = User;