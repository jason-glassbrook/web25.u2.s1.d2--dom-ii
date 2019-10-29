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

/// mousedown + mouseup ///
const buttonClickClass = "button-click";

const buttonMouseDown = function (ev) {
  if (ev.button === 0) { // left button pressed
    ev.target.classList.add (buttonClickClass);
  }
  ev.stopPropagation ();
};

const buttonMouseUp = function (ev) {
  if (ev.button === 0) { // left button pressed
    ev.target.classList.remove (buttonClickClass);
  }
  ev.stopPropagation ();
};

/// mouseenter + mouseleave ///
const imageHoverClass = "image-hover";

const imageMouseIn = function (ev) {
  ev.target.classList.add (imageHoverClass);
  ev.stopPropagation ();
};

const imageMouseOut = function (ev) {
  ev.target.classList.remove (imageHoverClass);
  ev.stopPropagation ();
};

/// mouseover ///
const headingHoverClass = "heading-hover";

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

/***********************************************************
  add events
***********************************************************/

/// mousedown + mouseup ///
const buttons = document.querySelectorAll (".btn");
buttons.forEach (
  (el) => {
    el.addEventListener ("mousedown" , buttonMouseDown);
    el.addEventListener ("mouseup" , buttonMouseUp);
  }
);

/// mouseenter + mouseleave ///
const images = document.querySelectorAll ("img");
images.forEach (
  (el) => {
    el.addEventListener ("mouseenter" , imageMouseIn);
    el.addEventListener ("mouseleave" , imageMouseOut);
  }
);

/// mouseover ///
const headings = document.querySelectorAll ("h1 , h2 , h3 , h4 , h5 , h6");
headings.forEach (
  (el) => {
    el.addEventListener ("mouseover" , headingMouseOver (el , 255));
  }
)