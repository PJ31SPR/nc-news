const apiEndpointsJSON = require("../endpoints.json");

exports.getAllEndpoints = (req, res, next) => {
    res.status(200).send(apiEndpointsJSON)
      .catch((err) => {
        next(err);
      });
  }