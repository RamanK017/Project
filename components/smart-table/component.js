angular.module('ngTable').component('customTable', {
    templateUrl: 'components/smart-table/template.html',
    transclude: {
        topCorner: 'topCorner',
        rowCorner: 'rowCorner'
    },
    bindings: {
        tabledata: '<',
        tableinformation: '&',
        pagecount: '@',
        searchinput: '&',
        tablerowid: '&',
        tableheader: '&'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'


});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);
// headervalue is a function which passed the respective header 
    customTableCtrl.headervalue = function(header) {

        customTableCtrl.tableheader({ 'key': header });// calling the parent tableheader() function by passing the header of table 
    }
// searchopentab is a function that will hide the main toolbar
    customTableCtrl.serchopentab = function() {
        customTableCtrl.options.Search = true;
        customTableCtrl.options.rowSelection = false;
    }
    customTableCtrl.options = {
        rowSelection: false,
        pageSelect: true,
        Search: false,
        deletenavbar:true,
    };

    customTableCtrl.selected = [];

    customTableCtrl.query = {
        order: 'name',
        limit: 5,
        page: 1
    };
// tablerow is a function passing the respective id of a particular row 
    customTableCtrl.tablerow = function(tableobj) {
        customTableCtrl.deletenavbar=true;
        customTableCtrl.options.rowSelection = true;
        console.log(tableobj._id);
        customTableCtrl.id = tableobj._id;
    }
 //   seclectedRowId is a function passing the respective id of a particular row 
    customTableCtrl.seclectedRowId = function() {

        customTableCtrl.tablerowid({ 'id': customTableCtrl.id });
    }

//tableinformation is user for first time loading the table data
    customTableCtrl.tableinformation({ "pageno": 0, 'pagelimit': 5 });
    customTableCtrl.onPaginate = function(pageno, pagelimit) {
//onPaginate is a function that iterate on the no of pages as well as calling the parent tableinformation function  
        customTableCtrl.tableinformation({ "pageno": pageno, 'pagelimit': pagelimit });

    }



}
