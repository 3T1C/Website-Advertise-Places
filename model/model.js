exports.create = function (datasource) {
    return {
        authenticate : function (username, password, callback){
            datasource.loadAccount (function (account){
                var success = account.username == username && account.password == password
                callback(success)
            })
        },
        getGeneralInfo : datasource.loadGeneralInfo,
        editGeneralInfo : function (info, featureImageTmpPath, callback) {
            if(info.companyNameShort == ''){
                callback('Company name short cannot be empty')
                return
            }
            if(info.companyNameLong == ''){
                callback('Company name long cannot be empty')
                return
            }
            datasource.saveGeneralInfo(info, featureImageTmpPath, function (err) {
                if(err){
                    callback('Could not save general info')
                    return
                }
                callback(false)
            })
            
        },
        getContact : datasource.loadContact,
        editContact : function(text, callback){
            if(text.trim() == ''){
                callback('Contact text cannot be empty')
                return
            }
            datasource.saveContact(text, function(err){
                if(err){
                    callback('Could not save Contact text')
                    return
                }
                callback(false)
            })
        },
        getProducts : datasource.loadProducts,
        addProduct : function(editProductId, name, imageTmpPath, callback){
            if(name == ''){
                callback('Product name cannot empty')
                return
            }
            if(editProductId == 0 && imageTmpPath == ''){
                callback('Product image cannot be empty')
                return
            }
            datasource.addProduct(editProductId, name, imageTmpPath, function(err){
                if(err){
                    callback('Could not add the product')
                    return
                }
                callback(false)
            })
        },
        getProduct : datasource.loadSingleProduct,
        //===
        deleteProduct : datasource.deleteProduct,

        getAbouts : datasource.loadAbouts,
        addAbout : function(editProductId, name, imageTmpPath, callback){
            if(name == ''){
                callback('Product name cannot empty')
                return
            }
            if(editProductId == 0 && imageTmpPath == ''){
                callback('Product image cannot be empty')
                return
            }
            datasource.addAbout(editProductId, name, imageTmpPath, function(err){
                if(err){
                    callback('Could not add the product')
                    return
                }
                callback(false)
            })
        },
        getAbout : datasource.loadSingleAbout,
        //===
        deleteAbout : datasource.deleteAbout
    }
}