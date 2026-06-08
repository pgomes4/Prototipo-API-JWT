'use strict';

module.exports = (sequelize, DataTypes) => {
    const accessTokenBlacklist = sequelize.define(
        'access_token_blacklist',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'access_token_blacklist',
            underscored: true
        }
    )
    return accessTokenBlacklist
}