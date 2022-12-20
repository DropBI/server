var router = require('express').Router()
const store = require('../database/store');
const auth = require('../middleware/auth-user');

  // login endpoint
router.get("/list", auth, (req, res) => {
    store.list()
    // if email exists
    .then((stores) => {
      // compare the password entered and the hashed password found
        // return success res
        res.status(200).send({
            message: "Found Stores",
            data: stores
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "store not found",
        e,
      });
    });
});

router.post("/create", auth, (req, res) => {
    const { name, url } = req.body
    store.create(name, url)
    .then((result) => {
      res.status(201).send({
        message: "Store Created Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });
});


module.exports = router;