const updatePostHandler = async (e) => {
    e.preventDefault();

    const buttonEl = document.querySelector('#submit-btn');

    const title = document.querySelector('#title').innerHTML.trim();
    const content = document.querySelector('#content').innerHTML.trim();
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
            alert('Failed to update blog post');
        }
    }
}

document.getElementById('submit-btn').addEventListener('click', updatePostHandler);