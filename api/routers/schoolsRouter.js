const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('../../data/helpers/schoolModel.js');
const ware = require('../middleware.js');

router.route('/')
    .get(get)
    .post(ware.authenticate, add)
    ;

router.route('/:id')
    .get(getId)
    .delete(ware.authenticate, remove)
    .put(ware.authenticate, update)
    ;



//functions
function get(req, res) {
    db.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'cant find table', err }));
}
function getId(req, res) {
    const id = req.params.id;

    db.get()
        .then(schools => {
            let found = false;
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.get(id)
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(err => res.status(500).json({ msg: 'name must be unique', err }));
            } else {
                res.status(404).json({ msg: 'school with id not found' });
            }
        })


}

function add(req, res) {
    const info = req.body;
    if (info.name && info.address && info.requested_funds) {
        db.add(req.body)
            .then(result => {
                db.get(result.id)
                    .then(school => {
                        res.status(201).json(school);
                    })
            }).catch(err => res.status(405).json({ msg: 'name must be unique', err }));
    } else {
        res.status(422).json('Must include name, address, and requested_funds');
    }
}

function remove(req, res) {
    const id = req.params.id;

    db.get()
        .then(schools => {
            let found = false;
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.remove(id)
                    .then(result => {
                        res.status(200).json({ deleted: (!!result) });
                    })
                    .catch(err => res.status(400).json({ msg: 'id not found', err }))
            } else {
                res.status(404).json({ msg: 'school with id not found' });
            }
        })


}

function update(req, res) {
    const { id } = req.params;
    const changes = req.body;

    db.get()
        .then(schools => {
            let found = false;
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                if (changes) {
                    db.update(id, changes)
                        .then(result => {
                            res.status(200).json(result);
                        })
                        .catch(err => res.status(500).json({ msg: 'could not update', err }))
                } else {
                    res.status(500).json({ msg: "you must give a changed school object" })
                }
            } else {
                res.status(404).json({ msg: 'school with id not found' });
            }
        })



}