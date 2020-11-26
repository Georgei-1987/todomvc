(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

})(window); 

let mainEl = document.querySelector('.main');
let footerEl = document.querySelector('.footer');
let active; //Переменная принимает значение "1", когда нажата ссылка "active"
let activeEl = document.querySelector('.active');
let allEl = document.querySelector('.all');
let clearCompletedEl = document.querySelector('.clear-completed');
let completed; //Переменная принимает значение "1", когда нажата ссылка "completed"
let completedEl = document.querySelector('.completed');
let countToggle = 0; //Счётчик завершённых дел
let countItems = 0; //Счётчик НЕзавершённых дел
let newTodoEl = document.querySelector('.new-todo');
let todoCountEl = document.querySelector('.todo-count');
let todoListEl = document.querySelector('.todo-list');
let toggleAllEl = document.querySelector('.toggle-all');

footerEl.hidden = true;
mainEl.hidden = true;
/*--------------------------------------------------------------------------------------------------------------------------------*/
// Если в поле элемента newTodoEl что-то введено и нажат Enter, то вызывается функция, добавляющая строку в конце списка todoListEl
newTodoEl.addEventListener('keydown', function (event) {
	if (event.code === 'Enter' && newTodoEl.value) {		
		addLi();
	}
});

/*--------------------------------------------------------------------------------------------------------------------------------*/
toggleAllEl.addEventListener('click', function () {

		// Добавляем все элементы с классом toggle в переменную arrayToggle
		let arrayToggle = todoListEl.querySelectorAll('li .view .toggle');
		let yesToggle = 0; // Счётчик количества установленных галочек

		// Перебираем в переменной arrayToggle все элементы и считаем количество элементов с установленными галочками
		for (let item of arrayToggle) {
			if (item.checked) {
				yesToggle++;
			}
		}

		console.log('Отмеченных галочек до нажатия было: ' + yesToggle);

		// Если кол-во перебираемых элементов больше, чем эл-ов с устан-ми галочками, то ставим галочки в тех элементах,
		// где они не установлены
		if (arrayToggle.length > yesToggle) {
			console.log('Количество НЕзавершённых дел было БОЛЬШЕ установленных галочек');

			for (let item of arrayToggle) {

				if (!item.checked) {
					item.checked = true;
					item.parentElement.parentElement.classList.add('completed');

					if (active === 1) {
						item.parentElement.parentElement.hidden = true;
					}

					if (completed === 1) {
						item.parentElement.parentElement.hidden = false;	
					}

					countToggle++;				
					
					if (countToggle > 0) {
						clearCompletedEl.hidden = false;
					}

					countItems--;
					displayItems(countItems);
					}
			}
		// В противном случае, либо устанавливаем галочки во всех элементах, либо снимаем галочки во всех элементах
		} else {
			console.log('Количество НЕзавершённых дел было РАВНО установленным галочкам либо НУЛЮ');

			for (let item of arrayToggle) {
				if (!item.checked) {
					item.checked = true;
					item.parentElement.parentElement.classList.add('completed');
					countToggle++;				
					countItems--;
					displayItems(countItems);					
				} else {
					item.checked = false;
					item.parentElement.parentElement.classList.remove('completed');

					if (active === 1) {
						item.parentElement.parentElement.hidden = false;
					}

					if (completed === 1) {
						item.parentElement.parentElement.hidden = true;	
					}

					countToggle--;
					
					if (countToggle === 0) {
						clearCompletedEl.hidden = true;
					}

					countItems++;
					displayItems(countItems);
				}
			}
		}
});
/*--------------------------------------------------------------------------------------------------------------------------------*/
function displayItems(countItems) {
	if (countItems === 0 || countItems === 1) {
		todoCountEl.innerHTML = countItems + ' item left';
	} else if (countItems > 1 || countItems <0) {
		todoCountEl.innerHTML = countItems + ' items left';
		}	
}
/*--------------------------------------------------------------------------------------------------------------------------------*/

todoListEl.addEventListener('click', function (event) {
	let target = event.target;

		if (target.tagName === 'BUTTON') {
			if (countToggle === 0) {
				countItems = countItems - 1;
				
				if (countItems === 0) {
					footerEl.hidden = true;
					mainEl.hidden = true;
				} else if (countItems === 1) {
					todoCountEl.innerHTML = countItems + " item left";
				} else if (countItems > 1) {
					todoCountEl.innerHTML = countItems + " items left";
				}

				target.parentElement.parentElement.remove();
			} else if (countToggle !== 0) {
				countToggle--;
				
				if (countItems === 0 && countToggle === 0) {
					footerEl.hidden = true;
					mainEl.hidden = true;
				}				
				target.parentElement.parentElement.remove();
			}
		}		
});
/*--------------------------------------------------------------------------------------------------------------------------------*/
	todoListEl.addEventListener('dblclick', function (event) {
		
		let target = event.target;
		
		if (target.tagName === 'LABEL') {
			console.log('You push LABEL');
			let firstValue = target.innerHTML;
			let editEl = target.parentElement.nextElementSibling;
			console.log(editEl);
			let currentLi = target.parentElement.parentElement;
			
			currentLi.classList.add('editing');

			editEl.value = firstValue;

			editEl.focus(); // Элемент получает фокус

			editEl.addEventListener('focusout', function () {
				target.innerHTML = editEl.value;
				currentLi.classList.remove('editing');			
			});

			editEl.addEventListener('keydown', function (event) {
				if (event.code === 'Enter' && editEl.value) {				
					target.innerHTML = editEl.value;
					currentLi.classList.remove('editing');				
				}
			});
		}
		
	});
