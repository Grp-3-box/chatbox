const openReturnForm = document.getElementById("open-return-form");
const closeReturnForm = document.getElementById("close-return-form");
const returnModal = document.getElementById("return-modal");
const returnRequestForm = document.getElementById("return-request-form");


// Open return form
openReturnForm.addEventListener("click", () => {
    returnModal.classList.add("active");
});


// Close return form
closeReturnForm.addEventListener("click", () => {
    returnModal.classList.remove("active");
});


// Close when clicking outside the card
returnModal.addEventListener("click", (event) => {
    if (event.target === returnModal) {
        returnModal.classList.remove("active");
    }
});


// Handle form submission
returnRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const orderId = document.getElementById("order-id").value;
    const reason = document.getElementById("reason").value;

    console.log("Return request submitted:", {
        orderId,
        reason
    });

    alert(`Return request submitted for ${orderId}.`);

    returnRequestForm.reset();
    returnModal.classList.remove("active");
});