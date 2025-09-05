function getDataTableConfiguration(url, columns, pageLength, callback, columDefsUser = null) {
    if (!columDefsUser) {
        columDefsUser = [
            {
                orderable: false,
                targets: "no-sort"
            },
            {
                className: "dt-width",
                targets: [0, 1, 2, 3, 4, 5, 6]
            },
            {
                className: "dt-width-action",
                targets: [7]
            },
            {
                className: "dt-center",
                targets: "_all"
            }
        ];
    }

    var obj = {
        paging: true,
        ordering: false,
        searching: false,
        Processing: true,
        serverSide: true,
        paginate: true,
        pageLength: pageLength,
        autoWidth: false,
        columnDefs: columDefsUser,
        lengthChange: false,
        ajax: {
            url: url,
            type: 'POST'
        },
        columns: columns,

        createdRow: function (row) {
            $(row).addClass('c-table__row');
        },
        language: {
            url: ruta + '/Scripts/jquery.dataTables-language/Spanish.json'
        }
    };

    if (callback != null) {
        obj.ajax.data = callback;
    }


    return obj;
};

function fillDropdown($select, url, callback = null) {
    $select.empty();

    $select.append('<option value="">--SELECCIONE UNA OPCION--</option>');

    $.ajax({
        url: url
    }).then(function (options) {
        options.map(function(option) {
            var $option = $('<option>');

            $option
                .val(option[$select.attr('data-valueKey')])
                .text(option[$select.attr('data-displayKey')]);

            $select.append($option);
        });
        if (callback != null) {
            callback();
        }

        
    });
}

function byteArrayContentToBase64(str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "", i = 0, len = str.length, c1, c2, c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}

function createAnchor(type, href, text) {
    var anchor = document.createElement('a');
    anchor.innerText = text;

    switch (type.toLowerCase()) {
        case 'email':
            anchor.href = 'mailto:' + href;
            break;
        case 'phone':
            anchor.href = 'tel:' + href;
            break;
        case 'url':
        default:
            anchor.href = href;
    }

    return anchor;
}