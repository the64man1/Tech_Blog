const { Comment } = require('../models');

const commentData = [
    {
        content: 'test comment for blog 1',
        user_id: '2',
        post_id: '1',
    },
    {
        content: 'test comment #1 for blog 2',
        user_id: '1',
        post_id: '2',
    },
    {
        content: 'test comment #2 for blog 2',
        user_id: '2',
        post_id: '2',
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;