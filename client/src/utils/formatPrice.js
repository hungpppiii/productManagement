export default function formatPrice(price) {
    let result = 'đ';
    let dot = '';
    while (price / 1000 >= 1) {
        let temp = price % 1000;
        let add = '';
        if (temp / 10 < 1) {
            add = '00';
        } else if (temp / 100 < 1) {
            add = '0';
        }
        result = add + temp + dot + result;
        price -= temp;
        price /= 1000;
        if (dot === '') dot = '.';
    }

    return price + dot + result;
}