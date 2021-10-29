const form = document.querySelector('.contact__form');
const textArea = form.message;
const messageLabel = form.querySelector('.contact__form-message_label');

textArea.addEventListener('input', function (event) {
    messageLabel.classList.add('contact__form-message_label--active')
    if (!textArea.value) {
    messageLabel.classList.remove('contact__form-message_label--active')
    }
})

form.addEventListener('submit', formSend);

async function formSend (event) {
    event.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
        form.classList.add('sending');
        let response = await fetch('send.php', {
            method: 'POST',
            body: formData
          })
        
        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('sending');
        } else {
            alert('Error'); 
            form.classList.remove('sending');
        }

    } else {
        alert('Complete the required fields');
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.require');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            input.classList.remove('error');

            if (input.classList.contains('email')) {
                if (emailTest(input) && input.value === '') {
                    input.classList.add('_error');
                    error++; 
                }
            } else {
                if (input.value === '') {
                    input.classList.add('_error');
                    error++;
                }
            }
        }
        return error;
    } 
    


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
};




// let form = document.querySelector('.contact__form');
// let inputName = form.name;
// let inputEmail = form.email;

// form.addEventListener('submit', function (event) {
//     if (!inputName.value) {
//         event.preventDefault();
//         if (!inputName.previousElementSibling) {
//             inputName.parentElement.insertAdjacentHTML(
//                 "afterbegin",
//                 `<div class="form-error">
//                     *Name field is empty!
//                 </div>`
//             );
//         } 
//     } 
//     if (!inputEmail.value) {
//         event.preventDefault();
//         if (!inputEmail.previousElementSibling) {
//             inputEmail.parentElement.insertAdjacentHTML(
//                 "afterbegin",
//                 `<div class="form-error">
//                     *Email field is empty!
//                 </div>`
//             );
//         } 
//     }
//     if (!textArea.value) {
//         event.preventDefault();
//         if (!textArea.previousElementSibling) {
//             textArea.parentElement.insertAdjacentHTML(
//                 "afterbegin",
//                 `<div class="form-error">
//                     *Message field is empty!
//                 </div>`
//             );
//         }
//     } 
// })

    
// inputName.addEventListener('focus', (event) => {
//     if (inputName.previousElementSibling) {
//         inputName.previousElementSibling.remove();
//     }
// })

// inputEmail.addEventListener('focus', (event) => {
//     if (inputEmail.previousElementSibling) {
//         inputEmail.previousElementSibling.remove();
//     }
// })

// textArea.addEventListener('focus', (event) => {
//     if (textArea.previousElementSibling) {
//         textArea.previousElementSibling.remove();
//     }
// })

