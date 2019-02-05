export function simpleFunction(start, end, delay) {

    if (start > end) {

        for (var i = start; i >= end; i--) {

            function kek(i) {
                console.log('var i = ', i);
            }

            var timer = setTimeout(kek, delay * (start - i + 1), i);
        }
        return false;

    }
    for (var i = start; i <= end; i++) {

        function kek(i) {
            // body...
            console.log('var i = ', i);
        }

        var timer = setTimeout(kek, delay * i, i);
    }
}