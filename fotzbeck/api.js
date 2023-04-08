APIURL = "https://fotzbeckapi-2-l1955998.deta.app/"

function api_post(id, level, name, callback) {
    var xhr = new XMLHttpRequest();
    var url = APIURL;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            callback(json);
        }
    };
    var data = JSON.stringify(
        {
            "_id": id,
            "level": level,
            "name": name
        }
        );
    xhr.send(data);
}

function api_get(callback) {
    var xhr = new XMLHttpRequest();
    var url = APIURL + "/maketop10/";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            callback(json);
        }
    };
    xhr.send();    
}

