// CV download and animated contact form with robust feedback and "Send Another" button

document.addEventListener('DOMContentLoaded', function() {
  // Download CV
  const downloadBtn = document.querySelector('.download-cv');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      downloadBtn.classList.add('clicked');
      setTimeout(() => downloadBtn.classList.remove('clicked'), 500);

      // Replace 'MyCV.pdf' with your actual file name in the repo/space
      const link = document.createElement('a');
      link.href = './HapyJames_CV1.pdf'; // Path to your actual CV file
      link.download = 'HapyJames_CV1.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;

      // Remove previous response/followup if present
      let formResponse = contactForm.parentNode.querySelector('.form-response');
      let followUp = contactForm.parentNode.querySelector('.send-another');
      if (formResponse) formResponse.remove();
      if (followUp) followUp.remove();

      formResponse = document.createElement('div');
      formResponse.className = 'form-response';
      formResponse.style.display = 'block';
      formResponse.style.background = 'rgba(39,232,255,0.07)';
      formResponse.style.borderRadius = '18px';
      formResponse.style.padding = '22px 14px 18px 14px';
      formResponse.style.marginTop = '20px';
      formResponse.style.color = '#27e8ff';
      formResponse.style.fontWeight = '600';
      formResponse.style.fontSize = '1.08rem';
      formResponse.style.textAlign = 'center';
      formResponse.style.boxShadow = '0 2px 24px #27e8ff33';
      formResponse.textContent = "Sending your message...";

      contactForm.parentNode.appendChild(formResponse);

      // Use Formspree for sending to your Gmail.
      // Replace 'yourformid' with your real Formspree ID (e.g. https://formspree.io/f/yourformid)
      fetch('https://formspree.io/f/xqabdgbb', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, _replyto: email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok || data.success) {
          formResponse.textContent = "Thank you! Your message has been sent. Please check your email for a confirmation message within 24 hours.";
          contactForm.style.display = 'none';

          // Show follow-up option
          followUp = document.createElement('div');
          followUp.className = 'send-another';
          followUp.style.marginTop = '18px';
          followUp.style.display = 'flex';
          followUp.style.flexDirection = 'column';
          followUp.style.alignItems = 'center';
          followUp.innerHTML = `
            <p style="color:#fff;font-size:1.07rem;font-weight:500;margin-bottom:12px;">Want to send another message?</p>
            <button type="button" class="send-another-btn" style="
              margin-top:0;
              padding:9px 32px;
              background:#27e8ff;
              color:#232a33;
              font-weight:700;
              border:none;
              border-radius:21px;
              cursor:pointer;
              font-size:1rem;
              box-shadow:0 2px 16px #27e8ff55;
              transition:background 0.2s, color 0.2s, transform 0.19s;">
              Send Another
            </button>
          `;
          contactForm.parentNode.appendChild(followUp);

          // Animate in
          followUp.style.opacity = 0;
          followUp.style.transform = "translateY(20px)";
          setTimeout(() => {
            followUp.style.transition = "opacity 0.6s, transform 0.6s cubic-bezier(.77,0,.18,1)";
            followUp.style.opacity = 1;
            followUp.style.transform = "translateY(0)";
          }, 150);

          const sendAnotherBtn = followUp.querySelector('.send-another-btn');
          sendAnotherBtn.onmouseenter = function() {
            this.style.background = '#19a7b7';
            this.style.color = '#fff';
            this.style.transform = 'scale(1.06)';
          };
          sendAnotherBtn.onmouseleave = function() {
            this.style.background = '#27e8ff';
            this.style.color = '#232a33';
            this.style.transform = 'scale(1)';
          };
          sendAnotherBtn.onclick = function() {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formResponse.remove();
            followUp.remove();
          };
        } else {
          formResponse.style.background = '#2d2323';
          formResponse.style.color = '#ff5252';
          formResponse.textContent = "There was an error sending your message. Please try again later.";
        }
      })
      .catch(() => {
        formResponse.style.background = '#2d2323';
        formResponse.style.color = '#ff5252';
        formResponse.textContent = "There was an error sending your message. Please try again later.";
      });
    });
  }
});
