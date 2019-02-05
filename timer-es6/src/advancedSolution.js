export function advancedFunction(start, end, delay) {

    if (start > end) {
        for (let i = start; i >= end; i--) {

            let timer = setTimeout(function kek() {
                console.log('let i = ', i);
            }, delay * (start - i + 1));

        }
        return false;
    }

    for (let i = start; i <= end; i++) {

        let timer = setTimeout(function kek() {
            console.log('let i = ', i);
        }, delay * i);

    }

}