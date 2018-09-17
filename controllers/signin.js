const {logger} = require("../logger");

const handleSignin = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    logger.info(`An attempt to login with email: ${email}`);
    if (!email || !password) {
        logger.warn("Incorrect form submission.");
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        logger.info(`The user with email: ${email} is logged in.`);
                        res.json(user[0])
                    })
                    .catch(err => {
                        logger.warn(`Error in getting the user with email: ${email}`);
                        res.status(400).json('Error in getting the user')
                    })
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
};

module.exports = {
    handleSignin: handleSignin
};