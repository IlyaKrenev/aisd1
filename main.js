class Main {
    constructor () {
        this.listSpan = document.querySelector('.listSpan');
        this.modalWindow = document.querySelector('.modalWindow');
        this.linkedList = new List(this.updateListValue);

        this.initButtons();
    }

    updateListValue = () => {
        if (this.listSpan && this.linkedList !== null) {
            this.listSpan.textContent = this.linkedList.getList();
        }
    }

    initButtons = () => {
        const buttonsContainer = document.querySelector('.buttonsContainer');
        const methodsDictionary = Object.entries(this.linkedList.methodsOptions);

        methodsDictionary.forEach(([methodName, methodsOptions]) => {
            const button = document.createElement('button');

            button.textContent = methodsOptions.name;

            if (methodsOptions.modal === false) {
                button.addEventListener('click', () => this.handleCommonClick(methodName));
            } else {
                button.addEventListener('click', () => this.openModal(methodName, methodsOptions));
            }

            buttonsContainer.append(button);
        });

        const closeModalButton = document.querySelector('.modalWindow_closeModal');

        closeModalButton.onclick = () => {
            this.hideElement(this.modalWindow);
        }
    }

    handleCommonClick = (methodName) => {
        this.linkedList[methodName]();
    }

    openModal = (methodName, methodsOptions) => {
        this.showElement(this.modalWindow, true);

        const {header: methodHeader1, header2: methodHeader2, action: methodAction} = methodsOptions;

        const modalHeader1 = document.querySelector('.modalWindow_msg1_header');
        const modalHeader2 = document.querySelector('.modalWindow_msg2_header');
        const modalInput1 = document.querySelector('.modalWindow_msg1_input');
        const modalInput2 = document.querySelector('.modalWindow_msg2_input');
        const modalButton = document.querySelector('.modalWindow_action');

        modalInput1.value = '';
        modalInput2.value = '';

        modalHeader1.textContent = methodHeader1;
        modalButton.textContent = methodAction;

        if (methodHeader2 !== undefined) {
            this.showElement(modalHeader2)
            this.showElement(modalInput2)
            modalHeader2.textContent = methodHeader2
        } else {
            this.hideElement(modalHeader2);
            this.hideElement(modalInput2);
        }

        if (methodAction !== undefined) {
            this.showElement(modalButton)
            this.showElement(modalInput1)
            modalButton.textContent = methodAction
        } else {
            this.hideElement(modalButton)
            this.hideElement(modalInput1)

            const result = this.linkedList[methodName]();
            const isBool = typeof result === 'boolean';

            let text = result;

            if (isBool) {
                text = result ? 'Да' : 'Нет';
            }

            modalHeader1.textContent += ` ${text}`;
        }

        modalButton.onclick = () => {
            const inputValue1 = modalInput1.value;
            const inputValue2 = methodHeader2 ? modalInput2.value : undefined;

            if (inputValue1 === '' || methodHeader2 && inputValue2 === '') {
                return;
            }

            if (methodHeader2 === undefined) {
                if (methodsOptions.needAnswer){
                    const res = this.linkedList[methodName](inputValue1);

                    if (res !== undefined) {
                        this.showElement(modalHeader2);
                        modalHeader2.textContent = methodsOptions.answer + res;
                        this.hideElement(modalButton)
                    }
                }
                this.linkedList[methodName](inputValue1);
            } else {
                if (methodsOptions.needAnswer){
                    const res = this.linkedList[methodName](inputValue1, inputValue2);

                    if (res !== undefined) {
                        this.showElement(modalHeader2);
                        modalHeader2.textContent = methodsOptions.answer + res;
                        this.hideElement(modalButton)
                    }
                }
                this.linkedList[methodName](inputValue1, inputValue2);
            }

            if (!methodsOptions.needAnswer) {
                this.hideElement(this.modalWindow);
                this.hideElement(modalHeader2);
            }
        }
    }

    hideElement = (elem) => {
        elem.style.display = 'none';
    }

    showElement = (elem, isFlex = false) => {
        elem.style.display = isFlex ? 'flex' : 'block';
    }
}

const a = new Main();