const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = router;
const db = require('../../data/helpers/authModel.js');
const ware = require('../middleware.js');

router.post('/login', login);
router.post('/register', register);
router.get('/users', ware.authenticate, getUsers);
router.get('/users/:id', ware.authenticate, getUsers);


function register(req, res) {
    const userInfo = req.body;

    const hash = bcrypt.hashSync(userInfo.password, 14);

    userInfo.password = hash;

    db.add(userInfo)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
}

function login(req, res) {
    const creds = req.body;

    db.login(creds.username)
        .then(user => {
            console.log(user)
            if (user && bcrypt.compareSync(creds.password, user.password)) {

                const token = ware.generateToken(user);

                res.status(200).json({
                    username: user.username,
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
    const id = req.params.id;
    const users = await db.get(id);
    res.status(200).json(
        users
    );
};