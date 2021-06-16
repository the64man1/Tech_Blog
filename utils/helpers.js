module.exports = {
    format_date: (date) => {
        const dateData = new Date(date);
        return dateData.toLocaleDateString();
    }
};