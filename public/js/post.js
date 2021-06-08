const newCommentHandler = async (e) => {
    e.preventDefault();

    const buttonEl = document.querySelector('#submit-btn');

    const content = document.querySelector('#comment-content').value.trim();
    const post_id = buttonEl.getAttribute('data-id');

    if (content) {
        const resp = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);