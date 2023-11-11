const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products with associated category and tags
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one product by ID with associated category and tags
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
