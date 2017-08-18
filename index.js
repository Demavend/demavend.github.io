const STEP = 10;
const PAGE_MAX = 5
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
    moreCount = 1;
};
let responseResult = [];
let serch;
let pageMax = 0;
let startIndex = 0;
let totalItems = 0;
let moreCount = 1;
let init = function(e) {
    Pagination.Init(document.querySelector('ul.pagination'), {
        size: pageNum,
        page: e,
        step: 1
    });
};
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
            img: data.volumeInfo.imageLinks.thumbnail || '#',
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
    console.log(src);
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            resolve(xhr.response);
            totalItems = xhr.response.totalItems;
            pageNum = Math.ceil(xhr.response.totalItems / STEP);
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
            init(1);
        });
    });
    document.querySelector('.showMore').style.display = 'block';
    document.querySelector('form.pagination').style.display = 'block';
});
document.getElementById('clean').addEventListener('click', (e) => {
    clean();
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
/*function warningPage(){
  document.querySelector('.modal-header').innerHTML = `<button class='close'
  data-dismiss='modal'>x</button>`;
  document.querySelector('#bodyModal').innerHTML = `<h3 class='text-danger'>
  Warning! You have max result on the page.</h3>`;
};

document.querySelector('.showMore').addEventListener('click', (e) => {
    startIndex += STEP;
    if (moreCount < PAGE_MAX) {
        getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
            response.items.forEach((item) => {
                let book = new Book(item);
                book.createBlock();
            });
        });
        moreCount++;
    }else {
      warningPage();
      $('#modal').modal();
    };
});*/

let Pagination = {
    code: '',
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 1;
    },
    Add: function(s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += '<li><a class="page">' + i + '</a></li>';
        }
    },
    Last: function() {
        Pagination.code += '<li class="disabled"><a>...</a></li><li><a class="page">' +
            Pagination.size + '</a></li>';
    },
    First: function() {
        Pagination.code += '<li><a class="page">1</a></li><li class="disabled"><a>...</a></li>';
    },
    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },
    Bind: function(e) {
        let a = document.querySelectorAll('a.page');
        for (let i = 0; i < a.length; i++) {
            if (Number(a[i].firstChild.data) === Number(e)) {
                a[i].parentNode.setAttribute('class', 'active');
            }
        }
    },
    Finish: function(e) {
        e.querySelector('li.prev').insertAdjacentHTML('afterend', Pagination.code);
        Pagination.code = '';
        Pagination.Bind(Pagination.page);
    },
    Start: function(e) {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        } else if (Pagination.page < Pagination.step * 2 + 2) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        } else if (Pagination.page > Pagination.size - Pagination.step * 2 - 1) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        } else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish(e);
    },
    Buttons: function(e) {
        let nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },
    Create: function(e) {
        let html = [
            '<li class="prev"><a>Prev</a></li>',
            '<li class="next"><a>Next</a><li>'
        ];
        e.innerHTML = html.join('');
        Pagination.Buttons(e);
    },
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start(e);
    }
};
document.querySelector('ul.pagination').addEventListener('click', (e) => {
  console.log(e.target);
    if (e.target.getAttribute('class') === 'page') {
        let text = Number(e.target.textContent);
        if (document.querySelector('div.panel-success')) {
            clean();
        };
        startIndex = (text - 1) * STEP;
        getBooks(fullUrl(serch, startIndex, STEP)).then(response => {
            response.items.forEach((item) => {
                let book = new Book(item);
                book.createBlock();
            });
        });
        document.querySelector('.showMore').style.display = 'block';
        document.querySelector('form.pagination').style.display = 'block';
        init(text);
    }else if (e.targetget.Attribute('class') === 'prev') {
      if(document.querySelector('li.active').firstChild){
        console.log(document.querySelector('li.active').firstChild);
      }

    };
});

/*let init = function() {
    Pagination.Init(document.querySelector('ul.pagination'), {
        size: pageNum,
        page: 1,
        step: 1
    });
};*/

//document.addEventListener('DOMContentLoaded', init, false);
