module.exports = function() {
    //returns current date
    let d = new Date();
    let currentDate;
    d.setDate(d.getDate())
    currentDate= d.toLocaleDateString()
    return currentDate;
}