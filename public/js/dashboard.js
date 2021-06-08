const newPostHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const resp = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog post');
        }
    }
};

const delPostHandler = async (e) => {
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');

        const resp = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Post could not be deleted');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
document.querySelector('.post-list').addEventListener('click', delPostHandler);