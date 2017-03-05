/**
 * Created by bstanislawski on 2016-07-28.
 */
import _difference from 'lodash/array/difference';
import _keys from 'lodash/object/keys';

export function getIdString(id) {
    if (id) {
        id = id.replace('#', '@');
    }
    return id;
}

export function restoreBackendIdString(id) {
    if (id) {
        id = id.replace('@', '#');
    }
    return id;
}

export function getIdWithoutDots(id) {
    if (id) {
        id = id.replace(/\./g, '-');
    }
    return id;
}

export function getSidebarElementId(id) {
    return 'a';
}

export function getWithoutWhitespaces(id) {
    return id.split(' ').join('_');
}

export function getHtmlId(id) {
    return 'a';
}

/**
 * @param {String} string
 * @returns {String}
 */
export function removeAtChar(string) {
    return string.replace('@', '');
}

/**
 * @param {*} num
 * @return {boolean}
 */
export function isNumeric(num) {
    return !isNaN(num);
}

/**
 * @return {number}
 */
export function getTimestamp() {
    return new Date().getTime();
}

/**
 * Method to get the fields from object1 which does not appears in the object2
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Array}
 */
export function objectsDiffModel(obj1, obj2) {
    return 'as';
}

/**
 * Method to format Date to 'YEAR-MONTH-DAY TIME'
 *
 * @param {Date} date
 * @return {string}
 */
export function formatDate(date) {
    let time = getTime(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day} ${time}`;
}

/**
 * Method to get time from Date
 *
 * @param {Date} date
 * @return {string}
 */
export function getTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

/**
 * Scroll page to the top
 */
export function scrollPageToTop() {
    if (!global.testEnviroment) {
        $('html, body').animate({scrollTop: 0}, 'slow');
    }
}

/**
 * Method to remove element from given array
 *
 * @param {Array} array
 * @param {*} element
 */
export function removeFromArray(array, element) {
    let index = array.indexOf(element);

    if (index > -1) {
        array.splice(index, 1);
    }
}
