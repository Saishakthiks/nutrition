!(function() {
    "use strict";

    var backdrop = document.createElement('div');
    backdrop.className = "slideout-backdrop";
    document.body.appendChild(backdrop);

    var slideout = new Slideout({
        'panel': document.body,
        'menu': document.getElementById('siteMainSidebar'),
        'padding': 265,
        'side': 'right',
        'touch': false
    });

    document.querySelector('.navbar-toggler').addEventListener('click', function() {
        slideout.toggle();
    });

    document.querySelector('.slideout-backdrop').addEventListener('click', function() {
        slideout.toggle();
    });

    slideout.on('open', function() {
        var _menuItems = document.querySelectorAll('#collapseMenu .nav-link[href*="#"]:not([data-toggle="collapse"])');

        Array.from(_menuItems).forEach(_menuItem => {
            _menuItem.addEventListener('click', function(event) {
                event.preventDefault();
                slideout.close();
                slideout.on('close', function() {
                    var _top = document.getElementById(_menuItem.hash.substr(1)).getBoundingClientRect().top - document.getElementById('stickyHeader').offsetHeight;
                    window.scrollTo({
                        left: 0,
                        top: _top,
                        behavior: 'smooth'
                    });
                });
            });
        });
    });

})(window);