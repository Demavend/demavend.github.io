var booksElements = [];
var myModal = document.querySelectorAll('.openModal');  	                    //Все кнопки модалок
var newDiv = [,,,,,,,,,];


for (var i = 0; i < 10; i++){
	$.ajax({
		url:"https://www.googleapis.com/books/v1/volumes?q=javascript&orderBy=newest&startIndex=" + i + "&maxResults=1",
		dataType:"json",
		success: function(data){
			booksElements.push(data.items[0]);
			newDiv[i] = document.createElement('div');
			newDiv[i].innerHTML = '<div class="container"><div class="col"><h1 class="text-center text-primary">'+data.items[0].volumeInfo.title+'</h1><div class="row bg-success"><div class="col-md-2"><div class="text-center"><img src="'+data.items[0].volumeInfo.imageLinks.thumbnail+'" width="160" height="170" hspace="10" align="middle" class="img-responsive"></img></div></div><div class="col-md-8"><h4 class="text-justify">'+data.items[0].volumeInfo.description+'</h4></div><div class="col-md-2"><h4 class="text-center"><div class="col"><table height="200"><tr><td style="vertical-align: middle"><button class="btn btn-info openModal">Показать описание</button></td></tr></table></div></h4></div></div></div></div>';
			document.body.appendChild(newDiv[i]);
		},
		type:"GET"
	});
};


for (var i = 0; i < myModal.length; i++) {                              		//Задаю айдишники всем
	myModal[i].setAttribute('id', i);                                       	//кнопкам с модалками
};


function windowContent (x){                                                		//Функция для вставки
	document.querySelector('#bodyModal').innerHTML =
	""+x.autor+"<br>"+x.title+"<br>"+x.janr+"<br>"+x.publ+"<br>"+x.year;}       //текста в модалку

document.body.addEventListener('click', function(e){                    		//Ловим клик по бади
	if (e.target.getAttribute('class') === 'btn btn-info openModal'){   		//Кнопка открывает модалку?
	var a = e.target.getAttribute('id');                                    	//Узнаем какой текст в окне
	//windowContent(booksElements[a]);                                        	//Вставляем текст
	$('#modal').modal();                                                    	//Открываем окно
	}
}, true);
