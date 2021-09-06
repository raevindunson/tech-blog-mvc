module.exports = {
    dateFormat: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    pluralFormat: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
}