const {logger} = require("../logger");

const handleProfileGet = (req, res, db) => {
    const {id} = req.params;
    logger.info(`An attempt was made to get user with id: ${id}`);
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => {
            logger.warn(`The attempt to get user with id: ${id} failed.`);
            res.status(400).json('error getting user')
        })
}

module.exports = {
    handleProfileGet
}