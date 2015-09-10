define( [
  'views/appView'


], function ( AppView ) {

  'use strict';

  return {

    init: function init( el ) {

      this.el = el;

      // Check if in app or on website
      this.isWeb = true;
      if ( typeof window.guardian === "undefined" ) {
        this.isWeb = false;
      }

      // Paths
      this.rootPath = this.isWeb ? '{{remote-root}}' : '{{local-root}}';
      this.assetsPath = this.rootPath + 'assets/';

      // Touch?
      this.isTouch = (('ontouchstart' in window) || ('ontouchstart' in document.documentElement) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
      if ( this.isTouch ) {
        $( 'body' ).addClass( 'touch' );
      } else {
        $( 'body' ).addClass( 'no-touch' );
      }

      // Get JSON questions + lang

      $.ajax( {
        dataType: 'json',
        url: this.assetsPath + '/data/data.json',
        success: this.renderMainView.bind( this )
      } );

    },

    renderMainView: function ( data ) {

      var appView = new AppView( {
        el: this.el,
        isWeb: this.isWeb,
        data: data,
        touch: this.isTouch,
        assetsPath: this.assetsPath
      } );
      appView.render();
    }

  };

} );
