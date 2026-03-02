// AOS & Loading
AOS.init({ duration: 1000, once: true });
window.addEventListener('load', () => document.querySelector('.loading-screen').classList.add('hidden'));

// Navbar Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});

// TELEGRAM BOT
const BOT_TOKEN = '8518529421:AAF_6XuTQRrHecNwOxVFQMta0NaupfGEHl0';
const CHAT_ID = '1726234639';

document.getElementById('telegramForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const status = document.getElementById('telegramStatus');
    
    const text = `🚀 *PESAN BARU WEBSITE 2026*\n\n` +
                 `👤 *Nama:* ${document.getElementById('name').value}\n` +
                 `📧 *Email:* ${document.getElementById('email').value}\n` +
                 `📌 *Subjek:* ${document.getElementById('subject').value}\n` +
                 `💬 *Pesan:* ${document.getElementById('message').value}`;

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Mengirim...';

    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'Markdown' })
        });
        if(res.ok) {
            status.innerHTML = '<span class="text-success fw-bold">✅ Terkirim ke Telegram Dimas!</span>';
            this.reset();
        }
    } catch (err) {
        status.innerHTML = '<span class="text-danger">❌ Gagal mengirim. Cek koneksi.</span>';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fab fa-telegram me-2"></i>Kirim ke Telegram';
    }
});