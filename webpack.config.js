/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */
const path = require( 'path' );
const IgnorePlugin = require( 'webpack' ).IgnorePlugin;
const pkg = require( './package.json' );

const webpack = require( 'laxar-infrastructure' ).webpack( {
   context: __dirname,
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: [
               path.resolve( __dirname, 'node_modules' )
            ],
            loader: 'babel-loader'
         }
      ]
   },
   plugins: [
      // amazingly, webpack excludes the locales from the bundle but still can
      // resolve them later when bundling the bundle
      new IgnorePlugin( /datepicker-.*\.js/, /jquery-ui\/ui\/i18n$/ )
   ],
   externals: {
      'jquery-ui/ui/widgets/datepicker': 'jquery-ui/ui/widgets/datepicker',
      'jquery-ui/ui/i18n/datepicker-de': 'jquery-ui/ui/i18n/datepicker-de'
   }
} );

module.exports = [
   webpack.library(),
   webpack.browserSpec( [ `./spec/${pkg.name}.spec.js` ] )
];
