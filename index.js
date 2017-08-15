const STEP = 10;
const fullUrl = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const clean = () => {
    $('div.panel-success').remove();
    document.querySelector('.showMore').style.display = 'none';
    responseResult = [];
};
const createBlock = (data) => {
    for (let key in data) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="panel panel-success"><div class="panel-heading"><h1 class="text-center">${data[key].summary.title}` +
            `</h1></div><div class="panel-body"><div class="col-md-2"><img src="${data[key].img}` +
            `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${data[key].description}` +
            `</h4></div><div class="col-md-2"><button class="btn btn-info openModal" id=${data[key].id}` +
            `>Show<br>summary</button></div></div></div>`;
        document.querySelector('#bookshelf').appendChild(newDiv);
    }
};
let responseResult;
let serch;
let startIndex = 0;
let totalItems = 0;

function arrangmrntBooks(data) {
    let books = [];
    for (let i = 0; i < data.items.length; i++) {
        let {
            id,
            volumeInfo: {
                title,
                categories,
                publisher,
                publishedDate,
                authors,
                description,
                imageLinks: {
                    thumbnail: img,
                }
            }
        } = data.items[i];
        books.push({
            id,
            summary: {
                title: title || 'Unknown',
                author: authors || 'Unknown',
                category: categories || 'Unknown',
                publisher: publisher || 'Unknown',
                published_date: publishedDate || 'Unknown'
            },
            description: description || 'Unknown',
            img: img || 'Unknown'
        });
    };
    return books;
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
        responseResult = arrangmrntBooks(response);
        createBlock(responseResult);
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
        responseResult = responseResult.concat(arrangmrntBooks(response));
        let books = arrangmrntBooks(response);
        createBlock(books);
    });
});

function modalContent(src) {
    document.querySelector('.modal-header').innerHTML = `<button class='close'
    data-dismiss='modal'>x</button>
    <h4 class='text-center text-primary'>${src.title}</h4>`;
    let book = '';
    for (let key in src) {
        book += `<span class='capitalize'>${key}</span>:  ${src[key]};<br>`;
    };
    document.querySelector('#bodyModal').innerHTML = book;
};
document.querySelector('#bookshelf').addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        let id = e.target.id;
        let idArea = [];
        for (let i = 0; i < responseResult.length; i++) {
            idArea.push(responseResult[i].id)
        };
        let index = idArea.indexOf(id);
        modalContent(responseResult[index].summary);
        $('#modal').modal();
    }
}, false);