/*--------------------------------------------------------------------------------------------------------------------------------*/
function addLi() {	
	todoListEl.insertAdjacentHTML('beforeend',`<li><div class="view"><input class="toggle" type="checkbox"><label>${newTodoEl.value}</label><button class="destroy"></button></div><input class="edit" value="Rule the web"></li>`);

	clearCompletedEl.hidden = true;
	footerEl.hidden = false;
	mainEl.hidden = false;
	
	countItems++;

	if (countItems === 1) {
		todoCountEl.innerHTML = countItems + ' item left';
	} else if (countItems > 1) {
		todoCountEl.innerHTML = countItems + ' items left';
	}
	
	newTodoEl.value = ''; 

	if (completed) {
		todoListEl.querySelector('li:last-child').hidden = true;
	}
		
	/*--------------------------------------------------------------------------------------*/
		// Если галочка в чекбоксе установлена, то содержимое элемента Туду перечёркивается, если снята - то содержимое 
		// элемента не перечёркнуто
	
	let anyToggle = todoListEl.querySelector('li:last-child .toggle');

	anyToggle.addEventListener('click', function () {
			if (anyToggle.checked) { 
				countToggle++; // Счётчик установленных галочек

				countItems--;

				displayItems(countItems);	
			
				if (countToggle > 0) {
					clearCompletedEl.hidden = false;
				}

				this.parentElement.parentElement.classList.add('completed');

				if (active === 1) {
					this.parentElement.parentElement.hidden = true;
				}
			} else {
				countToggle--;	

				countItems++;		
				
				displayItems(countItems);
				
				if (countToggle === 0) {
					clearCompletedEl.hidden = true;
				}

				this.parentElement.parentElement.classList.remove('completed');
			}
	});
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
clearCompletedEl.addEventListener('click', function () {
	// Добавляем все элементы с классом toggle в переменную arrayToggle
	let arrayToggle = todoListEl.querySelectorAll('li .view .toggle');

	// Перебираем каждый элемент в переменной arrayToggle
	for (let item of arrayToggle) {		
		// Если в элементе установлена галочка, то удаляем этот элемент
		if (item.checked) {
			item.parentElement.parentElement.remove();

			countToggle--;
			
			if (countItems === 0) {
				footerEl.hidden = true;
				mainEl.hidden = true;
			}
		}
	}
});

/*--------------------------------------------------------------------------------------------------------------------------------*/
// Отобразить ВСЕ дела
allEl.addEventListener('click', function () {
	active = 0;
	completed = 0;

	activeEl.classList.remove('selected');
	completedEl.classList.remove('selected');
	allEl.classList.add('selected');

	let arrayToggle = todoListEl.querySelectorAll('li .view .toggle');

	for (let item of arrayToggle) {
		item.parentElement.parentElement.hidden = false;
	}

});
/*--------------------------------------------------------------------------------------------------------------------------------*/
// Отобразить НЕзавершённые дела
activeEl.addEventListener('click', function () {

	active = 1;
	completed = 0;
	allEl.classList.remove('selected');
	completedEl.classList.remove('selected');
	activeEl.classList.add('selected');

	let arrayToggle = todoListEl.querySelectorAll('li .view .toggle');

	for (let item of arrayToggle) {

		item.parentElement.parentElement.hidden = item.checked;

		/*if (item.checked) {
			item.parentElement.parentElement.hidden = true;
		} else {
			item.parentElement.parentElement.hidden = false;
		}*/
	}
});
/*--------------------------------------------------------------------------------------------------------------------------------*/
// Отобразить завершённые дела
completedEl.addEventListener('click', function () {

	active = 0;
	completed = 1;
	allEl.classList.remove('selected');
	activeEl.classList.remove('selected');
	completedEl.classList.add('selected');

	let arrayToggle = todoListEl.querySelectorAll('li .view .toggle');

	for (let item of arrayToggle) {

		item.parentElement.parentElement.hidden = !item.checked;

		/*if (!item.checked) {
			item.parentElement.parentElement.hidden = true;
		} else {
			item.parentElement.parentElement.hidden = false;
		}*/
	}

});
/*--------------------------------------------------------------------------------------------------------------------------------*/







