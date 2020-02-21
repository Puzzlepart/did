
/**
 * Find project match in title/subject/categories
 * 
 * @param {*} regex 
 * @param {*} input 
 */
function searchString(regex, input) {
    let matches = [];
    let match;
    while ((match = regex.exec(input)) != null) matches.push(match.groups);
    return matches;
}