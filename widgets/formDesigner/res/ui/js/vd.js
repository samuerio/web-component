define(["jquery", "libui/utils"], function($, utils) {
    var patterns = {email: /^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,mphone: /^1[0-9]{10}$/,inttype: /^[0-9]+$/,floattype: /^[0-9]+\.[0-9]+$/}, vd = {}, defaultMsg = {not_int: "请输入整数",not_float: "请输入小数",should_not_empty: "不能为空",required: "不能为空",should_be_array: "数据格式错误",should_be_object: "数据格式错误",value_overflow: "值过大",value_downflow: "值太小",value_not_expected: "值非预期",chlength_too_long: "输入过长",chlength_too_short: "输入过短",length_too_long: "输入过长",length_too_short: "输入过短",should_no_space: "不能包含空格",not_email: "不是合法的Email地址",not_mphone: "不是合法的手机号",match_fail: "非法输入",not_fail: "非法输入",not_match_fail: "非法输入"};
    function Validator() {
    }
    Validator.prototype = {init: function(input, rules) {
            this.input = input;
            this.rules = rules;
            this.error = false;
            return this;
        },validate: function() {
            for (var v in this.rules) {
                var r = this.rules[v], re;
                re = this[v](r);
                if (!re) {
                    return false;
                }
            }
            return true;
        },required: function() {
            if (this.input == undefined) {
                this.error = "should_not_empty";
                return false;
            }
            return true;
        },object: function(data_config) {
            var m = this;
            if (typeof m.input !== "object" || Array.isArray(m.input)) {
                m.error = "should_be_object";
                return false;
            }
            if (data_config) {
                for (var name in data_config) {
                    var c = data_config[name], data = m.input;
                    if (c.required && !data.hasOwnProperty(name)) {
                        this.error = name + ":required";
                        return false;
                    }
                    var v = data[name];
                    switch (c.type) {
                        case "int":
                            if (!String(v).match(patterns.inttype)) {
                                this.error = name + ":" + "not_int";
                                return false;
                            }
                            v = parseInt(v);
                            break;
                        case "float":
                            if (!String(v).match(patterns.floattype)) {
                                this.error = name + ":" + "not_float";
                                return false;
                            }
                            v = parseFloat(v);
                            break;
                        case "boolean":
                            v = v ? true : false;
                            break;
                        case "enum":
                        case "array":
                        case "object":
                            break;
                        case "string":
                        default:
                            if (!data[name]) {
                                data[name] = "";
                            }
                            data[name] += "";
                            break;
                    }
                    data[name] = v;
                    var ins = (new Validator).init(v, c.vd_rules);
                    ins.validate();
                    if (ins.error) {
                        this.error = name + ":" + ins.error;
                        return false;
                    }
                }
            }
            return true;
        },array: function(vd_rules) {
            if (!Array.isArray(this.input)) {
                this.error = "should_be_array";
                return false;
            }
            if (vd_rules) {
                for (var i in this.input) {
                    var item = this.input[i], ins = (new Validator).init(item, vd_rules);
                    ins.validate();
                    if (ins.error) {
                        this.error = i + ":" + ins.error;
                        return false;
                    }
                }
            }
            return true;
        },range: function(opt) {
            var v = this.input;
            if (v > opt.max) {
                this.error = "value_overflow";
                return false;
            }
            if (v < opt.min) {
                this.error = "value_downflow";
                return false;
            }
            return true;
        },expect: function(opt) {
            var m = this, found = false;
            for (var i in opt.values) {
                if (opt.values[i] == m.input) {
                    found = true;
                }
            }
            if (!found) {
                this.error = "value_not_expected";
                return false;
            }
            return true;
        },chLength: function(opt) {
            var m = this, l;
            if (opt.stripHtml) {
                l = utils.chLength(m.input.replace(/(<([^>]+)>)/gi, ""));
            } else {
                l = utils.chLength(m.input);
            }
            if (l > opt.max) {
                m.error = "chlength_too_long";
                return false;
            }
            if (l < opt.min) {
                m.error = "chlength_too_short";
                return false;
            }
            return true;
        },length: function(opt) {
            var m = this, l;
            if (opt.stripHtml) {
                l = m.input.replace(/(<([^>]+)>)/gi, "").length;
            } else {
                l = m.input.length;
            }
            if (l > opt.max) {
                m.error = "length_too_long";
                return false;
            }
            if (l < opt.min) {
                m.error = "length_too_short";
                return false;
            }
            return true;
        },noSpace: function(opt) {
            if (this.input.search(/\s/) === -1) {
                return true;
            }
            this.error = "should_no_space";
            return false;
        },email: function(opt) {
            if (!this.input.match(patterns.email)) {
                this.error = "not_email";
                return false;
            }
            return true;
        },mphone: function(opt) {
            if (!this.input.match(patterns.mphone)) {
                this.error = "not_mphone";
                return false;
            }
            return true;
        },match: function(opt) {
            if (opt.regExp) {
                if (!this.input.match(opt.regExp)) {
                    this.error = "match_fail";
                    return false;
                }
            }
            return true;
        },not: function(opt) {
            for (var v in opt) {
                var r = opt[v], re;
                re = this[v](r);
                if (re) {
                    this.error = "not_fail";
                    return false;
                }
            }
            return true;
        },notMatch: function(opt) {
            if (opt.regExp) {
                if (this.input.match(opt.regExp)) {
                    this.error = "not_match_fail";
                    return false;
                }
            }
            return true;
        }};
    vd.Validator = Validator;
    vd.validate = function(data, data_config) {
        var ins = new Validator;
        ins.init(data, {object: data_config}).validate();
        if (ins.error) {
            var parts = ins.error.split(":"), name, msg_key, msg = "";
            if (parts.length > 1) {
                name = parts[0];
                msg_key = parts[1];
                var c = data_config[name];
                if (c && c["vd_msg"]) {
                    var vd_msg = c["vd_msg"];
                    if (vd_msg[msg_key]) {
                        msg = vd_msg[msg_key];
                    } else if (vd_msg["*"]) {
                        msg = vd_msg["*"];
                    }
                } else {
                    msg = vd.getErrorMsg(msg_key);
                }
                return {name: name,msg: msg};
            }
            return ins.error;
        }
        return true;
    };
    vd.getErrorMsg = function(msg_key) {
        return defaultMsg[msg_key] ? defaultMsg[msg_key] : "";
    };
    return vd;
});
