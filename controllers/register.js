const {logger} = require("../logger");

const handleRegister = (req, res, db, bcrypt) => {
    logger.info("An attempt is made to register new user");
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        logger.warn("Wrong form submission found");
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => {
            logger.warn("An error in registering user. Details will be followed");
            console.log(err);
            res.status(400).json('unable to register');
        })
};

module.exports = {
    handleRegister: handleRegister
};


