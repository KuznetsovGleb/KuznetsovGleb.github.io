var controller = {
    init: function() {
        view.initVar();
        this.newGame()
    },
    newGame: function() {
        view.bindEvents();
        model.setSnake(DEFAULT_POSITION);
        view.drawScores(INITIAL_SCORES, model.bestScore);
        view.drawSnake(model.snakePosition);
        model.setApple(view.cellAmount, view.$cell);
        view.drawApple(model.cellApple);
        this.moveSnake(model.defaultKeyCode);
    },
    moveSnake: function(keyCode) {
        var self = this;
        (function repeatStep() {
            view.setDirection(keyCode, model.currentState, model.snakePosition, model.cellApple, model.drawingAppleFlag, model.currentScore);
            model.setDirection(keyCode, view.columns, view.eatingAppleFlag, view.cellAmount, view.$cell);
            self.innerTimer = setTimeout(repeatStep, model.interval);
        })();
    },
    eventHandler: function(keyCode) {
        switch (keyCode) {
            case SPACE_KEYCODE:
            case ENTER_KEYCODE:
                if (view.isGameOver()) {
                    this.clearField();
                }
                return false;
        }
        this.changeDirection(keyCode);
    },
    changeDirection: function(keyCode) {
        if (!model.changeDirection(keyCode)) {
            return false;
        }
        clearTimeout(this.innerTimer);
        this.moveSnake(keyCode);
    },
    clearField: function() {
        model.changeScores();
        view.clearField();
        clearTimeout(this.innerTimer);
        this.newGame();
    }
};

controller.init();