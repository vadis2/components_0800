(function () {
	'use strict';

	class Menu {

		/**
		* Конструктор класс Menu
		* @parm {Object} options
		*/
		constructor (options) {
			this.el = options.el;
			this.data = options.data;

			this._init();
			this._initEvents();

			this.render();
		}

		_init () {
			this.items = this.el.querySelectorAll('.menu__item');
		}

		/**
		* Установка обработчиков событий 
		*/
		_initEvents () {
			this.el.addEventListener('click', this._onCLick.bind(this));
		}


		/**
		* Обработчик всех кликов по меню
		* @param {MouseEvent} event
		*/
		_onCLick (event) {
			event.preventDefault();
			let target = event.target;

			if (target.classList.contains('menu__title')) {
				this.toggle();
			}

			if (target.classList.contains('menu__item')) {
				this.toggleItem(event.target);
			}
		}

		render () {
			this.el.innerHTML = '';

			let title = document.createElement('a');
			title.classList.add('menu__title');
			title.innerHTML = this.data.title;

			let list = document.createElement('ul');
			list.classList.add('menu__list');

			this.data.items.forEach(itemData => {
				let item = document.createElement('li');
				item.classList.add('menu__item');

				item.innerHTML = itemData.anchor;
				list.appendChild(item);
			});

			this.el.appendChild(title);
			this.el.appendChild(list);
		}

		/**
		* Выбор элемента меню
		* @param {HTMLElement} elem
		*/
		toggleItem (elem) {
			elem.classList.toggle('menu__item_selected');
			elem.style.color = elem.dataset.highlight;
		}

		/**
		* Переключение состояния меню
		*/
		toggle() {
			this.el.classList.toggle('menu_close');
		}

		/**
		* Получение данных о состоянии меню 
		* @returns {Array}
		*/
		getData () {
			return Array.prototype.filter.call(this.items, item => {
				return item.classList.contains('menu__item_selected');
			}).map(el => el.innerHTML);
		}
	}

	// export
	window.Menu = Menu;


})();