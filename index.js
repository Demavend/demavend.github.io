var jv = {
	autor: "Автор: Верн Жюль",
	title: "Название: Пять недель на воздушном шаре",
	janr: "Жанр: Путешествия и география",
	publ: "Издательский дом: Маариф",
	year: "Год издания: 1987"};


var dl = {
	autor: "Автор: Демарко Том",
	title: "Название: Deadline. Роман об управлении проектами",
	janr: "Жанр: Деловая литература",
	publ: "Издательский дом: Вершина",
	year: "Год издания: 2006"
};


var ratt = {
	autor: "Автор: Гаррисон Гарри",
	title: "Название: Стальная Крыса",
	janr: "Жанр: Космическая фантастика",
	publ: "Издательский дом: Эксмо, Александр Корженевский",
	year: "Год издания: 2007"
};


var witch = {
	autor: "Автор: Сапковский Анджей",
	title: "Название: Ведьмак",
	janr: "Жанр: Фэнтези",
	publ: "Издательский дом: Астрель",
	year: "Год издания: 1986"
};


var tale = {
	autor: "Автор: Торп Бенджамин",
	title: "Название: Нордическая мифология",
	janr: "Жанр: Мифы. Легенды. Эпос",
	publ: "Издательский дом: Вече",
	year: "Год издания: 2008"
};

function wind (x){
	document.querySelector('#bodyModal').innerHTML = ""+x.autor+"<br>"+x.title+"<br>"+x.janr+"<br>"+x.publ+"<br>"+x.year;}

var myModal = document.querySelectorAll('.openModal');
myModal['' + 0 + ''].addEventListener('click', function(e) {
	$('#modal').modal();
	wind (jv);				
}, false);

myModal['' + 1 + ''].addEventListener('click', function(e) {
	$('#modal').modal();
	wind (dl);				
}, false);

myModal['' + 2 + ''].addEventListener('click', function(e) {
	$('#modal').modal();
	wind (ratt);				
}, false);

myModal['' + 3 + ''].addEventListener('click', function(e) {
	$('#modal').modal();
	wind (witch);				
}, false);

myModal['' + 4 + ''].addEventListener('click', function(e) {
	$('#modal').modal();
	wind (tale);				
}, false);
