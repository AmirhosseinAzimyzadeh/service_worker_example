/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/layout_maker/appLayout.ts":
/*!***************************************!*\
  !*** ./src/layout_maker/appLayout.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _worker_fib_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../worker/fib.worker */ "./src/worker/fib.worker.ts");

var applicationRoot = document.getElementById('root');
var appContainer = document.createElement('div');
var startButton = document.createElement('button');
startButton.innerText = 'Start';
var stopButton = document.createElement('button');
stopButton.innerText = 'Stop';
var result = document.createElement('div');
result.innerText = '0';
var results = document.createElement('div');
var initializer = 0;
// initiate worker
var worker = new _worker_fib_worker__WEBPACK_IMPORTED_MODULE_0__.default();
startButton.addEventListener('click', function () {
    initializer++;
    worker.postMessage(initializer);
    result.innerText = 'calculating ...';
    worker.onmessage = function (e) {
        console.log('MESSAGE FROM FIB WORKER');
        console.log({ data: e.data });
        var newResult = document.createElement('div');
        newResult.innerText = e.data.result;
        // appContainer.appendChild(newResult);
        results.prepend(newResult);
        initializer++;
        worker.postMessage(initializer);
        result.innerText = 'calculating ...';
    };
});
stopButton.addEventListener('click', function () {
    worker.terminate();
    result.innerText = 'TERMINATED';
});
function render() {
    appContainer.appendChild(startButton);
    appContainer.appendChild(stopButton);
    appContainer.appendChild(result);
    appContainer.appendChild(results);
    applicationRoot.appendChild(appContainer);
}
var app = {
    render: render,
    appContainer: appContainer,
    applicationRoot: applicationRoot,
    startButton: startButton,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);


/***/ }),

/***/ "./src/service_worker/serviceWorkerInitializer.ts":
/*!********************************************************!*\
  !*** ./src/service_worker/serviceWorkerInitializer.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function Initialize() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!('serviceWorker' in navigator)) {
                        throw new Error('Service worker not supported here');
                    }
                    _a = SW_DATA;
                    return [4 /*yield*/, navigator
                            .serviceWorker.register('/serviceWorker.js', {
                            updateViaCache: "none",
                        })];
                case 1:
                    _a.swRegistration = _b.sent();
                    console.log(SW_DATA.swRegistration);
                    // check if new service worker get the controll
                    navigator.serviceWorker.addEventListener('controllerchange', function () {
                        SW_DATA.serviceWorker = navigator.serviceWorker.controller;
                    });
                    // listen for messages from service worker
                    navigator.serviceWorker.addEventListener('message', function (e) {
                        console.log('NEW MESSAGE FROM SW');
                        if (e.ports && e.ports[0]) {
                            sendSWMessage({ message: 'hi cutti' }, e.ports[0]);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function sendSWMessage(msg, target) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (target) {
                target.postMessage(msg);
            }
            else if (SW_DATA.serviceWorker) {
                SW_DATA.serviceWorker.postMessage(msg);
            }
            else {
                navigator.serviceWorker.controller.postMessage(msg);
            }
            return [2 /*return*/];
        });
    });
}
var SW_DATA = {
    serviceWorker: null,
    swRegistration: null,
};
var serviceWorker = {
    SW_DATA: SW_DATA,
    Initialize: Initialize,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (serviceWorker);


/***/ }),

/***/ "./src/worker/fib.worker.ts":
/*!**********************************!*\
  !*** ./src/worker/fib.worker.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Worker_fn)
/* harmony export */ });
function Worker_fn() {
  return new Worker(__webpack_require__.p + "bundle.worker.js");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_maker_appLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout_maker/appLayout */ "./src/layout_maker/appLayout.ts");
/* harmony import */ var _service_worker_serviceWorkerInitializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service_worker/serviceWorkerInitializer */ "./src/service_worker/serviceWorkerInitializer.ts");


