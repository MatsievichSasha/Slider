//JSON photo
picture_1 = [{"url":"img/01.jpg", "urlSmall":"img/01-.jpg"}, 
		  {"url":"img/02.jpg", "urlSmall":"img/02-.jpg"}, 
          {"url":"img/03.jpg", "urlSmall":"img/03-.jpg"}, 
          {"url":"img/04.jpg", "urlSmall":"img/04-.jpg"}, 
          {"url":"img/05.jpg", "urlSmall":"img/05-.jpg"}, 
          {"url":"img/06.jpg", "urlSmall":"img/06-.jpg"},
          {"url":"img/07.jpg", "urlSmall":"img/07-.jpg"}, 
          {"url":"img/08.jpg", "urlSmall":"img/08-.jpg"}, 
          {"url":"img/09.jpg", "urlSmall":"img/09-.jpg"}];

picture_2 = [{"url":"gallery01/picture1-lg.jpg", "urlSmall":"gallery01/picture1-thumb.jpg"}, 
		  {"url":"gallery01/picture2-lg.jpg", "urlSmall":"gallery01/picture2-thumb.jpg"}, 
          {"url":"gallery01/picture3-lg.jpg", "urlSmall":"gallery01/picture3-thumb.jpg"},  
		  {"url":"gallery01/picture4-lg.jpg", "urlSmall":"gallery01/picture4-thumb.jpg"},
		  {"url":"gallery01/picture5-lg.jpg", "urlSmall":"gallery01/picture5-thumb.jpg"},
		  {"url":"gallery01/picture6-lg.jpg", "urlSmall":"gallery01/picture6-thumb.jpg"},
		  {"url":"gallery01/picture7-lg.jpg", "urlSmall":"gallery01/picture7-thumb.jpg"},
		  {"url":"gallery01/picture8-lg.jpg", "urlSmall":"gallery01/picture8-thumb.jpg"},
		  {"url":"gallery01/picture9-lg.jpg", "urlSmall":"gallery01/picture9-thumb.jpg"},
		  {"url":"gallery01/picture10-lg.jpg", "urlSmall":"gallery01/picture10-thumb.jpg"},
		  {"url":"gallery01/picture11-lg.jpg", "urlSmall":"gallery01/picture11-thumb.jpg"},
		  {"url":"gallery01/picture12-lg.jpg", "urlSmall":"gallery01/picture12-thumb.jpg"},
		  {"url":"gallery01/picture13-lg.jpg", "urlSmall":"gallery01/picture13-thumb.jpg"},
		  {"url":"gallery01/picture14-lg.jpg", "urlSmall":"gallery01/picture14-thumb.jpg"},];

