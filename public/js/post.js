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

const delCommentHandler = async (e) => {
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');

        const resp = await fetch(`/api/comment/${id}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            document.location.reload();
        } else {
            alert('Comment could not be deleted');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
document.querySelector('.comment-list').addEventListener('click', delCommentHandler);