const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = router;
const db = require('../../data/helpers/authModel.js');
const ware = require('../middleware.js');

router.post('/login', login);
router.post('/register', register);
router.get('/users', getUsers);
router.get('/users/:id', getUsers);


function register(req, res) {
    const userInfo = req.body;

    const hash = bcrypt.hashSync(userInfo.password, 14);

    userInfo.password = hash;

    db.get()
        .then(schools => {
            let found = true;
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].username == userInfo.username) {
                    found = false;
                    break;
                }
            }
            if (found) {
                db.add(userInfo)
                    .then(([id]) => {
                        db.login(userInfo.username)
                            .then(user => {
                                const token = ware.generateToken(user);
                                res.status(201).json({
                                    username: user.username,
                                    token,
                                    id
                                })
                            }).catch(err => res.status(401).json({ err, msg: 'failed to login, make sure username exists' }))
                    })
                    .catch(err => res.status(500).json(err));
            } else {
                res.status(405).json({ msg: 'Username already exists' });
            }
        })
        .catch(err => {
            res.status(400).json({ err, msg: "failed to get schools array" })
        })


}

function login(req, res) {
    const creds = req.body;

    db.login(creds.username.toString())
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {

                const token = ware.generateToken(user);

                res.status(200).json({
                    username: user.username,
                    token,
                    id: user.id
                });
            }
            // else {
            //     res.status(500).json({
            //         msg: 'password or username are incorrect'
            //     });
            // }
        })
        .catch(err => res.status(500).json({
            err,
            msg: 'username or password are incorrect'
        }));
}

async function getUsers(req, res) {
    const id = req.params.id;
    const users = await db.get(id);
    try {
        res.status(200).json(
            users
        );
    } catch (err) {
        res.status(400).json()
    }



};