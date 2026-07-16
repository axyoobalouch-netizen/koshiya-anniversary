document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    
    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    
    const screenIntro = document.getElementById("screen-intro");
    const screenGift = document.getElementById("screen-gift");
    const screenEnvelope = document.getElementById("screen-envelope");
    const screenFinal = document.getElementById("screen-final");
    
    const typewriterElement = document.getElementById("typewriter");
    const giftBox = document.getElementById("gift-box");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const closeLetterBtn = document.getElementById("close-letter-btn");
    const slideshowImg = document.getElementById("slideshow-img");
    const heartsContainer = document.getElementById("hearts-container");

    const imagePaths = [
        "IMG_20260715_004022_975.jpg",
        "IMG_20260713_073548_771.jpg",
        "IMG_20260609_000604_767.jpg",
        "IMG_20260602_150235_443.jpg",
        "IMG_20260531_201850_773.jpg",
        "IMG_20260523_182613_321.jpg",
        "IMG_20260523_182352_126.jpg",
        "IMG_20260523_181523_681.jpg",
        "IMG_20260523_180902_657.jpg",
        "IMG_20260523_175744_735.jpg",
        "IMG_20260523_175117_335.jpg",
        "IMG_20260523_175130_871.jpg",
        "IMG_20260523_175135_169.jpg",
        "IMG_20260523_175158_518.jpg",
        "IMG_20260523_175233_727.jpg",
        "IMG_20260523_175235_314.jpg",
        "IMG_20260523_175247_028.jpg",
        "IMG_20260523_175528_745.jpg",
        "IMG_20260523_175551_486.jpg",
        "IMG_20260523_175634_836.jpg",
        "IMG_20260523_175812_520.jpg",
        "IMG_20260523_180000_167.jpg",
        "IMG_20260523_180407_785.jpg",
        "IMG_20260523_180246_185.jpg",
        "IMG_20260523_180304_197.jpg",
        "IMG_20260523_180345_530.jpg",
        "IMG_20260523_180532_647.jpg",
        "IMG_20260523_180632_720.jpg",
        "IMG_20260523_181419_499.jpg",
        "IMG_20260523_182441_087.jpg"
    ];

    let currentImgIndex = 0;
    let slideshowInterval;
    let stars = [];
    const starCount = 80;

    const introText = "Happy Anniversary Meri Jaan... ❤️ Tap anywhere to enter our beautiful world.";
    let charIndex = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speed = Math.random() * 0.15 + 0.05;
            this.alpha = Math.random();
            this.deltaAlpha = Math.random() * 0.012 * (Math.random() > 0.5 ? 1 : -1);
        }
        update() {
            this.alpha += this.deltaAlpha;
            if (this.alpha <= 0.1 || this.alpha >= 1) {
                this.deltaAlpha = -this.deltaAlpha;
            }
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    function generateFloatingHeart() {
        const heartSymbols = ["❤️", "💖", "💕", "🌸", "🌹"];
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = Math.random() * 100 + "vw";
        const duration = Math.random() * 4 + 4;
        heart.style.animationDuration = duration + "s";
        heart.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    setInterval(generateFloatingHeart, 500);

    document.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('#letter')) return;
        
        const count = 6;
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement("div");
            sparkle.classList.add("tap-heart");
            sparkle.innerHTML = Math.random() > 0.5 ? "❤️" : "🌸";
            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.setProperty("--x", `${x}px`);
            sparkle.style.setProperty("--y", `${y}px`);
            
            document.body.appendChild(sparkle);
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    });

    function typeEffect() {
        if (charIndex < introText.length) {
            typewriterElement.textContent += introText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 70);
        }
    }
    typeEffect();

    function startMusic() {
        audio.play()
            .then(() => {
                musicBtn.textContent = "🔊 Pause Music";
                musicBtn.classList.remove("hidden");
            })
            .catch(() => {
                musicBtn.textContent = "🎵 Play Music";
                musicBtn.classList.remove("hidden");
            });
    }

    musicBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            musicBtn.textContent = "🔊 Pause Music";
        } else {
            audio.pause();
            musicBtn.textContent = "🎵 Play Music";
        }
    });

    screenIntro.addEventListener("click", () => {
        startMusic();
        transitionScreen(screenIntro, screenGift);
    });

    giftBox.addEventListener("click", () => {
        giftBox.classList.add("opened");
        setTimeout(() => {
            transitionScreen(screenGift, screenEnvelope);
        }, 1200);
    });

    envelopeWrapper.addEventListener("click", (e) => {
        if (e.target.closest('.letter-text')) return;

        envelopeWrapper.classList.toggle("open");
        
        if (envelopeWrapper.classList.contains("open")) {
            setTimeout(() => {
                closeLetterBtn.classList.remove("hidden");
            }, 1000);
        } else {
            closeLetterBtn.classList.add("hidden");
        }
    });

    closeLetterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        transitionScreen(screenEnvelope, screenFinal);
        startSlideshow();
        startLoveTimer();
    });

    slideshowImg.addEventListener("error", () => {
        showNextImage();
    });

    function showNextImage() {
        currentImgIndex = (currentImgIndex + 1) % imagePaths.length;
        
        slideshowImg.classList.remove("active-slide");
        setTimeout(() => {
            slideshowImg.src = imagePaths[currentImgIndex];
            slideshowImg.classList.add("active-slide");
        }, 600);
    }

    function startSlideshow() {
        if (slideshowInterval) clearInterval(slideshowInterval);
        
        slideshowImg.src = imagePaths[currentImgIndex];
        slideshowImg.classList.add("active-slide");

        slideshowInterval = setInterval(() => {
            showNextImage();
        }, 3500);
    }

    // ==========================================
    // ❤️ RELATIONSHIP START DATE (23 July 2025):
    // ==========================================
    const anniversaryStartDate = new Date("2025-07-23T00:00:00");

    function startLoveTimer() {
        function updateTimer() {
            const now = new Date();
            const difference = now.getTime() - anniversaryStartDate.getTime();

            if (difference < 0) {
                document.getElementById("years").textContent = "00";
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
                return;
            }

            // Calculation units
            const msPerSecond = 1000;
            const msPerMinute = msPerSecond * 60;
            const msPerHour = msPerMinute * 60;
            const msPerDay = msPerHour * 24;
            const msPerYear = msPerDay * 365.25;

            // Calculate whole units
            const years = Math.floor(difference / msPerYear);
            let remainingMs = difference % msPerYear;

            const days = Math.floor(remainingMs / msPerDay);
            remainingMs = remainingMs % msPerDay;

            const hours = Math.floor(remainingMs / msPerHour);
            remainingMs = remainingMs % msPerHour;

            const minutes = Math.floor(remainingMs / msPerMinute);
            remainingMs = remainingMs % msPerMinute;

            const seconds = Math.floor(remainingMs / msPerSecond);

            document.getElementById("years").textContent = years < 10 ? "0" + years : years;
            document.getElementById("days").textContent = days < 10 ? "0" + days : days;
            document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    function transitionScreen(fromScreen, toScreen) {
        fromScreen.classList.add("hidden");
        fromScreen.classList.remove("active");
        
        setTimeout(() => {
            toScreen.classList.remove("hidden");
            toScreen.classList.add("active");
        }, 800);
    }
});
