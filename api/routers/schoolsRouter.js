const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('../../data/helpers/schoolModel.js');

router.route('/')
    .get(get)

router.route('/:id')
    .get(get)

//functions
function get(req, res) {
    const id = req.params.id;
    db.get(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
}