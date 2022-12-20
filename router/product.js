var router = require('express').Router()
const product = require('../database/product');
const auth = require('../middleware/auth-user');

  // login endpoint
router.get("/list", auth, (req, res) => {
    product.list()
    // if email exists
    .then((products) => {
      // compare the password entered and the hashed password found
        // return success res
        res.status(200).send({
            message: "Found products",
            data: products
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "product not found",
        e,
      });
    });
});

router.get('/get/:id', auth, (req, res) => {
    product.get(req.params.id)
    .then((result) => {
        res.status(201).send({
            message: `Get product ${result.id}`,
            result
        });
    })
    // catch error if the message wasn't getted successfully from the database
    .catch((error) => {
        res.status(404).send({
            message: "Product Not Found",
            error,
        });
    });
});

router.post('/sales', auth, (req, res) => {
  const { order,orderFlow } = req.body
  console.log('orderby',order,'flow',orderFlow)
  product.listSales(order,orderFlow)
  .then((result) => {
      res.status(201).send({
          message: `Get sales`,
          result
      });
  })
  // catch error if the message wasn't getted successfully from the database
  // .catch((error) => {
  //     res.status(404).send({
  //         message: "Product Not Found",
  //         error,
  //     });
  // });
});

router.post("/upsert", auth, (req, res) => {
  const { product_id,price,last_update } = req.body
  product.upsert(product_id,price,last_update)
  .then(() => {
    res.status(201).send({
      message: "Upsert data Successfully",
    });
  })
  // catch erroe if the new user wasn't added successfully to the database
  .catch((error) => {
    res.status(500).send({
      message: "Error creating data",
      error,
    });
  });
});


module.exports = router;