$(function () {

    var snake = {

        init: function () {
            this.setSnake();
            this.setApple();
            this.setDirection(this.snakeDirection, 39);
            this.bindEvents();
        },
        initVar: function () {
            this.$field = $('#field');
            this.$gameOver = $('.game-over');
            this.$newGame = $('.new-game');
            this.delay = 250;

            this.createField();

            this.$cell = $('.cell');

            this.createCriticalCells();
        },
        bindEvents: function () {


            var self = this;
            this.snakeDirection = 'right';

            this.$newGame.on('click', function () {
                self.newGame();
            })

            $(document).keydown(function (e) {

                switch (e.keyCode) {
                    case 37:
                        if (self.snakeDirection === 'left' || self.snakeDirection === 'right') break;
                        self.snakeDirection = 'left';
                        clearTimeout(self.innerTimer);
                        self.setDirection(self.currentState - 1, e.keyCode);
                        break;
                    case 38:
                        if (self.snakeDirection === 'up' || self.snakeDirection === 'down') break;
                        self.snakeDirection = 'up';
                        clearTimeout(self.innerTimer);
                        self.setDirection(self.currentState - self.columns, e.keyCode);
                        break;
                    case 39:
                        if (self.snakeDirection === 'right' || self.snakeDirection === 'left') break;
                        self.snakeDirection = 'right';
                        clearTimeout(self.innerTimer);
                        self.setDirection(self.currentState + 1, e.keyCode);
                        break;
                    case 40:
                        if (self.snakeDirection === 'down' || self.snakeDirection === 'up') break;
                        self.snakeDirection = 'down';
                        clearTimeout(self.innerTimer);
                        self.setDirection(self.currentState + self.columns, e.keyCode);
                        break;
                    case 13:
                    case 32:
                        if (self.$gameOver.hasClass('game-over-active')) self.newGame();
                        break;
                }

            });
        },
        setSnake: function () {

            var self = this;
            this.currentState = 485;
            // this.$cell.eq(this.currentState).addClass('head');
            /* ПРОБНЫЙ ВАРИАНТ ХВОСТА */
            this.snakePosition = []
            this.snakePosition.push(this.currentState, this.currentState - 1, this.currentState - 2, this.currentState - 3);
            // this.tail = this.currentState - 1;
            $.each(this.snakePosition, function (index) {
                self.$cell.eq(self.snakePosition[index]).addClass('snake');
            });
            this.$cell.eq(self.snakePosition[0]).addClass('head');

            this.$cell.eq(this.snakePosition[1]).addClass('tail');
            this.$cell.eq(this.snakePosition[2]).addClass('tail');
            this.$cell.eq(this.snakePosition[3]).addClass('tail');

        },
        setApple: function () {
            var max = this.cellAmount;
            var min = 0;

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            this.cellApple = getRandomInt(min, max);
            // this.cellApple = 487;

            while ( this.$cell.eq(this.cellApple).hasClass('snake') ) {
                this.cellApple = getRandomInt(min, max);
            }

            this.$cell.eq(this.cellApple).addClass('apple')
        },
        // setDefaultDirection: function () {
        //
        //     var self = this;
        //
        //     this.snakeDirection = 'right';
        //
        //     this.amountOfRepeating = self.snakePosition.length;
        //
        //     (function func() {
        //
        //         if ( self.isCriticalZone.right(self) ) return false;
        //
        //         self.$cell.eq(self.snakePosition[1]).removeClass('head');
        //         var snakeTailEnd = self.snakePosition.pop();
        //         // self.$cell.eq(snakeHead).addClass('head');
        //         self.snakePosition.unshift(self.currentState+1);
        //
        //         self.$cell.eq(snakeTailEnd).removeClass('snake');
        //         self.$cell.eq(self.snakePosition[0]).addClass('snake head');
        //
        //         self.currentState++;
        //         self.innerTimer = setTimeout(func, 500)
        //     })()
        // },
        setDirection: function (direction, keyCode) {

            var self = this;
            this.amountOfRepeating = self.snakePosition.length;

            (function func() {
                switch (keyCode) {
                    case 37:
                        direction = self.currentState - 1;
                        if ( self.isCriticalZone.left(self) ) return false;
                        break;
                    case 38:
                        direction = self.currentState - self.columns;
                        if ( self.isCriticalZone.up(self) ) return false;
                        break;
                    case 39:
                        direction = self.currentState + 1;
                        if ( self.isCriticalZone.right(self) ) return false;
                        break
                    case 40:
                        direction = self.currentState + self.columns;
                        if ( self.isCriticalZone.down(self) ) return false;
                        break;
                }

                console.log(self.snakePosition.length);
                if (self.currentState === self.cellApple) self.eatApple();

                if (self.eatingAppleFlag) {

                    self.amountOfRepeating--;

                    if (!self.amountOfRepeating) {
                        self.snakePosition.push(self.cellApple);
                        self.eatingAppleFlag = false;
                        self.amountOfRepeating = self.snakePosition.length;
                        self.delay = self.delay - 10;
                    }
                }

                self.$cell.eq(self.snakePosition[1]).removeClass('head');
                self.$cell.eq(self.snakePosition[1]).addClass('tail');
                var snakeTailEnd = self.snakePosition.pop();
                self.snakePosition.unshift(direction);

                self.$cell.eq(snakeTailEnd).removeClass('snake tail');
                self.$cell.eq(self.snakePosition[0]).addClass('snake head');


                self.currentState = direction;
                self.innerTimer = setTimeout(func, self.delay);
            })()
        },
        eatApple: function () {
            this.eatingAppleFlag = true;
            this.$cell.eq(this.cellApple).removeClass('apple');
            this.$cell.eq(this.cellApple).addClass('snake');
            this.setApple();
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
        isCriticalZone: {
            left: function (self) {
                if ( self.$cell.eq(self.snakePosition[0]).hasClass('critical-left') || self.$cell.eq(self.snakePosition[0]).hasClass('tail') ) {
                    self.gameOver();
                    return true;
                }
            },
            up: function (self) {
                if ( self.$cell.eq(self.snakePosition[0]).hasClass('critical-top') || self.$cell.eq(self.snakePosition[0]).hasClass('tail') ) {
                    self.gameOver();
                    return true;
                }
            },
            right: function (self) {
                if (self.$cell.eq(self.snakePosition[0]).hasClass('critical-right') || self.$cell.eq(self.snakePosition[0]).hasClass('tail') ) {
                    self.gameOver();
                    return true;
                }
            },
            down: function (self) {
                if (self.$cell.eq(self.snakePosition[0]).hasClass('critical-bottom') || self.$cell.eq(self.snakePosition[0]).hasClass('tail') ) {
                    self.gameOver();
                    return true;
                }
            }
        },
        gameOver: function () {
            $(this.$gameOver).addClass('game-over-active');
            this.eatingAppleFlag = false;
            clearTimeout(this.innerTimer);
        },
        newGame: function () {
            this.$gameOver.removeClass('game-over-active');
            this.$cell.removeClass('snake apple tail head');
            $(document).unbind('keydown');
            this.$newGame.unbind('click');
            this.delay = 250;
            this.init();
        }
    };

    snake.initVar();
    snake.init();

});


