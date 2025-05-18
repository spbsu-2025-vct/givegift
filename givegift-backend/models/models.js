import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const Interests = sequelize.define('interests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

export const Products = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    market_link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_link: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Favourites = sequelize.define('favourites', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
        // User id comes from supabase. That's why there is no foreign-key constraint
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id'
        },
        onDelete: 'CASCADE'  // if a product is deleted, its favourites go too
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: true }  // maybe in the future clean some of the favourites based on createdAt/updatedAt
)

// Relations
Products.hasMany(Favourites, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Favourites.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE' })
