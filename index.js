const MODAL_HEADER = `<button class="close" data-dismiss="modal">x
</button><h4 class='text-center text-primary'>`;
const TICKETS = ['Author: ', '<br>Title: ', '<br>Category: ', '<br>Publisher: ', '<br>Published date: '];
const url = 'https://www.googleapis.com/books/v1/volumes?q=' +
    'javascript&orderBy=newest&startIndex=0&maxResults=10';
const END = document.querySelector('#end');
const createBlock = (data, i) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="container"><div class="col"><h1 class="text-center text-primary">${data.title}` +
        `</h1><div class="row bg-success"><div class="col-md-2"><img src="${data.imageLinks.thumbnail}` +
        `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${data.description}` +
        `</h4></div><div class="col-md-2"><button class="btn btn-info openModal" name=${i}` +
        `>Show<br>summary</button></div></div></div></div>`;
    document.body.insertBefore(newDiv, END);
};
let books = {};

$.ajax({
    url,
    dataType: 'json',
    success: (data) => {
        console.log(data);
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
                'Title': title || 'Unknown',
                'Author': authors || 'Unknown',
                'Category': categories || 'Unknown',
                'Publisher': publisher || 'Unknown',
                'Published date': publishedDate || 'Unknown',
                'Description': description || 'Unknown',
                'Img': img || 'Unknown'
            };
            //console.log(books);
            //items.push(data.items[i].volumeInfo);
            //createBlock(items[i], i);
        };
        console.dir(books);
    },
    type: 'GET'
});

class Book {
    constructor(src) {
        this.data = [src.authors, src.title, src.categories, src.publisher, src.publishedDate];
    }
    fillingModal() {
        let content = '';
        this.data.forEach((item, i, arr) => {
            if (item === undefined) {
                item = 'Unknown';
            };
            content += TICKETS[i] + item;
        })
        return content;
    };
};

function modalContent(src) {
    document.querySelector('.modal-header').innerHTML = `${MODAL_HEADER}${src.title}</h4>`;
    let book = new Book(src);
    document.querySelector('#bodyModal').innerHTML = book.fillingModal();
}

document.body.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        var a = e.target.getAttribute('name');
        modalContent(items[a]);
        $('#modal').modal();
    }
}, true);
