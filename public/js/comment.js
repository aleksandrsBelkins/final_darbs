const commentForm = document.querySelector('.comment__form');
const commentWrapper = document.querySelector('.comment__wrapper');
const commentName = commentForm.name;
const commentNameLabel = document.querySelector('.comment__form-name_label');
const commentText = commentForm.comment;
const commentTextLabel = document.querySelector('.comment__form-message_label');


commentName.addEventListener('input', () => {
    commentNameLabel.classList.add('comment__form-name_label--active');
    if (!commentName.value) {
        commentNameLabel.classList.remove('comment__form-name_label--active');
    }
})

console.log|(commentText);

commentText.addEventListener('input', () => {
    commentTextLabel.classList.add('comment__form-message_label--active');
    if (!commentText.value) {
        commentTextLabel.classList.remove('comment__form-message_label--active');
    }
})

request.get('api.php?comments=get-all', function (response) {
    for (const [id, row] of Object.entries(response.entities)) {
        addNewComment(id, row.name, row.created_at, row.comment);
    }
});

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let error = commentValidate(commentForm);

    if (error === 0) {
        request.post(commentForm, function (response) {
            commentForm.name.value = "";
            commentForm.comment.value = "";
            addNewComment(response.data.id, response.data.name, response.data.created_at, response.data.comment);
        });

    } else {
        alert('Complete the fields');
    }

    function commentValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.require2');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            input.classList.remove('_error');

            if (input.value === '') {
                input.classList.add('_error');
                error++;
            }
        }
        return error;
    } 
})

function addNewComment(id, name, created_at, comment) {
    let div = document.querySelector('.template').cloneNode(true);
    div.classList.remove('template');
    div.querySelector('.comment__message-name').textContent = name;
    div.querySelector('.comment__message-time').textContent = created_at;
    div.querySelector('.comment__message-text').textContent = comment;
    commentWrapper.prepend(div);
}
