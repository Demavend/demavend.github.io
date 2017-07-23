var booksElements = [
	{autor: "Автор: Верн Жюль", title: "Название: Пять недель на воздушном шаре", janr: "Жанр: Путешествия и география", publ: "Издательский дом: Маариф", year: "Год издания: 1987"},
	{autor: "Автор: Демарко Том", title: "Название: Deadline. Роман об управлении проектами",janr: "Жанр: Деловая литература", publ: "Издательский дом: Вершина", year: "Год издания: 2006"},
	{autor: "Автор: Гаррисон Гарри", title: "Название: Стальная Крыса", janr: "Жанр: Космическая фантастика", publ: "Издательский дом: Эксмо, Александр Корженевский", year: "Год издания: 2007"},
	{autor: "Автор: Сапковский Анджей", title: "Название: Ведьмак", janr: "Жанр: Фэнтези", publ: "Издательский дом: Астрель", year: "Год издания: 1986"},
	{autor: "Автор: Торп Бенджамин", title: "Название: Нордическая мифология", janr: "Жанр: Мифы. Легенды. Эпос", publ: "Издательский дом: Вече", year: "Год издания: 2008"}
	];

var audioSrc = ["Pyat nedel na vozdushnom share/01.mp3",
"Pyat nedel na vozdushnom share/02.mp3",
"Pyat nedel na vozdushnom share/03.mp3",
"Pyat nedel na vozdushnom share/04.mp3",
"Pyat nedel na vozdushnom share/05.mp3",
"Pyat nedel na vozdushnom share/06.mp3",
"Pyat nedel na vozdushnom share/07.mp3",
"Pyat nedel na vozdushnom share/08.mp3",
"Pyat nedel na vozdushnom share/09.mp3",
"Pyat nedel na vozdushnom share/10.mp3",
"Pyat nedel na vozdushnom share/11.mp3",
"Pyat nedel na vozdushnom share/12.mp3",
"Pyat nedel na vozdushnom share/13.mp3",
"Pyat nedel na vozdushnom share/14.mp3",
"Pyat nedel na vozdushnom share/15.mp3",
];	
	
var myModal = document.querySelectorAll('.openModal');

var mySpoiler = document.querySelectorAll('a.showHide');

var audioList = document.querySelectorAll('div.player label');

var jukebox = document.querySelector('div.player');

for (var i = 0; i < myModal.length; i++) {
	myModal[i].setAttribute('id', i);	
};


for (var j = 0; j < audioList.length; j++) {
	audioList[j].setAttribute('data-src', audioSrc[j]);	
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


jukebox.addEventListener('click', function(e) {
  var songName = e.target.getAttribute('data-src');
  var audioPlayer = document.querySelector('#player');

  if (audioPlayer) {

    if (songName===audioPlayer.getAttribute('src')) {
      if (audioPlayer.paused) {
        audioPlayer.play();
        e.target.id = 'playing';
		e.target.setAttribute('class', 'btn btn-success');
      } else {
        audioPlayer.pause();
        e.target.id = 'paused';
		e.target.setAttribute('class', 'btn btn-warning');
      }
    } else {
      audioPlayer.src = songName;
      audioPlayer.play();
      if (document.querySelector('#playing')) {
        document.querySelector('#playing').setAttribute('class', 'btn btn-primary');
		document.querySelector('#playing').id='';
      } else {
		document.querySelector('#playing').setAttribute('class', 'btn btn-primary');  
        document.querySelector('#paused').id='';
      }
        e.target.id = 'playing';
    }

  } else {
    var audioPlayer = document.createElement('audio');
    audioPlayer.id = 'player';
    e.target.id = 'playing';
	e.target.setAttribute('class', 'btn btn-success');
	
    audioPlayer.src = songName;
    document.body.appendChild(audioPlayer);
    audioPlayer.play();

    audioPlayer.addEventListener('ended', function() {
      audioPlayer.parentNode.removeChild(audioPlayer);
      e.target.id='';
	  e.target.setAttribute('class', 'btn btn-primary');
    }, false);
  }

}, false);

 



