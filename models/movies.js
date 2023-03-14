const {DataTypes, server} = require('../server1');

const Movie = server.define('Movie', {
    movie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {Movie}