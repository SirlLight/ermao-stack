import { GET, POST } from "../common/http";

export default {
    register: params => {
        return POST("/register", params);
    },
    validateUserName: params => {
        return POST("/validateUserName", params);
    },
    login: params => {
        return POST("/login", params);
    },
    getSession: params => {
        return GET("/getSession", params);
    }
}
