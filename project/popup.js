$(document).ready(function () {
    $("#closeAdd").click(function () {
        $("#popupAdd").hide(700);
    });

    $("#closeSub").click(function () {
        $("#popupSub").hide(700);
    });

    $.get("./csv/filenames.csv", function (data) {
        var options = data;
        var newData = $.csv.toObjects(options);
        var select = document.getElementById('timelineDataAdd');
        for (var i = 0; i < newData.length; i++)
            select.options[i] = new Option(newData[i].content, newData[i].content);
    });
});

function createDialog(title) {

    if (title === 'add') {
        $('#popupAdd').show('700');

    }

    if (title === 'sub') {
        $('#popupSub').show('700');
    }
}