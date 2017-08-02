var int_MaxValue = 2147483647;
var CompareResultTypes_Matched = "CompareResultTypes_Matched";
var CompareResultTypes_Removed = "CompareResultTypes_Removed";
var CompareResultTypes_Added = "CompareResultTypes_Added";

Array.prototype.Contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}

function StringComparer(s1, s2) {
    var asc = s1.length <= s2.length;
    var a = asc ? s1 : s2;
    var b = asc ? s2 : s1;
    var kis = {};
    var m_MatchedIndicesCalcTag = false;
    var m_MatchedIndices = [];
    this.GetMatchedIndices = function (self) {
        return function () {
            if (!m_MatchedIndicesCalcTag) {
                var indices = [];
                var map = [];
                map.length = a.length;
                for (var i = 0; i < map.length; i++) {
                    map[i] = [];
                    map[i].length = a.length;
                    for (var j = 0; j < map[i].length; j++) {
                        map[i][j] = 0;
                    }
                }
                var gotoNext = false;
                for (var i = 1; i <= a.length; ) {
                    for (var k = 1; k <= a.length - i + 1; k++) {
                        var l = self.L(k, i + k - 1);
                        if (l == int_MaxValue) {
                            gotoNext = true;
                            break;
                        }
                        else {
                            map[k - 1, i + k - 1 - 1] = l;
                        }
                    }
                    if (!gotoNext) {
                        indices = [];
                        indices.length = a.length + 1 - i;
                        for (var j = 0; j < indices.length; j++) {
                            indices[j] = 0;
                        }
                        for (var k = 1; k <= a.length - i + 1; k++) {
                            indices[k - 1] = map[k - 1, i + k - 2] - 1;
                        }
                        break;
                    } else {
                        i++;
                        gotoNext = false;
                    }
                }
                m_MatchedIndices = indices;
                m_MatchedIndicesCalcTag = true;
            }
            if (m_MatchedIndices == null) m_MatchedIndices = [];
            return m_MatchedIndices;
        }
    } (this);
    this.GetUnmatchedIndices = function (self) {
        return function () {
            var indices = self.GetMatchedIndices();
            var all = [];
            for (var i = 0; i < b.length; i++) {
                all.push(i);
            }
            if (indices != null) {
                for (var i = indices.length - 1; i > -1; i--) {
                    all.splice(indices[i], 1);
                }
            }
            return all;
        }
    } (this);
    this.L = function (self) {
        return function (k, i) {
            var ki = k + "_" + i;

            if (typeof (kis["key_" + ki]) != "undefined") return kis["key_" + ki];
            var result = int_MaxValue;
            if (i > 0) {
                if (k == 1) {
                    if (i == 1) {
                        var index = self.IndexOf(b, a[0], 0);
                        if (index < 0) {
                            result = int_MaxValue;
                        }
                        else {
                            result = index + 1;
                        }
                    }
                    else {
                        var min;
                        var index = self.IndexOf(b, a[i - 1], 0);
                        if (index < 0) {
                            min = int_MaxValue;
                        }
                        else {
                            min = index + 1;
                        }
                        var l = self.L(1, i - 1);
                        result = min < l ? min : l;
                    }
                }
                else {
                    var min;
                    var l = self.L(k - 1, i - 1);
                    if (l > -1 && l < b.length) {
                        var index = self.IndexOf(b, a[i - 1], l);
                        if (index < 0) {
                            min = int_MaxValue;
                        }
                        else {
                            min = index + 1;
                        }
                    }
                    else {
                        min = int_MaxValue;
                    }
                    l = self.L(k, i - 1);
                    result = min < l ? min : l;
                }
            }
            kis["key_" + ki] = result;
            return result;
        }
    } (this);
    this.IndexOf = function (s, c, startIndex) {
        for (var i = startIndex; i < s.length; i++) {
            if (s[i] == c) return i;
        }
        return -1;
    }
    this.GetComparedInfo = function (self) {
        var result = [];
        var lngPos = 0;
        var shtPos = 0;
        var matchedIndices = self.GetMatchedIndices();
        while (lngPos < b.length) {
            var c = b[lngPos];
            if (matchedIndices.Contains(lngPos)) {
                var index = shtPos >= a.length ? -1 : self.IndexOf(a, c, shtPos);
                if (index > -1) {
                    for (; shtPos < index; shtPos++) {
                        result.push({ Char: a[shtPos], Type: CompareResultTypes_Added });
                    }
                    shtPos++;
                    result.push({ Char: asc ? c : a[index], OrigChar: asc ? a[index] : c, Type: CompareResultTypes_Matched });
                }
            }
            else {
                result.push({ Char: c, Type: CompareResultTypes_Removed });
            }
            lngPos++;
        }
        for (; shtPos < a.length; shtPos++) {
            result.push({ Char: a[shtPos], Type: CompareResultTypes_Added });
        }
        if (asc) {
            for (var i = 0; i < result.length; i++) {
                var ci = result[i];
                if (ci.Type == CompareResultTypes_Removed) {
                    ci.Type = CompareResultTypes_Added;
                } else if (ci.Type == CompareResultTypes_Added) {
                    ci.Type = CompareResultTypes_Removed;
                }
            }
        }
        return result;
    } (this);
}