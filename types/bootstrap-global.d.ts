declare namespace bootstrap {
  class BaseComponent {
    static getInstance(element: Element): BaseComponent | null;
    static getOrCreateInstance(
      element: Element,
      config?: unknown,
    ): BaseComponent;
    dispose(): void;
  }

  class Alert extends BaseComponent {}
  class Button extends BaseComponent {}
  class Carousel extends BaseComponent {}
  class Collapse extends BaseComponent {}
  class Dropdown extends BaseComponent {}
  class Modal extends BaseComponent {}
  class Offcanvas extends BaseComponent {}
  class Popover extends BaseComponent {}
  class ScrollSpy extends BaseComponent {}
  class Tab extends BaseComponent {}
  class Toast extends BaseComponent {}
  class Tooltip extends BaseComponent {}
}

declare const bootstrap: typeof bootstrap;
