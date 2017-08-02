function ItemCollection(comparer) {
    var items = [];
    this.ItemEdited = function () { }
    var OnItemEdited = function (self) {
        return function (total, index, data, operation) {
            if (self.ItemEdited) self.ItemEdited(total, index, data, operation);
        }
    } (this);
    this.Add = function (self) {
        return function (itemData) {
            if (typeof (itemData) == "undefined") throw new Error("NullItem");
            items[items.length] = itemData;
            OnItemEdited(items.length, items.length - 1, itemData, 1);
            for (var i = 0; i < items.length - 1; i++) {
                OnItemEdited(items.length, i, items[i], 0);
            }
        }
    } (this);
    this.Remove = function (itemData) {
        if (typeof (itemData) == "undefined") return;
        for (var i = 0; i < items.length; i++) {
            if (itemData == items[i]) {
                OnItemEdited(items.length, i, items[i], -1);
                for (var j = i + 1; j < items.length; j++) {
                    items[j - 1] = items[j];
                }
                items.length--;
                for (var i = 0; i < items.length; i++) {
                    OnItemEdited(items.length, i, items[i], 0);
                }
                return;
            }
        }
        for (var i = 0; i < items.length; i++) {
            if (comparer(itemData, items[i]) == 0) {
                OnItemEdited(items.length, i, items[i], -1);
                for (var j = i + 1; j < items.length; j++) {
                    items[j - 1] = items[j];
                }
                items.length--;
                for (var i = 0; i < items.length; i++) {
                    OnItemEdited(items.length, i, items[i], 0);
                }
                return;
            }
        }
    }
    this.RemoveAt = function (index) {
        if (index < 0 || index >= items.length) throw new Error("IndexOutOfRange");
        OnItemEdited(items.length, index, items[index], -1);
        for (var j = index + 1; j < items.length; j++) {
            items[j - 1] = items[j];
        }
        items.length--;
        for (var i = 0; i < items.length; i++) {
            OnItemEdited(items.length, i, items[i], 0);
        }
    }
    this.Clear = function () {
        for (var i = items.length - 1; i > -1; i--) {
            OnItemEdited(items.length, i, items[i], -1);
            items.length--;
        }
    }
    this.Count = function () {
        return items.length;
    }
    this.ItemAt = function (index, itemData) {
        if (index < 0 || index >= items.length) throw new Error("IndexOutOfRange");
        if (typeof (itemData) == "undefined") return items[index];
        items[index] = itemData;
        OnItemEdited(items.length, index, itemData, 0);
    }
    this.IndexOf = function (itemData) {
        if (typeof (itemData) == "undefined") return -1;
        for (var i = 0; i < items.length; i++) {
            if (itemData == items[i]) return i;
        }
        for (var i = 0; i < items.length; i++) {
            if (comparer(itemData, items[i]) == 0) return i;
        }
        return -1;
    }
}