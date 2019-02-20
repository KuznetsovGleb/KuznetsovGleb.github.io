$(function () {

    let block = {
        init: function () {
            this.initVar();
            this.bindEvents();
            this.createDynamicElements();
        },
        initVar: function () {
            this.$header = $('.js-block-header');
            this.$closeButton = $('.js-collapse-button');
            this.$collapseBlock = $('.js-collapse-block');
            this.collapseFlag = false;
            this.$blockViews = $('.js-block-user-views');
            this.$blockPopup = $('.js-popup-advice');

            this.userAmount = $('#user-amount');

            this.$activitiesList = $('.js-activities-list');
            this.$checkboxInput = $('.js-checkbox-select');
        },
        bindEvents: function () {
            let self = this;

            this.$closeButton.on('click', function () {
                if (self.$collapseBlock.hasClass('non-collapse')) {
                    self.$closeButton.removeClass('counterclock-wise').addClass('clockwise');
                    self.$collapseBlock.toggleClass('non-collapse');
                    self.$header.toggleClass('block-header-minimize')
                    $('.block-header-text').eq(0).toggleClass('non-active');
                    $('.block-header-text').eq(1).toggleClass('non-active');

                    self.collapseFlag = true;
                    let heightList = $('.activities-list-item').first().outerHeight();

                    self.$collapseBlock.slideUp('slow', function () {
                        console.log(heightList);
                        self.$activitiesList.height(heightList);
                        self.$activitiesList.insertAfter(self.$header);
                    });

                } else {
                    self.$closeButton.removeClass('clockwise').addClass('counterclock-wise');
                    self.$header.toggleClass('block-header-minimize')
                    self.$collapseBlock.toggleClass('non-collapse');
                    $('.block-header-text').eq(0).toggleClass('non-active');
                    $('.block-header-text').eq(1).toggleClass('non-active');

                    self.collapseFlag = false;
                    self.$collapseBlock.slideDown('slow', function () {
                        self.$activitiesList.insertAfter(self.$collapseBlock);
                        self.$activitiesList.css('height', '100%');
                    });
                }

            })

            this.$blockViews.on('click', function () {
                self.$blockPopup.toggleClass('active-popup');
            })

            this.$activitiesList.on('click', 'li', function () {
                if ($(this).hasClass('activities-sent')) return false;

                $(this).slideUp(function () {
                    $(this).remove();
                })
            })

        },
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        createDynamicElements: function () {
            this.createUserViewsBlock();
            this.createActivities();
            this.generateActivity();
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

                let randomNumber = this.getRandom(0, 2);
                let timeToLive = this.getRandom(5000, 10000);

                this.$activitiesList.append('<li class="activities-list-item"></li>');
                $('.activities-list-item').eq(j).addClass(store.activities[randomNumber]);


                let listItem = $('.activities-list-item').eq(j).append(
                    '<span class="activities-list-item-header"></span>' +
                    '<span class="activities-list-item-text"></span>');

                if (!$('.activities-list-item').eq(j).hasClass('activities-greeting')) {
                    $('.activities-list-item').eq(j).prepend('<span class="activities-img"></span>');
                }

                let currentItem = $('.activities-list-item').eq(j);

                this.fillElements(randomNumber, currentItem)

                setTimeout(() => {
                    if (this.isAutomaticSending()) {
                        listItem.addClass('activities-sent');
                        setTimeout(() => {
                            listItem.slideUp(function () {
                                listItem.remove();
                            });
                        }, 2000)
                    } else {
                        listItem.slideUp(function () {
                            listItem.remove();
                        });
                    }
                }, timeToLive)
            }
        },
        generateActivity: function () {
            let randomNumber = this.getRandom(0, 2);
            let outer = $('<li class="activities-list-item"></li>').addClass(store.activities[randomNumber]);
            let inner = outer.append(
                '<span class="activities-list-item-header"></span>' +
                '<span class="activities-list-item-text"></span>');

            if (!outer.hasClass('activities-greeting')) {
                outer.prepend('<span class="activities-img"></span>');
            }

            this.fillElements(randomNumber, outer)

            setTimeout(() => {
                if ($('.activities-list-item').length < 4) {
                    this.$activitiesList.append(outer);

                    let heightList = $('.activities-list-item').first().outerHeight() || 60;
                    if (this.collapseFlag) {
                        self.$activitiesList.height(heightList);
                    }
                    this.generateActivity();

                    setTimeout(() => {
                        if (this.isAutomaticSending()) {
                            outer.addClass('activities-sent');
                            setTimeout(() => {
                                outer.slideUp(() => {
                                    outer.remove();
                                });
                            }, 2000)
                        } else {
                            outer.slideUp(() => {
                                outer.remove();
                            });
                        }
                    }, this.getRandom(5000, 1000))

                    return false;
                }
                this.generateActivity();

            }, this.getRandom(5000, 1000));
        },
        isAutomaticSending: function () {
            return this.$checkboxInput.is(':checked');
        },
        fillElements: function (randomNumber, currentItem) {
            switch (randomNumber) {
                case 0:
                    currentItem.find('.activities-list-item-header').text(store.users[this.getRandom(0, 14)] + ' ждет приветствий!');
                    currentItem.find('.activities-list-item-text').text(store.greeting[this.getRandom(0, 14)]);
                    break;
                case 1:
                    currentItem.find('.activities-list-item-header').text('Отправьте сюрприз!');
                    currentItem.find('.activities-list-item-text').text(store.users[this.getRandom(0, 14)] + ' будет рад');
                    currentItem.find('.activities-img').css({
                        "background": "url('images/surprise-" + this.getRandom(1, 12) + ".png') no-repeat center",
                        "background-size": "contain"
                    });
                    break;
                case 2:
                    currentItem.find('.activities-list-item-header').text('Обрадуйте стикером!');
                    currentItem.find('.activities-list-item-text').text('Привлеките внимание пользователя ' + store.users[this.getRandom(0, 14)]);
                    currentItem.find('.activities-img').css({
                        "background": "url('images/sticker-" + this.getRandom(1, 9) + ".png') no-repeat center",
                        "background-size": "contain"
                    });
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
            "Девушка, как дорогая машина - оставишь без присмотра - угонят!",
            "Толстый, лысый и злопамятный!",
            "Красивый мужчина в самом рассвете сил!"
        ]

    };

    block.init();

});