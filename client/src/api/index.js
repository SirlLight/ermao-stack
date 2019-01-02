import { GET, POST } from "../common/http";

export default {
    register: params => POST("/register", params),
    validateUserName: params => POST("/validateUserName", params),
    login: params => POST("/login", params),
    getSession: params => GET("/getSession", params)
};
