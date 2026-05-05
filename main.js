const showToast = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1600); // Clean up DOM
};

async function handleTicket(type) {
    // Note: We don't disable the button here so user can spam click
    try {
        const response = await fetch(`/api/${type}`);
        const result = await response.json();
        const data = result && result.data;

        if (data && data.isOpen && data.link_url) {
            window.open(data.link_url, '_blank', 'noopener,noreferrer');
        } else {
            showToast(`${type.toUpperCase()} NOT OPEN YET`);
        }
    } catch (err) {
        showToast("CONNECTION ERROR");
    }
}