var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bottlemaker = /** @class */ (function () {
    function bottlemaker() {
        this.name = "milton";
    }
    return bottlemaker;
}());
var bottlemaker1 = /** @class */ (function (_super) {
    __extends(bottlemaker1, _super);
    function bottlemaker1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.materials = "metal";
        return _this;
    }
    bottlemaker1.prototype.changename = function () {
        this.name = "changing name";
    };
    return bottlemaker1;
}(bottlemaker));
var b1 = new bottlemaker1();
b1.changename();
console.log(b1);
