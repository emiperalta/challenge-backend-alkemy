const { Character } = require('../database');

const getAll = async (req, res) => {
  const characters = await Character.findAll({ attributes: ['name', 'image'] });
  res.status(200).json(characters);
};

const addOne = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.status(201).json(newCharacter);
  } catch (err) {
    console.error(err);
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const characterExists = await Character.findOne({ where: { id } });
    if (!characterExists) {
      return res.status(404).json({ error: 'character not found' });
    }
    await characterExists.update(req.body);
    res.status(200).json(characterExists);
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const characterExists = await Character.findOne({ where: { id } });
    if (!characterExists) {
      return res.status(404).json({ error: 'character not found' });
    }
    await characterExists.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addOne, getAll, updateOne, deleteOne };
