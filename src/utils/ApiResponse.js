class ApiResponse{
    constructor(statusCode,message,sucess=true,data=undefined) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.sucess = sucess;
    }
}

export default ApiResponse;