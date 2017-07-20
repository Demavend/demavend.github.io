var booksElements = [
	{autor: "Автор: Верн Жюль", title: "Название: Пять недель на воздушном шаре", janr: "Жанр: Путешествия и география", publ: "Издательский дом: Маариф", year: "Год издания: 1987"},
	{autor: "Автор: Демарко Том", title: "Название: Deadline. Роман об управлении проектами",janr: "Жанр: Деловая литература", publ: "Издательский дом: Вершина", year: "Год издания: 2006"},
	{autor: "Автор: Гаррисон Гарри", title: "Название: Стальная Крыса", janr: "Жанр: Космическая фантастика", publ: "Издательский дом: Эксмо, Александр Корженевский", year: "Год издания: 2007"},
	{autor: "Автор: Сапковский Анджей", title: "Название: Ведьмак", janr: "Жанр: Фэнтези", publ: "Издательский дом: Астрель", year: "Год издания: 1986"},
	{autor: "Автор: Торп Бенджамин", title: "Название: Нордическая мифология", janr: "Жанр: Мифы. Легенды. Эпос", publ: "Издательский дом: Вече", year: "Год издания: 2008"}
	];

var myModal = document.querySelectorAll('.openModal');

var mySpoiler = document.querySelectorAll('a.showHide');

for (var i = 0; i < myModal.length; i++) {
	myModal[i].setAttribute('id', i);	
};

function windowContent (x){
	document.querySelector('#bodyModal').innerHTML = ""+x.autor+"<br>"+x.title+"<br>"+x.janr+"<br>"+x.publ+"<br>"+x.year;}

document.body.addEventListener('click', function(e){
	if (e.target.getAttribute('class') === 'btn btn-info openModal'){
	var a = e.target.getAttribute('id');
	windowContent(booksElements[a]);
	$('#modal').modal();
	}else if(e.target.getAttribute('class') === 'showHide'){
		var a = e.target.getAttribute('name');
		e.target.style.display = "none";
		var divBlock = document.getElementById(a);
		divBlock.style.display = "none";
	}else if(e.target.getAttribute('class') === 'dropdown-footer'){
		var divShowed = document.querySelectorAll('.hideShow');
		for (var i = 0; i < mySpoiler.length; i++){
			mySpoiler[i].removeAttribute('style');
			divShowed[i].removeAttribute('style')
			}
	};
}, true);

 



