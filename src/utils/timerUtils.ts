// Constants to represent time units in milliseconds
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;

/**
 * getTime(elapsedTime: number)
 * 
 * Converts the elapsed time in milleseconds to the format mm:ss.
 * 
 * @param elapsedTime - The elapsed time in milliseconds.
 * @returns {string} - The elapsed time in the format mm:ss.
 */
export default function getTime(elapsedTime: number) {
    return `${getMinutes(elapsedTime)}:${getSeconds(elapsedTime)}`;
}

/**
 * getMinutes(elapsedTime: number)
 * 
 * Calculate the number of minutes elapsed based on elapsedTime.
 * 
 * @param elapsedTime - The elapsed time in milliseconds.
 * @returns {string} - The total number of minutes elapsed.
 */
function getMinutes(elapsedTime: number): string {
    return padZero(Math.floor((elapsedTime / MS_PER_MINUTE)));
}

/**
 * getSeconds(elapsedTime: number)
 * 
 * Calculate the number of seconds elapsed based on elapsedTime.
 * 
 * @param elapsedTime - The elapsed time in milliseconds.
 * @returns {string} - The extra seconds elapsed beyond the total numbers of minutes elapsed.
 */
function getSeconds(elapsedTime: number): string {
    return padZero(Math.floor((elapsedTime % MS_PER_MINUTE) / MS_PER_SECOND));
}

/**
 * padZero(time: number)
 * 
 * Pads a single-digit number with a zero.
 * 
 * @param {number} time - The time to pad.
 * @returns {string} - The padded time.
 */
function padZero(time: number): string {
    return String(time).padStart(2, '0');
}