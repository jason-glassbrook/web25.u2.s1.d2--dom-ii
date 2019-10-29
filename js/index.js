"use strict";

/***********************************************************
  event functions
***********************************************************/

/// mousedown + mouseup ///
const buttonClickClass = "click";

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
