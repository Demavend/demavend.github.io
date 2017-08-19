const STEP = 10;
const PAGE_MAX = 5
const fullUrl = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const clean = () => {
    $('div.panel-success').parent().remove();
    document.querySelector('.pagination').style.display = 'none';
    responseResult = [];
    moreCount = 1;
};
let responseResult = [];
let serch;
let startIndex = 0;
let moreCount = 1;
class Book {
    constructor(data) {
        this.books = {
            id: data.id,
            summary: {
                title: data.volumeInfo.title || 'Top secret (apparently).',
                author: data.volumeInfo.authors || 'Your name could be here.',
                category: data.volumeInfo.categories || 'Not like everyone else.',
                publisher: data.volumeInfo.publisher || 'Did not pay for advertising.',
                date: data.volumeInfo.publishedDate || 'It was a long time ago in a galaxy far far away...',
            },
            description: data.volumeInfo.description || 'If you read this we will have to kill you. Enjoy!',
            img: (!data.volumeInfo.imageLinks || !data.volumeInfo.imageLinks.thumbnail) ?
                'https://books.google.com/googlebooks/images/no_cover_thumb.gif' : data.volumeInfo.imageLinks.thumbnail
        }
    }
    createBlock() {
        responseResult.push(this.books);
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="panel panel-success"><div class="panel-heading"><h1 class="text-center">${this.books.summary.title}` +
            `</h1></div><div class="panel-body"><div class="col-md-2"><img src="${this.books.img}` +
            `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${this.books.description}` +
            `</h4></div><div class="col-md-2"><button class="btn btn-info openModal" data-id=${this.books.id}` +
            `>Show<br>summary</button></div></div></div>`;
        document.querySelector('#bookshelf').appendChild(newDiv);
    };
};

function getBooks(src) {
    return new Promise((resolve, reject) => {
        console.log(src);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            resolve(xhr.response);
            console.log(xhr.response);
        });
        xhr.send();
    });
};

document.getElementById('btnSerch').addEventListener('click', (e) => {
    serch = document.getElementById('bookName').value;
    if (document.querySelector('div.panel-success')) {
        clean();
    };
    getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
        response.items.forEach((item) => {
            let book = new Book(item);
            book.createBlock();
        });
    });
    document.querySelector('.pagination').style.display = 'block';
});
document.getElementById('clean').addEventListener('click', (e) => {
    clean();
    startIndex = 0;
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
document.querySelector('#bookshelf').addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        let idItem = responseResult.find((item) => {
            return item.id === e.target.getAttribute('data-id');
        });
        modalContent(idItem.summary);
        $('#modal').modal();
    }
}, false);

document.querySelector('.pagination').addEventListener('click', (e) => {
    if (e.target.getAttribute('data-id') === 'more') {
        startIndex += STEP;
        if (moreCount < PAGE_MAX) {
            getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
                response.items.forEach((item) => {
                    let book = new Book(item);
                    book.createBlock();
                });
            });
            moreCount++;
        } else {
            document.querySelector('button.disabled').setAttribute('class', 'btn btn-default');
            let parent = document.querySelector('#bookshelf');
            responseResult.splice(0, STEP);
            for (let i = 0; i < STEP; i++) {
                parent.removeChild(parent.firstChild);
            };
            getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
                response.items.forEach((item) => {
                    let book = new Book(item);
                    book.createBlock();
                });
            });
            moreCount++;
        };
    } else if (e.target.getAttribute('data-id') === 'next') {
        if (document.querySelector('button.btn.btn-default.disabled')) {
            document.querySelector('button.disabled').setAttribute('class', 'btn btn-default');
        };
        clean();
        startIndex += STEP;
        getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
            response.items.forEach((item) => {
                let book = new Book(item);
                book.createBlock();
            });
        });
        moreCount++;
        document.querySelector('.pagination').style.display = 'block';
    } else {
        clean();
        startIndex -= STEP;
        if (startIndex === 0) {
            e.target.setAttribute('class', 'btn btn-default disabled');
        }
        getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
            response.items.forEach((item) => {
                let book = new Book(item);
                book.createBlock();
            });
        });
        moreCount--;
        document.querySelector('.pagination').style.display = 'block';
    };
});
