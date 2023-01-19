document.addEventListener('DOMContentLoaded', function () {
    fetch("js/descs.json").then(res => {
        return res.json()
    }).then(data => console.log(data))
    function build(elem) {
        let type = elem.id;
    }

});