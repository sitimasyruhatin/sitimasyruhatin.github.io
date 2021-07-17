const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
      button.classList.toggle('active');
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
      button.classList.remove('active');
    });

    Array.prototype.forEach.call(drawer.children, (n) => {
      n.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
        button.classList.toggle('active');
      });
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },

  _scrollWindow(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },
};

export default DrawerInitiator;
