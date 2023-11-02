const Material = require('../models/materialModel');

const asyncHandler = require('express-async-handler');
const path = require('path');
const crypto = require('crypto');
const formidable = require('formidable');
const fs = require('fs');

const createMaterial = asyncHandler(async (req, res, next) => {
    var step = 0;
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
                        step: step + 1,
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
                        steps: step + 1,
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

const getMaterial = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    try {
        const material = await Material.findById(materialId).populate({ path: "ratings", populate: [{ path: "postedby", select: "name nickname" }] }).populate("user", "name nickname");
        if (!material) {
            res.status(404).json({ message: 'Material não encontrado' });
            return;
        }
        res.json(material);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter o material', error });
    }
});

const deleteMaterial = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    try {
        const deletedStep = await Material.findByIdAndDelete(materialId);
        if (!deletedStep) {
            return res.status(404).json({ message: "Material não encontrado" });
        }
        res.json({ message: "Material deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o Material", error });
    }
});

const getStep = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    const stepId = req.params.stepId;

    try {
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        const step = material.content.id(stepId);
        if (!step) {
            return res.status(404).json({ message: "Passo não encontrado" });
        }

        res.json(step);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter o passo", error });
    }
});

const addStep = asyncHandler(async (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
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

            const materialId = req.params.id;
            const material = await Material.findById(materialId);

            var title = fields.title[0];
            var text = fields.text[0];
            var note = fields.note[0];

            const newStepData = {
                stepContent: {
                    title: title,
                    text: text,
                    file: nomeimg ? nomeimg : null,
                    filePath: nomeimg ? `/Images/${nomeimg}` : null,
                    note: note ? note : null,
                }
            };

            material.content.push(newStepData);

            try {
                await material.save();
                console.log("material salvo: ", material);
                res.json({ message: 'Passo criado com sucesso!', material: newStepData });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao criar o material', error });
            }
        } else {
            // No files were uploaded
            const materialId = req.params.id;
            const material = await Material.findById(materialId);

            var title = fields.title[0];
            var text = fields.text[0];
            var note = fields.note[0];

            const newStepData = {
                stepContent: {
                    title: title,
                    text: text,
                    file: nomeimg ? nomeimg : null,
                    filePath: nomeimg ? `/Images/${nomeimg}` : null,
                    note: note ? note : null,
                }
            };

            material.content.push(newStepData);

            try {
                await material.save();
                console.log("material salvo: ", material);
                res.json({ message: 'Passo criado com sucesso!', material: newStepData });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao criar o material', error });
            }
        }
    });
});

//todo - arrumar logicas de edicao
const editStep = asyncHandler(async (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
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
            var user = req.user;

            try {
                const material = await Material.findById(req.params.id);
                const step = material.content.id(req.params.stepId);
                step.stepContent.title = title;
                step.stepContent.text = text;
                step.stepContent.file = nomeimg ? nomeimg : null;
                step.stepContent.filePath = nomeimg ? `/Images/${nomeimg}` : null;
                const newStep = await material.save();
                res.json({ message: "Passo criado com sucesso!", material: newStep });
            } catch (error) {
                res.status(500).json({ message: "Erro ao criar o post", error });
            }
        }
        else {
            // No files were uploaded
            var title = fields.title[0];
            var text = fields.text[0];
            var user = req.user;

            try {
                const material = await Material.findById(req.params.id);
                const step = material.content.id(req.params.stepId);
                step.stepContent.title = title;
                step.stepContent.text = text;
                step.stepContent.file = nomeimg ? nomeimg : null;
                step.stepContent.filePath = nomeimg ? `/Images/${nomeimg}` : null;
                const newStep = await material.save();
                res.json({ message: "Passo criado com sucesso!", material: newStep });
            } catch (error) {
                res.status(500).json({ message: "Erro ao criar o post", error });
            }
        }
    });
});

const deleteStep = asyncHandler(async (req, res) => {
    const materialId = req.params.id;
    const stepId = req.params.stepId;

    try {
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ message: "Material not found" });
        }

        // Find the index of the step to be deleted
        const stepIndex = material.content.findIndex(step => step._id.toString() === stepId);

        if (stepIndex === -1) {
            return res.status(404).json({ message: "Step not found" });
        }

        // Remove the step at the found index
        material.content.splice(stepIndex, 1);

        // Check if there are no more steps in the material
        if (material.content.length === 0) {
            // If there are no steps left, delete the entire material
            await Material.findByIdAndDelete(materialId);
            res.json({ message: "Material and step deleted successfully" });
        } else {
            // If there are steps left, save the updated material
            await material.save();
            res.json({ message: "Step deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error while deleting the step", error: error.message });
    }
});


const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const prodId = req.params.id;
    const { comment } = req.body;
    try {
        const material = await Material.findById(prodId);
        if (!material) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        material.ratings.push({
            comment,
            postedby: _id,
        });

        await material.save();

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
    deleteMaterial,
    getStep,
    addStep,
    editStep,
    deleteStep,
    rating,
};