// 每个单词首字母大写
export function firstToUpper (str) {
    const strArr = str.split(" ");
    let result = "";
    
    strArr.map(item => {
        if (/^\w+$/.test(item)) {
            result += item.replace(/\b(\w)/g, ($1) => $1.toUpperCase());
        }
        result += " ";
    });

    return result.trim();
}