//function Slider
// picture - массив url изображений 
// function  - элемент для вставки
//document.addEventListener("DOMContentLoaded", 'slider_1')
function Slider(picture, sliderId) {
    //текущий контекст
    var self = this;
	//JSON с ссылками изображений
	this.picture = picture;
	//ширина превью изображения
	WIDTH_PR = 160;
    this.carrentView = 0;
/////////////////////////////////////////////////////////////////////////
    //фрагмент
	var fragment = document.createDocumentFragment();
	//контейнер основного изображения
	this.view = document.createElement('div');
	this.view.className = 'view';
	//основное изображение
	this.viewImg = document.createElement('img');
    //изображение по умолчанию
	var src = this.picture[this.carrentView]['url'];
    this.viewImg.src = src;
    //контейнер для превью и кнопок лево/право
    var previewOut = document.createElement('div');
    previewOut.className = "preview-out";
    //кнопки лево/право в превью
    this.previousImgButton = document.createElement('div');
    this.previousImgButton.className = "previousImgButton";
    this.previousImgButton.innerHTML = '<';
	this.nextImgButton = document.createElement('div');
	this.nextImgButton.className = "nextImgButton";
	this.nextImgButton.innerHTML = '>';
	//контейнер для всех изображений в превью
    this.preview = document.createElement('div');
    this.preview.className = 'preview';
    //задать ширину превью с изображениями
	this.preview.style.width = this.picture.length * WIDTH_PR + 'px';
	//создать превью по ссылкам 'urlSmall'
	this.picture.forEach(function(item, i) {
    	//контейнер изображения превью
	    var previewImage = document.createElement('div');
	    previewImage.className = 'preview-image';
	    var img = document.createElement('img');
	    img.setAttribute('src', item['urlSmall'] );
	    img.setAttribute('data-img', i);
	    previewImage.appendChild(img);
	    this.preview.appendChild(previewImage);
	}, this) 
	previewOut.appendChild(this.preview);
	previewOut.appendChild(this.nextImgButton);
	previewOut.appendChild(this.previousImgButton);
	this.view.appendChild(this.viewImg);
	fragment.appendChild(this.view);
	fragment.appendChild(previewOut);
	sliderId.appendChild(fragment);
    //////////////////////////////////////////////////////////////////////
    //хендлеры для для событий
    var setId;
    var handlerSetTimeout = function () {
    	self.nextImg.bind(self);
    	setId = setTimeout(self.nextImg.bind(self), 5000);
    }
    var handlerMouseenter = function () { 
	    clearInterval(setId);
	    var sliders = document.body.querySelectorAll('div.slider');
	    for (var i = 0; i < sliders.length; i++){
	    	sliders[i].setAttribute('data-currentSlider', '')
	        //сохранение активного слайдера
	        sliderId.setAttribute('data-currentSlider', true);
	    }
	}  

	var handlerMouseleave = function () { 
        setId = setInterval(self.nextImg.bind(self), 5000);
    }

    var handlerKeyup = function (event) {
    	if (sliderId.getAttribute('data-currentSlider')) {
	    	if (event.keyCode === 37) {
                self.previousImg();
		        }
		    else if (event.keyCode === 39) {
		    	self.nextImg();  
		    }
		}
    }
////////////////////////////////////////////////////////////////////////
	//подписывание на события
	this.previousImgButton.addEventListener('click', this.scrollPreview.bind(this));
	//пролистывание превью при клике по стрелкам
    this.nextImgButton.addEventListener('click', this.scrollPreview.bind(this));
    //смена осн изобр при клике по превью
    this.preview.addEventListener('click', this.changeImg.bind(this));
    //смена осн изображения по клику по нем
    this.view.addEventListener('click', this.clickImg.bind(this));
    //смена основного изображения каждые 5 сек когда весь контент загружен
    setId = setTimeout(handlerSetTimeout, 5000);
    //стоп при наведении маши на слайдер
    sliderId.addEventListener('mouseenter', handlerMouseenter);
    //старт изображений при уходе мыши 
    sliderId.addEventListener('mouseleave', handlerMouseleave);
    //пролистывание осн изображения с клавиатуры
    document.body.addEventListener('keyup', handlerKeyup);
}
//////////////////////////////////////////////////////////////////////
//ф-я прокрутки превью
Slider.prototype.scrollPreview = function (event) {
	var previewImage = event.target;
	//превью
	var preview = this.preview;
		
	if (previewImage.className == 'previousImgButton'){
			var element = preview.lastElementChild;
			preview.insertBefore(element, preview.firstElementChild);
	} else if (previewImage.className == 'nextImgButton'){
		var element = preview.firstElementChild;
		preview.appendChild(element);
	}
}
//ф-я перезаписи атрибута src осн изобр
Slider.prototype.changeImgSrc = function () {
    var imgSrc = this.picture[this.carrentView]['url'];
	this.viewImg.setAttribute('src', imgSrc);
}
//ф-я смены картинки при клике по превью
Slider.prototype.changeImg = function (event) {
	var view = event.target;
    //получить ссылку изображ превью
	this.carrentView = view.getAttribute('data-img');
	//поменять линк у изображения
	this.changeImgSrc();
}
//листание основного изображения вправо
Slider.prototype.nextImg = function () {
	this.carrentView++;
	if (this.carrentView === this.picture.length) this.carrentView = 0;
    //поменять линк у изображения
	this.changeImgSrc();
}
//листание основного изображения влево
Slider.prototype.previousImg = function () {
    this.carrentView--;
    if (this.carrentView < 0) this.carrentView = this.picture.length - 1;
    //поменять линк у изображения
	this.changeImgSrc();
}
//листание по клику на осн изображении
Slider.prototype.clickImg = function (event) {
	//середина изображения
	var coords = this.view.getBoundingClientRect();
	var elemMiddle = this.view.clientWidth/2 + coords.left;
    if (event.clientX < elemMiddle) {
        this.previousImg();
	} else {
		this.nextImg();
	} 
}
////////////////////////////////////////////////////////////////////////////
var slider0 = new Slider(picture_1, slider_0);

var slider1 = new Slider(picture_2, slider_1);

var slider2 = new Slider(picture_1, slider_2);