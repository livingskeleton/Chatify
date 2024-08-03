// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateMessageContent') {
        updateMessageContent(request.state);
        sendResponse({ status: 'done' });
    }
});

// toggle change message change
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
