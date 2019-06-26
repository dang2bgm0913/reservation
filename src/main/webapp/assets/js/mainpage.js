document.addEventListener("DOMContentLoaded", function() {
	main.init();
});

// 메인
let main = {
	// 초기화
	init : function() {
		this.theCategory.loadItmes();
		this.thePromotion.loadItems();

		this.theProduct.btnMoreClick();
	},

	// Common
	common : {
		// setHtml 함수
		setHtml : function(data, sourceValue, element) {
			// 입력받은 data를 json 객체로 변환
			const items = JSON.parse(data).items;
			const count = items.length;

			// 입력받은 sourceValue와 일치하는 element를 찾아 handlebars를 사용하여 template을 생성
			// 생성한 tmeplate에 item을 대입하여 html을 생성하여 element의 innerHTML에 추가
			let source = document.querySelector(sourceValue).innerText;
			let template = Handlebars.compile(source);
			let html = "";
			for (var i = 0; i < count; i++) {
				html += template(items[i]);
			}
			document.querySelector(element).innerHTML += html;
		}
	},

	// Category
	theCategory : {

		// category 데이터를 가져오고 html 생성 및 설정
		loadItmes : function() {
			xhrRequest.send({
				method : "GET",
				url : "api/categories"
			}, null, this.callback);
			main.theCategory.evtClick();

			// product 초기 데이터(전체리스트)를 가져오는 함수 호출
			main.theProduct.loadItems(0, 0);
		},
		callback : function(data) {
			main.common.setHtml(data, "#category_template", "#category_lst");
		},

		// 각각의 category에 click Event 추가
		evtClick : function() {
			let category = document.querySelector("#category_lst");
			category.addEventListener("click", function(e) {
				let item = e.target;
				if (e.target.tagName === "SPAN") {
					item = e.target.parentElement;
				}

				// 선택한 category에 해당하는 product 정보 load
				var categoryId = item.parentElement.getAttribute('data-category');
				if (categoryId !== null) {
					main.theCategory.setButtonState(item);

					document.querySelectorAll(".lst_event_box")[0].innerHTML = "";
					document.querySelectorAll(".lst_event_box")[1].innerHTML = "";
					main.theProduct.loadItems(0, categoryId);
				}
			});
		},

		// category의 active 상태 변경
		// 현재 active 클래스를 갖고있는 category에서 active 클래스를 지워주고 클릭한 category에 active
		// 클래스 추가
		setButtonState : function(item) {
			if (item !== null) {
				let active = document.querySelector(".item .active");
				if (active !== null) {
					active.classList.remove('active')
				}

				item.classList.add('active');
			}
		}
	},

	// Product
	theProduct : {
		// 더보기 버튼 Element
		btnMoreElement : document.querySelector(".more .btn"),

		// product 정보 가져오기 및 html 생성
		loadItems : function(start, categoryId) {
			xhrRequest.send({
				method : "GET",
				url : "api/products?start=" + start + "&categoryId=" + categoryId
			}, null, this.callback);
		},
		callback : function(data) {
			let totalCount = JSON.parse(data).totalCount;
			main.theProduct.setTotalCount(totalCount);
			const responseData = JSON.parse(data).items;
			const count = responseData.length;

			let source = document.querySelector("#product_template").innerText;
			let template = Handlebars.compile(source);
			let htmlLeft = "";
			let htmlRight = "";
			for (var i = 0; i < count; i++) {
				// 왼쪽과 오른쪽에 들어갈 html을 홀수 짝수로 구분
				if ((i + 1) % 2 == 1) {
					htmlLeft += template(responseData[i]);
				} else {
					htmlRight += template(responseData[i]);
				}
			}
			document.querySelectorAll(".lst_event_box")[0].innerHTML += htmlLeft;
			document.querySelectorAll(".lst_event_box")[1].innerHTML += htmlRight;

			// 더보기 버튼의 상태 변경
			main.theProduct.btnMoreState(totalCount);
		},

		// total Count 정보 업데이트
		setTotalCount : function(totalCount) {
			document.querySelector(".event_lst_txt .pink").innerText = totalCount + "개";
		},

		// 더보기 버튼 클릭 이벤트
		btnMoreClick : function() {
			this.btnMoreElement.addEventListener("click", function(e) {
				let categoryId = document.querySelector(".item .active").parentElement.getAttribute('data-category');
				let start = document.querySelectorAll(".lst_event_box > .item").length;
				main.theProduct.loadItems(start, categoryId);
			});
		},

		// 현재 도시 중인 product 개수와 totalCount와 비교해 같으면 더보기 버튼 hidden 상태 변경
		btnMoreState : function(totalCount) {
			let itemsCount = document.querySelectorAll(".lst_event_box > .item").length;

			if (itemsCount >= totalCount) {
				main.theProduct.btnMoreElement.hidden = true;
			} else {
				main.theProduct.btnMoreElement.hidden = false;
			}
		}
	},

	// Promotion
	thePromotion : {
		// promotion html의 부모 Element
		parent : document.querySelector('.visual_img'),

		// setTimeout의 duration
		DURATION : 600,

		// setInterval의 delay
		DELAY : 1500,

		// promotion 정보 가져오기 및 html 생성
		loadItems : function() {
			xhrRequest.send({
				method : "GET",
				url : "api/promotions"
			}, null, this.callback);
		},
		callback : function(data) {
			main.common.setHtml(data, "#poromotion_template", "#visual_lst");
			main.thePromotion.reset();
			let repeat = setInterval(main.thePromotion.next, main.thePromotion.DELAY);
		},

		// class 정보 설정
		reset : function() {
			let slides = document.querySelectorAll('.visual_img > div');
			for (var i = 0; i < slides.length; i++) {
				slides[i].className = '';
				slides[i].classList.add(i > 1 ? 'after' : (i ? 'current' : 'before'))
			}
		},

		// 제일 앞에있는 div를 마지막으로 위치를 변경하고 class 정보를 설정함
		next : function() {
			main.thePromotion.parent.classList.add('slider_move');
			setTimeout(function() {
				var firstSlide = document.querySelector('.visual_img > div:first-child');
				main.thePromotion.parent.appendChild(firstSlide);
				main.thePromotion.reset();
				main.thePromotion.parent.classList.remove('slider_move')
			}, main.thePromotion.DURATION)
		}
	}
}