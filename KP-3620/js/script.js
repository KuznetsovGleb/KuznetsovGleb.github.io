$(function () {

    let block = {
        init: function () {
            this.initVar();
            this.bindEvents();
            this.createDynamicElements();
        },
        initVar: function () {
            this.$closeButton = $('.js-collapse-button');
            this.$collapseBlock = $('.js-collapse-block');

            this.$blockViews = $('.js-block-user-views');
            this.$blockPopup = $('.js-popup-advice');

            this.userAmount = $('#user-amount');

            this.activitiesList = $('.activities-list');

        },
        bindEvents: function () {
            let self = this;

            this.$closeButton.on('click', function () {
                self.$collapseBlock.addClass('non-active');
            })

            this.$blockViews.on('click', function () {
                self.$blockPopup.toggleClass('active-popup');
            })

        },
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        createDynamicElements: function () {
            this.createUserViewsBlock();
            this.createActivities();

        },
        createUserViewsBlock: function () {
            let minAmount = 1;
            let maxAmount = 20;
            let minDelay = 10000;
            let maxDelay = 30000;

            let self = this;

            (function loop() {

                let delay = self.getRandom(minDelay, maxDelay);

                self.userAmount.text(self.getRandom(minAmount, maxAmount));

                setTimeout(loop, delay);
            })();
        },
        createActivities: function () {

            for (let j = 0; j < 4; j++) {
                this.activitiesList.append('<li class="activities-list-item"></li>');

                let randomNumber = this.getRandom(0, 2);

                $('.activities-list-item').eq(j).addClass(store.activities[randomNumber]);


                let inner = $('.activities-list-item').eq(j).append(
                    '<span class="activities-list-item-header"></span>' +
                    '<span class="activities-list-item-text"></span>');

                if (!$('.activities-list-item').eq(j).hasClass('activities-greeting')) {
                    $('.activities-list-item').eq(j).prepend('<span class="activities-img"></span>');
                }


                switch (randomNumber) {
                    case 0:
                        $('.activities-list-item').eq(j).find('.activities-list-item-header').text(store.users[this.getRandom(0, 14)] + ' ждет приветствий!');
                        $('.activities-list-item').eq(j).find('.activities-list-item-text').text(store.greeting[this.getRandom(0, 14)]);
                        break;
                    case 1:
                        $('.activities-list-item').eq(j).find('.activities-list-item-header').text('Отправьте сюрприз!');
                        $('.activities-list-item').eq(j).find('.activities-list-item-text').text(store.users[this.getRandom(0, 14)] + ' будет рад');
                        $('.activities-list-item').eq(j).find('.activities-img').css({
                            "background": "url('images/surprise-" + this.getRandom(1, 12) + ".png') no-repeat center",
                            "background-size": "contain"
                        });
                        break;
                    case 2:
                        $('.activities-list-item').eq(j).find('.activities-list-item-header').text('Обрадуйте стикером!');
                        $('.activities-list-item').eq(j).find('.activities-list-item-text').text('Привлеките внимание пользователя ' + store.users[this.getRandom(0, 14)]);
                        $('.activities-list-item').eq(j).find('.activities-img').css({
                            "background": "url('images/sticker-" + this.getRandom(1, 9) + ".png') no-repeat center",
                            "background-size": "contain"
                        });
                }

            }

        }


    };

    let store = {
        activities: ["activities-greeting", "activities-surprise", "activities-sticker"],
        users: ["Колян", "Василий", "Пётр", "Серафим", "Игнатий", "Евлампий", "Серый", "Андрюха", "Лёха", "Шурик", "Миха", "Даниил", "Юрец", "Олег", "Илюха"],
        greeting: [
            "Привет! Как ты относишься к знакомствам в Интернете?",
            "Внешность на время, душа навсегда!",
            "Вы верите в любовь с первого письма или мне написать второе?",
            "Рая не гарантирую. Но постараюсь, чтобы ада не было.",
            "Хочу стать причиной твоего счастья!",
            "Знакомства в интернете – первый шаг к любви!",
            "Днем надо любить за достоинства, а ночью — за пороки.",
            "Кого знаю – не хочу, кого хочу – не знаю…",
            "Душа поет, а тело в танце",
            "Случайная встреча — самая неслучайная вещь на свете!",
            "Любовь смотрит через телескоп, зависть — через микроскоп!",
            "Женщина, как соль: с ней не сладко, но без неё не вкусно!",
            "Девушка, как дорогая машина — оставишь без присмотра — угонят!",
            "Толстый, лысый и злопамятный!",
            "Красивый мужчина в самом рассвете сил!"
        ]

    };

    block.init();

});