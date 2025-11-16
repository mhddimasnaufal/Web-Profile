// Audio player functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const toggleButton = document.getElementById('music-toggle');
    const icon = toggleButton.querySelector('i');
    
    // Try to play audio automatically (with user interaction requirement)
    document.body.addEventListener('click', function initAudio() {
        if (audio.paused) {
            audio.play().then(() => {
                // Audio started successfully
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }).catch(error => {
                // Auto-play was prevented, show play button
                console.log('Auto-play prevented:', error);
            });
        }
        
        // Remove this event listener after first click
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Toggle play/pause on button click
    toggleButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
    
    // Update button when audio ends (though it should loop)
    audio.addEventListener('ended', function() {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    });
});