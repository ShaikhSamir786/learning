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
    function bottlemaker(name) {
        this.name = name;
    }
    return bottlemaker;
}());
var bottlemaker1 = /** @class */ (function (_super) {
    __extends(bottlemaker1, _super);
    function bottlemaker1(name) {
        return _super.call(this, name) || this;
    }
    return bottlemaker1;
}(bottlemaker));
{
    this.name = "changing name of bottlemaker";
}
var b1 = new bottlemaker1("john ", 12);
// console.log(b1.name)
// console.log(b1.age)
b1.getchnagebottlemakervalue();
console.log(b1.name);
