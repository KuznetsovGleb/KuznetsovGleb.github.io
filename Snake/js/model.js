    var model = {

        setSnake: function(currentState) {

            this.currentState = currentState;
            this.snakeDirection = DEFAULT_DIRECTION;
            this.defaultKeyCode = DEFAULT_KEYCODE;
            this.interval = TIME_INTERVAL;
            this.snakePosition = [];
            this.currentScore = INITIAL_SCORES;
            this.bestScore = localStorage.getItem('best-score') || 0;

            for (currentState; currentState > this.currentState - SNAKE_LENGTH; currentState--) {
                this.snakePosition.push(currentState);
            }
            this.amountOfRepeating = this.snakePosition.length;
        },
        setApple: function(cellAmount, cell) {
            var max = cellAmount;
            var min = 0;

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            this.cellApple = getRandomInt(min, max);

            while (cell.eq(this.cellApple).hasClass(CLASS_SNAKE)) {
                this.cellApple = getRandomInt(min, max);
            }
        },
        setDirection: function(keyCode, columns, eatingAppleFlag, cellAmount, cell) {
            var direction;
            this.drawingAppleFlag = false;
            switch (keyCode) {
                case LEFT_KEYCODE:
                    direction = this.currentState - 1;
                    break;
                case UP_KEYCODE:
                    direction = this.currentState - columns;
                    break;
                case RIGHT_KEYCODE:
                    direction = this.currentState + 1;
                    break
                case DOWN_KEYCODE:
                    direction = this.currentState + columns;
                    break;
            }
            if (this.currentState === this.cellApple) this.growUp(cellAmount, cell);

            if (this.eatingAppleFlag) {

                this.amountOfRepeating--;
                if (!this.amountOfRepeating) {
                    this.snakePosition.push(this.cellApple);
                    this.eatingAppleFlag = false;
                    this.amountOfRepeating = this.snakePosition.length;
                    this.interval = this.interval - 10;
                }
            }
            this.snakePosition.pop();
            this.snakePosition.unshift(direction);
            this.currentState = direction;
        },
        growUp: function(cellAmount, cell) {
            this.eatingAppleFlag = true;
            this.currentScore++;
            this.setApple(cellAmount, cell);
            this.drawingAppleFlag = true;
        },
        changeDirection: function(keyCode) {
            switch (keyCode) {
                case LEFT_KEYCODE:
                    if (this.snakeDirection === LEFT_DIRECTION || this.snakeDirection === RIGHT_DIRECTION) return false;
                    this.snakeDirection = LEFT_DIRECTION;
                    return true;
                case UP_KEYCODE:
                    if (this.snakeDirection === UP_DIRECTION || this.snakeDirection === DOWN_DIRECTION) return false;
                    this.snakeDirection = UP_DIRECTION;
                    return true;
                case RIGHT_KEYCODE:
                    if (this.snakeDirection === RIGHT_DIRECTION || this.snakeDirection === LEFT_DIRECTION) return false;
                    this.snakeDirection = RIGHT_DIRECTION;
                    return true;
                case DOWN_KEYCODE:
                    if (this.snakeDirection === DOWN_DIRECTION || this.snakeDirection === UP_DIRECTION) return false;
                    this.snakeDirection = DOWN_DIRECTION;
                    return true;
            }
        },
        changeScores: function() {
            if (this.currentScore > this.bestScore) {
                localStorage.setItem('best-score', this.currentScore)
            }
        }
    };