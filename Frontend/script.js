const pdfLinks = document.querySelectorAll('.pdf-link');
const pdfViewer = document.querySelector('.pdf-segment .pdf-viewer');
const downloadLink = document.querySelector('.pdf-segment .download-pdf-link');
let activeIndex = -1;

function displayPDF(index) {
    const pdfUrl = pdfLinks[index].getAttribute('data-pdf');

    // Hide the previously displayed PDF (if any)
    if (activeIndex !== -1) {
        pdfViewer.style.display = 'none';
        downloadLink.style.display = 'none';
    }

    // Display the new PDF in the PDF segment
    pdfViewer.setAttribute('src', pdfUrl);
    pdfViewer.style.display = 'block';

    // Display the "Download PDF" link
    downloadLink.setAttribute('href', pdfUrl);
    downloadLink.style.display = 'block';

    // Set a timeout to hide the PDF viewer and download link after 30 seconds (30000 milliseconds)
    setTimeout(() => {
        pdfViewer.style.display = 'none';
        downloadLink.style.display = 'none';

        // Set a timeout to display the next PDF after 3 seconds (3000 milliseconds)
        setTimeout(() => {
            // Increment the activeIndex and loop back to the first PDF if needed
            activeIndex = (activeIndex + 1) % pdfLinks.length;

            // Display the next PDF after the 3-second delay
            displayPDF(activeIndex);
        }, 3000); // 3 seconds
    }, 10000); // 30 seconds
}

pdfLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Start displaying PDFs
        displayPDF(index);
    });
});

// Scroll the notice board section automatically
const noticeBoard = document.querySelector('.notice-board-list');

function scrollNoticeBoard() {
    if (noticeBoard.scrollTop < noticeBoard.scrollHeight - noticeBoard.clientHeight) {
        noticeBoard.scrollTop += 1; // Adjust the scrolling speed by changing this value
    } else {
        noticeBoard.scrollTop = 0;
    }
}

setInterval(scrollNoticeBoard, 50); // Adjust the scrolling interval by changing this value


// Function to handle smooth scrolling when clicking on navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
        });
    }
}

// Add click event listeners to your navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            // Set the stream as the source for the video element
            const videoElement = document.getElementById('live-video');
            videoElement.srcObject = stream;
        })
        .catch(function (error) {
            console.error('Error accessing the camera:', error);
        });
} else {
    console.error('getUserMedia is not supported in this browser');
}

