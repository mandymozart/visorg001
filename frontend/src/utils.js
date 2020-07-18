export const stripHtml = (html) => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export const convertToPlainText = (prismicText) => {
    let result = '';
    prismicText.map((p) => {
        result = result + stripHtml(p.text) + `\n\n`
        return true
    })
    return result;
}