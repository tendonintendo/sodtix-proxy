const showToast = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
};

async function handleTicket(type) {
    // 1. OPEN BLANK TAB IMMEDIATELY (Safari needs this to be sync with the click)
    const newWindow = window.open('about:blank', '_blank');

    try {
        const response = await fetch(`/api/${type}`);
        const result = await response.json();
        const data = result && result.data;

        if (data && data.isOpen && data.link_url) {
            // 2. UPDATE THE ALREADY OPENED TAB
            newWindow.location.href = data.link_url;
        } else {
            // 3. CLOSE TAB IF NOT OPEN AND SHOW TOAST
            newWindow.close();
            showToast(`${type.toUpperCase()} NOT OPEN YET`);
        }
    } catch (err) {
        newWindow.close();
        showToast("CONNECTION ERROR");
    }
}