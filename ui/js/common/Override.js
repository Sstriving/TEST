/*

created by 王安茂 at 2015/5/1
mark: 添加基本类型的常用处理方法，引用时要注意是否会产生冲突。

*/

Object.prototype.equals = function (obj) {

    if (this === obj) return true;
    if (!obj) return false;
    if (this.toJSONString() == obj.toJSONString()) return true;

    return false;
}

//Object.prototype.toArray = function () {
//    return Array.prototype.slice.call(this, 0);
//}
var ElementCollectionToArray = function (collection) {
    var arr = [];
    for (var i = 0; i < collection.length; i++) {
        arr.push(collection[i]);
    }
    return arr;
}

var $Array = function (collection) {
    var arr = [];
    for (var i = 0; i < collection.length; i++) {
        arr.push(collection[i]);
    }
    return arr;
}


Array.prototype.forEach = function (action) {
    for (var i = 0; i < this.length; i++) {
        action(this[i], i);
    }
}

Array.prototype.where = function (match) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (match(this[i])) temp.push(this[i]);
    }
    return temp;
}

Array.prototype.sortAscending = function (selector) {
    this.sort(function (item1, item2) { return selector(item1) > selector(item2) ? 1 : -1; });
}

Array.prototype.sortDescending = function (selector) {
    this.sort(function (item1, item2) { return selector(item1) < selector(item2) ? 1 : -1; });
}

Array.prototype.orderBy = function (selector) {

    return this.slice(0).sort(function (item1, item2) { return selector(item1) > selector(item2) ? 1 : -1; });
}

Array.prototype.orderByDescending = function (selector) {

    return this.slice(0).sort(function (item1, item2) { return selector(item1) < selector(item2) ? 1 : -1; });
}

Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
}

Array.prototype.removeAll = function (match) {
    var startcount = this.length;
    for (var i = this.length - 1; i >= 0; i--) {
        if (!match || match(this[i])) this.removeAt(i);
    }
    return startcount - this.length;
}

Array.prototype.add = function (item) {
    this.push(item);
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
}

Array.prototype.first = function (match) {
    for (var i = 0; i < this.length; i++) {
        if (!match || match(this[i])) return this[i];
    }
    return null;
}

Array.prototype.last = function (match) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (!match || match(this[i])) return this[i];
    }
    return null;
}

Array.prototype.findIndex = function (match) {
    for (var i = 0; i < this.length; i++) {
        if (match(this[i])) return i;
    }
    return -1;
}

Array.prototype.select = function (selector) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        temp.push(selector(this[i], i));
    }
    return temp;
}

Array.prototype.sum = function (selector) {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += selector(this[i]);
    }
    return sum;
}

Array.prototype.count = function (match) {
    var cnt = 0;
    for (var i = 0; i < this.length; i++) {
        if (!match || match(this[i])) cnt++;
    }
    return cnt;
}

Array.prototype.indexOf = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) return i;
    }
    return -1;
}

Array.range = function (start, cnt) {

    var arr = [];
    for (var i = start; i < start + cnt; i++) {
        arr.push(i);
    }
    return arr;
}