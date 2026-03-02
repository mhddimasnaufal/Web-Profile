document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    const icon = btn.querySelector('i');

    // Auto-play hint
    document.body.addEventListener('click', function() {
        if(audio.paused) {
            audio.play().catch(e => console.log("Audio play blocked"));
            icon.classList.replace('fa-play', 'fa-pause');
        }
    }, { once: true });

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if(audio.paused) {
            audio.play();
            icon.classList.replace('fa-play', 'fa-pause');
        } else {
            audio.pause();
            icon.classList.replace('fa-pause', 'fa-play');
        }
    });
});