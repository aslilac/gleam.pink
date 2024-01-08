/**
 * Select the Gleam version from a dropdown
 */
const versions = {
	latest: "curl -fsSL https://gleam.pink/install.sh | sh",
	rc: "curl -fsSL https://gleam.pink/install.sh | sh -s -- --version 0.34.0-rc1",
	nightly: "curl -fsSL https://gleam.pink/install.sh | sh -s -- --version nightly",
};

let copyText = versions.latest;
const versionPicker = document.getElementById("version");
const command = document.getElementById("command");

versionPicker.addEventListener("change", (event) => {
	const version = event.target.value;
	const commandText = versions[version];

	if (commandText) {
		command.innerText = commandText;
		copyText = commandText;

		if (commandText !== "latest") {
			command.style.fontSize = version !== "latest" ? "14px" : "";
		}
	}
});

/**
 * Copy the command by clicking a button
 */
const copyButton = document.getElementById("copyButton");
const copyIcon = document.getElementById("copyIcon");
const successIcon = document.getElementById("successIcon");

copyButton.addEventListener("click", async () => {
	await navigator.clipboard.writeText(copyText);

	copyIcon.style.display = "none";
	successIcon.style.display = "block";
	setTimeout(() => {
		copyIcon.style.display = "block";
		successIcon.style.display = "none";
	}, 3000);
});
