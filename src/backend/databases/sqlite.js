const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'mytododb.sqlite'
});

const users = sequelize.define('users', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false 
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});
const lists = sequelize.define('lists', {
	item: {
		type: Sequelize.STRING,

	},
	edit: {
		type: Sequelize.BOOLEAN,

	},
	done: {
		type: Sequelize.STRING,

	},
	uid:{
		type: Sequelize.NUMBER,
	},
	date:{
		type: Sequelize.DATE
	}
	
});

sequelize
.sync()
.then(() => {
	console.log("user and list table has been successfully created, if one doesn't exist");
})
.catch(error => console.log('This error occured'));




module.exports = {
	users: users,
	lists:lists
}
