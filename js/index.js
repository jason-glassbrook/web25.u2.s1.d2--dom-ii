"use strict";

/***********************************************************
  helper functions
***********************************************************/

/***************************************
  Math
***************************************/

/// "clamp" number between lower and upper bounds ///
Math.clamp = function (x , lower , upper) {
  return (
    Math.min (Math.max (x , lower) , upper)
  );
}

/// random number between lower and upper bounds ///
Math.randomNumWithin = function (lower , upper) {
  return (
    lower + ((Math.random ()) * (upper - lower))
  );
}

/// random integer between lower and upper bounds ///
Math.randomIntWithin = function (lower , upper) {
  lower = Math.floor (lower);
  upper = Math.ceil (upper);
  return (
    lower + (Math.floor ((Math.random ()) * (upper - lower)))
  );
}

/***************************************
  RGB colors
***************************************/

const rgb = {};

/// convert css hex string to rgb channels ///
rgb.fromCssHex = function (hexString) { // doesn't protect against keyword colors
  const r = parseInt(hexString.substr(1,2), 16);
  const g = parseInt(hexString.substr(3,2), 16);
  const b = parseInt(hexString.substr(5,2), 16);
  const channels = [r , g , b];
  return (channels);
}

/// convert css rgb string to rgb channels ///
rgb.fromCssRgb = function (rgbString) { // doesn't protect against keyword colors
  const channels = Array.from (rgbString.matchAll (/\d+/g) ,
    (m) => (parseInt(m[0]))
  );
  return (channels);
}

/// convert rgb channels to css rgb string
rgb.toCssRgb = function (channels) {
  return (
    `rgb(${channels[0]} , ${channels[1]} , ${channels[2]})`
  );
}

/// mod ///
rgb.mod = function (channels) {
  return (
    channels.map(
      (c) => (c % 256)
    )
  );
};

/// clamp ///
rgb.clamp = function (channels) {
  return (
    channels.map(
      (c) => (Math.clamp (c , 0 , 255))
    )
  );
};

/***********************************************************
  event functions
***********************************************************/

const buttonClickingClass = "button-clicking";
const imageHoverClass     = "image-hover";
const headingHoverClass   = "heading-hover";
const paragraphWheelClass = "paragraph-wheel";
const paragraphClickClass = "paragraph-click";
const divClickClass       = "div-click";
const windowScrollClass   = "window-scroll";
const windowResizeClass   = "window-resize";

/// mousedown + mouseup ///
const buttonMouseDown = function (ev) {
  if (ev.button === 0) { // left button pressed
    ev.target.classList.add (buttonClickingClass);
  }
  ev.stopPropagation ();
};

const buttonMouseUp = function (ev) {
  if (ev.button === 0) { // left button pressed
    ev.target.classList.remove (buttonClickingClass);
  }
  ev.stopPropagation ();
};

/// mouseenter + mouseleave ///
const imageMouseIn = function (ev) {
  ev.target.classList.add (imageHoverClass);
  ev.stopPropagation ();
};
const imageMouseOut = function (ev) {
  ev.target.classList.remove (imageHoverClass);
  ev.stopPropagation ();
};

/// mouseover ///
// this returns another function that has a unique closure state
const headingMouseOver = function (el , colorDelta) {
  // get original color to modify in closure
  let color = rgb.fromCssRgb (
    getComputedStyle (el).color // AAAAHHHHH -- el.style is the INLINE style
  );
  // define color changing function
  const changeElementColor = function (ev) {
    // generate random rgb offset
    const offset = color.map (
      () => (Math.randomIntWithin (-colorDelta , +colorDelta))
    );
    // add offset and clamp
    color = rgb.clamp (
      color.map (
        (c , i) => (c + offset[i])
      )
    );
    // set color of element
    el.style.color = rgb.toCssRgb (color);
    el.style.transition = "color 0.5s";
    // stop bubbles
    ev.stopPropagation ();
  };
  // return function
  return (changeElementColor);
};

/// wheel ///
const paragraphWheel = function (ev) {
  ev.target.classList.toggle (paragraphWheelClass);
  ev.stopPropagation ();
}

/// click ///
const paragraphClick = function (ev) {
  ev.target.classList.toggle (paragraphClickClass);
  ev.stopPropagation ();
}
const divClick = function (ev) {
  ev.target.classList.toggle (divClickClass);
  ev.stopPropagation ();
}

/// scroll ///
const windowScroll = function (ev) {
  body.classList.toggle (windowScrollClass);
  ev.stopPropagation ();
};

/// resize ///
const windowResize = function (ev) {
  body.classList.toggle (windowResizeClass);
  ev.stopPropagation ();
};

/***********************************************************
  add events
***********************************************************/

const buttons    = document.querySelectorAll (".btn");
const images     = document.querySelectorAll ("img");
const headings   = document.querySelectorAll ("h1 , h2 , h3 , h4 , h5 , h6");
const paragraphs = document.querySelectorAll ("p");
const divs       = document.querySelectorAll ("div");
const body       = document.querySelector ("body");

/// mousedown + mouseup ///
buttons.forEach (
  (el) => {
    el.addEventListener ("mousedown" , buttonMouseDown);
    el.addEventListener ("mouseup" , buttonMouseUp);
  }
);

/// mouseenter + mouseleave ///
images.forEach (
  (el) => {
    el.addEventListener ("mouseenter" , imageMouseIn);
    el.addEventListener ("mouseleave" , imageMouseOut);
  }
);

/// mouseover ///
headings.forEach (
  (el) => {
    el.addEventListener ("mouseover" , headingMouseOver (el , 255));
  }
)

/// wheel ///
paragraphs.forEach (
  (el) => {
    el.addEventListener ("wheel" , paragraphWheel);
  }
);

/// click ///
paragraphs.forEach (
  (el) => {
    el.addEventListener ("click" , paragraphClick);
  }
);

divs.forEach (
  (el) => {
    el.addEventListener ("click" , divClick);
  }
);

/// scroll ///
window.addEventListener ("scroll" , windowScroll);

/// resize ///
window.addEventListener ("resize" , windowResize);
