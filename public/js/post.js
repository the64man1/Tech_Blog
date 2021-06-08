const newCommentHandler = async (e) => {
    e.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const post_id = e.target.getAttribute('data-id');

    if (content) {
        const resp = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create comment');
        }
    }
};

window.addEventListener('load', function(){
    console.log("hi")
})

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);