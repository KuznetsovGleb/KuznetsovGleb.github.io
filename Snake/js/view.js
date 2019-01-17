var view = {
    initVar: function () {
        this.$field = $('#field');
        this.$gameOver = $('.game-over');
        this.$newGame = $('.new-game');

        this.createField();
        this.createCriticalCells();
    },
    bindEvents: function () {

        this.$newGame.on('click', function () {
            controller.clearField();
        });

        $(document).keydown(function (e) {
            controller.eventHandler(e.keyCode);
        });
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

        this.$cell = $('.cell');

    },
    createCriticalCells: function () {

        for (let i = 0; i < this.columns; i++) {
            this.$cell.eq(i).addClass('critical-top');
        }

        for (let i = this.columns - 1; i < this.cellAmount; i = i + this.columns) {
            this.$cell.eq(i).addClass('critical-right');
        }

        for (let i = this.cellAmount - this.columns; i < this.cellAmount; i++) {
            this.$cell.eq(i).addClass('critical-bottom');
        }

        for (let i = 0; i < this.cellAmount; i = i + this.columns) {
            this.$cell.eq(i).addClass('critical-left');
        }

    },
    drawSnake: function (snakeArray) {

        var self = this;

        $.each(snakeArray, function (index) {
            self.$cell.eq(snakeArray[index]).addClass('snake');
        });
        this.$cell.eq(snakeArray[0]).addClass('head');

        this.$cell.eq(snakeArray[1]).addClass('tail');
        this.$cell.eq(snakeArray[2]).addClass('tail');
        this.$cell.eq(snakeArray[3]).addClass('tail');
    },
    drawApple: function (cellApple) {
        this.$cell.eq(cellApple).addClass('apple')
    },
    setDirection: function (keyCode, currentState, snakeArray, cellApple, drawingAppleFlag) {

        var self = this;
        var direction;
        switch (keyCode) {
            case 37:
                direction = currentState - 1;
                if (this.isCriticalZone.left(self, snakeArray)) return false;
                break;
            case 38:
                direction = currentState - this.columns;
                if (this.isCriticalZone.up(self, snakeArray)) return false;
                break;
            case 39:
                direction = currentState + 1;
                if (this.isCriticalZone.right(self, snakeArray)) return false;
                break
            case 40:
                direction = currentState + this.columns;
                if (this.isCriticalZone.down(self, snakeArray)) return false;
                break;
        }
        if (drawingAppleFlag) this.drawApple(cellApple);
        console.log(snakeArray.length);
        if (currentState === cellApple) this.eatApple(cellApple);

        this.$cell.eq(snakeArray[1]).removeClass('head');
        this.$cell.eq(snakeArray[1]).addClass('tail');

        var snakeTailEnd = snakeArray[snakeArray.length - 1]

        this.$cell.eq(snakeTailEnd).removeClass('snake tail');
        this.$cell.eq(direction).addClass('snake head');

        currentState = direction;
    },
    eatApple: function (cellApple) {
        this.eatingAppleFlag = true;
        this.$cell.eq(cellApple).removeClass('apple');
        this.$cell.eq(cellApple).addClass('snake');
        // this.setApple();
    },
    isCriticalZone: {
        left: function (self, snakeArray) {
            if (self.$cell.eq(snakeArray[0]).hasClass('critical-left') || self.$cell.eq(snakeArray[0]).hasClass('tail')) {
                self.gameOver();
                return true;
            }
        },
        up: function (self, snakeArray) {
            if (self.$cell.eq(snakeArray[0]).hasClass('critical-top') || self.$cell.eq(snakeArray[0]).hasClass('tail')) {
                self.gameOver();
                return true;
            }
        },
        right: function (self, snakeArray) {
            if (self.$cell.eq(snakeArray[0]).hasClass('critical-right') || self.$cell.eq(snakeArray[0]).hasClass('tail')) {
                self.gameOver();
                return true;
            }
        },
        down: function (self, snakeArray) {
            if (self.$cell.eq(snakeArray[0]).hasClass('critical-bottom') || self.$cell.eq(snakeArray[0]).hasClass('tail')) {
                self.gameOver();
                return true;
            }
        }
    },
    gameOver: function () {
        $(this.$gameOver).addClass('game-over-active');
    },
    isGameOver: function () {
        if (this.$gameOver.hasClass('game-over-active')) return true;
    },
    clearField: function () {
        this.$gameOver.removeClass('game-over-active');
        this.$cell.removeClass('snake apple head tail');
        $(document).unbind('keydown');
        this.$newGame.unbind('click');
    }
};
