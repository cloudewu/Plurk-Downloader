# route('/') methods=GET 
### access website 
### **required parameters:** none
### **return:** render index.html

# route('/backup') methods=POST
### give a plurk link and get raw data
### **required parameters:** json {"link":"plurk_url"} 
### **successfual return:** 
    json : {
        "status": "success",
        "time": "2019-08-10T07:12:39Z"
        "content": <makedown content>,
    }

### **error return:**
    1. plurk server receive request but refuse to provide the service (may be the private plurk)
    json :　{    
        "status":"fail", 
        "reason":"403 Forbidden"
    } 

    2. other error when plurk server receive request
    json :　{    
        "status":"fail", 
        "reason": "status_code"
    } 

    3. fail to request response from Responses/get
    json :　{    
        "status":"fail", 
        "reason":"fail to request response from Responses/get"
    }

    4. server internal error
    json :　{
        "status":"fail", 
        "reason":"500 Server Internal Error"
    }