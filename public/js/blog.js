let textElements = document.querySelectorAll('.blog__item-text')
let maxlength = 200;

textElements.forEach((item) => {
    let text = item.textContent.trim();
    let formatedText = text.slice(0, maxlength - 1) + '…';

    if (text.length > maxlength) {
        item.textContent = formatedText;
        let linkAdd = document.createElement('a');
        linkAdd.textContent = 'Read more';
        linkAdd.classList.add('text-link')
        item.append(linkAdd);

        linkAdd.addEventListener('click', () => {
            linkAdd.parentNode.textContent = text;
            let linkHide = document.createElement('a');
            linkHide.textContent = 'Read less';
            linkHide.classList.add('text-link')
            item.append(linkHide);
            linkHide.addEventListener('click', () => {
                linkHide.parentNode.innerHTML = formatedText;
                item.append(linkAdd);
            })
        })
    }
})
