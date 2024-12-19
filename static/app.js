class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            resetButton: document.querySelector('.chatbox__reset'),  // Reset button
            logoutButton: document.querySelector('.chatbox__logout')  // Logout button
        }

        this.state = false;
        this.messages = [];
        this.sessionStart = new Date();  // Session tracking start timestamp
    }

    display() {
        const {openButton, chatBox, sendButton, resetButton, logoutButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        resetButton.addEventListener('click', () => this.resetConversation(chatBox))  // Reset button event
        logoutButton.addEventListener('click', () => this.logout())  // Logout button event

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1, timestamp: new Date() }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Sam", message: r.answer, timestamp: new Date() };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            let timestamp = item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            if (item.name === "Sam") {
                html += `<div class="messages__item messages__item--visitor">
                            ${item.message}
                            <small style="font-size: 0.6rem; display: block; text-align: right;">${timestamp}</small>
                        </div>`;
            } else {
                html += `<div class="messages__item messages__item--operator">
                            ${item.message}
                            <small style="font-size: 0.6rem; display: block; text-align: right;">${timestamp}</small>
                        </div>`;
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }    

    resetConversation(chatbox) {
        this.messages = [];
        this.updateChatText(chatbox);
    }

    logout() {
        fetch('/logout', {
            method: 'GET',
            mode: 'cors'
        })
        .then(() => {
            window.location.href = '/login';  // Redirect to login page
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

const chatbox = new Chatbox();
chatbox.display();