_layout_maker_appLayout__WEBPACK_IMPORTED_MODULE_0__.default.render();
// initiate service worker
_service_worker_serviceWorkerInitializer__WEBPACK_IMPORTED_MODULE_1__.default.Initialize().then(function () {
    console.log('service worker initialize');
}).catch(function (e) {
    console.error(e);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUQsSUFBTSxPQUFPLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxJQUFJO0NBQ3JCO0FBRUQsSUFBTSxhQUFhLEdBQUc7SUFDcEIsT0FBTztJQUNQLFVBQVU7Q0FDWDtBQUVELGlFQUFlLGFBQWEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdkRkO0FBQ2Ysb0JBQW9CLHFCQUF1QjtBQUMzQzs7Ozs7OztVQ0ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7O0FDZjJDO0FBQzJCO0FBRXRFLG1FQUFVLEVBQUUsQ0FBQztBQUViLDBCQUEwQjtBQUMxQix3RkFBd0IsRUFBRSxDQUFDLElBQUksQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7SUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Nfd29ya2VyLy4vc3JjL2xheW91dF9tYWtlci9hcHBMYXlvdXQudHMiLCJ3ZWJwYWNrOi8vc193b3JrZXIvLi9zcmMvc2VydmljZV93b3JrZXIvc2VydmljZVdvcmtlckluaXRpYWxpemVyLnRzIiwid2VicGFjazovL3Nfd29ya2VyLy4vc3JjL3dvcmtlci9maWIud29ya2VyLnRzIiwid2VicGFjazovL3Nfd29ya2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Nfd29ya2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zX3dvcmtlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3Nfd29ya2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc193b3JrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zX3dvcmtlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9zX3dvcmtlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmliV29ya2VyIGZyb20gJy4uL3dvcmtlci9maWIud29ya2VyJztcclxuXHJcbmNvbnN0IGFwcGxpY2F0aW9uUm9vdDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xyXG5cclxuY29uc3QgYXBwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5zdGFydEJ1dHRvbi5pbm5lclRleHQgPSAnU3RhcnQnO1xyXG5cclxuY29uc3Qgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5zdG9wQnV0dG9uLmlubmVyVGV4dCA9ICdTdG9wJztcclxuXHJcbmNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5yZXN1bHQuaW5uZXJUZXh0ID0gJzAnO1xyXG5cclxuY29uc3QgcmVzdWx0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHJcbmxldCBpbml0aWFsaXplciA9IDA7XHJcbi8vIGluaXRpYXRlIHdvcmtlclxyXG5jb25zdCB3b3JrZXI6IFdvcmtlciA9IG5ldyBGaWJXb3JrZXIoKTtcclxuXHJcblxyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpbml0aWFsaXplcisrO1xyXG4gIHdvcmtlci5wb3N0TWVzc2FnZShpbml0aWFsaXplcik7XHJcbiAgcmVzdWx0LmlubmVyVGV4dCA9ICdjYWxjdWxhdGluZyAuLi4nO1xyXG5cclxuXHJcbiAgd29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnTUVTU0FHRSBGUk9NIEZJQiBXT1JLRVInKTtcclxuICAgIGNvbnNvbGUubG9nKHsgZGF0YTogZS5kYXRhIH0pO1xyXG4gICAgY29uc3QgbmV3UmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBuZXdSZXN1bHQuaW5uZXJUZXh0ID0gZS5kYXRhLnJlc3VsdDtcclxuICAgIC8vIGFwcENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdSZXN1bHQpO1xyXG4gICAgcmVzdWx0cy5wcmVwZW5kKG5ld1Jlc3VsdCk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZXIrKztcclxuICAgIHdvcmtlci5wb3N0TWVzc2FnZShpbml0aWFsaXplcik7XHJcbiAgICByZXN1bHQuaW5uZXJUZXh0ID0gJ2NhbGN1bGF0aW5nIC4uLic7XHJcbiAgfVxyXG59KTtcclxuXHJcbnN0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgd29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gIHJlc3VsdC5pbm5lclRleHQgPSAnVEVSTUlOQVRFRCc7XHJcbn0pXHJcblxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIGFwcENvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XHJcbiAgYXBwQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0b3BCdXR0b24pO1xyXG4gIGFwcENvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xyXG4gIGFwcENvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHRzKTtcclxuICBhcHBsaWNhdGlvblJvb3QuYXBwZW5kQ2hpbGQoYXBwQ29udGFpbmVyKTtcclxufVxyXG5cclxuY29uc3QgYXBwID0ge1xyXG4gIHJlbmRlcixcclxuICBhcHBDb250YWluZXIsXHJcbiAgYXBwbGljYXRpb25Sb290LFxyXG4gIHN0YXJ0QnV0dG9uLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHA7IiwiYXN5bmMgZnVuY3Rpb24gSW5pdGlhbGl6ZSgpIHtcclxuICBpZiAoISgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTZXJ2aWNlIHdvcmtlciBub3Qgc3VwcG9ydGVkIGhlcmUnKTtcclxuICB9XHJcblxyXG4gIFNXX0RBVEEuc3dSZWdpc3RyYXRpb24gPSBhd2FpdCBuYXZpZ2F0b3JcclxuICAgIC5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2VydmljZVdvcmtlci5qcycsIHtcclxuICAgICAgdXBkYXRlVmlhQ2FjaGU6IFwibm9uZVwiLFxyXG4gICAgfSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFNXX0RBVEEuc3dSZWdpc3RyYXRpb24pO1xyXG5cclxuXHJcbiAgLy8gY2hlY2sgaWYgbmV3IHNlcnZpY2Ugd29ya2VyIGdldCB0aGUgY29udHJvbGxcclxuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdjb250cm9sbGVyY2hhbmdlJyAsICgpID0+IHtcclxuICAgIFNXX0RBVEEuc2VydmljZVdvcmtlciA9IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXI7XHJcbiAgfSk7XHJcblxyXG5cclxuICAvLyBsaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gc2VydmljZSB3b3JrZXJcclxuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdORVcgTUVTU0FHRSBGUk9NIFNXJyk7XHJcbiAgICBpZiAoZS5wb3J0cyAmJiBlLnBvcnRzWzBdKSB7XHJcbiAgICAgIHNlbmRTV01lc3NhZ2UoeyBtZXNzYWdlOiAnaGkgY3V0dGknIH0sIGUucG9ydHNbMF0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VuZFNXTWVzc2FnZShtc2c6IGFueSwgdGFyZ2V0PzogTWVzc2FnZVBvcnQpIHtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQucG9zdE1lc3NhZ2UobXNnKTtcclxuICB9IGVsc2UgaWYgKFNXX0RBVEEuc2VydmljZVdvcmtlcikge1xyXG4gICAgU1dfREFUQS5zZXJ2aWNlV29ya2VyLnBvc3RNZXNzYWdlKG1zZyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UobXNnKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgU1dfREFUQV9UWVBFIHtcclxuICBzZXJ2aWNlV29ya2VyOiBTZXJ2aWNlV29ya2VyIHwgbnVsbCxcclxuICBzd1JlZ2lzdHJhdGlvbjogbnVsbCB8IFNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb24sXHJcbn1cclxuXHJcbmNvbnN0IFNXX0RBVEE6IFNXX0RBVEFfVFlQRSA9IHtcclxuICBzZXJ2aWNlV29ya2VyOiBudWxsLFxyXG4gIHN3UmVnaXN0cmF0aW9uOiBudWxsLFxyXG59XHJcblxyXG5jb25zdCBzZXJ2aWNlV29ya2VyID0ge1xyXG4gIFNXX0RBVEEsXHJcbiAgSW5pdGlhbGl6ZSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VydmljZVdvcmtlcjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXb3JrZXJfZm4oKSB7XG4gIHJldHVybiBuZXcgV29ya2VyKF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJidW5kbGUud29ya2VyLmpzXCIpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IGFwcCBmcm9tICcuL2xheW91dF9tYWtlci9hcHBMYXlvdXQnO1xyXG5pbXBvcnQgc2VydmljZVdvcmtlciBmcm9tICcuL3NlcnZpY2Vfd29ya2VyL3NlcnZpY2VXb3JrZXJJbml0aWFsaXplcic7XHJcblxyXG5hcHAucmVuZGVyKCk7XHJcblxyXG4vLyBpbml0aWF0ZSBzZXJ2aWNlIHdvcmtlclxyXG5zZXJ2aWNlV29ya2VyLkluaXRpYWxpemUoKS50aGVuKCgpID0+IHtcclxuICBjb25zb2xlLmxvZygnc2VydmljZSB3b3JrZXIgaW5pdGlhbGl6ZScpXHJcbn0pLmNhdGNoKChlKSA9PiB7XHJcbiAgY29uc29sZS5lcnJvcihlKVxyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=