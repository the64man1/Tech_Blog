const updateCommentHandler = async (e) => {
    e.preventDefault();

    const buttonEl = document.querySelector('#submit-btn');
    //const user_id = req.session.user_id;
    const post_id = document.querySelector('#post').getAttribute('data-id');

    const content = document.querySelector('#comment-content').value.trim();
    const comment_id = buttonEl.getAttribute('data-id');

    if (content) {
        const resp = await fetch(`/api/comment/${comment_id}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to update comment');
        }
    }
}

document.querySelector('.update-comment-form').addEventListener('submit', updateCommentHandler);