import moment from 'moment'

export const createHolidayID = (event) => {
    const name = event.title.split(" ").join("_");
    return `${name}_${event.date ? event.date : ""}_${event.division}`
}

export const formatDate = (date) => {
    const jsDate = new Date(date);
    return moment(jsDate).format("MMM DD YYYY");  
}