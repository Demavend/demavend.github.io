var booksElements = [
	{autor: "Автор: Верн Жюль", title: "Название: Пять недель на воздушном шаре", janr: "Жанр: Путешествия и география", publ: "Издательский дом: Маариф", year: "Год издания: 1987"},
	{autor: "Автор: Демарко Том", title: "Название: Deadline. Роман об управлении проектами",janr: "Жанр: Деловая литература", publ: "Издательский дом: Вершина", year: "Год издания: 2006"},
	{autor: "Автор: Гаррисон Гарри", title: "Название: Стальная Крыса", janr: "Жанр: Космическая фантастика", publ: "Издательский дом: Эксмо, Александр Корженевский", year: "Год издания: 2007"},
	{autor: "Автор: Сапковский Анджей", title: "Название: Ведьмак", janr: "Жанр: Фэнтези", publ: "Издательский дом: Астрель", year: "Год издания: 1986"},
	{autor: "Автор: Торп Бенджамин", title: "Название: Нордическая мифология", janr: "Жанр: Мифы. Легенды. Эпос", publ: "Издательский дом: Вече", year: "Год издания: 2008"}
	];

var	audioSrc =  ['<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/1.mp3?st=SchWZdUo_tMPmfVcgIWIRw&amp;e=1501085394">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/2.mp3?st=angf6iaXQ9EV_1Jeb_79TA&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/3.mp3?st=ADWgUDvrmyld0yqbt2Vjjg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/4.mp3?st=ij17fxbOr4z25rCAegO58g&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/5.mp3?st=aBdUKOikZVz6rwpFRjttUQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/6.mp3?st=7GufWiZxi_kVpw-5mWrf1Q&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/7.mp3?st=Q7bijcMom4WQYUTpQPxB8w&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/8.mp3?st=Sp9iwSPB53MPiWQQwvuzWw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/9.mp3?st=wJwB_e2U30EoBtJR2mzjjw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/10.mp3?st=4l0O5W_rG5IZGDd8iNTQVg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/11.mp3?st=un_FeSjTijO4lay6rPaq3A&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/12.mp3?st=r45M-pIQdDYRM1gJkClEDw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/13.mp3?st=lSIlnC0B807Y2KW8rZ94ww&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/14.mp3?st=gP0dmXmm60KUPDsC77KNsw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/15.mp3?st=ocoovhb04xYM5E9wTN-m4A&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/16.mp3?st=e6XXLuHcnbtdRrg77PZUiw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/17.mp3?st=tEgahdt4ptfqHQ_HTzejBg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/18.mp3?st=JYfMI_e-28p3Jep3NuXdhw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/19.mp3?st=in_0nuZYSI_el0dXCU3wMA&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/20.mp3?st=9f_VJg-XFpwslhU_dFDqsA&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/21.mp3?st=kwBWm4oSAHTwcaoHKHCpRA&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/22.mp3?st=Sx5P7-WhXyA14r1NEv_dSg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/23.mp3?st=hDpHTXv3gUQntKE_Q5ggog&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/24.mp3?st=t8nKbGapc9r5qKLAqgP92Q&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/25.mp3?st=Qo0iGmiOV5nWjhfwG3E2Lg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/26.mp3?st=CNANKEb_A7cLqhlr1faFlQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/27.mp3?st=dBZqbiFgDXanozckPB8vzQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/28.mp3?st=ZN112qIMwoqyUv8qQ4FJ8w&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/29.mp3?st=ED-KUrCSdGpk_JwJ8qp8OQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/30.mp3?st=NEl_ehDBoRRzaKA1Ro5OMg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/31.mp3?st=apB22qydQ1ukYlDjTakiiQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/32.mp3?st=vtI0WWiWaAG1Aj_gX0ELZw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/33.mp3?st=4dcixVj2vzFUsSj321lfmQ&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/34.mp3?st=_NL57GYNU_oFq3BIgR_77Q&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/35.mp3?st=QP4h6AhBLQD8qTKcxTrs-A&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/36.mp3?st=OR95S4iS-xzjopLHZHUilg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/37.mp3?st=MEWVfI7EcVtbyKJIHbFdDw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/38.mp3?st=zMxZF3qvyE1qGcx6LstyZw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/39.mp3?st=LRESSZpbsIDUq6WOQMu0Bw&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/40.mp3?st=rFxw6R5tg_1vwA5k-Xfwhg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/41.mp3?st=q7Wme1o6hJahB2o1n3J4Sg&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/42.mp3?st=eXUi1bbStvyzYG5ruMcf7A&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/43.mp3?st=c3LTbllTkslqGo4-OXLypA&amp;e=1501085776">',
				'<source src="http://77.245.68.26/books/s1/Sentyabr_2014/pyat_nedel/44.mp3?st=0XUqHR5ABp9zxqvBBgIuJA&amp;e=1501085776">'];
				

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

 



