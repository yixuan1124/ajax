window._ = {
    get: function (url, config, callback) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(JSON.parse(xhr.responseText), null);
                } else {
                    callback(null, xhr.status);
                }
            }
        }
        xhr.open("get", url + "?" + _.jsontourl(config), null);
        xhr.send(null);
    },
    post: function (url, config, callback) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(JSON.parse(xhr.responseText), null);
                } else {
                    callback(null, xhr.status);
                }
            }
        }
        xhr.open("post", url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(_.jsontourl(config));
    },
    jsontourl: function (obj) {
        var res = [];
        for (k in obj) {
            res.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
        }
        return res.join("&");
    },
    formtojson: function (formobj) {
        var json = {};
        for (var i = 0; i < formobj.elements.length; i++) {
            var item = formobj.elements[i];
            console.log(item.value);
            // console.log(json[item.name]);
            switch(item.type){
                case undefined:
                case 'button':
                case 'file':
                case 'reset':
                case 'submit':
                    break;
                case 'checkbox':
                case 'radio':
                    if(!item.checked){
                        break;
                    }
                default:
                    if(json[item.name]){
                        json[item.name] = json[item.name]+","+item.value;
                    }else{
                        json[item.name] = item.value;
                    }
                    break;
            }
        }
        return json;
    }
}