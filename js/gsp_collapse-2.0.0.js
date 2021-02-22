/*!
 * Expand Collapse (Modified by Vineet Kumar)
 * @copyright (c) 2013, Daniel Stocks.
 * @copyright (c) 2016 Vineet Kumar
 * @license   Licensed under MIT, BSD, and GPL Licenses
 *            See https://github.com/danielstocks/jQuery-Collapse/blob/master/LICENSE
 */

(function ($, window, undefined) {
    "use strict";

    // Constructor
    function Collapse(el, options) {
        options = options || {};
        var _this = this,
            query = options.query || "> [data-gsco-wrap] > [data-gsco-header]";
        $.extend(_this, {
            $el: el,
            options: options,
            sections: [],
            isAccordion: options.accordion || false
        });
        // Figure out what sections are open if storage is used
        _this.states = _this.db ? _this.db.read() : [];

        // For every pair of elements in given
        // element, create a section
        _this.$el.find(query).each(function () {
            new jQueryCollapseSection($(this), _this);
        });

        // Capute ALL the clicks!
        (function (scope) {
            _this.$el.on("click", "[data-gseCollapse-summary] " + (scope.options.clickQuery || ""),
                $.proxy(_this.handleClick, scope));
            _this.$el.bind("toggle close open",
                $.proxy(_this.handleEvent, scope));
        }(_this));
    }

    Collapse.prototype = {
        handleClick: function (e, state) {
            e.preventDefault();
            //trigger event on click//
            var $clickedEle = $(e.target),
                $containerEle = $clickedEle.next();
            $(window).trigger('gse_co.click', [$clickedEle, $containerEle]);
            state = state || "toggle";
            var sections = this.sections,
                l = sections.length,
                target = e.target;
            while (l--) {
                var section = sections[l].$summary[0];
                if ($.contains(section, target) || section == target) {
                    sections[l][state]();
                    break;
                }
            }
        },
        handleEvent: function (e) {
            if (e.target == this.$el.get(0)) return this[e.type]();
            this.handleClick(e, e.type);
        },
        open: function (eq) {
            this._change("open", eq);
        },
        close: function (eq) {
            this._change("close", eq);
        },
        toggle: function (eq) {
            this._change("toggle", eq);
        },
        _change: function (action, eq) {
            if (isFinite(eq)) return this.sections[eq][action]();
            $.each(this.sections, function (i, section) {
                section[action]();
            });
        }
    };
    // Section constructor
    function Section($el, parent) {
        //if (!parent.options.clickQuery) $el.wrapInner('<div class="gsc-co-headwrap"/>');
        $.extend(this, {
            isOpen: false,
            $summary: $el.attr("data-gseCollapse-summary", ""),
            $details: $el.next(),
            options: parent.options,
            parent: parent
        });
        parent.sections.push(this);
        // Check current state of section
        var state = parent.states[this._index()];
        if (state === 0) {
            this.close(true, $el);
        } else if (this.$summary.is("[data-gsco-state=open]") || state === 1) {
            this.open(true);
        } else {
            this.close(true);
        }
    }

    Section.prototype = {
        toggle: function () {
            var _summary = this.$summary;
            //for Vertical Accordion, we won't close the already open section
            if (_summary.parents('.gsc-co-vWrap').length) {
                var accordion = this.options.accordion;
                if (accordion === undefined) {
                    this.options.accordion = true;
                }
                if (this.isOpen) {
                    return;
                }
            }
            this.isOpen ? this.close() : this.open();
        },
        close: function (bypass, $el) {
            this._changeState("close", bypass);
        },
        open: function (bypass) {
            var _this = this;
            if (_this.options.accordion && !bypass) {
                $.each(_this.parent.sections, function (i, section) {
                    section.close();
                });
            }
            _this._changeState("open", bypass);
        },
        _index: function () {
            return $.inArray(this, this.parent.sections);
        },
        _changeState: function (state, bypass) {
            var _this = this,
                _summary = _this.$summary;
            _this.isOpen = state == "open";
            $.isFunction(_this.options[state]) && !bypass ? _this.options[state].apply(_this.$details) : _this.$details[_this.isOpen ? "slideDown" : "slideUp"]();
            _summary.toggleClass("gsc_co_open", state !== "close").trigger(state === "open" ? "opened" : "closed", _this);
        }
    };

    // Expose in jQuery API
    $.fn.gsp_collapse = function (options, scan) {
        var $this = $(this),
        //attr = '[data-gsco-collapse] [data-gsco-wrap]';
            attr = 'data-gsco-collapse';
        var nodes = scan ? $("body").find("[" + attr + "]") : $this.find("[" + attr + "]").add($this);
        return nodes.each(function () {
            var $e = $(this);
            if ($e.is('[' + attr + ']')) {
                var settings = (scan) ? {} : options,
                    values = $e.attr("data-gsco-collapse") || "";
                //either provide options by data attributes or options by manually calling
                if (typeof options !== 'object' || $.isEmptyObject(options)) {
                    $.each(values.split(" "), function (i, v) {
                        if (v) {
                            settings[v] = true;
                        }
                    });
                } else {
                    settings = options;
                }
                new Collapse($e, settings);
            }
        });
    };

    // Expose constructor to
    // global namespace
    window.jQueryCollapse = Collapse;
    window.jQueryCollapseSection = Section;

    //jQuery DOM Ready
    $(function () {
        $.fn.gsp_collapse(false, true);
    });
})(jQuery, window);