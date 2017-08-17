const STEP = 10;
const fullUrl = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const clean = () => {
    $('div.panel-success').parent().remove();
    document.querySelector('.showMore').style.display = 'none';
    document.querySelector('form.pagination').style.display = 'none';
    responseResult = [];
};
let responseResult = [];
let serch;
let startIndex = 0;
let totalItems = 0;
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
            img: data.volumeInfo.imageLinks.thumbnail || '',
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
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            resolve(xhr.response);
            totalItems = xhr.response.totalItems;
            //let pageNum = Math.ceil(totalItems/STEP);
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
    document.querySelector('.showMore').style.display = 'block';
    document.querySelector('form.pagination').style.display = 'block';
});
document.getElementById('clean').addEventListener('click', (e) => {
    clean();
});
document.querySelector('.showMore').addEventListener('click', (e) => {
    startIndex += STEP;
    getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
        response.items.forEach((item) => {
            let book = new Book(item);
            book.createBlock();
        });
    });
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
