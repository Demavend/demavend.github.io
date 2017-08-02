var booksElements = [];
var myModal = document.querySelectorAll('.openModal');  	                    //Все кнопки модалок
var newDiv;

var innerDiv = function(data, i){
	newDiv = document.createElement('div');
	newDiv.innerHTML = '<div class="container"><div class="col"><h1 class="text-center text-primary">'+data.items[i].volumeInfo.title+'</h1><div class="row bg-success"><div class="col-md-2 col-sd-2" style="text-align:center;"><img src="'+data.items[i].volumeInfo.imageLinks.thumbnail+'" width="100%" height="170" class="img-responsive"></img></div><div class="col-md-8 col-sd-8"><h4 class="text-justify">'+data.items[i].volumeInfo.description+'</h4></div><div class="col-md-2 col-sd-2" style="text-align:center;line-height:15em;"><button class="btn btn-info openModal" name='+i+'  >Показать описание</button></div></div></div></div>';
	document.body.appendChild(newDiv);
};

$.ajax({
	url:"https://www.googleapis.com/books/v1/volumes?q=javascript&orderBy=newest&startIndex=0&maxResults=10",
	dataType:"json",
	success: function(data){
		booksElements.push(data);
		for(var i=0; i < booksElements[0].items.length; i++){
		innerDiv(data, i);
	};
	},
	type:"GET"
});

function isEmpty(obj) {
	for (var key in obj) {
		return obj;
	};
	obj='Неизвесно';
	return obj;
};


function windowContent (x){                                                		//Функция для вставки
	document.querySelector('#bodyModal').innerHTML =
	"Автор: "+isEmpty(x.volumeInfo.authors)+"<br>Название: "+isEmpty(x.volumeInfo.title)+"<br>Категория жанра: "+isEmpty(x.volumeInfo.categories)+"<br>Издатель: "+isEmpty(x.volumeInfo.publisher)+"<br>Дата публикации: "+isEmpty(x.volumeInfo.publishedDate);}       //текста в модалку

document.body.addEventListener('click', function(e){                    		//Ловим клик по бади
	if (e.target.getAttribute('class') === 'btn btn-info openModal'){   		//Кнопка открывает модалку?
	var a = e.target.getAttribute('name');                                    	//Узнаем какой текст в окне
	windowContent(booksElements[0].items[a]);                                        	//Вставляем текст
	$('#modal').modal();                                                    	//Открываем окно
	}
}, true);
