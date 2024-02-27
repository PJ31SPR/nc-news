const apiRouter = require('express').Router();

const topicsRouter = require('../routers/topics.router.js');
const articlesRouter = require('../routers/articles.router.js');
const commentsRouter = require('../routers/comments.router.js');
const usersRouter = require('../routers/users.router.js');

const {getAllEndpoints} = require('../controllers/api.controllers.js');

  
apiRouter.get("/", getAllEndpoints);

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);


module.exports = apiRouter; 