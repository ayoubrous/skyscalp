const sendResponse = require("../utils/sendResponse")
const ArticlesModal = require("../modal/Articles")


const addArticle = async (req, res) => {
    try {
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }
        // console.log(req.body)
        let article = new ArticlesModal(req.body)
        let result = await article.save()
        if (result) {
            sendResponse(req, res, true, "Article published successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error creating Article, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const updateArticle = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        if (!req.body) {
            sendResponse(req, res, false, "Data not found", null)
        }

        // let property = new ArticlesModal(req.body)
        let response = await ArticlesModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "Article updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating Article, try again", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

const getArticles = async (req, res) => {

    try {

        let response = await ArticlesModal.find()
            .sort({ order: 1 }) // or -1 for decresing order

        if (response.length > 0) {
            sendResponse(req, res, true, "Articles found successfully", response);
        } else {
            sendResponse(req, res, false, "No Articles found", null);
        }
    } catch (err) {
        console.log(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getSingleArticle = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ArticlesModal.findOne({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Article found successfully", result)
        }
        else {
            sendResponse(req, res, false, "No Article found", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}


const deleteArticle = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            sendResponse(req, res, false, "ID not found", null)
        }
        let result = await ArticlesModal.findOneAndDelete({ _id: id })
        if (result) {
            sendResponse(req, res, true, "Article deleted successfully", result)
        }
        else {
            sendResponse(req, res, false, "Error deleting Article ", null)
        }

    }
    catch (err) {
        sendResponse(req, res, false, "Error proceeding your request, try again", null)
        console.log(err)
    }
}

module.exports = {
   addArticle,
   getArticles,
   getSingleArticle,
   updateArticle,
   deleteArticle
}