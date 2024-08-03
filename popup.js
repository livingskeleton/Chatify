document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('usersubmit').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const userkey = document.getElementById('userkey').value;
        if (username && userkey) {
            chrome.storage.sync.set({ [userkey]: username }, () => {
                alert('User data saved successfully!');
            });
        } else {
            alert('Please enter both username and userkey.');
        }
    });

    document.getElementById('groupsubmit').addEventListener('click', () => {
        const grouplink = document.getElementById('grouplink').value;
        const groupkey = document.getElementById('groupkey').value;
        if (grouplink && groupkey) {
            chrome.storage.sync.set({ [groupkey]: grouplink }, () => {
                alert('Group data saved successfully!');
            });
        } else {
            alert('Please enter both grouplink and groupkey.');
        }
    });

    //change in toggle 
    document.getElementById('toggle-switch').addEventListener('change', (event) => {
        const state = event.target.checked;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: updateMessageContent,
                args: [state]
            });
        });
    });
});

//change the message
function updateMessageContent(state) {
    const messageContents = document.querySelectorAll('.message_content p');
    messageContents.forEach(p => {
        if (state) {
            if (p.textContent === 'done') {
                p.textContent = 'Ok';
            }
        } else {
            if (p.textContent === 'Ok') {
                p.textContent = 'done';
            }
        }
    });
}
