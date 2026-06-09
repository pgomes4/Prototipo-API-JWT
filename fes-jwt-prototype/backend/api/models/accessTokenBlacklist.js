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
            usuario_id:{
                type: DataTypes.TEXT,
                allowNull: true
            },
            email:{
                type: DataTypes.STRING,
                allowNull: true
            },
            tipo_revogacao:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'TOKEN'
            },
            reason:{
                type: DataTypes.STRING,
                allowNull: true
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            revoked_at:{
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'access_token_blacklist',
            underscored: true
        }
    )
    return accessTokenBlacklist
}