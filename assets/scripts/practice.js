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
        const isCorrectFolder = JSON.stringify(currentPath) === JSON.stringify(correctPath);
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
        practiceProgress.textContent = "Step 2 of 2: Send your email to employer@clickstartmail.com.";
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
            practiceState.attachmentFirstTry = false;
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

        const validRecipient = "employer@clickstartmail.com";
        const hasValidRecipient = recipient === validRecipient;
        const hasSubject = subject !== "";

        const messageLines = message
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        const signOffPhrases = ["kind regards", "yours sincerely", "best regards"];
        
        const lastLine = messageLines.length > 0
            ? messageLines[messageLines.length - 1].toLowerCase()
            : "";

        const secondLastLine = messageLines.length > 1
            ? messageLines[messageLines.length - 2].toLowerCase()
            : "";
        
        const hasSignOffOnLastLine = signOffPhrases.some(phrase => lastLine.startsWith(phrase));
        const hasSignOffOnSecondLastLine = signOffPhrases.some(phrase => secondLastLine.startsWith(phrase));

        const hasSignOff = hasSignOffOnLastLine || hasSignOffOnSecondLastLine;

        let hasMainMessage = false;

        if (hasSignOffOnLastLine) {
            hasMainMessage = messageLines.length > 1;
        } else if (hasSignOffOnSecondLastLine) {
            hasMainMessage = messageLines.length > 2;
        } else {
            hasMainMessage = messageLines.length > 0;
        }
    

        emailMessage.textContent = "";

        if (!hasValidRecipient) {
            emailMessage.textContent = "Please enter the correct recipient email address.";
            practiceState.recipientFirstTry = false;
            return;
        }

        if (!hasSubject) {
            emailMessage.textContent = "Please enter a subject line.";
            practiceState.subjectFirstTry = false;
            return;
        }

        if (!hasMainMessage) {
            emailMessage.textContent = "Please write the main part of your email message.";
            practiceState.messageFirstTry = false;
            return;
        }

        if (!hasSignOff) {
            emailMessage.textContent = "Please include a sign-off such as 'kind regards', 'best regards' or 'yours sincerely'.";
            practiceState.signOffFirstTry = false;
            return;
        }

        if (!practiceState.fileAttached) {
            emailMessage.textContent = "Please attach your saved cover letter before sending.";
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

    function showResults() {
        const totalMarks = 7;
        const percentage = Math.round((practiceState.score / totalMarks) * 100);

        emailSection.classList.add("hidden");
        resultsSection.classList.remove("hidden");

        practiceScoreText.textContent = "Your final score is " + practiceState.score + " out of " + totalMarks + ".";
        practicePercentageText.textContent = "Percentage: " + percentage + "%";

        if (percentage >= 85) {
            practiceFeedbackText.textContent = "Excellent work! You completed the task confidently and accurately.";
        } else if (percentage >= 60) {
            practiceFeedbackText.textContent = "Good effort! You completed the task, but a few corrections were needed.";
        } else {
            practiceFeedbackText.textContent = "Nice try. Review file saving, email writing and attachments to improve your score.";
        }

        practiceProgress.textContent = "Task complete.";
        practiceStatusMessage.textContent = "Your practice task has been completed.";
        resultsSection.scrollIntoView({ behavior: "smooth"});
    }

    // INITIAL LOAD
    updatePath();
    renderFolders();
});