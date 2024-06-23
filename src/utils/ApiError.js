class ApiError{
    constructor(responseCode,message) {
        this.responseCode = responseCode;
        this.message = message;
        this.sucess = false;
    }
}


export default ApiError;