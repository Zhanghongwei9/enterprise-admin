var _download = {
    downLoadXls(data, filename) {
        var blob = new Blob([data], {type: 'application/vnd.ms-excel'})
        if (typeof window.chrome !== 'undefined') {
            // Chrome version
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(data);
            link.download = filename;
            link.click();
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE version
            // var blob = new Blob([data], { type: 'application/force-download' });
            window.navigator.msSaveBlob(blob, filename);
        } else {
            // Firefox version
            var file = new File([data], filename, { type: 'application/force-download' });
            window.open(URL.createObjectURL(file));
        }
    }
}

export default _download