module.exports = {
    format_date: (date) => {

        const dateData = new Date(date);
        
        // Format date as MM/DD/YYYY
        return dateData.toLocaleDateString();
    }
};