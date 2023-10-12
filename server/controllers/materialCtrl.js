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

module.exports = {
    createMaterial,
};