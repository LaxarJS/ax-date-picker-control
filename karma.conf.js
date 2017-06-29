/* eslint-env node */

const pkg = require( './package.json' );
const laxarInfrastructure = require( 'laxar-infrastructure' );

module.exports = function( config ) {
   config.set( karmaConfig() );
};

function karmaConfig() {
   const webpackConfig = require( './webpack.config' )[ 0 ];
   return laxarInfrastructure.karma( [ `spec/${pkg.name}.spec.js` ], {
      context: __dirname,
      externals: webpackConfig.externals,
      module: {
         rules: webpackConfig.module.rules
      }
   } );
}
