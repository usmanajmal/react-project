var Reflux = require('reflux');

module.exports = Reflux.createActions([
	'getTopics', // In any store if someone is listening to getTopics, run it in that store as well
	'getImages',
    'getImage'
]);