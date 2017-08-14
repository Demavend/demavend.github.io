const STEP = 10;
const fullUrl = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&orderBy=newest&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const clean = () => {
    $('div.panel-success').remove();
    books = {};
};
const createBlock = (data) => {
    for (let key in data) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="panel panel-success"><div class="panel-heading"><h1 class="text-center">${data[key].summary.title}` +
            `</h1></div><div class="panel-body"><div class="col-md-2"><img src="${data[key].img}` +
            `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${data[key].description}` +
            `</h4></div><div class="col-md-2"><button class="btn btn-info openModal" id=${key}` +
            `>Show<br>summary</button></div></div></div>`;
        document.querySelector('#bookshelf').appendChild(newDiv);
    }
};
let books = {};
let serch;
let startIndex = 0;
function getBooks(src) {
    $.ajax({
        url: src,
        dataType: 'json',
        success: (data) => {
            for (let i = 0; i < data.items.length; i++) {
                let {
                    etag: id,
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
                books[id] = {
                    summary: {
                        title: title || 'Unknown',
                        author: authors || 'Unknown',
                        category: categories || 'Unknown',
                        publisher: publisher || 'Unknown',
                        published_date: publishedDate || 'Unknown'
                    },
                    description: description || 'Unknown',
                    img: img || 'Unknown'
                };
            };
            createBlock(books);
        },
        type: 'GET'
    });
};
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
        modalContent(books[id].summary);
        $('#modal').modal();
    };
}, false);
document.getElementById('btnSerch').addEventListener('click', (e) => {
    serch = document.getElementById('bookName').value;
    if (document.querySelector('div.panel-success')) {
        clean();
    } else {
        document.querySelector('.showMore').style.display = 'block';
    };
    getBooks(fullUrl(serch, startIndex, STEP));
});
document.getElementById('clean').addEventListener('click', (e) => {
    clean();
    document.querySelector('.showMore').style.display = 'none';
});
document.querySelector('.showMore').addEventListener('click', (e) => {
  startIndex +=STEP;
  books = {};
  getBooks(fullUrl(serch, startIndex, STEP));
});
