const { Character, Movie, CharacterMovie } = require('../database');

const getAll = async (req, res) => {
  const { name, genre, order } = req.query;
  try {
    if (name) {
      const moviesByName = await Movie.findAll({ where: { title: name } });
      if (!moviesByName) return res.status(404).json({ error: 'no movie found' });
      return res.status(200).json(moviesByName);
    }
    if (genre) {
      const moviesByGenre = await Movie.findAll({ where: { genreId: genre } });
      if (!moviesByGenre) return res.status(404).json({ error: 'no movie found' });
      return res.status(200).json(moviesByGenre);
    }
    if (order) {
      const moviesByOrder = await Movie.findAll({ order: [['title', order]] });
      return res.status(200).json(moviesByOrder);
    }
    const movies = await Movie.findAll({
      attributes: ['title', 'image', 'creationDate'],
    });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { id },
      include: [{ model: Character, attributes: ['name', 'image', 'history'] }],
    });
    if (!movie) return res.status(404).json({ error: 'movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
  }
};

const addOne = async (req, res) => {
  const loggedUserId = req.user;
  const { characterName } = req.body;
  try {
    const character = await Character.findOne({ where: { name: characterName } });
    if (!character) return res.status(404).json({ error: 'character not found' });
    const newMovie = await Movie.create({ ...req.body, userId: loggedUserId });
    await CharacterMovie.create({ movieId: newMovie.id, characterId: character.id });
    //TODO: fix this
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const loggedUserId = req.user;
  try {
    const movieToUpdate = await Movie.findOne({ where: { id } });
    if (!movieToUpdate) return res.status(404).json({ error: 'movie not found' });
    if (movieToUpdate.userId !== loggedUserId) {
      return res.status(403).json({ error: 'not allowed' });
    }
    await movieToUpdate.update(req.body);
    res.status(200).json(movieToUpdate);
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const loggedUserId = req.user;
  try {
    const movieToDelete = await Movie.findOne({ where: { id } });
    if (!movieToDelete) return res.status(404).json({ error: 'movie not found' });
    if (movieToDelete.userId !== loggedUserId) {
      return res.status(403).json({ error: 'not allowed' });
    }
    await movieToDelete.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addOne, deleteOne, getAll, getOne, updateOne };
