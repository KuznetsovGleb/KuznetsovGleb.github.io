var view = {
    initVar: function() {
        this.$field = $('#field');
        this.$gameOver = $('.game-over');
        this.$newGame = $('.new-game');
        this.currentScore = $('#current-score');
        this.bestScore = $('#best-score');

        this.createField();
        this.createCriticalCells();
    },
    bindEvents: function() {

        this.$newGame.on('click', function() {
            controller.clearField();
        });

        $(document).keydown(function(e) {
            controller.eventHandler(e.keyCode);
        });
    },
    createField: function() {

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
    createCriticalCells: function() {

        for (let i = 0; i < this.columns; i++) {
            this.$cell.eq(i).addClass(CLASS_CRITICAL_TOP);
        }

        for (let i = this.columns - 1; i < this.cellAmount; i = i + this.columns) {
            this.$cell.eq(i).addClass(CLASS_CRITICAL_RIGHT);
        }

        for (let i = this.cellAmount - this.columns; i < this.cellAmount; i++) {
            this.$cell.eq(i).addClass(CLASS_CRITICAL_BOTTOM);
        }

        for (let i = 0; i < this.cellAmount; i = i + this.columns) {
            this.$cell.eq(i).addClass(CLASS_CRITICAL_LEFT);
        }

    },
    drawSnake: function(snakeArray) {

        var self = this;

        $.each(snakeArray, function(index) {
            self.$cell.eq(snakeArray[index]).addClass(CLASS_SNAKE);
        });
        this.$cell.eq(snakeArray[0]).addClass(CLASS_HEAD);

        for (let i = 1; i < snakeArray.length; i++) {
            this.$cell.eq(snakeArray[i]).addClass(CLASS_TAIL);

        }
    },
    drawApple: function(cellApple) {
        this.$cell.eq(cellApple).addClass(CLASS_APPLE);
    },
    drawScores: function(score, bestScore) {
        this.currentScore.text(score);
        this.bestScore.text(bestScore);
    },
    setDirection: function(keyCode, currentState, snakeArray, cellApple, drawingAppleFlag, score) {

        var self = this;
        var direction;
        switch (keyCode) {
            case LEFT_KEYCODE:
                direction = currentState - 1;
                if (this.isCriticalZone(CLASS_CRITICAL_LEFT, self, snakeArray)) return false;
                break;
            case UP_KEYCODE:
                direction = currentState - this.columns;
                if (this.isCriticalZone(CLASS_CRITICAL_TOP, self, snakeArray)) return false;
                break;
            case RIGHT_KEYCODE:
                direction = currentState + 1;
                if (this.isCriticalZone(CLASS_CRITICAL_RIGHT, self, snakeArray)) return false;
                break
            case DOWN_KEYCODE:
                direction = currentState + this.columns;
                if (this.isCriticalZone(CLASS_CRITICAL_BOTTOM, self, snakeArray)) return false;
                break;
        }
        if (drawingAppleFlag) {
            this.drawApple(cellApple);
            this.drawScores(score);
        }
        console.log(snakeArray.length);
        if (currentState === cellApple) this.eatApple(cellApple);

        this.$cell.eq(snakeArray[1]).removeClass(CLASS_HEAD);
        this.$cell.eq(snakeArray[1]).addClass(CLASS_TAIL);

        var snakeTailEnd = snakeArray[snakeArray.length - 1]

        this.$cell.eq(snakeTailEnd).removeClass(CLASS_SNAKE + ' ' + CLASS_TAIL);
        this.$cell.eq(direction).addClass(CLASS_SNAKE + ' ' + CLASS_HEAD);

        currentState = direction;
    },
    eatApple: function(cellApple) {
        this.eatingAppleFlag = true;
        this.$cell.eq(cellApple).removeClass(CLASS_APPLE);
        this.$cell.eq(cellApple).addClass(CLASS_SNAKE);
    },
    isCriticalZone: function(sideOfField, self, snakeArray) {
        if (self.$cell.eq(snakeArray[0]).hasClass(sideOfField) || self.$cell.eq(snakeArray[0]).hasClass(CLASS_TAIL)) {
            self.gameOver();
            return true;
        }
    },
    gameOver: function() {
        $(this.$gameOver).addClass('game-over-active');
    },
    isGameOver: function() {
        return (this.$gameOver.hasClass('game-over-active'));
    },
    clearField: function() {
        this.$gameOver.removeClass('game-over-active');
        this.$cell.removeClass(CLASS_SNAKE + ' ' + CLASS_APPLE + ' ' + CLASS_HEAD + ' ' + CLASS_TAIL);
        $(document).unbind('keydown');
        this.$newGame.unbind('click');
    }
};