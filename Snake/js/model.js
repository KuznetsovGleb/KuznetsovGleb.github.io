    var model = {

        setSnake: function (currentState) {

            this.currentState = currentState;
            this.snakeDirection = 'right';
            this.defaultKeyCode = 39;
            this.interval = 250;
            this.snakePosition = [];
            for ( currentState; currentState > this.currentState - 4; currentState-- ) {
                this.snakePosition.push(currentState);
            }
            this.amountOfRepeating = this.snakePosition.length;
        },
        setApple: function (cellAmount, cell) {
            var max = cellAmount;
            var min = 0;

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            this.cellApple = getRandomInt(min, max);

            while ( cell.eq(this.cellApple).hasClass('snake') ) {
                this.cellApple = getRandomInt(min, max);
            }
        },
        setDirection: function (keyCode, columns, eatingAppleFlag, cellAmount, cell) {
            var direction;
            this.drawingAppleFlag = false;
            switch (keyCode) {
                case 37:
                    direction = this.currentState - 1;
                    // if ( self.isCriticalZone.left(self) ) return false;
                    break;
                case 38:
                    direction = this.currentState - columns;
                    // if ( self.isCriticalZone.up(self) ) return false;
                    break;
                case 39:
                    direction = this.currentState + 1;
                    // if ( self.isCriticalZone.right(self) ) return false;
                    break
                case 40:
                    direction = this.currentState + columns;
                    // if ( self.isCriticalZone.down(self) ) return false;
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
        growUp: function (cellAmount, cell) {
            this.eatingAppleFlag = true;
            this.setApple(cellAmount, cell);
            this.drawingAppleFlag = true;
        },
        changeDirection: function (keyCode) {
            switch (keyCode) {
                case 37:
                    if (this.snakeDirection === 'left' || this.snakeDirection === 'right') return false;
                    this.snakeDirection = 'left';
                    return true;
                case 38:
                    if (this.snakeDirection === 'up' || this.snakeDirection === 'down') return false;
                    this.snakeDirection = 'up';
                    return true;
                case 39:
                    if (this.snakeDirection === 'right' || this.snakeDirection === 'left') return false;
                    this.snakeDirection = 'right';
                    return true;
                case 40:
                    if (this.snakeDirection === 'down' || this.snakeDirection === 'up') return false;
                    this.snakeDirection = 'down';
                    return true;
            }
        }
    };
