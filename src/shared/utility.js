/**
 * An utility function for combining old object with a new one
 * 
 * @param {object} oldObject 
 * @param {object} updatedProperties 
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};