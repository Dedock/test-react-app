'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createMixins;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMixins(breakpoints, spacing, mixins) {
  return (0, _extends3.default)({
    gutters: function gutters(styles) {
      styles.paddingLeft = spacing.unit * 2;
      styles.paddingRight = spacing.unit * 2;
      styles[breakpoints.up('sm')] = {
        paddingLeft: spacing.unit * 3,
        paddingRight: spacing.unit * 3
      };
      return styles;
    }
  }, mixins);
}