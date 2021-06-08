const { Post } = require('../models');

const postData = [
    {
        title: "Blog Test Title 1",
        content: 'This is the content for test blog 1',
        user_id: '1',
    },
    {
        title: "Blog Test Title 2",
        content: 'Different content for test blog 2',
        user_id: '2',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;