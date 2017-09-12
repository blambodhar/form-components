const path = require('path'),
  fractal = require('@frctl/fractal').create(),
  mandelbrot = require('@frctl/mandelbrot'),
  hbs = require('@frctl/handlebars'),
  pkg = require(path.join(__dirname, '../package.json'));

const title = `${pkg.name.split('/').pop().replace('-', ' ').replace(
  /\b\w/g, l => l.toUpperCase())
}`;
fractal.set('project.title', `${title} v${pkg.version}`);
fractal.docs.set('indexLabel', title);
fractal.components.set('path', path.join(__dirname, '../src/components'));
fractal.docs.set('path', path.join(__dirname, '../src/docs'));
fractal.web.set('static.path', path.join(__dirname, '../dist'));
fractal.web.set('builder.dest', path.join(__dirname, '../build/library'));
fractal.components.set('default.preview', '@bright');
fractal.web.theme(mandelbrot({
  skin: 'navy'
}));
fractal.components.engine(hbs({
  helpers: {
    splitDashLast: function(str) {
      const arr = str.split('-');
      return arr[arr.length - 1];
    },
    /* eslint-disable */
    ifCond: function(v1, operator, v2, options) {
      switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
      }
    },
    /* eslint-enable */
    ifStartsWith: function(str, pattern, options) {
      if (typeof str !== 'undefined' && str.trim().startsWith(pattern)) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
fractal.web.set('server.syncOptions', {
  files: ['static/**/*'],
  watchOptions: {
    ignored: function(path) {
      return path.includes('.scss') || /components[^]*\.js/gmi.test(path);
    }
  },
  injectChanges: false
});

module.exports = fractal;
