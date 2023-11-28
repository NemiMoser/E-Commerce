const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new product
/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
router.post('/', async (req, res) => {
  try {
    const product = await Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock
  });
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => ({
            product_id: product.id,
            tag_id,
          }));
          const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
          res.status(200).json({ product, productTagIds });
      } else {
        res.status(200).json(product);
      }
      // if no product tags, just respond
    } catch(err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const updatedProduct = await Product.update(req.body, {
      where: {
        product_id: req.params.id,
      },
    });

    if (updatedProduct[0] === 1) {
      // If the product was updated successfully
      res.json({ message: 'Product updated successfully' });
    } else {
      // If the product wasn't found or couldn't be updated
      res.status(404).json({ error: 'Product not found or could not be updated' });
    }
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete a product
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({ 
      where: {
        product_id: req.params.id,
      },
    });

  if (deletedProduct > 0) {
    res.json({ mesage: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found with that ID!'});
  }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
