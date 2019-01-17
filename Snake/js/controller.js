var controller = {
    init: function () {
        view.initVar();
        this.newGame()
    },
    newGame: function () {
        view.bindEvents();
        model.setSnake(485);
        view.drawSnake(model.snakePosition);
        model.setApple(view.cellAmount, view.$cell);
        view.drawApple(model.cellApple);
        this.moveSnake(model.defaultKeyCode);
    },
    moveSnake: function (keyCode) {
        var self = this;
        (function repeatStep() {
            view.setDirection(keyCode, model.currentState, model.snakePosition, model.cellApple, model.drawingAppleFlag);
            model.setDirection(keyCode, view.columns, view.eatingAppleFlag, view.cellAmount, view.$cell);
            self.innerTimer = setTimeout(repeatStep, model.interval);
        })();
    },
    eventHandler: function (keyCode) {
        switch (keyCode) {
            case 13:
            case 32:
                if (view.isGameOver) this.clearField();
                return false;
        }
        this.changeDirection(keyCode);
    },
    changeDirection: function (keyCode) {
        if (!model.changeDirection(keyCode)) {
            return false;
        }
        clearTimeout(this.innerTimer);
        this.moveSnake(keyCode);
    },
    clearField: function () {
        view.clearField();
        clearTimeout(this.innerTimer);
        this.newGame();
    }
};


controller.init();
