const _0x32998b = _0x4a7f;
(function (_0x2bd973, _0x3bf881) {
  const _0x172cf7 = _0x4a7f,
    _0x227015 = _0x2bd973();
  while (!![]) {
    try {
      const _0x25599d =
        (parseInt(_0x172cf7(0x110)) / 0x1) *
          (parseInt(_0x172cf7(0x106)) / 0x2) +
        -parseInt(_0x172cf7(0x100)) / 0x3 +
        parseInt(_0x172cf7(0xfa)) / 0x4 +
        (parseInt(_0x172cf7(0x111)) / 0x5) *
          (parseInt(_0x172cf7(0x10a)) / 0x6) +
        parseInt(_0x172cf7(0xfe)) / 0x7 +
        -parseInt(_0x172cf7(0xfc)) / 0x8 +
        -parseInt(_0x172cf7(0x104)) / 0x9;
      if (_0x25599d === _0x3bf881) break;
      else _0x227015["push"](_0x227015["shift"]());
    } catch (_0x1ce823) {
      _0x227015["push"](_0x227015["shift"]());
    }
  }
})(_0x53d2, 0xb5439);
const fs = require("fs");
function logError(_0x1495ec) {
  const _0x1dcd23 = _0x4a7f,
    _0x32f3e9 = _0x1dcd23(0xfd),
    _0x4f34c6 =
      new Date()["toISOString"]() +
      "\x20-\x20" +
      (_0x1495ec[_0x1dcd23(0x108)] || _0x1495ec) +
      "\x0a";
  fs[_0x1dcd23(0x10e)](_0x32f3e9, _0x4f34c6, (_0x17b1ff) => {
    const _0x40dd2a = _0x1dcd23;
    if (_0x17b1ff) console["log"](_0x40dd2a(0x103), _0x17b1ff);
  });
}
function _0x4a7f(_0x460e98, _0x15bc1c) {
  const _0x53d205 = _0x53d2();
  return (
    (_0x4a7f = function (_0x4a7f29, _0x1ebb65) {
      _0x4a7f29 = _0x4a7f29 - 0xf9;
      let _0x476ed8 = _0x53d205[_0x4a7f29];
      return _0x476ed8;
    }),
    _0x4a7f(_0x460e98, _0x15bc1c)
  );
}
module[_0x32998b(0x107)] = {
  init: async () => {
    const _0x25fd87 = _0x32998b,
      _0x3e9f42 = (await import(_0x25fd87(0xff)))[_0x25fd87(0x105)];
    console[_0x25fd87(0x10c)](
      _0x3e9f42[_0x25fd87(0x10d)]("AntiCrash\x20initialized")
    ),
      process["on"](_0x25fd87(0xfb), (_0x434f39) => {
        const _0x3107fc = _0x25fd87;
        console[_0x3107fc(0x10c)](
          _0x3e9f42[_0x3107fc(0x102)]("Uncaught\x20Exception:"),
          _0x434f39
        ),
          logError(_0x434f39);
      }),
      process["on"](_0x25fd87(0x10f), (_0x533c8b, _0x4d6d76) => {
        const _0x14d1cb = _0x25fd87;
        console[_0x14d1cb(0x10c)](
          _0x3e9f42[_0x14d1cb(0x102)](_0x14d1cb(0x10b)),
          _0x4d6d76,
          _0x3e9f42[_0x14d1cb(0x102)](_0x14d1cb(0x109)),
          _0x533c8b
        ),
          logError(_0x533c8b);
      }),
      process["on"](_0x25fd87(0xf9), (_0x18b232) => {
        const _0x2aac53 = _0x25fd87;
        console[_0x2aac53(0x10c)](
          _0x3e9f42[_0x2aac53(0x101)](_0x2aac53(0x112)),
          _0x18b232
        ),
          logError(_0x18b232);
      });
  },
};
function _0x53d2() {
  const _0x313402 = [
    "5322888pZvYHN",
    "uncaughtException",
    "4396184WwcmRo",
    "error.log",
    "3826221MSMycd",
    "chalk",
    "76260PqUGfk",
    "yellow",
    "red",
    "Failed\x20to\x20write\x20to\x20log\x20file:",
    "16893693Ncoajv",
    "default",
    "12HilByI",
    "exports",
    "stack",
    "reason:",
    "372wtOiOK",
    "Unhandled\x20Rejection\x20at:",
    "log",
    "green",
    "appendFile",
    "unhandledRejection",
    "10916KUMbhe",
    "100940iQEIbb",
    "Uncaught\x20Exception\x20Monitor:",
    "uncaughtExceptionMonitor",
  ];
  _0x53d2 = function () {
    return _0x313402;
  };
  return _0x53d2();
}
