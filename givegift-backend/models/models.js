import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const Interest = sequelize.define('interest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

export const Product = sequelize.define('product', {
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

export const Favourite = sequelize.define('favourite', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
        // User id comes from supabase. That's why there is no foreign-key constraint
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
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
Product.hasMany(Favourite, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Favourite.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' })
