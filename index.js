const MODAL_TOP = `<button class="close" data-dismiss="modal">x
</button><h4 class='text-center text-primary'>`;
const STEP = 10;
const URL = (val, start, max) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${val}
&orderBy=newest&startIndex=${start}&maxResults=${max}`;
    return (url);
};
const CLEAN = () => {
    $('div.panel-success').remove();
    books = {};
};
const CREATE_BLOCK = (data) => {
    for (let key in data) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="panel panel-success"><div class="panel-heading"><h1 class="text-center">${data[key].Summary.Title}` +
            `</h1></div><div class="panel-body"><div class="col-md-2"><img src="${data[key].Img}` +
            `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${data[key].Description}` +
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
                    'Summary': {
                        'Title': title || 'Unknown',
                        'Author': authors || 'Unknown',
                        'Category': categories || 'Unknown',
                        'Publisher': publisher || 'Unknown',
                        'Published date': publishedDate || 'Unknown'
                    },
                    'Description': description || 'Unknown',
                    'Img': img || 'Unknown'
                };
            };
            CREATE_BLOCK(books);
        },
        type: 'GET'
    });
};

function modalContent(src) {
    document.querySelector('.modal-header').innerHTML = `${MODAL_TOP}${src.Title}</h4>`;
    let book = '';
    for (let key in src) {
        book += `${key}:  ${src[key]};<br>`;
    };
    document.querySelector('#bodyModal').innerHTML = book;
};
document.querySelector('#bookshelf').addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        let id = e.target.id;
        modalContent(books[id].Summary);
        $('#modal').modal();
    }
}, false);

document.getElementById('btnSerch').addEventListener('click', (e) => {
    serch = document.getElementById('bookName').value;
    if (document.querySelector('div.panel-success')) {
        CLEAN();
    } else {
        document.querySelector('.showMore').style.display = 'block';
    };
    getBooks(URL(serch, startIndex, STEP));
});

document.getElementById('clean').addEventListener('click', (e) => {
    CLEAN();
    document.querySelector('.showMore').style.display = 'none';
});

document.querySelector('.showMore').addEventListener('click', (e) => {
  startIndex +=STEP;
  books = {};
  getBooks(URL(serch, startIndex, STEP));
});
