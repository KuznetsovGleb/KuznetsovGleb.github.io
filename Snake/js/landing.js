$(function () {

    var landing = {

        init: function () {
            this.setHead();
            this.bindEvents();
        },
        initVar: function () {
            this.$field = $('#field');
            this.$gameOver = $('.game-over');
            this.$newGame = $('.new-game');

            this.createField();

            this.$cell = $('.cell');

            this.createCriticalCells();
        },
        bindEvents: function () {

            var self = this;

            this.$newGame.on('click', function () {
                self.newGame();
            })

            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    case 37:
                        self.move.left(self.currentState - 1, self);
                        break;
                    case 38:
                        self.move.up(self.currentState - self.columns, self);
                        break;
                    case 39:
                        self.move.right(self.currentState + 1, self);
                        break;
                    case 40:
                        self.move.dowm(self.currentState + self.columns, self);
                        break;
                    case 13:
                    case 32:
                        if (self.$gameOver.hasClass('game-over-active')) self.newGame();
                        break;
                }
            });
        },
        setHead: function () {
            var max = this.cellAmount;
            var min = 0;

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            this.currentState = getRandomInt(min, max);
            this.$cell.eq(this.currentState).addClass('head');

        },
        createField: function () {

            var heightField = this.$field.height();
            var widthField = this.$field.width();
            var cellSize = 20;

            this.columns = widthField / cellSize;
            this.rows = heightField / cellSize;

            this.cellAmount = this.columns * this.rows;

            for (var j = 0; j < this.cellAmount; j++) {
                this.$field.append(renderCells(j));
            }

            function renderCells(j) {
                return '<div class="cell" data-cell=' + j + ' ></div>';
            }

        },
        createCriticalCells: function () {

            for (var i = 0; i < this.columns; i++) {
                this.$cell.eq(i).addClass('critical-top');
            }

            for (var i = this.columns - 1; i < this.cellAmount; i = i + this.columns) {
                this.$cell.eq(i).addClass('critical-right');
            }

            for (var i = this.cellAmount - this.columns; i < this.cellAmount; i++) {
                this.$cell.eq(i).addClass('critical-bottom');
            }

            for (var i = 0; i < this.cellAmount; i = i + this.columns) {
                this.$cell.eq(i).addClass('critical-left');
            }

        },
        move: {
            left: function (nextState, self) {
                if (self.$cell.eq(self.currentState).hasClass('critical-left')) {
                    self.gameOver();
                }
                self.$cell.eq(self.currentState).removeClass('head');
                self.$cell.eq(nextState).addClass('head');
                self.currentState = nextState;
            },
            up: function (nextState, self) {
                if (self.$cell.eq(self.currentState).hasClass('critical-top')) {
                    self.gameOver();
                }
                self.$cell.eq(self.currentState).removeClass('head');
                self.$cell.eq(nextState).addClass('head');
                self.currentState = nextState;
            },
            right: function (nextState, self) {
                if (self.$cell.eq(self.currentState).hasClass('critical-right')) {
                    self.gameOver();
                }
                self.$cell.eq(self.currentState).removeClass('head');
                self.$cell.eq(nextState).addClass('head');
                self.currentState = nextState;
            },
            dowm: function (nextState, self) {
                if (self.$cell.eq(self.currentState).hasClass('critical-bottom')) {
                    self.gameOver();
                }
                self.$cell.eq(self.currentState).removeClass('head');
                self.$cell.eq(nextState).addClass('head');
                self.currentState = nextState;
            }
        },
        gameOver: function () {
            $(this.$gameOver).addClass('game-over-active');
        },
        newGame: function () {
            this.$gameOver.removeClass('game-over-active');
            this.$cell.removeClass('head');
            $(document).unbind('keydown');
            this.$newGame.unbind('click');
            this.init();
        }
    };

    landing.initVar();
    landing.init();

});


