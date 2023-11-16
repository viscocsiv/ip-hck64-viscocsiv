

export default function formatPrice(price) {
    let IDR = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return IDR.format(price)
}