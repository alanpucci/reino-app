import * as moment from 'moment-timezone';

export const TIMEZONE_AR_BSAS = 'America/Argentina/Buenos_Aires';
export const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';
export const DATE_FORMAT_DD_MM_YYYY_WITH_SLASH = 'DD/MM/YYYY';
export const DATE_FORMAT_DD_MM_YYYY_WITH_TIME = 'DD/MM/YYYY HH:mm';

export const getToday = () => {
    return new Date();
}

export const getDate = (milliseconds) => {
    return (milliseconds) ? new Date(milliseconds) : getToday();
}

export const getDateFromString = (dateAsString, aFormat) => {
    try {
        aFormat = (aFormat) ? aFormat : DATE_FORMAT_YYYY_MM_DD;
        return moment(dateAsString, aFormat, true).toDate();
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const isExpiredTime = (time) => {
    return Math.floor(Date.now() / 1000) > time;
}

export const format = (aDate, aFormat) => {
    try {
        aFormat = (aFormat) ? aFormat : DATE_FORMAT_YYYY_MM_DD;
        return moment.tz(aDate, TIMEZONE_AR_BSAS).format(aFormat);
    } catch (error) {
        console.error(error);
    }
    return '';
}

export const isValidDate = (dateAsString, aFormat) => {
    try {
        aFormat = (aFormat) ? aFormat : DATE_FORMAT_YYYY_MM_DD;
        const date = moment(dateAsString, aFormat, true);
        return date.isValid();
    } catch (error) {
        console.error(error);
    }
    return false;
} 

export const isMinorDate = (aDate, otherDate) => {
    try {
        return aDate.getTime() < otherDate.getTime();
    } catch (error) {
        console.error(error);
    }
    return false;
}

export const isMajorDate = (aDate, otherDate) => {
    try {
        return aDate.getTime() > otherDate.getTime();
    } catch (error) {
        console.error(error);
    }
    return false;
}

export const areEqualsDates = (aDate, otherDate) => {
    try {
        return aDate.getTime() === otherDate.getTime();
    } catch (error) {
        console.error(error);
    }
    return false;
}

export const formatDateAttribute = (data) => {
    data.forEach(procedure => {
        procedure.creationDate = format(procedure.creationDate, DATE_FORMAT_DD_MM_YYYY_WITH_TIME)
        if (procedure.date)
            procedure.date = format(procedure.date, DATE_FORMAT_DD_MM_YYYY_WITH_TIME)
    })
    return data
}