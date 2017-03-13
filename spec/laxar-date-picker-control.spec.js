/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as ng from 'angular';
import 'angular-mocks';
import { name } from '../laxar-date-picker-control';

let axConfiguration;
let axI18n;

describe( 'The laxar-date-picker-control', () => {

   beforeEach( ng.mock.module( provideWidgetServices ) );
   beforeEach( ng.mock.module( name ) );

   let scope;
   beforeEach( ng.mock.inject( ( $compile, $rootScope ) => {
      scope = $rootScope.$new();
      scope.model = new Date( '2017-03-13' );

      const htmlTemplate = `
         <div ax-date-picker ng-model="date">
         </div>
      `;
      $compile( htmlTemplate )( scope );
   } ) );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   it( 'survives a smoke test', () => {
      expect( true ).toBe( true );
   } );


   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   it( 'can load regional jquery-ui resources', () => {
      axI18n.update( 'en' );
      scope.$digest();
      expect( true ).toBe( true );
   } );

} );

function provideWidgetServices( $provide ) {
   const configuration = {
      i18n: {
         locales: {
         }
      }
   };
   const i18n = {
      locale: 'default',
      tags: {
         default: 'de_DE'
      }
   };
   const callbacks = [];

   axConfiguration = {
      get: jasmine.createSpy( 'get' ).and.callFake( ( key, fallback ) => {
         return configuration.hasOwnProperty( key ) ? configuration[ key ] : fallback;
      } ),
      set( key, value ) {
         configuration[ key ] = value;
      }
   };

   axI18n = {
      whenLocaleChanged: jasmine.createSpy( 'whenLocaleChanged' ).and.callFake( callback => {
         callbacks.push( callback );
      } ),
      update: jasmine.createSpy( 'update' ).and.callFake( languageTag => {
         i18n.tags[ i18n.locale ] = languageTag;
         callbacks.forEach( callback => { callback(); } );
      } ),
      localize: jasmine.createSpy( 'localize' ).and.callFake( ( i18nValue, optionalFallback ) => {
         const languageTag = axI18n.languageTag();
         if( i18nValue && typeof i18nValue === 'object' ) {
            return i18nValue[ languageTag ] ||
               i18nValue[ languageTag.substr( 0, 2 ) ] ||
               i18nValue.en || optionalFallback;
         }
         return i18nValue;
      } ),
      languageTag: jasmine.createSpy( 'languageTag' ).and.callFake( () => {
         if( !i18n || !i18n.hasOwnProperty( 'tags' ) ) {
            return 'en';
         }
         return i18n.tags[ i18n.locale ] || 'en';
      } )
   };

   const axWidgetServices = {
      axConfiguration,
      axI18n
   };
   $provide.value( 'axWidgetServices', axWidgetServices );
}
