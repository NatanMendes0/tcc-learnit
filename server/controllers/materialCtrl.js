const Material = require('../models/materialModel');

const asyncHandler = require('express-async-handler');
const path = require('path');
const crypto = require('crypto');
const formidable = require('formidable');
const fs = require('fs');

const createMaterial = asyncHandler(async (req, res, next) => {
    var step = 0; // todo - adicionar metodo que verifica o ultimo step e incrementa

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;

        if (files['file[]'] && Array.isArray(files['file[]']) && files['file[]'].length > 0) {
            // One file was uploaded
            var oldpath = files['file[]'][0].filepath;
            var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
            var ext = path.extname(files['file[]'][0].originalFilename);
            var nomeimg = hash + ext;
            var newpath = path.join(__dirname, '../Public/Images/', nomeimg);

            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });

            var title = fields.title[0];
            var text = fields.text[0];
            var note = fields.note[0];
            var user = req.user;
            const newMaterialData = {
                user: user._id,
                content: [
                    {
                        steps: step++,
                        stepContent: {
                            title: title,
                            text: text,
                            file: nomeimg ? nomeimg : null,
                            filePath: nomeimg ? `/Images/${nomeimg}` : null,
                            note: note ? note : null,
                        }
                    },
                ],
            };

            try {
                const newMaterial = Material.create(newMaterialData);
                res.json({ message: 'Material criado com sucesso!', material: newMaterial });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao criar o material', error });
            }
        }
        else {
            // No files were uploaded
            var title = fields.title[0];
            var text = fields.text[0];
            var note = fields.note[0];
            var user = req.user;
            const newMaterialData = {
                user: user._id,
                content: [
                    {
                        steps: step++,
                        stepContent: {
                            title: title,
                            text: text,
                            file: nomeimg ? nomeimg : null,
                            filePath: nomeimg ? `/Images/${nomeimg}` : null,
                            note: note ? note : null,
                        }
                    },
                ],
            };

            try {
                const newMaterial = Material.create(newMaterialData);
                res.json({ message: 'Material criado com sucesso!', material: newMaterial });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao criar o material', error });
            }
        }
    });
});

const getMaterials = asyncHandler(async (req, res, next) => {
    try {
        const materials = await Material.find({}).populate('user');
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os materiais', error });
    }
});

const getMaterial = asyncHandler(async (req, res, next) => {
    const materialId = req.params.id;
    try {
        const material = await Material.findById(materialId).populate('user', 'name');
        if (!material) {
            res.status(404).json({ message: 'Material não encontrado' });
            return;
        }
        res.json(material);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter o material', error });
    }
});

//todo - arrumar logicas de edicao
const editMaterial = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    const { title, text, note } = req.body;

    try {
        const updatedMaterial = await Material.findOneAndUpdate(
            { _id: materialId },
            { $set: { title, text, note } },
            { new: true }
        );

        if (!updatedMaterial) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        res.json({ message: "Material atualizado com sucesso!", Material: updatedMaterial });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o Material", error });
    }
});


const deleteMaterial = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    try {
        const deletedMaterial = await Material.findByIdAndDelete(materialId);
        if (!deletedMaterial) {
            return res.status(404).json({ message: "Material não encontrado" });
        }
        res.json({ message: "Material deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o Material", error });
    }
});

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const prodId = req.params.id;
    const { liked, comment } = req.body;
    try {
        const Material = await Material.findById(prodId);
        if (!Material) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        let alreadyRated = Material.ratings.find(
            (rating) => rating.Materialedby.toString() === _id.toString()
        );

        if (alreadyRated) {
            alreadyRated.liked = liked;
            alreadyRated.comment = comment;
        } else {
            Material.ratings.push({
                liked,
                comment,
                Materialedby: _id,
            });
        }

        await Material.save();

        const totalLikes = Material.ratings.filter(
            (rating) => rating.liked === true
        ).length;
        const totalDislikes = Material.ratings.filter(
            (rating) => rating.liked === false
        ).length;

        Material.totalLikes = totalLikes;
        Material.totalDislikes = totalDislikes;

        res.json(Material);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Erro ao avaliar o Material", error: error.message });
    }
});

module.exports = {
    createMaterial,
    getMaterials,
    getMaterial,
    editMaterial,
    deleteMaterial,
    rating,
};