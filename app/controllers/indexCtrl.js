/**

 */
var MCBusiness = require('../business/medicalConsumablesBusiness')();
module.exports = {

    query: function (req, res) {
        res.render('../views/index', {
            act: '1'
        });
    },


    //首页模糊搜索
    search: function (req, res) {
        var searchTxt = req.query.term;
        MCBusiness.getMCByMcName_A(searchTxt, function (data) {
            res.json(data);

        })
    },
    //搜索结果
    searchResult: function (req, res) {
        var searchTxt = req.query.searchTxt ? req.query.searchTxt : "";
        var page = req.query.page ? req.query.page : 1;
        MCBusiness.getMCByMcName_J(searchTxt, page, function (jsonResult) {
            // console.log(jsonResult);
            res.render('../views/searchResult', {
                items: jsonResult.rows,
                total: jsonResult.total,
                act: '1',
            });
        })
    },
    //详情
    detail: function (req, res) {
        var id = req.query.id;
        MCBusiness.getMCById(id, function (data) {
            //console.log(data);
            res.render('../views/detail', {
                data: data,
                act: '1'
            });
        })
    }
};