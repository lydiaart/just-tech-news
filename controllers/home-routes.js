const router = require('./api/user-routes');
const homeRoutes = require('./home-routes.js');
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.use('/', homeRoutes);
router.get('/', (req, res) => {
    Post.findAll({
        attricultes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.litera('(SELECT COUNT(*) FROM vote WHERE post.id = note.post_id'),]
        ],
        include: [
            {
                model: Comment,
                attricutes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ] 
    })
       .then(dbPostData => {
        //    pass a single post object into the homepage template
        console.log(dbPostData[0]);
        res.render('homepage', dbPostData[0]);
       })
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       });
    });

module.exports = router;