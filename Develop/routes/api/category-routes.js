const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one category by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
