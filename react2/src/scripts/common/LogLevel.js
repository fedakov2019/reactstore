"use strict";

import KeyMirror from "keymirror";

const logLevel = KeyMirror({ Information: null, Warning: null, Error: null });

export {logLevel as LogLevel};