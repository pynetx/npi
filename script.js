// Code goes here
var NpiChecker;
(function (NpiChecker) {
    var Npi = (function () {
        function Npi() {
        }
        Npi.isValidNpi = function (npi) {
            var tmp;
            var sum;
            var i;
            var j;
            i = npi.length;
            if ((i == 15) && (npi.indexOf("80840", 0, 5) == 0))
                sum = 0;
            else if (i == 10)
                sum = 24;
            else
                return false;
            j = 0;
            while (i != 0) {
                tmp = npi.charCodeAt(i - 1) - '0'.charCodeAt(0);
                if ((j++ % 2) != 0) {
                    if ((tmp <<= 1) > 9) {
                        tmp -= 10;
                        tmp++;
                    }
                }
                sum += tmp;
                i--;
            }
            if ((sum % 10) == 0)
                return true;
            else
                return false;
        };

        Npi.checkDigitNpi = function (npi9) {
            var tmp;
            var sum;
            var i;
            var j;
            i = npi9.length;
            if ((i == 14) && (npi9.indexOf("80840", 0, 5) == 0))
                sum = 0;
            else if (i == 9)
                sum = 24;
            else {
                return "!";
            }
                
            j = 1;
            while (i != 0) {
                tmp = npi9.charCodeAt(i - 1) - '0'.charCodeAt(0);
                if ((j++ % 2) != 0) {
                    if ((tmp <<= 1) > 9) {
                        tmp -= 10;
                        tmp++;
                    }
                }
                sum += tmp;
                i--;
            }
            return String.fromCharCode(((10 - (sum % 10)) % 10 + 48));
        };

        Npi.generate = function () {
            var randomNumber = Math.floor(Math.random()*(999999999-100000000+1)+100000000);

            var asdf = NpiChecker.Npi.checkDigitNpi(randomNumber.toString());
            return randomNumber.toString() + asdf.toString();
        };
        return Npi;
    })();
    NpiChecker.Npi = Npi;
    
    var Test = (function () {
        function Test() {
            this.input = ko.observable('');
            this.inputIsValid = ko.observable(false);
            this.output = ko.observable('');
        }
        Test.prototype.generate = function () {
            this.output(NpiChecker.Npi.generate());
        };

        Test.prototype.validate = function () {
            this.inputIsValid(NpiChecker.Npi.isValidNpi(this.input()));
        };
        return Test;
    })();
    NpiChecker.Test = Test;
})(NpiChecker || (NpiChecker = {}));

ko.applyBindings(new NpiChecker.Test());

var newNpi = NpiChecker.Npi.generate();
var isValid = NpiChecker.Npi.isValidNpi(newNpi)
ko.applyBindings({ "npi": newNpi, "isValid": isValid });


