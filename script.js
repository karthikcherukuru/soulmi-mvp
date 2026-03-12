// --- Sticky Navbar ---
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// --- Scroll Reveal Animations ---
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

reveals.forEach(reveal => revealOnScroll.observe(reveal));
window.addEventListener('load', () => {
    reveals.forEach(reveal => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 50) {
            reveal.classList.add('active');
        }
    });
});

// --- Zen Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'light') {
        html.setAttribute('data-theme', 'zen');
    } else {
        html.setAttribute('data-theme', 'light');
    }
});

// --- Dynamic Mood Slider ---
const moodSlider = document.getElementById('mood-slider');
const rootStyles = document.documentElement.style;

moodSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val < 40) {
        rootStyles.setProperty('--soft-blue', '#64748b'); 
        rootStyles.setProperty('--mint', '#94a3b8');     
    } else if (val >= 40 && val < 70) {
        rootStyles.setProperty('--soft-blue', '#a3c4f3'); 
        rootStyles.setProperty('--mint', '#81e6d9');      
    } else {
        rootStyles.setProperty('--soft-blue', '#a3c4f3');
        rootStyles.setProperty('--mint', '#8ee4af');      
    }
});

// --- Draggable Therapist Slider ---
const slider = document.getElementById('therapist-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; 
    slider.scrollLeft = scrollLeft - walk;
});

// --- Interactive AI Chat Widget ---
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input-field');
const chatBody = document.getElementById('chat-body');

chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user-msg');
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'SoulMi AI is typing...';
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        
        const aiResponses = [
            "I hear you. Take a deep breath, I'm right here with you.",
            "It's completely okay to feel that way. You are in a safe space.",
            "That sounds difficult. Would you like to try a quick grounding exercise?",
            "Thank you for sharing that with me. I'm listening."
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMsg = document.createElement('div');
        aiMsg.classList.add('message', 'ai-msg');
        aiMsg.textContent = randomResponse;
        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- NEW: Breathing Exercise Modal Logic ---
const breatheBtn = document.getElementById('open-breathe');
const breatheModal = document.getElementById('breathing-modal');
const closeBreathe = document.getElementById('close-breathe');
const breatheText = document.getElementById('breathe-text');
const breatheCircle = document.querySelector('.breathe-circle');
let breatheInterval;

breatheBtn.addEventListener('click', (e) => {
    e.preventDefault();
    breatheModal.classList.add('active');
    
    // Start sequence
    breatheText.innerText = "Breathe In...";
    breatheCircle.style.transform = "scale(2)";
    
    breatheInterval = setInterval(() => {
        if (breatheText.innerText === "Breathe In...") {
            breatheText.innerText = "Breathe Out...";
            breatheCircle.style.transform = "scale(1)";
        } else {
            breatheText.innerText = "Breathe In...";
            breatheCircle.style.transform = "scale(2)";
        }
    }, 4000); // 4 seconds in, 4 seconds out
});

closeBreathe.addEventListener('click', () => {
    breatheModal.classList.remove('active');
    clearInterval(breatheInterval);
    setTimeout(() => {
        breatheText.innerText = "Ready?";
        breatheCircle.style.transform = "scale(1)";
    }, 300);
});

// --- NEW: Daily Affirmation Logic ---
const affBtn = document.getElementById('new-affirmation');
const affText = document.getElementById('affirmation-text');
const affirmations = [
    "You are enough just as you are.",
    "Every storm runs out of rain.",
    "It's okay to rest and reset.",
    "Your feelings are completely valid.",
    "Progress, not perfection.",
    "You are stronger than you think.",
    "Breathe. You've got this."
];

affBtn.addEventListener('click', () => {
    affText.style.opacity = 0; // Fade out
    
    setTimeout(() => {
        // Pick random affirmation that isn't the current one
        let newAff = affirmations[Math.floor(Math.random() * affirmations.length)];
        while(newAff === affText.innerText.replace(/"/g, '')) {
            newAff = affirmations[Math.floor(Math.random() * affirmations.length)];
        }
        
        affText.innerText = `"${newAff}"`;
        affText.style.opacity = 1; // Fade in
    }, 400); // Wait for fade out to complete
});