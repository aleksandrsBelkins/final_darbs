const form = document.querySelector('.contact__form');
const textArea = form.message;
const messageLabel = form.querySelector('.contact__form-message_label');

textArea.addEventListener('input', function (event) {
    messageLabel.classList.add('contact__form-message_label--active')
    if (!textArea.value) {
    messageLabel.classList.remove('contact__form-message_label--active')
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
        form.classList.add('sending');
        let response = await fetch('send.php', {
            method: 'POST',
            body: new FormData(form)
          })
        
        if (response.ok) {
            // let result = await response.json();
            document.body.style.padding = `${getScroolbarWidth()}px`;
            document.body.style.overflow = 'hidden';
            document.getElementById('modal-1').classList.add('modal--active')
            form.reset();
            form.classList.remove('sending');
        } else {
            document.getElementById('modal-2').classList.add('modal--active')
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
});