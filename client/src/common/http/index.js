import superagent from "superagent";

const HOST = "/api";

const setHeader = () => {};

/**
 * GET请求封装
 * @param {*} url
 * @param {*} params
 * @param {
 *     host
 *     headers
 * } opt
 */
export const GET = (url, params, opt = {}) => {
    const headers = setHeader();
    const reqUrl = (opt.host ? opt.host : HOST) + url;

    return superagent.get(reqUrl)
        .query(params)
        .set(opt.headers ? opt.headers : headers)
        .then(rs => rs.body);
};

/**
 * POST请求封装
 * @param {*} url
 * @param {*} params
 * @param {
 *     host
 *     headers,
 *     type
 * } opt
 */
export const POST = (url, params, opt = {}) => {
    const headers = setHeader();
    const reqUrl = (opt.host ? opt.host : HOST) + url;

    return superagent.post(reqUrl)
        .send(params)
        .set(opt.headers || headers)
        .type(opt.type !== undefined ? opt.type : "json")
        .then(rs => rs.body);
};

export const FETCHAll = apis => {
    let apiArr = apis;

    if (!Array.isArray(apiArr)) {
        apiArr = [apiArr];
    }

    return Promise.all(apiArr);
};