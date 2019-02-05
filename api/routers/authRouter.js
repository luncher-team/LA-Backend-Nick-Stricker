const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = router;
const db = require('../../data/dbConfig.js');
const ware = require('../middleware.js');

router.post('/login', login);
router.post('/register', register);
router.get('/users', ware.authenticate, getUsers);


function register(req, res) {
    const userInfo = req.body;

    const hash = bcrypt.hashSync(userInfo.password, 14);

    userInfo.password = hash;

    db('users')
        .insert(userInfo)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
}

function login(req, res) {
    const creds = req.body;

    db('users')
        .where({
            username: creds.username
        })
        .first()
        .then(user => {
            console.log(user)
            if (user && bcrypt.compareSync(creds.password, user.password)) {

                const token = ware.generateToken(user);

                res.status(200).json({
                    message: `welcome ${user.username}`,
                    token,
                });
            } else {
                res.status(401).json({
                    you: 'shall not pass!!'
                });
            }
        })
        .catch(err => res.status(500).json({
            err,
            msg: 'no user'
        }));
}

async function getUsers(req, res) {
    const users = await db('users').select('id', 'username');
    res.status(200).json(
        users
    );
};