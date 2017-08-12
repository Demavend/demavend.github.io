const MODAL_TOP = `<button class="close" data-dismiss="modal">x
</button><h4 class='text-center text-primary'>`;
const url = 'https://www.googleapis.com/books/v1/volumes?q=' +
    'javascript&orderBy=newest&startIndex=0&maxResults=10';
const END = document.querySelector('#end');
const createBlock = (data) => {
    for (let key in data) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="container"><div class="col"><h1 class="text-center text-primary">${data[key].Summary.Title}` +
            `</h1><div class="row bg-success"><div class="col-md-2"><img src="${data[key].Img}` +
            `"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">${data[key].Description}` +
            `</h4></div><div class="col-md-2"><button class="btn btn-info openModal" id=${key}` +
            `>Show<br>summary</button></div></div></div></div>`;
        document.body.insertBefore(newDiv, END);
    }
};
let books = {};
$.ajax({
    url,
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
            books[id] = {'Summary':{
                'Title': title || 'Unknown',
                'Author': authors || 'Unknown',
                'Category': categories || 'Unknown',
                'Publisher': publisher || 'Unknown',
                'Published date': publishedDate || 'Unknown'},
                'Description': description || 'Unknown',
                'Img': img || 'Unknown'
            };
        };
        createBlock(books);
    },
    type: 'GET'
});
function modalContent(src) {
    document.querySelector('.modal-header').innerHTML = `${MODAL_TOP}${src.Title}</h4>`;
    let book='';
    for (let key in src) {
        book += `${key}:  ${src[key]};<br>`;
    };
    document.querySelector('#bodyModal').innerHTML = book;
};
document.body.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        let id = e.target.id;
        modalContent(books[id].Summary);
        $('#modal').modal();
    }
}, true);
