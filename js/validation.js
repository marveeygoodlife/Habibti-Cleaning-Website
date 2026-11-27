"use strict";

const form = document.getElementById("myForm");
const username = document.getElementById("fullname");
const telephoneNumber = document.getElementById("telephone");
const emailAddress = document.getElementById("email");
const message = document.getElementById("message");
const dialog = document.getElementById("dialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogText = document.getElementById("dialogText");

//helper functions

function showError(input, message) {
	const errorElement = input.nextElementSibling;
	errorElement.textContent = message;
}

function clearError(input) {
	const errorElement = input.nextElementSibling;
	errorElement.textContent = "";
}

function addClass(input) {
	input.classList.add("form-message-error");
}
function removeClass(input) {
	input.classList.remove("form-message-error");
}

function showDialog() {
	dialog.showModal();
}
function closeDialog() {
	setTimeout(() => {
		dialog.close();
	}, 5000);
}
/* validate inputs */

function validateFullName(input) {
	const nameReg = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
	const usernameValue = input.value.trim();

	if (!nameReg.test(usernameValue)) {
		addClass(input);
		showError(input, "Name can only contains alphabets");
		return false;
	}

	removeClass(input);
	clearError(input);
	return true;
}

function validatePhoneNumber(input) {
	const telephoneReg = /^\+?[\d\s\-\(\)]{7,16}$/;

	const telephoneValue = input.value.trim();
	const digitCount = telephoneValue.replace(/\D/g, "").length;

	if (!telephoneReg.test(telephoneValue) || digitCount < 7 || digitCount > 16) {
		addClass(input);
		showError(
			input,
			"Please enter a valid phone number between 7 and 16 digits.",
		);
		return false;
	}
	removeClass(input);
	clearError(input);
	return true;
}

function validateEmail(input) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const emailValue = input.value.trim();

	if (!emailRegex.test(emailValue)) {
		addClass(input);
		showError(input, "Please enter a valid email address.");
		return false;
	}

	removeClass(input);
	clearError(input);
	return true;
}

function validateMessage(input) {
	const messageRegex = /^[\s\S]{10,500}$/;
	const messageValue = input.value.trim();
	if (!messageRegex.test(messageValue)) {
		addClass(input);
		showError(input, "Message must be between 10 and 500 characters.");
		return false;
	}
	removeClass(input);
	clearError(input);
	return true;
}

username.addEventListener("blur", (e) => {
	validateFullName(e.target);
});
telephoneNumber.addEventListener("blur", (e) => {
	validatePhoneNumber(e.target);
});
emailAddress.addEventListener("blur", (e) => {
	validateEmail(e.target);
});
message.addEventListener("blur", (e) => {
	validateMessage(e.target);
});

/* submit form */

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const url = "https://formspree.io/f/maeokzbd";

	const formData = new FormData(form);
	const userName = validateFullName(username);
	const telPhone = validatePhoneNumber(telephoneNumber);
	const userEmail = validateEmail(emailAddress);
	const Message = validateMessage(message);

	if (!userName || !telPhone || !userEmail || !Message) {
		return;
	}

	/* send form data */
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { Accept: "application/json" },
			body: formData,
		});

		const data = await response.json();

		if (response.ok) {
			form.reset();
			dialogTitle.textContent = "Message Sent Successfully";
			dialogText.textContent =
				"Thank you for contacting Habibti Care Services. Your message has been received. We will get back to you shortly.";
		} else {
			dialogTitle.textContent = "Something Went Wrong";
			dialogText.textContent =
				"We couldn't send your message. Please check your details and try again, or contact us directly via WhatsApp.";
		}

		showDialog();
		closeDialog();
	} catch (error) {
		console.error("Error Message:", error.message);
		dialogTitle.textContent = "Connection Error";
		dialogText.textContent =
			"We couldn't connect to the server. Please check your internet connection and try again.";

		showDialog();
		closeDialog();
	}
});

