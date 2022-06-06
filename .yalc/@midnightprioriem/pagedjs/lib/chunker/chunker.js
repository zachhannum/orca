"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _awaitAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/awaitAsyncGenerator"));

var _wrapAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapAsyncGenerator"));

var _page = _interopRequireDefault(require("./page"));

var _parser = _interopRequireDefault(require("./parser"));

var _eventEmitter = _interopRequireDefault(require("event-emitter"));

var _hook = _interopRequireDefault(require("../utils/hook"));

var _queue = _interopRequireDefault(require("../utils/queue"));

var _utils = require("../utils/utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MAX_PAGES = false;
var MAX_LAYOUTS = false;
var TEMPLATE = "\n<div class=\"pagedjs_page\">\n\t<div class=\"pagedjs_sheet\">\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-top\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-bottom\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-left\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-right\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_pagebox\">\n\t\t\t<div class=\"pagedjs_margin-top-left-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-left-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-top\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-left\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-center\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-right\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-top-right-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-right-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-right\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-top\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-middle\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-bottom\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-left\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-top\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-middle\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-bottom\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom-left-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-left-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-left\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-center\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-right\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom-right-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-right-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_area\">\n\t\t\t\t<div class=\"pagedjs_page_content\"></div>\n\t\t\t\t<div class=\"pagedjs_footnote_area\">\n\t\t\t\t\t<div class=\"pagedjs_footnote_content pagedjs_footnote_empty\">\n\t\t\t\t\t\t<div class=\"pagedjs_footnote_inner_content\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";
/**
 * Chop up text into flows
 * @class
 */

var Chunker = /*#__PURE__*/function () {
  function Chunker(options) {
    (0, _classCallCheck2["default"])(this, Chunker);
    // this.preview = preview;
    this.settings = options || {};
    this.hooks = {};
    this.hooks.beforeParsed = new _hook["default"](this);
    this.hooks.filter = new _hook["default"](this);
    this.hooks.afterParsed = new _hook["default"](this);
    this.hooks.beforePageLayout = new _hook["default"](this);
    this.hooks.layout = new _hook["default"](this);
    this.hooks.renderNode = new _hook["default"](this);
    this.hooks.layoutNode = new _hook["default"](this);
    this.hooks.onOverflow = new _hook["default"](this);
    this.hooks.afterOverflowRemoved = new _hook["default"](this);
    this.hooks.onBreakToken = new _hook["default"]();
    this.hooks.afterPageLayout = new _hook["default"](this);
    this.hooks.afterRendered = new _hook["default"](this);
    this.q = new _queue["default"](this);
    this.stopped = false;
    this.rendered = false;
    this.charsPerBreak = [];
    this.maxChars;
    this.pageTemplate = document.createElement("template");
    this.pageTemplate.innerHTML = TEMPLATE;
  }

  (0, _createClass2["default"])(Chunker, [{
    key: "setup",
    value: function setup(renderTo) {
      this.pages = [];
      this._total = 0;

      if (renderTo) {
        renderTo.appendChild(this.pagesArea);
      } else {
        document.querySelector("body").appendChild(this.pagesArea);
      }

      this.pagesArea.classList.add("pagedjs_pages");
    }
  }, {
    key: "flow",
    value: function () {
      var _flow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(content) {
        var renderTo,
            parsed,
            rendered,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                renderTo = _args.length > 1 && _args[1] !== undefined ? _args[1] : document.body;
                _context.next = 3;
                return this.hooks.beforeParsed.trigger(content, this);

              case 3:
                parsed = new _parser["default"](content);
                this.hooks.filter.triggerSync(parsed);
                this.source = parsed;
                this.breakToken = undefined;
                this.setup();
                renderTo.appendChild(this.pagesArea);
                this.emit("rendering", parsed);
                _context.next = 12;
                return this.hooks.afterParsed.trigger(parsed, this);

              case 12:
                _context.next = 14;
                return this.loadFonts();

              case 14:
                _context.next = 16;
                return this.render(parsed, this.breakToken);

              case 16:
                rendered = _context.sent;

              case 17:
                if (!rendered.canceled) {
                  _context.next = 24;
                  break;
                }

                this.start();
                _context.next = 21;
                return this.render(parsed, this.breakToken);

              case 21:
                rendered = _context.sent;
                _context.next = 17;
                break;

              case 24:
                this.rendered = true;
                this.pagesArea.style.setProperty("--pagedjs-page-count", this.total);
                _context.next = 28;
                return this.hooks.afterRendered.trigger(this.pages, this);

              case 28:
                this.emit("rendered", this.pages);
                return _context.abrupt("return", this);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function flow(_x) {
        return _flow.apply(this, arguments);
      }

      return flow;
    }()
  }, {
    key: "reflow",
    value: function () {
      var _reflow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(content) {
        var renderTo,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                renderTo = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : document.body;
                _context2.next = 3;
                return this.flow(content, renderTo);

              case 3:
                renderTo.innerHTML = "";
                renderTo.appendChild(this.pagesArea);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reflow(_x2) {
        return _reflow.apply(this, arguments);
      }

      return reflow;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parsed) {
        var _this2 = this;

        var renderer, done, result, loops;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                renderer = this.layout(parsed);
                done = false;
                loops = 0;

              case 3:
                if (done) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 6;
                return this.q.enqueue(function () {
                  return _this2.renderAsync(renderer);
                });

              case 6:
                result = _context3.sent;
                done = result.done;

                if (!MAX_LAYOUTS) {
                  _context3.next = 13;
                  break;
                }

                loops += 1;

                if (!(loops >= MAX_LAYOUTS)) {
                  _context3.next = 13;
                  break;
                }

                this.stop();
                return _context3.abrupt("break", 15);

              case 13:
                _context3.next = 3;
                break;

              case 15:
                return _context3.abrupt("return", result);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function render(_x3) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "start",
    value: function start() {
      this.rendered = false;
      this.stopped = false;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stopped = true; // this.q.clear();
    }
  }, {
    key: "renderOnIdle",
    value: function renderOnIdle(renderer) {
      var _this3 = this;

      return new Promise(function (resolve) {
        (0, _utils.requestIdleCallback)( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          var result;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!_this3.stopped) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt("return", resolve({
                    done: true,
                    canceled: true
                  }));

                case 2:
                  _context4.next = 4;
                  return renderer.next();

                case 4:
                  result = _context4.sent;

                  if (_this3.stopped) {
                    resolve({
                      done: true,
                      canceled: true
                    });
                  } else {
                    resolve(result);
                  }

                case 6:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        })));
      });
    }
  }, {
    key: "renderAsync",
    value: function () {
      var _renderAsync = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(renderer) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.stopped) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", {
                  done: true,
                  canceled: true
                });

              case 2:
                _context5.next = 4;
                return renderer.next();

              case 4:
                result = _context5.sent;

                if (!this.stopped) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", {
                  done: true,
                  canceled: true
                });

              case 9:
                return _context5.abrupt("return", result);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function renderAsync(_x4) {
        return _renderAsync.apply(this, arguments);
      }

      return renderAsync;
    }()
  }, {
    key: "handleBreaks",
    value: function () {
      var _handleBreaks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(node, force) {
        var currentPage, currentPosition, currentSide, previousBreakAfter, breakBefore, page;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                currentPage = this.total + 1;
                currentPosition = currentPage % 2 === 0 ? "left" : "right"; // TODO: Recto and Verso should reverse for rtl languages

                currentSide = currentPage % 2 === 0 ? "verso" : "recto";

                if (!(currentPage === 1)) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return");

              case 5:
                if (node && typeof node.dataset !== "undefined" && typeof node.dataset.previousBreakAfter !== "undefined") {
                  previousBreakAfter = node.dataset.previousBreakAfter;
                }

                if (node && typeof node.dataset !== "undefined" && typeof node.dataset.breakBefore !== "undefined") {
                  breakBefore = node.dataset.breakBefore;
                }

                if (force) {
                  page = this.addPage(true);
                } else if (previousBreakAfter && (previousBreakAfter === "left" || previousBreakAfter === "right") && previousBreakAfter !== currentPosition) {
                  page = this.addPage(true);
                } else if (previousBreakAfter && (previousBreakAfter === "verso" || previousBreakAfter === "recto") && previousBreakAfter !== currentSide) {
                  page = this.addPage(true);
                } else if (breakBefore && (breakBefore === "left" || breakBefore === "right") && breakBefore !== currentPosition) {
                  page = this.addPage(true);
                } else if (breakBefore && (breakBefore === "verso" || breakBefore === "recto") && breakBefore !== currentSide) {
                  page = this.addPage(true);
                }

                if (!page) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 11;
                return this.hooks.beforePageLayout.trigger(page, undefined, undefined, this);

              case 11:
                this.emit("page", page); // await this.hooks.layout.trigger(page.element, page, undefined, this);

                _context6.next = 14;
                return this.hooks.afterPageLayout.trigger(page.element, page, undefined, this);

              case 14:
                this.emit("renderedPage", page);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function handleBreaks(_x5, _x6) {
        return _handleBreaks.apply(this, arguments);
      }

      return handleBreaks;
    }()
  }, {
    key: "layout",
    value: function layout(content, startAt) {
      var _this = this;

      return (0, _wrapAsyncGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var breakToken, page;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                breakToken = startAt || false;

              case 1:
                if (!(breakToken !== undefined && (MAX_PAGES ? _this.total < MAX_PAGES : true))) {
                  _context7.next = 24;
                  break;
                }

                if (!(breakToken && breakToken.node)) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 5;
                return (0, _awaitAsyncGenerator2["default"])(_this.handleBreaks(breakToken.node));

              case 5:
                _context7.next = 9;
                break;

              case 7:
                _context7.next = 9;
                return (0, _awaitAsyncGenerator2["default"])(_this.handleBreaks(content.firstChild));

              case 9:
                page = _this.addPage();
                _context7.next = 12;
                return (0, _awaitAsyncGenerator2["default"])(_this.hooks.beforePageLayout.trigger(page, content, breakToken, _this));

              case 12:
                _this.emit("page", page); // Layout content in the page, starting from the breakToken


                _context7.next = 15;
                return (0, _awaitAsyncGenerator2["default"])(page.layout(content, breakToken, _this.maxChars));

              case 15:
                breakToken = _context7.sent;
                _context7.next = 18;
                return (0, _awaitAsyncGenerator2["default"])(_this.hooks.afterPageLayout.trigger(page.element, page, breakToken, _this));

              case 18:
                _this.emit("renderedPage", page);

                _this.recoredCharLength(page.wrapper.textContent.length);

                _context7.next = 22;
                return breakToken;

              case 22:
                _context7.next = 1;
                break;

              case 24:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  }, {
    key: "recoredCharLength",
    value: function recoredCharLength(length) {
      if (length === 0) {
        return;
      }

      this.charsPerBreak.push(length); // Keep the length of the last few breaks

      if (this.charsPerBreak.length > 4) {
        this.charsPerBreak.shift();
      }

      this.maxChars = this.charsPerBreak.reduce(function (a, b) {
        return a + b;
      }, 0) / this.charsPerBreak.length;
    }
  }, {
    key: "removePages",
    value: function removePages() {
      var fromIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (fromIndex >= this.pages.length) {
        return;
      } // Remove pages


      for (var i = fromIndex; i < this.pages.length; i++) {
        this.pages[i].destroy();
      }

      if (fromIndex > 0) {
        this.pages.splice(fromIndex);
      } else {
        this.pages = [];
      }

      this.total = this.pages.length;
    }
  }, {
    key: "addPage",
    value: function addPage(blank) {
      var _this4 = this;

      var lastPage = this.pages[this.pages.length - 1]; // Create a new page from the template

      var page = new _page["default"](this.pagesArea, this.pageTemplate, blank, this.hooks);
      this.pages.push(page); // Create the pages

      page.create(undefined, lastPage && lastPage.element);
      page.index(this.total);

      if (!blank) {
        // Listen for page overflow
        page.onOverflow(function (overflowToken) {
          console.warn("overflow on", page.id, overflowToken); // Only reflow while rendering

          if (_this4.rendered) {
            return;
          }

          var index = _this4.pages.indexOf(page) + 1; // Stop the rendering

          _this4.stop(); // Set the breakToken to resume at


          _this4.breakToken = overflowToken; // Remove pages

          _this4.removePages(index);

          if (_this4.rendered === true) {
            _this4.rendered = false;

            _this4.q.enqueue( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _this4.start();

                      _context8.next = 3;
                      return _this4.render(_this4.source, _this4.breakToken);

                    case 3:
                      _this4.rendered = true;

                    case 4:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            })));
          }
        });
        page.onUnderflow(function (overflowToken) {// console.log("underflow on", page.id, overflowToken);
          // page.append(this.source, overflowToken);
        });
      }

      this.total = this.pages.length;
      return page;
    }
    /*
    insertPage(index, blank) {
    	let lastPage = this.pages[index];
    	// Create a new page from the template
    	let page = new Page(this.pagesArea, this.pageTemplate, blank, this.hooks);
    		let total = this.pages.splice(index, 0, page);
    		// Create the pages
    	page.create(undefined, lastPage && lastPage.element);
    		page.index(index + 1);
    		for (let i = index + 2; i < this.pages.length; i++) {
    		this.pages[i].index(i);
    	}
    		if (!blank) {
    		// Listen for page overflow
    		page.onOverflow((overflowToken) => {
    			if (total < this.pages.length) {
    				this.pages[total].layout(this.source, overflowToken);
    			} else {
    				let newPage = this.addPage();
    				newPage.layout(this.source, overflowToken);
    			}
    		});
    			page.onUnderflow(() => {
    			// console.log("underflow on", page.id);
    		});
    	}
    		this.total += 1;
    		return page;
    }
    */

  }, {
    key: "clonePage",
    value: function () {
      var _clonePage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(originalPage) {
        var lastPage, page, _iterator, _step, className;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                lastPage = this.pages[this.pages.length - 1];
                page = new _page["default"](this.pagesArea, this.pageTemplate, false, this.hooks);
                this.pages.push(page); // Create the pages

                page.create(undefined, lastPage && lastPage.element);
                page.index(this.total);
                _context9.next = 7;
                return this.hooks.beforePageLayout.trigger(page, undefined, undefined, this);

              case 7:
                this.emit("page", page);
                _iterator = _createForOfIteratorHelper(originalPage.element.classList);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    className = _step.value;

                    if (className !== "pagedjs_left_page" && className !== "pagedjs_right_page") {
                      page.element.classList.add(className);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context9.next = 12;
                return this.hooks.afterPageLayout.trigger(page.element, page, undefined, this);

              case 12:
                this.emit("renderedPage", page);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function clonePage(_x7) {
        return _clonePage.apply(this, arguments);
      }

      return clonePage;
    }()
  }, {
    key: "loadFonts",
    value: function loadFonts() {
      var fontPromises = [];
      (document.fonts || []).forEach(function (fontFace) {
        if (fontFace.status !== "loaded") {
          var fontLoaded = fontFace.load().then(function (r) {
            return fontFace.family;
          }, function (r) {
            console.warn("Failed to preload font-family:", fontFace.family);
            return fontFace.family;
          });
          fontPromises.push(fontLoaded);
        }
      });
      return Promise.all(fontPromises)["catch"](function (err) {
        console.warn(err);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.pagesArea.remove();
      this.pageTemplate.remove();
    }
  }]);
  return Chunker;
}();

(0, _eventEmitter["default"])(Chunker.prototype);
var _default = Chunker;
exports["default"] = _default;