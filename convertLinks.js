var your_sheet_id = '';
var your_sheet_name = 'Sheet1';

var ss = SpreadsheetApp.openById(your_sheet_Id);
var report = ss.getSheetByName(your_sheet_name);

function convertLinks() {
    var header = Array.from(report.getRange(1, 1, 1, report.getLastColumn()).getValues())[0];
    var rows = report.getLastRow();

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
    var cols_with_links = header.map((i,n,r) => { //i == the current value on the iteration. n an the index, r == the full array/header
        var links = Array.rom(report.getRange(1, (n+1),rows, 1) .getRichTextValues()).map(row=> [row[0].getLinkUrl()]);
        links.shift();
        var head = [[('url_'+1)]];
        var new_col = [...head,...links];
        return {
            has_links: links.some(v=> v[0]), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
            new_col: new_col
        }
    }).filter(r=> r.has_links);
    
    cols_with_links.forEach(col=> {
        report.getRange(1, report.getLastColumn()+1, col.new_col.length, 1).setValues(col.new_col);
    })
