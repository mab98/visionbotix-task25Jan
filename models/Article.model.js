'use strict'

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING(30), // 3-30
      allowNull: false,
      // unique: true,
      validate: {
        min: 3,
        max: 30
      }
    },
    subtitle: {
      type: DataTypes.STRING(40), // 3-40
      allowNull: false,
      validate: {
        min: 3,
        max: 40
      }
    },
    content: {
      type: DataTypes.STRING(1000), // 50-1000
      allowNull: false,
      validate: {
        min: 50,
        max: 1000
      }
    }
    , imageUrl: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  })

  return Article;
}