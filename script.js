// Selecting the file input and download button elements from the DOM
const fileInput = document.querySelector("input"),
      downloadBtn = document.querySelector("button");

// Adding an event listener to the download button for click events
downloadBtn.addEventListener("click", e => {
    e.preventDefault(); // Prevents the default form submission action
    downloadBtn.innerText = "Downloading file..."; // Updates the button text to indicate download in progress
    fetchFile(fileInput.value); // Calls the fetchFile function with the URL entered in the input field
});

// Function to fetch and download a file given a URL
function fetchFile(url) {
    fetch(url) // Uses the fetch API to retrieve the file from the URL
    .then(res => res.blob()) // Converts the response to a Blob object
    .then(file => {
        // Process to download the file
        let tempUrl = URL.createObjectURL(file); // Creates a temporary URL for the downloaded file
        const aTag = document.createElement("a"); 
        aTag.href = tempUrl; // Sets the href of the anchor tag to the temporary URL
        aTag.download = url.replace(/^.*[\\\/]/, ''); // Sets the download attribute to extract the file name from the URL
        document.body.appendChild(aTag); // Appends the anchor tag to the body of the document
        aTag.click(); // Programmatically clicks the anchor tag to start the download
        downloadBtn.innerText = "Download File"; // Resets the button text back to original
        URL.revokeObjectURL(tempUrl); // Revokes the created temporary URL to free resources
        aTag.remove(); // Removes the anchor tag from the document
    }).catch(() => {
        alert("Failed to download file!"); // Alert the user that the download failed
        downloadBtn.innerText = "Download File"; // Resets the button text back to original
    });
}
