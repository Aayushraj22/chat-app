function Search() {
    let searchedText = '';

    function updateSearchedValue(text) {
        searchedText = text;
    }

    function getSearchedValue() {
        return searchedText;
    }

    return { getSearchedValue, updateSearchedValue };
}




export {Search}