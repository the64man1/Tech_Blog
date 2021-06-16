const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { belongsTo } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                { 
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'created_at',
                        'updated_at',
                        'user_id'
                    ],
                    include: [
                        { 
                            model: User,
                            attributes: ['username'] 
                    }],
                },
            ]
        });

        const post = dbPostData.get({ plain: true });

        for (const comment of post.comments) {
            comment.poster = (comment.user_id == req.session.user_id) ? true: false;
        }

        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/updatepost/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'created_at',
                        'updated_at',
                        'user_id'
                    ],
                    include: [{ model: User }],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });
        console.log(post)
        res.render('updatePost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/updateComment/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.findByPk(req.params.id, {
            include: [{ model: Post }]
        });

        const comment = dbCommentData.get({ plain: true });
        console.log(comment);
        res.render('updateComment', { comment, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        };

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });
console.log(user)
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return
    }
    res.render('login');
});

module.exports = router;