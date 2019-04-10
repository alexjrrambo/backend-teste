const Box = require('../model/Box');

class BoxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title });

        res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: { createdAt: 1 } }
        });

        return res.json(box);
    }
}

module.exports = new BoxController();