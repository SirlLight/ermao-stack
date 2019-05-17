module.exports = {
    // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    // 使用第三方开发配置合集
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "babel-eslint",
    // 指定校验的ECMAScript的版本及特性
    "parserOptions": {
        "ecmaFeatures": {   // 使用额外的语言特性
            "jsx": true,    // 启用jsx
            "legacyDecorators": true    // 可以对导出的class使用装饰器的配置
        },
        "ecmaVersion": 2018,    // ECMAScript版本，这里为ES7
        "sourceType": "module"  // 默认script，如果代码是ECMAScript模块，设置为module
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "client/webpack/webpack.prod.js"
            }
        }
    },
    "plugins": [
        "react"
    ],
    // 定义自己的规则0-不验证，1-warning，2-error
    "rules": {
        // 缩进[4个空格]
        "indent": [2, 4, { "SwitchCase": 1 }],
        // react中jsx的缩进
        "react/jsx-indent": 0,
        // 验证JSX中的props缩进
        "react/jsx-indent-props": 0,
        // 双引号
        "quotes": [2, "double"],
        // 分号
        "semi": [2, "always"],
        // 验证组件的propTypes
        "react/prop-types": 0,
        // 验证a标签的target="_blank"的安全问题
        "react/jsx-no-target-blank": 0,
        // 对console的验证
        "no-console": 0,
        // 统一换行符："\n" unix(for LF) and "\r\n" for windows(CRLF)，默认unix
        "linebreak-style": 0,
        // 文件末尾保留一行空行
        "eol-last": 0,
        // 在大括号内强制换行
        "object-curly-newline": 0,
        // 在块语句以空行开头和结尾（即换行）
        "padded-blocks": 0,
        // 强制变量在函数中一起或单独声明
        "one-var": 0,
        // 函数名称或function关键字与开头表达式之间允许有空格（匿名、命名、箭头）
        "space-before-function-paren": [1, {"anonymous": "always", "named": "ignore", "asyncArrow": "always"}],
        // 箭头函数中参数用括号括起来（as-needed：在只有一个参数时省略parens）
        "arrow-parens": 0,
        // return语句始终或从不指定值
        "consistent-return": 0,
        // 禁止在行尾添加尾随空格，允许在空行使用尾随空格
        "no-trailing-spaces": [2, { "skipBlankLines": true }],
        // 限制使用三元表达式
        "no-nested-ternary": 0,
        // 有多行属性的话, 新建一行关闭标签
        "react/jsx-closing-bracket-location": 0,
        // 最大行长度
        "max-len": 0,
        // 在对象和数组文字中全部使用尾随逗号（包括最后一个）
        "comma-dangle": 0,
        // 悬空下划线来表示JavaScript中对象的“私有”成员
        "no-underscore-dangle": 0,
        // 花括号与内容之间的空格
        "object-curly-spacing": [2, "always"],
        // 按照具体规范的React.createClass 的生命周期函数书写代码
        "react/sort-comp": 0,
        // 引用对象文字属性名称加引号
        "quote-props": 0,
        // 在数组方法的回调中强制返回语句
        "array-callback-return": 0,
        // jsx每行仅限有一个表达式
        "react/jsx-one-expression-per-line": 0,
        // 当输出只有一个变量时，需要添加default
        "import/prefer-default-export": 0,
        // 禁止导入package.json中dependencies、devDependencies、optionalDependencies或peerDependencies中未声明的包
        "import/no-extraneous-dependencies": 0,
        // 每行一个var-declaration
        "one-var-declaration-per-line": 0,
        // 多个不用于缩进的空格
        "no-multi-spaces": 0,
        // else中return
        "no-else-return": 0,
        // 不允许对象直接调用某些原型方法：foo.hasOwnProperty("bar") => Object.prototype.hasOwnProperty.call(foo, "bar")
        "no-prototype-builtins": 0,
        // 从数组和对象中解构：foo = array[0]; bar = obj.bar => [ foo ] = array; { bar } = obj
        "prefer-destructuring": [0, { "array": false }],
        // 防止使用危险的jsx属性
        "react/no-danger": 0,
        // 解构分配
        "react/destructuring-assignment": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // 禁止使用特定的语法(for of)
        "no-restricted-syntax": 0,
        // 禁止使用短路求值allowShortCircuit（a||b）和三目运算allowTernary（a?c:d）
        "no-unused-expressions": 0,
        // 强制在模块顶部调用require()
        "global-require": 0,
        // 要求在类成员之间出现空行
        "lines-between-class-members": 0,
        // 禁止重新分配功能参数:更改参数
        "no-param-reassign": 0,
        // 按钮必须有type
        "react/button-has-type": 0,
        // 非交互式元素使用点击事件onclick的时候，必须使用onkeydown，onkeyup，onkeypress中的一种。
        // eg: <div onClick={() => {}} onKeyDown={this.handleKeyDown} />
        "jsx-a11y/click-events-have-key-events": 0,
        // 禁止非交互式元素进行交互
        "jsx-a11y/no-noninteractive-element-interactions": 0
    }
};