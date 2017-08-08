let items = [];
let newDiv;
const url = 'https://www.googleapis.com/books/v1/volumes?q='+
'javascript&orderBy=newest&startIndex=0&maxResults=10';
const LAST = document.querySelector('#last');
const createBlock = function(data, i) {
    newDiv = document.createElement('div');
    newDiv.innerHTML = '<div class="container"><div class="col"><h1 class="text-center text-primary">' +
        data.title +
        '</h1><div class="row bg-success"><div class="col-md-2"><img src="' +
        data.imageLinks.thumbnail +
        '"width="100%"  class="img-responsive"></img></div><div class="col-md-8"><h4 class="text-justify">' +
        data.description +
        '</h4></div><div class="col-md-2"><button class="btn btn-info openModal" name=' +
        i + '>Show<br>summary</button></div></div></div></div>';
    document.body.insertBefore(newDiv, LAST);
};


$.ajax({
    url,
    dataType: "json",
    success: (data) => {
        for (var i = 0; i < data.items.length; i++) {
            items.push(data.items[i].volumeInfo);
            createBlock(items[i], i);
        };
    },
    type: "GET"
});


function fillingOfVoids(obj) {
    if (obj) {
        return obj;
    } else {
        obj = 'Unknown';
        return obj;
    }
};


function modalContent(src) {
    document.querySelector('#bodyModal').innerHTML =
        'Author: ' + fillingOfVoids(src.authors) + '<br>Title: ' +
        fillingOfVoids(src.title) + '<br>Category: ' +
        fillingOfVoids(src.categories) + '<br>Publisher: ' +
        fillingOfVoids(src.publisher) + '<br>Published date: ' +
        fillingOfVoids(src.publishedDate);
}

document.body.addEventListener('click', function(e) {
    if (e.target.getAttribute('class') === 'btn btn-info openModal') {
        var a = e.target.getAttribute('name');
        modalContent(items[a]);
        $('#modal').modal();
    }
}, true);
