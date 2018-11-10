import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  faFacebookIcon = faFacebook;
  faInstagramIcon = faInstagram;

  constructor() { }

  ngOnInit() {

    (function() {

      const Menu = (function() {
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('.menu');
        const menuList = document.querySelector('.menu__list');
        const brand = document.querySelector('.menu__brand');
        const menuItems = document.querySelectorAll('.menu__item');

        let active = false;

        const toggleMenu = function() {
          if (!active) {
            menu.classList.add('menu--active');
            menuList.classList.add('menu__list--active');
            brand.classList.add('menu__brand--active');
            burger.classList.add('burger--close');
            for (let i = 0, ii = menuItems.length; i < ii; i++) {
              menuItems[i].classList.add('menu__item--active');
            }

            active = true;
          } else {
            menu.classList.remove('menu--active');
            menuList.classList.remove('menu__list--active');
            brand.classList.remove('menu__brand--active');
            burger.classList.remove('burger--close');
            for (let i = 0, ii = menuItems.length; i < ii; i++) {
              menuItems[i].classList.remove('menu__item--active');
            }

            active = false;
          }
        };

        const bindActions = function() {
          burger.addEventListener('click', toggleMenu, false);
          brand.addEventListener('click', toggleMenu, false);
          menuList.addEventListener('click', toggleMenu, false);
        };

        return {
          init: bindActions
        };

      }());

      Menu.init();

    }());
  }

}
