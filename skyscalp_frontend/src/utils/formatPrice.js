const formatPrice = price => {
    let formattedNumber = parseInt(price).toLocaleString('en-US').replace(/,/g, ' ');
    return formattedNumber
}

export { formatPrice }