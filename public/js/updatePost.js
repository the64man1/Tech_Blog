const updatePostHandler = async (e) => {
    e.preventDefault();

    const buttonEl = document.querySelector('#submit-btn');

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const post_id = buttonEl.getAttribute('data-id');

    if (title && content) {
        const resp = await fetch(`/api/post/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog post');
        }
    }
}

document.querySelector('.update-post-form').addEventListener('submit', updatePostHandler);