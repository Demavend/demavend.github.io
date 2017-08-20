const STEP = 10;
const showPrev = () => {
    if (document.querySelector('button.disabled')) {
        document.querySelector('button.disabled').setAttribute('class', 'btn btn-default');
    };
};
const fullUrl = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const navBar = document.querySelector('.pagination');
const clean = () => {
    $('div.panel-success').parent().remove();
    navBar.style.display = 'none';
    responseResult = [];
    moreCount = 1;
};
const warnPopap = () => {
    document.querySelector('.modal-header').innerHTML = `<button class='close'
    data-dismiss='modal'>x</button>`;
    document.querySelector('#bodyModal').innerHTML = `<h3 class='text-danger text-center'>
    Sorry! Response has failed.</h3>`;
    navBar.style.display = 'none'
    $('#modal').modal();
};
const getBooksInit = () => {
    getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
        response.items.forEach((item) => {
            let book = new Book(item);
            book.createBlock();
            responseResult.push(book);
        });
    }).catch(warnPopap);
};
const disablePrev = e => {
    if (startIndex === 0) e.target.setAttribute('class', 'btn btn-default disabled');
};
let input = document.getElementById('bookName');
let responseResult = [];
let serch;
let startIndex = 0;
let moreCount = 1;
class Book {
    constructor(data) {
        this.id = data.id,
            this.summary = {
                title: data.volumeInfo.title || 'Top secret (apparently).',
                author: data.volumeInfo.authors || 'Your name could be here.',
                category: data.volumeInfo.categories || 'Not like everyone else.',
                publisher: data.volumeInfo.publisher || 'Did not pay for advertising.',
                date: data.volumeInfo.publishedDate || 'It was a long time ago in a galaxy far far away...',
            },
            this.description = data.volumeInfo.description || 'If you read this we will have to kill you. Enjoy!',
            this.img = (!data.volumeInfo.imageLinks || !data.volumeInfo.imageLinks.thumbnail) ?
            'Images/Cover.gif' : data.volumeInfo.imageLinks.thumbnail
    }
    createBlock() {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class='panel panel-success'><div class='panel-heading'><h1 class='text-center'>${this.summary.title}` +
            `</h1></div><div class='panel-body'><div class='col-md-2'><img src='${this.img}` +
            `'width='100%'  class='img-responsive'></img></div><div class='col-md-8'><h4 class='text-justify'>${this.description}` +
            `</h4></div><div class='col-md-2'><button class='btn btn-info openModal' data-id=${this.id}` +
            `>Show<br>summary</button></div></div></div>`;
        document.querySelector('#bookshelf').appendChild(newDiv);
        return (this);
    };
};

function getBooks(src) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => resolve(xhr.response));
        xhr.addEventListener('error', () => reject(warnPage()));
        xhr.send();
    });
};

document.getElementById('btnSerch').addEventListener('click', () => {
    serch = input.value;
    if (document.querySelector('div.panel-success')) clean();
    getBooksInit();
    navBar.style.display = 'block';
});
document.getElementById('clean').addEventListener('click', () => {
    clean();
    startIndex = 0;
    input.value = '';
});

function modalContent(src) {
    document.querySelector('.modal-header').innerHTML = `<button class='close'
    data-dismiss='modal'>x</button>
    <h4 class='text-center text-primary'>${src.title}</h4>`;
    let bookSummary = '';
    for (let key in src) {
        bookSummary += `<span class='capitalize'>${key}</span>:  ${src[key]};<br>`;
    };
    document.querySelector('#bodyModal').innerHTML = bookSummary;
};
document.querySelector('#bookshelf').addEventListener('click', e => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        let idItem = responseResult.find((item) => {
            return item.id === e.target.getAttribute('data-id');
        });
        modalContent(idItem.summary);
        $('#modal').modal();
    };
}, false);

document.querySelector('.pagination').addEventListener('click', e => {
    if (e.target.getAttribute('data-id') === 'more') {
        startIndex += STEP;
        showPrev();
        getBooksInit();
        moreCount++;
    } else if (e.target.getAttribute('data-id') === 'next') {
        showPrev();
        clean();
        startIndex += STEP;
        getBooksInit();
        moreCount++;
        navBar.style.display = 'block';
    } else {
        clean();
        startIndex -= STEP;
        disablePrev(e);
        getBooksInit();
        moreCount--;
        navBar.style.display = 'block';
    };
});
