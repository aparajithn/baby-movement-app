'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ExerciseCard = ExerciseCard;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _theme = require('../theme');

function ExerciseCard(_ref) {
  var exercise = _ref.exercise;
  var onPress = _ref.onPress;
  var isFavorite = _ref.isFavorite;
  var onToggleFavorite = _ref.onToggleFavorite;

  var getCategoryIcon = function getCategoryIcon(category) {
    var icons = {
      gas: '💨',
      core: '💪',
      strength: '💪',
      coordination: '🤲',
      stretch: '🧘'
    };
    return icons[category] || '•';
  };

  var getDifficultyLabel = function getDifficultyLabel(difficulty) {
    var labels = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    };
    return labels[difficulty] || difficulty;
  };

  return _react2['default'].createElement(
    _reactNative.TouchableOpacity,
    { style: styles.card, onPress: onPress, activeOpacity: 0.7 },
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.header },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.icon },
        getCategoryIcon(exercise.category)
      ),
      isFavorite !== undefined && _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { onPress: onToggleFavorite, style: styles.favoriteButton },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.favoriteIcon },
          isFavorite ? '♥' : '♡'
        )
      )
    ),
    _react2['default'].createElement(
      _reactNative.Text,
      { style: styles.name },
      exercise.name
    ),
    _react2['default'].createElement(
      _reactNative.Text,
      { style: styles.description },
      exercise.description
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.footer },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.duration },
        '⏱️ ',
        exercise.duration
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.difficulty },
        '↗ ',
        getDifficultyLabel(exercise.difficulty)
      )
    )
  );
}

var styles = _reactNative.StyleSheet.create({
  card: {
    backgroundColor: _theme.colors.surface,
    borderRadius: 12,
    padding: _theme.spacing.md,
    marginVertical: _theme.spacing.sm,
    marginHorizontal: _theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: _theme.spacing.sm
  },
  icon: {
    fontSize: 24
  },
  favoriteButton: {
    padding: _theme.spacing.xs
  },
  favoriteIcon: {
    fontSize: 20,
    color: _theme.colors.primary
  },
  name: {
    fontSize: _theme.fontSize.lg,
    fontWeight: '600',
    color: _theme.colors.textPrimary,
    marginBottom: _theme.spacing.xs
  },
  description: {
    fontSize: _theme.fontSize.sm,
    color: _theme.colors.textSecondary,
    marginBottom: _theme.spacing.sm
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  duration: {
    fontSize: _theme.fontSize.sm,
    color: _theme.colors.textSecondary
  },
  difficulty: {
    fontSize: _theme.fontSize.sm,
    color: _theme.colors.secondary
  }
});