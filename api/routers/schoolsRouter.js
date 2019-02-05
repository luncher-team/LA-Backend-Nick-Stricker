const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('../../data/helpers/schoolModel.js');
const ware = require('../middleware.js');

router.route('/')
    .get(get)
    .post(add)
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
        .catch(err => res.status(500).json({ msg: 'name must be unique', err }));
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
    db.add(req.body)
        .then(result => {
            db.get(result.id)
                .then(school => {
                    res.status(201).json(school);
                })
        }).catch(err => res.status(500).json(err));
}

function remove(req, res) {
    const id = req.params.id;

    db.remove(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(400).json({ msg: 'id not found', err }))
}

function update(req, res) {
    const { id } = req.params;
    const changes = req.body;
    // if ((changes.name !== undefined)) {
    db.update(id, changes)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'could not update', err }))
    // } else {
    //     res.status(500).json({ msg: "you must give a school name" })
    // }
}