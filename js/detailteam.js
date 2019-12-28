document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("delete");
    btnDelete.style.display = 'none';
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        btnDelete.style.display = 'block';
        // ambil artikel lalu tampilkan
        getSavedTeamsById();
        var item = getSavedTeamsById();

    } else {
        var item = getTeamsById();
    }
    btnSave.onclick = function () {
        console.log("Tombol FAB di klik.");
        item.then(function (article) {
            saveForLater(article);
        });
        M.toast({
            html: 'Data Berhasil disimpan'
        })
    };
    btnDelete.onclick = function () {
        console.log("Tombol FAB di klik.");
        item.then(function (article) {
            deleteForLater(article);
        });

        M.toast({
            html: 'Data Berhasil dihapus'
        })
    };
});