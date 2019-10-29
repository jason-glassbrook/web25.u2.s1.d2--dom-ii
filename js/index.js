"use strict";

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
