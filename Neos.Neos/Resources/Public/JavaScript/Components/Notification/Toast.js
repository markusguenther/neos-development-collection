import { isNil } from "../../Helper";
import Message from "./Message";

const defaultOptions = {
	position: "neos-notification-top",
	timeout: 5000,
	type: "info",
};

export default class Toast {
	constructor() {
		this._container = document.getElementById("neos-notification-container");
		this._initialize();
	}

	_initialize() {
		if (isNil(this._container)) {
			const applicationContainer = document.getElementById("neos-application");
			if (!isNil(applicationContainer)) {
				this._container = document.createElement("div");
				this._container.id = "neos-notification-container";
				applicationContainer.appendChild(this._container);
			}
		}
	}

	/**
	 * Internal function to creates a Message and adds them to the notification container
	 *
	 * @param {Object} options
	 * @returns {void}
	 */
	_create(options) {
		const toastOptions = { ...defaultOptions, ...options };
		if (!isNil(toastOptions.position)) {
			this._container.classList.add(toastOptions.position);
		}

		new Message(toastOptions, this._container);
	}

	/**
	 * Creates a new notification as Message
	 *
	 * @param {Object} options
	 * @returns {void}
	 */
	static create(options) {
		if (isNil(this._container)) {
			const toast = new Toast();
			toast._create(options);
		} else {
			this._create(options);
		}
	}

	/**
	 * Removes all messages within the notification container
	 *
	 * @returns {void}
	 */
	static removeAll() {
		const messages = Array.from(this._container.childNodes);
		messages.forEach((messageElement) => {
			if (!isNil(messageElement)) {
				messageElement.classList.add("fade-out");
				setTimeout(messageElement.remove(), 250);
			}
		});
	}
}