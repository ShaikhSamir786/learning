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
var Takephot0 = /** @class */ (function () {
    function Takephot0(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    return Takephot0;
}());
var camera = /** @class */ (function (_super) {
    __extends(camera, _super);
    function camera(cameraMode, filter, burst) {
        var _this = _super.call(this, cameraMode, filter) || this;
        _this.cameraMode = cameraMode;
        _this.filter = filter;
        _this.burst = burst;
        return _this;
    }
    camera.prototype.getSepia = function () {
        console.log("i am upper class anstract method");
    };
    return camera;
}(Takephot0));
var c1 = new camera("xyz", "abc", 5);
console.log(c1);
c1.getSepia();
