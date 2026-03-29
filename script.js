/// Star Wars–themed chat data
const chatData = {
    general: [{
            sender: "Luke Skywalker",
            text: "May the Force be with you, everyone.",
            fromSelf: false,
        },
        {
            sender: "You",
            text: "Always",
            fromSelf: true,
        },
        {
            sender: "Leia Organa",
            text: "Focus, team. We have a new transmission from Hoth Command.",
            fromSelf: false,
        },
    ],

    planning: [{
            sender: "Han Solo",
            text: "I've got a bad feeling about this mission...",
            fromSelf: false,
        },
        {
            sender: "You",
            text: "It's just a quick hyperspace jump.",
            fromSelf: true,
        },
        {
            sender: "Chewbacca",
            text: "Rrrrghh!",
            fromSelf: false,
        },
        {
            sender: "Han Solo",
            text: "Chewie agrees. We should double-check the nav-computer.",
            fromSelf: false,
        },
    ],

    feedback: [{
            sender: "Obi-Wan Kenobi",
            text: "Remember: The Force will be with you, always.",
            fromSelf: false,
        },
        {
            sender: "Yoda",
            text: "Do or do not. There is no try.",
            fromSelf: false,
        },
        {
            sender: "You",
            text: "Wise words",
            fromSelf: true,
        },
    ],
};

// Grab all the important elements from the page so we can interact with them
let channels = document.querySelectorAll(".channel"); // all sidebar buttons
let chatMessages = document.getElementById("chat-messages"); // message area
let channelTitle = document.getElementById("channel-title"); // top title
let template = document.querySelector("template"); // message template

let messageInput = document.getElementById("message-input"); // input box
let sendButton = document.querySelector(".chat-input button"); // send button

// Keep track of which channel we're currently on
let currentChannel = "general";

// This runs when a user clicks on a channel
function changeChannel(event) {
    // Remove the "active" style from the currently selected channel
    document.querySelector(".channel.active").classList.remove("active");

    // Add "active" to the one that was just clicked
    let clickedChannel = event.target;
    clickedChannel.classList.add("active");

    // Get the channel name from the data attribute
    let channelName = clickedChannel.dataset.channel;
    currentChannel = channelName;

    // Update the header text
    channelTitle.textContent =
        channelName.charAt(0).toUpperCase() + channelName.slice(1);

    // Load that channel’s messages
    populateMessages(channelName);
}

// This function clears and rebuilds the message list
function populateMessages(channelName) {
    // Clear existing messages
    chatMessages.innerHTML = "";

    // Get messages from our data object
    let messages = chatData[channelName];

    // Loop through each message
    messages.forEach((msg) => {
        // Clone the template
        let messageElement = template.content.cloneNode(true);

        // Grab parts to edit
        let messageDiv = messageElement.querySelector(".message");
        let sender = messageElement.querySelector(".sender");
        let text = messageElement.querySelector(".text");

        // Fill in the message
        sender.textContent = msg.sender + ":";
        text.textContent = msg.text;

        // Apply styling if it's your message
        if (msg.fromSelf) {
            messageDiv.classList.add("self");
        }

        // Add to the chat window
        chatMessages.appendChild(messageElement);
    });
}

// Handles sending a new message (extra credit)
function sendMessage() {
    // Get input text
    let text = messageInput.value.trim();

    // Don't send empty messages
    if (text === "") return;

    // Create new message object
    let newMessage = {
        sender: "You",
        text: text,
        fromSelf: true,
    };

    // Add it to the current channel
    chatData[currentChannel].push(newMessage);

    // Create the message visually
    let messageElement = template.content.cloneNode(true);

    let messageDiv = messageElement.querySelector(".message");
    let sender = messageElement.querySelector(".sender");
    let messageText = messageElement.querySelector(".text");

    // Fill it in
    sender.textContent = "You:";
    messageText.textContent = text;

    // Style it as your message
    messageDiv.classList.add("self");

    // Add to screen
    chatMessages.appendChild(messageElement);

    // Clear input box
    messageInput.value = "";

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Set up all click events
function initializeEventListeners() {
    // Channel clicks
    channels.forEach((channel) => {
        channel.addEventListener("click", changeChannel);
    });

    // Send button click
    sendButton.addEventListener("click", sendMessage);
}

// Run on page load
initializeEventListeners();

// Load default messages
populateMessages(currentChannel);