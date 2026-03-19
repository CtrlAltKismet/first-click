document.addEventListener("DOMContentLoaded", function () {

    const folderView = document.getElementById("folderView");
    const explorerPath = document.getElementById("explorerPath");
    const selectedPathText = document.getElementById("selectedPath");
    
    const openSaveModalBtn = document.getElementById("openSaveModalBtn");
    const closeSaveModalBtn = document.getElementById("closeSaveModalBtn");
    const saveModal = document.getElementById("saveModal");

    const saveFileBtn = document.getElementById("saveFileBtn");
    const fileNameInput = document.getElementById("fileNameInput");
    const saveMessage = document.getElementById("saveMessage");

    const documentSection = document.getElementById("documentSection");
    const emailSection = document.getElementById("emailSection");
    const practiceProgress = document.getElementById("practiceProgress");
    const practiceStatusMessage = document.getElementById("practiceStatusMessage");

    const composeEmailBtn = document.getElementById("composeEmailBtn");
    const emailForm = document.getElementById("emailForm");
    const recipientInput = document.getElementById("recipientInput");
    const subjectInput = document.getElementById("subjectInput");
    const messageInput = document.getElementById("messageInput");
    const attachFileBtn = document.getElementById("attachFileBtn");
    const attachmentStatus = document.getElementById("attachmentStatus");
    const sendEmailBtn = document.getElementById("sendEmailBtn");
    const emailMessage = document.getElementById("emailMessage");

    const resultsSection = document.getElementById("resultsSection");
    const practiceScoreText = document.getElementById("practiceScoreText");
    const practicePercentageText = document.getElementById("practicePercentageText");
    const practiceFeedbackText = document.getElementById("practiceFeedbackText");

    let currentPath = ["This PC"];
    let selectedFolder = null;

    const practiceState = {
        score: 0,
        folderFirstTry: true,
        fileNameFirstTry: true,
        fileSaved: false,

        recipientFirstTry: true,
        subjectFirstTry: true,
        messageFirstTry: true,
        signOffFirstTry: true,
        attachmentFirstTry: true,

        fileAttached: false,
        emailSent: false
    };

    // Folder structure (fake file system)
    const fileSystem = {
        "This PC": ["Documents"],
        "Documents": ["Digital Skills for Beginners"],
        "Digital Skills for Beginners": ["Homework"],
        "Homework": []
    };

    openSaveModalBtn.addEventListener("click", () => {
        saveModal.classList.remove("hidden");
        saveMessage.textContent = "";
    });

    closeSaveModalBtn.addEventListener("click", () => {
        saveModal.classList.add("hidden");
    });

    saveFileBtn.addEventListener("click", () => {
        const fileName = fileNameInput.value.trim();

        const correctPath = ["This PC", "Documents", "Digital Skills for Beginners", "Homework"];
        const isCorrectFolder = JSON. stringify(currentPath) === JSON.stringify(correctPath);
        const isCorrectFileName = fileName === "Cover_Letter_V1";

        // Reset message each time
        saveMessage.textContent = "";

        // Check folder first
        if (!isCorrectFolder) {
            saveMessage.textContent = "Please save the file in Documents > Digital Skills for Beginners > Homework";
            practiceState.folderFirstTry = false;
            return;
        }

        // Check for empty file name
        if (fileName === "") {
            saveMessage.textContent = "Please enter a file name.";
            practiceState.fileNameFirstTry = false;
            return;
        }

        // Check correct file name
        if (!isCorrectFileName) {
            saveMessage.textContent = "Please use the file name: Cover_Letter_V1";
            practiceState.fileNameFirstTry = false;
            return;
        }

        // Award marks only if correct on first try

        if (practiceState.folderFirstTry) {
            practiceState.score += 1;
        }

        if (practiceState.fileNameFirstTry) {
            practiceState.score += 1;
        }

        practiceState.fileSaved = true;

        practiceStatusMessage.textContent = "File saved successfully.";
        saveModal.classList.add("hidden");
        emailSection.classList.remove("hidden");
        practiceProgress.textContent = "Step 2 of 2: Send your email.";
        documentSection.classList.add("hidden");
        emailSection.scrollIntoView({ behavior: "smooth" });
    });

    // Reveals email form when user preses 'Compose'

    composeEmailBtn.addEventListener("click", () => {
        emailForm.classList.remove("hidden");
        emailMessage.textContent = "";
    });

    // Attachment button logic

    attachFileBtn.addEventListener("click", () => {
        if (!practiceState.fileSaved) {
            attachmentStatus.textContent = "Save your file before attaching it.";
            practiceState,attachmentFirstTry = false;
            return;
        }

        practiceState.fileAttached = true;
        attachmentStatus.textContent = "Attached: Cover_Letter_V1";
    });

    // Email Validation

    emailForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const recipient = recipientInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();
        const lowerMessage = message.toLowerCase();

        const validRecipient = "employer@clickstartmail.com";
        const hasValidRecipient = recipient === validRecipient;
        const hasSubject = subject !== "";
        const hasMessage = message !== "";
        const hasSignOff =
            lowerMessage.includes("Kind regards") ||
            lowerMessage.includes("Yours sincerely") ||
            lowerMessage.includes("Best regards");

        emailMessage.textContent = "";

        if (!hasValidRecipient) {
            emailMessage.textContent = "Please enter the correct recipient email address.";
            practiceState.recipientFirstTry = false;
            return;
        }

        if (!hasMessage) {
            emailMessage.textContent = "Please include a sign-off such as 'Kind regards', 'Best regards' or 'Yours sincerely'.";
            practiceState.signOffFirstTry = false;
            return;
        }

        if (!practiceState.fileAttached) {
            emailMessage.textcontent = "Please attach your saved cover letter before sending.";
            practiceState.attachmentFirstTry = false;
            return;
        }
        
        if (practiceState.recipientFirstTry) {
            practiceState.score += 1;
        }

        if (practiceState.subjectFirstTry) {
            practiceState.score += 1;
        }

        if (practiceState.messageFirstTry) {
            practiceState.score += 1;
        }

        if (practiceState.signOffFirstTry) {
            practiceState.score += 1;
        }

        if (practiceState.attachmentFirstTry) {
            practiceState.score += 1;
        }

        practiceState.emailSent = true;

        showResults();
    });


    // Render folders in current location
    function renderFolders() {
        folderView.innerHTML = "";

        const currentFolder = currentPath[currentPath.length - 1];
        const folders = fileSystem[currentFolder];

        folders.forEach(folder => {
            const btn = document.createElement("button");
            btn.classList.add("folder-btn");
            btn.textContent = "📁 " + folder;

            // SINGLE CLICK = select
            btn.addEventListener("click", () => {
                document.querySelectorAll(".folder-btn").forEach(b => b.classList.remove ("selected"));
                btn.classList.add("selected");
                selectedFolder = folder;

                selectedPathText.textContent = "Selected folder: " + [...currentPath, folder].join(" > ");
            });

            // DOUBLE CLICK = open
            btn.addEventListener("dblclick", () => {
                currentPath.push(folder);
                selectedFolder = null;
                updatePath();
                renderFolders();
                selectedPathText.textContent = "Selected folder: None";
            });

            folderView.appendChild(btn);
        });
    }

    // Update Path Bar
    function updatePath() {
        explorerPath.textContent = currentPath.join(" > ");
    }

    // Back Button
    const backBtn = document.getElementById("backFolderBtn");

    backBtn.addEventListener("click", () => {
        if (currentPath.length > 1) {
            currentPath.pop();
            selectedFolder = null;
            updatePath();
            renderFolders();
            selectedPathText.textContent = "Selected folder: None";
        }
    });

    // INITIAL LOAD
    updatePath();
    renderFolders();
});