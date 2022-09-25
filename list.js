class Dialog {
    constructor () {
        this.dialog = document.querySelector('.dialog');
    }

    show (msg, isError = false) {
        this.dialog.textContent = msg;
        this.dialog.style.display = 'flex';

        this.dialog.style.backgroundColor = isError ? 'indianred' : 'deepskyblue';

        setTimeout(() => {
            this.dialog.style.display = 'none'
        }, 3000)
    }
}

class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class List {
    constructor (callback) {
        this.onChangeListFN = callback;

        this._head = null;

        this.dialog = new Dialog();
    }

    get head () {
        return this._head;
    }

    set head (value) {
        this._head = value;
        this.onChangeListFN();
    }

    prepend (value) {
        const newNode = new ListNode(value, this.head);

        this.head = newNode;

        this.dialog.show('Значение добавлено успешно')
    }

    append (value, needMessage = true) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;

            needMessage && this.dialog.show('Значение добавлено успешно');
            return;
        }

        let tempNode = this.head;

        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }

        tempNode.next = newNode;

        this.onChangeListFN();

        if (needMessage) {
            this.dialog.show('Значение добавлено успешно');
        }
    }

    deleteLast () {
        if (this.head === null) {
            this.dialog.show('Список пуст', true);
            return;
        }

        if (this.head.next === null) {
            this.head = null;
            this.dialog.show('Значение удалено успешно');

            return;
        }

        let prelastNode = this.head;

        while (prelastNode.next !== null) {
            if (prelastNode.next.next === null) {
                prelastNode.next = null;
            }
            else {
                prelastNode = prelastNode.next;
            }
        }

        this.onChangeListFN();

        this.dialog.show('Значение удалено успешно');
    }

    deleteFirst () {
        if (!this.head) {
            this.dialog.show('Элемент не найден', true);
            return;
        }

        if (this.head.next) {
            this.head = this.head.next;
        }
        else {
            this.head = null;
        }

        this.dialog.show('Значение удалено успешно');
    }

    isNull () {
        return this.head === null;
    }

    getList () {
        let outArray = [];
        let node = this.head;

        if (node !== null) {
            while (node !== null) {
                outArray.push(node.value);
                node = node.next;
            }
        }

        return outArray;
    }

    getSize () {
        let node = this.head;
        let size = 0;
    
        while (node !== null) {
            size += 1;
            node = node.next;
        }
    
        return size;
    }

    getElemByIndex (index) {
        let node = this.head;

        if (node === null) {
            this.dialog.show('Элемент не найден', true);
            return;
        }

        for (let i = 0; i < Number(index); i++) {
            if (node.next !== null) {
                node = node.next;
            } else {
                this.dialog.show('Элемент не найден', true);
                return;
            }
        }

        return node.value;
    }

    clearList () {
        while (this.head !== null) {
            const node = this.head.next;

            this.head = null;

            this.head = node;
        }

        this.dialog.show('Список очищен');
    }

    insert(index, value) {
        if (Number(index) === 0) {
            this.prepend(value);
            return;
        }

        const newNode = new ListNode(value);

        let node = this.head;
        
        for (let i = 0; i < Number(index) - 1; i++) {
            if (node.next !== null) {
                node = node.next;
            } else {
                this.dialog.show('Элемент не найден', true);
                return;
            }
        }
    
        newNode.next = node.next;
    
        node.next = newNode;

        this.dialog.show('Элемент успешно добавлен');

        this.onChangeListFN()
    }

    removeElemByIndex (index) {
        if (this.head === null) {
            this.dialog.show('Элемент не найден', true);
            return;
        }

        if (Number(index) === 0){
            this.deleteFirst();

            return;
        }

        let node = this.head;

        let current = this.head;

        for (let i = 1; i < Number(index); i++) {
            if (node.next !== null) {
                current = node;
                node = node.next;
            } else {
                this.dialog.show('Элемент не найден', true);

                return;
            }
        }

        node = current.next;
        current.next = current.next.next;

        node = null;

        this.dialog.show('Элемент успешно удален');

        this.onChangeListFN()
    }

    updateElemByIndex (index, value) {
        let node = this.head;

        if (node === null) {
            this.dialog.show('Элемент не найден', true);
            return;
        }
        
        for (let i = 0; i < Number(index) - 1; i++) {
            if (node.next !== null) {
                node = node.next;
            } else {
                this.dialog.show('Элемент не найден', true);
                return;
            }
        }
    
        node.value = value;

        this.dialog.show('Элемент успешно обновлен');

        this.onChangeListFN()
    }

    reverseList (list) {
        let reversedList = null;

        for (let node = list; node !== null; node = node.next) {
            node.next = reversedList;
            reversedList = node;
        }

        return reversedList;
    }

    prependList () {
        let newList = new List(() => {});

        for (let i = 0; i < 5; i++) {
            newList.append(Math.floor(Math.random() * 10), false);
        }

        const newListValue = newList.getList();

        let newListNode = newList.head;

        if (this.head === null) {
            while (newListNode !== null) {
                this.append(newListNode.value, false);
    
                newListNode = newListNode.next;
            }

            this.dialog.show(`Новый список (${newListValue}) успешно добавлен в начало основного`);

            return;
        }

        let current = newList.head;
        let prev = null;
        let next = null;

        while (current !== null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        newList.head = prev;

        let reversedListNode = newList.head;

        while (reversedListNode !== null) {
            this.prepend(reversedListNode.value, false);

            reversedListNode = reversedListNode.next;
        }

        newList = null;

        this.dialog.show(`Новый список (${newListValue}) успешно добавлен в начало основного`);
    }

    methodsOptions = {
        'prepend': {name: 'Добавить в начало', modal: true, header: 'Укажите значение элемента:', action: 'Добавить'},
        'append':  {name: 'Добавить в конец', modal: true, header: 'Укажите значение элемента:', action: 'Добавить'},
        'insert': {name: 'Добавить элемент по индексу', modal: true, header: 'Укажите номер элемента:', header2: 'Укажите значение элемента:', action: 'Добавить'},
        'deleteLast': {name: 'Удалить последний элемент', modal: false},
        'deleteFirst': {name: 'Удалить первый элемент', modal: false},
        'isNull': {name: 'Проверка на пустоту', modal: true, header: 'Список пуст:'},
        'getSize': {name: 'Получить размер списка', modal: true, header: 'Размер списка:'},
        'getElemByIndex': {name: 'Получить элемент по индексу', modal: true, header: 'Укажите номер элемента:', action: 'Найти', needAnswer: true, answer: 'Элемент: '},
        'removeElemByIndex': {name: 'Удалить элемент по индексу', modal: true, header: 'Укажите номер элемента:', action: 'Удалить'}, //
        'updateElemByIndex': {name: 'Заменить элемент по индексу', modal: true, header: 'Укажите номер элемента:', header2: 'Укажите значение элемента:', action: 'Обновить'}, //
        'clearList': {name: 'Очистить список', modal: false},
        'prependList': {name: 'Добавить список в начало', modal: false}
    }
}