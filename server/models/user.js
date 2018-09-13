export default function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type:  DataTypes.STRING(10),
            allowNull: false
        },
        password: {
            type:  DataTypes.STRING,
            allowNull: false
        },
        email: {
            type:  DataTypes.STRING,
            allowNull: false
        }
    });
    User.sync();    // 数据库同步，同步所有尚未在数据库中的模型
    return User;
}