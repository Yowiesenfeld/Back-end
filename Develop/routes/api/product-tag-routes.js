const router = require('express').Router();
const { ProductTag, Product, Tag } = require('../../models');

// Get all product tags with associated products and tags
router.get('/', async (req, res) => {
  try {
    const productTags = await ProductTag.findAll({
      include: [{ model: Product }, { model: Tag }],
    });
    res.json(productTags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one product tag by ID with associated product and tag
router.get('/:id', async (req, res) => {
  try {
    const productTag = await ProductTag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: Tag }],
    });
    res.json(productTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product tag
router.post('/', async (req, res) => {
  try {
    const newProductTag = await ProductTag.create(req.body);
    res.json(newProductTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a product tag by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProductTag = await ProductTag.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedProductTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a product tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProductTag = await ProductTag.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedProductTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
