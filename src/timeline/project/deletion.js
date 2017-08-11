/*Javascript file that contains functions to delete a timeline*/

function deleteTimeline() {
    var file = document.getElementById('timeline').children;
    var id = [];
    for(var i= 0; i< file.length;i++){
        var idSvg = file[i].id;
        /*The contents are stored in a folder name csv, and hence the ID would be "svg./csv/filename"*/
        /*If the files are stored elsewhere, the pattern needs to be changed*/
        /*ID - "svg" + "./csv/" + "filename"*/
/*
        Where, svg is the tagName
            ./csv/ - file path (replace if different)
            filename - the filename
*/
        var res = idSvg.split("/");
        var pos = res.length - 1;
        if(res[pos] !== "buttonSvg"){
            id.push(res[pos]);
        }
    }
    return id;
}

function removeTimeline(domElement, idSvg) {
    var start = idSvg.substring(0, idSvg.indexOf("."));
    var rest = idSvg.substring(idSvg.indexOf("."), idSvg.length);
    var id = "#" + start + "\\\\" + rest;
    var svg = d3.select(id).remove();
}
