document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault(); // Prevent default only for internal links
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const tradeForm = document.getElementById('trade-form');
    if (tradeForm) {
        tradeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const assetType = document.getElementById('asset-type').value;
            const amount = document.getElementById('amount').value;
            const contact = document.getElementById('contact').value;

            if (!assetType || !amount || !contact) {
                alert('Please fill in all fields.');
                return;
            }

            sessionStorage.setItem('tradeDetails', JSON.stringify({ assetType, amount, contact }));

        
            fetch("https://formsubmit.co/uchetex400@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    assetType: assetType,
                    amount: amount,
                    contact: contact
                })
            });

        
            window.location.href = 'thank_you.html';
        });
    }

    if (window.location.pathname.includes("thank_you.html")) {
        const tradeDetails = sessionStorage.getItem('tradeDetails');

        if (tradeDetails) {
            const details = JSON.parse(tradeDetails);

            document.getElementById('trade-message').innerText = 
                `We have received your request to trade ${decodeURIComponent(details.assetType)} worth ${decodeURIComponent(details.amount)}. 
                We will contact you at ${decodeURIComponent(details.contact)} shortly.`;

            
            const whatsappMessage = encodeURIComponent(
                `I want to trade:\nAsset Type: ${decodeURIComponent(details.assetType)}\nAmount: ${decodeURIComponent(details.amount)}\nContact: ${decodeURIComponent(details.contact)}`
            );

        
            setTimeout(() => {
                window.location.href = `https://wa.me/+2347069771280?text=${whatsappMessage}`;
            }, 5000);
        } else {
            document.getElementById('trade-message').innerText = "Trade details not found.";
    }
   }
});