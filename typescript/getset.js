var user = /** @class */ (function () {
    function user(name) {
        this.name = name;
    }
    user.prototype.getname = function () {
        return this.name;
    };
    user.prototype.setname = function (value) {
        this.name = value;
    };
    return user;
}());
var u1 = new user("john");
