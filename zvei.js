
function ZVEIPlayer() {
    var context = window.AudioContext || window.webkitAudioContex;
    this.context = new context();
}

function toZveiFrequencies(digits) {
    if (!digits || digits.length === 0) {
        return [];
    }

    var freqs = {
        '1': 1060,
        '2': 1160,
        '3': 1270,
        '4': 1400,
        '5': 1530,
        '6': 1670,
        '7': 1830,
        '8': 2000,
        '9': 2200,
        '0': 2400,
        'R': 2600
    };

    var res = [],
        i;
    res[0] = freqs[digits[0]];

    for (i = 1; i < digits.length; i++) {
        res[i] = freqs[digits[i]];

        if (res[i - 1] === res[i]) {
            res[i] = freqs.R;
        }
    }

    return res;
}

ZVEIPlayer.prototype.play = function(digits) {

    var osc = this.context.createOscillator();
    osc.connect(this.context.destination);

    var startTime = this.context.currentTime;
    osc.start(startTime);

    toZveiFrequencies(digits).forEach(function(freq) {
        osc.frequency.setValueAtTime(freq, startTime);
        startTime += 0.07;
    });

    osc.stop(startTime);
};

ZVEIPlayer.prototype.prepend = function () {
  var osc = this.context.createOscillator();
  osc.connect(this.context.destination);
  
  var startTime = this.context.currentTime;
  
  osc.frequency.value = 1;
  osc.start(startTime);
  
  osc.stop(startTime + 0.5);
};

ZVEIPlayer.prototype.alarm = function(schleife, finishcb) {
    var self = this;

    self.prepend();
    setTimeout(function() {
        self.play(schleife);
        setTimeout(function() {
            self.play(schleife);

            setTimeout(finishcb, 70 * schleife.length + 600);

        }, 70 * schleife.length + 600);
    }, 600);
};

function init() {
    try {
        window.zveigen = new ZVEIPlayer();
        return true;
    }
    catch (e) {
        return false;
    }
}
