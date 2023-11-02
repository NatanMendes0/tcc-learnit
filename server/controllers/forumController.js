const Forum = require('../models/forum');

exports.create = async (req, res) => {
    try{
        const {name} = req.body;
        const file = req.file;
        const forum = new Forum({
            name,
            src: file.path,
        })

        await forum.save();

        res.json({forum, msg: "Imagem salva com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: "Erro ao salvar a imagem" })
    }
};