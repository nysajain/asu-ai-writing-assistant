const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");

hide_sidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});


const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");

show_user_menu.addEventListener("click", () => {
    if (user_menu.classList.contains("show")) {
        user_menu.classList.toggle("show");
        setTimeout(() => {
            user_menu.classList.toggle("show-animate");
        }, 200);
    } else {
        user_menu.classList.toggle("show-animate");
        setTimeout(() => {
            user_menu.classList.toggle("show");
        }, 50);
    }
});

function show_view(view_selector) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    const view = document.querySelector(view_selector);
    if (view) view.style.display = "flex";
}

function showStepView(step) {
    document.querySelectorAll(".view.conversation-view").forEach(view => {
        view.style.display = "none";
    });

    show_view(".hide-all"); // just in case

    const selectedView = document.querySelector(`#${step}-view`);
    if (selectedView) selectedView.style.display = "flex";
}

new_chat_button.addEventListener("click", () => {
    show_view(".new-chat-view");
});

document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", () => {
        show_view(".conversation-view");
    });
});

let currentStep = null;

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        currentStep = tab.dataset.step;
        showStepView(currentStep);
    });
});

document.querySelectorAll(".step-button").forEach(button => {
    button.addEventListener("click", () => {
        const step = button.dataset.step;
        currentStep = step;

        document.querySelectorAll(".tab").forEach(t => {
            t.classList.toggle("active", t.dataset.step === step);
        });

        showStepView(step);
    });
});

document.querySelectorAll(".home-icon-button").forEach(button => {
    button.addEventListener("click", () => {
        currentStep = null;
        document.querySelectorAll(".view.conversation-view").forEach(view => {
            view.style.display = "none";
        });
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        show_view(".new-chat-view");
    });
});

// === Per-step message handling ===

const steps = ["prewriting", "research", "drafting", "revising", "editing"];
const API_BASE_URL = "https://pia-asu-writing-center-project.onrender.com/";  // Change if deploying

function formatResponse(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold formatting
        .split("\n")
        .map(line => `<p>${line.trim()}</p>`)
        .join("");
}

steps.forEach(step => {
    const textarea = document.getElementById(`message-${step}`);
    const sendBtn = document.getElementById(`send-${step}`);
    const messagesContainer = document.getElementById(`${step}-messages`);

    if (!textarea || !sendBtn || !messagesContainer) return;

    // Auto-resize textarea
    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight + 2, 200) + "px";
    });

    // Handle sending message
    sendBtn.addEventListener("click", async () => {
        const userMessage = textarea.value.trim();
        if (!userMessage) return;

        // Display user message
        const userDiv = document.createElement("div");
        userDiv.className = "user message";
        userDiv.innerHTML = `
            <div class="identity"><i class="user-icon">u</i></div>
            <div class="content"><p>${userMessage}</p></div>
        `;
        messagesContainer.appendChild(userDiv);

        // Clear input
        textarea.value = "";
        textarea.style.height = "auto";

        try {
            const res = await fetch(`${API_BASE_URL}/${step}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            const botDiv = document.createElement("div");
            botDiv.className = "assistant message";
            botDiv.innerHTML = `
                <div class="identity"><i class="gpt user-icon">G</i></div>
                <div class="content">${formatResponse(data.response)}</div>
            `;
            messagesContainer.appendChild(botDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (err) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "assistant message";
            errorDiv.innerHTML = `
                <div class="identity"><i class="gpt user-icon">G</i></div>
                <div class="content"><p><b>Error:</b> Could not reach the server.</p></div>
            `;
            messagesContainer.appendChild(errorDiv);
        }
    });
});
