var comments = [];

function showComents() {
    let htmlContentToAppend = "";
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];

        htmlContentToAppend += `
            <div class="row">
                <div class="col">
                    <div style="margin-bottom: 20px;">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${ comment.user } </h5>
                            <small class="text-muted"> ${ comment.score } Puntuacion</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                            <small class="mb-1">Fecha: ${ comment.dateTime } </small>
                        </div>
                        <p class="mb-1"> ${ comment.description }</p>
                    </div>
                </div>
            </div>        
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById('btn-show-comments').addEventListener('click', function(e) {
        e.preventDefault();
        if (document.getElementById('comments').style.display == 'none') {
            document.getElementById('comments').style.display = 'block';
        } else {
            document.getElementById('comments').style.display = 'none';
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComents(comments);
        }
    });
    document.getElementById("public").addEventListener('click', function(e) {

        let textComent = document.getElementById("edit-comment").value;
        let fecha = new Date();
        let user = localStorage.getItem('email');
        let obcomment = { score: "3", description: textComent, user: user, dateTime: fecha };
        comments.push(obcomment);
        showComents(comments);
        document.getElementById("edit-comment").value = "";
    })

});