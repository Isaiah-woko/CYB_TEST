document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // 1. Application State
    // ======================
    const state = {
        currentCourse: null,
        currentQuestion: 0,
        userAnswers: [],
        timeLeft: 1800, // 30 minutes in seconds
        timerId: null,
        questions: [],
        timerEnabled: true // Default to timer enabled
    };

    // ======================
    // 2. Course Data
    // ======================
    const courses = {
        "networking": {
            title: "Digital Forenseics (CYB 299.1)",
            description: "Test your knowledge of network protocols, topologies and security",
            image: "digital_forensics.png",
            questions: [
                {
                    "question": "What is the primary goal of digital forensics?",
                    "options": ["Recover lost passwords", "Enhance network security", "Collect and preserve digital evidence for legal purposes", "Develop encryption algorithms"],
                    "answer": "Collect and preserve digital evidence for legal purposes"
                },
                {
                    "question": "Which of the following is a subspecialty of digital forensics?",
                    "options": ["Cloud storage management", "Network forensics", "Software development", "Data entry validation"],
                    "answer": "Network forensics"
                },
                {
                    "question": "What ensures the integrity of digital evidence during preservation?",
                    "options": ["Metadata analysis", "Hash values (e.g., SHA-256)", "Social media tracking", "Live data acquisition"],
                    "answer": "Hash values (e.g., SHA-256)"
                },
                {
                    "question": "Which challenge is NOT associated with digital forensics?",
                    "options": ["Managing large data volumes", "Overpowering encryption", "Creating new programming languages", "Jurisdictional issues in international cases"],
                    "answer": "Creating new programming languages"
                },
                {
                    "question": "What role does international cooperation play in digital forensics?",
                    "options": ["Slows down investigations", "Resolves cross-border jurisdictional challenges", "Reduces encryption complexity", "Eliminates the need for forensic tools"],
                    "answer": "Resolves cross-border jurisdictional challenges"
                },
                {
                    "question": "Which is an example of a cyber trail?",
                    "options": ["Physical fingerprints", "Email headers and IP addresses", "Handwritten notes", "Voice recordings"],
                    "answer": "Email headers and IP addresses"
                },
                {
                    "question": "How do VPNs complicate digital forensic investigations?",
                    "options": ["Encrypt all data permanently", "Mask the user’s real IP address", "Delete server logs automatically", "Speed up network traffic"],
                    "answer": "Mask the user’s real IP address"
                },
                {
                    "question": "What tool is used to analyze network traffic in real time?",
                    "options": ["FTK", "Wireshark", "EnCase", "Passware Kit"],
                    "answer": "Wireshark"
                },
                {
                    "question": "In a DDoS attack investigation, which technique is critical for tracing the attacker?",
                    "options": ["Social media analysis", "Email header review", "IP address tracking", "Metadata extraction"],
                    "answer": "IP address tracking"
                },
                {
                    "question": "What is a common method cybercriminals use to obscure their digital footprints?",
                    "options": ["Using public Wi-Fi", "Encrypted communications and Tor networks", "Posting on social media", "Deleting browser history manually"],
                    "answer": "Encrypted communications and Tor networks"
                },
                {
                    "question": "Which tool creates a bit-for-bit copy of a storage device?",
                    "options": ["Wireshark", "FTK Imager", "Tor Browser", "Maltego"],
                    "answer": "FTK Imager"
                },
                {
                    "question": "What does the TRIM command do in SSDs?",
                    "options": ["Encrypts deleted files", "Permanently erases deleted files", "Recovers lost partitions", "Compresses storage space"],
                    "answer": "Permanently erases deleted files"
                },
                {
                    "question": "Which file system is commonly analyzed in Windows environments?",
                    "options": ["APFS", "FAT32/NTFS", "ext4", "HFS+"],
                    "answer": "FAT32/NTFS"
                },
                {
                    "question": "What is the purpose of a write-blocker?",
                    "options": ["Encrypt evidence during analysis", "Prevent modifications to original data", "Recover deleted files", "Track network traffic"],
                    "answer": "Prevent modifications to original data"
                },
                {
                    "question": "Which technique is used to recover deleted files from HDDs?",
                    "options": ["File carving", "Metadata hashing", "IP tracking", "Live acquisition"],
                    "answer": "File carving"
                },
                {
                    "question": "Which activity is classified as cybercrime?",
                    "options": ["Cloud storage backup", "Phishing attacks", "Software updates", "Data encryption"],
                    "answer": "Phishing attacks"
                },
                {
                    "question": "What does GDPR regulate?",
                    "options": ["Network bandwidth", "Data privacy in the European Union", "Hardware manufacturing", "Malware detection"],
                    "answer": "Data privacy in the European Union"
                },
                {
                    "question": "Which law addresses cybercrime in Nigeria?",
                    "options": ["CFAA", "Cybercrimes Act", "Budapest Convention", "DMCA"],
                    "answer": "Cybercrimes Act"
                },
                {
                    "question": "What is cybersquatting?",
                    "options": ["Hacking into corporate servers", "Illegally registering domain names of brands", "Creating ransomware", "Intercepting encrypted communications"],
                    "answer": "Illegally registering domain names of brands"
                },
                {
                    "question": "What is a key challenge in enforcing cybercrime laws?",
                    "options": ["Lack of digital evidence", "Jurisdictional barriers", "Overabundance of forensic tools", "Easy decryption of data"],
                    "answer": "Jurisdictional barriers"
                },
                {
                    "question": "What is the first step in securing digital evidence?",
                    "options": ["Data encryption", "Locking the crime scene", "Imaging the hard drive", "Keyword searching"],
                    "answer": "Locking the crime scene"
                },
                {
                    "question": "Which technique ensures data integrity during storage?",
                    "options": ["Social media analysis", "Write-blockers", "Environmental controls", "Data encryption"],
                    "answer": "Data encryption"
                },
                {
                    "question": "Volatile data includes:",
                    "options": ["Archived emails", "RAM contents and running processes", "Encrypted files", "Cloud backups"],
                    "answer": "RAM contents and running processes"
                },
                {
                    "question": "What is critical when handling volatile data?",
                    "options": ["Powering off the device immediately", "Capturing data before shutdown", "Using physical seals", "Deleting temporary files"],
                    "answer": "Capturing data before shutdown"
                },
                {
                    "question": "Which environmental factor can damage magnetic storage devices?",
                    "options": ["Low humidity", "Strong magnetic fields", "Cold temperatures", "Dark environments"],
                    "answer": "Strong magnetic fields"
                },
                {
                    "question": "What does the chain of custody document?",
                    "options": ["Encryption keys", "Evidence handling and transfers", "Malware signatures", "Network latency"],
                    "answer": "Evidence handling and transfers"
                },
                {
                    "question": "Which element is NOT part of the chain of custody?",
                    "options": ["Tamper-proof seals", "Analysis of evidence for tampering", "Secure storage", "Documented handovers"],
                    "answer": "Analysis of evidence for tampering"
                },
                {
                    "question": "A forensic report must include:",
                    "options": ["Personal opinions", "Executive summary and methodology", "Unverified assumptions", "Technical jargon only"],
                    "answer": "Executive summary and methodology"
                },
                {
                    "question": "What jeopardizes evidence admissibility in court?",
                    "options": ["Detailed case notes", "Gaps in chain of custody", "Use of write-blockers", "Hash value verification"],
                    "answer": "Gaps in chain of custody"
                },
                {
                    "question": "Which section of a forensic report summarizes findings for non-technical readers?",
                    "options": ["Methodology", "Executive Summary", "Conclusion", "Appendices"],
                    "answer": "Executive Summary"
                },
                {
                    "question": "Which tool is used to capture RAM contents?",
                    "options": ["FTK", "Wireshark", "Volatility", "EnCase"],
                    "answer": "Volatility"
                },
                {
                    "question": "Why is volatile data critical in ransomware investigations?",
                    "options": ["It reveals decryption keys", "It stores permanent files", "It contains system backups", "It tracks network latency"],
                    "answer": "It reveals decryption keys"
                },
                {
                    "question": "What is lost when a device is powered off?",
                    "options": ["Archived logs", "Volatile data (RAM)", "Encrypted files", "SSD partitions"],
                    "answer": "Volatile data (RAM)"
                },
                {
                    "question": "What complicates data recovery from encrypted drives?",
                    "options": ["Write-blockers", "Lack of hash values", "Strong encryption algorithms", "Metadata duplication"],
                    "answer": "Strong encryption algorithms"
                },
                {
                    "question": "Which tool assists in decrypting files?",
                    "options": ["FTK Imager", "Passware Kit", "Tor Browser", "Autopsy"],
                    "answer": "Passware Kit"
                },
                {
                    "question": "Anti-forensics techniques aim to:",
                    "options": ["Speed up investigations", "Hide or destroy evidence", "Simplify chain of custody", "Enhance data integrity"],
                    "answer": "Hide or destroy evidence"
                },
                {
                    "question": "Which convention addresses cross-border cybercrime?",
                    "options": ["GDPR", "Budapest Convention", "CFAA", "HIPAA"],
                    "answer": "Budapest Convention"
                },
                {
                    "question": "What is a challenge in enforcing cybercrime laws internationally?",
                    "options": ["Uniform legislation", "Jurisdictional conflicts", "Excess of forensic tools", "Low encryption standards"],
                    "answer": "Jurisdictional conflicts"
                },
                {
                    "question": "Which law applies to U.S. cybercrime cases?",
                    "options": ["Cybercrimes Act", "CFAA", "GDPR", "PIPA"],
                    "answer": "CFAA"
                },
                {
                    "question": "Which file system is used by modern Windows OS?",
                    "options": ["ext4", "NTFS", "HFS+", "APFS"],
                    "answer": "NTFS"
                },
                {
                    "question": "What does the TRIM command affect in SSDs?",
                    "options": ["File permissions", "Recovery of deleted files", "Network traffic", "Metadata timestamps"],
                    "answer": "Recovery of deleted files"
                },
                {
                    "question": "File carving recovers data by:",
                    "options": ["Analyzing email headers", "Scanning raw storage for file signatures", "Tracking IP addresses", "Decrypting partitions"],
                    "answer": "Scanning raw storage for file signatures"
                },
                {
                    "question": "In the San Bernardino case, what was a key challenge?",
                    "options": ["Lack of encryption", "Recovering deleted phone data", "Jurisdictional cooperation", "Live network analysis"],
                    "answer": "Recovering deleted phone data"
                },
                {
                    "question": "What helps link social media posts to real-world identities?",
                    "options": ["IP tracking", "Metadata and language patterns", "File carving", "Write-blockers"],
                    "answer": "Metadata and language patterns"
                },
                {
                    "question": "What invalidates a forensic report in court?",
                    "options": ["Executive summary", "Missing chain of custody", "Use of FTK", "Keyword searches"],
                    "answer": "Missing chain of custody"
                },
                {
                    "question": "Case notes should avoid:",
                    "options": ["Timestamps", "Personal opinions", "Tool names", "Hash values"],
                    "answer": "Personal opinions"
                },
                {
                    "question": "Which tool analyzes malware behavior?",
                    "options": ["Wireshark", "Cuckoo Sandbox", "FTK", "EnCase"],
                    "answer": "Cuckoo Sandbox"
                },
                {
                    "question": "Magnetic imaging is used for:",
                    "options": ["Network analysis", "Recovering data from damaged HDDs", "Decrypting files", "Social media tracking"],
                    "answer": "Recovering data from damaged HDDs"
                },
                {
                    "question": "Metadata includes:",
                    "options": ["File content", "Creation timestamps", "Encryption keys", "IP tracking logs"],
                    "answer": "Creation timestamps"
                },
                {
                    "question": "Timeline reconstruction relies on:",
                    "options": ["Social media posts", "File system metadata", "VPN logs", "Data carving"],
                    "answer": "File system metadata"
                },
                {
                    "question": "Which term describes data about data (e.g., file creation time)?",
                    "options": ["Hash value", "Metadata", "Encryption key", "Network packet"],
                    "answer": "Metadata"
                },
                {
                    "question": "What ensures that digital evidence has not been altered?",
                    "options": ["Write-blockers", "Hash verification (e.g., SHA-256)", "IP tracking", "Social media analysis"],
                    "answer": "Hash verification (e.g., SHA-256)"
                },
                {
                    "question": "Which is NOT a type of digital evidence?",
                    "options": ["Browser history", "DNA samples", "Email headers", "Server logs"],
                    "answer": "DNA samples"
                },
                {
                    "question": "What does Tor network usage leave behind?",
                    "options": ["Original IP address in server logs", "No traces at all", "Metadata in exit nodes", "Physical fingerprints"],
                    "answer": "Metadata in exit nodes"
                },
                {
                    "question": "Which technique helps trace a phishing email’s origin?",
                    "options": ["File carving", "Email header analysis", "Data encryption", "Chain of custody"],
                    "answer": "Email header analysis"
                },
                {
                    "question": "Why are botnets challenging to trace?",
                    "options": ["They use quantum encryption", "Traffic originates from multiple compromised devices", "They avoid metadata generation", "They delete logs automatically"],
                    "answer": "Traffic originates from multiple compromised devices"
                },
                {
                    "question": "What is the primary use of FTK Imager?",
                    "options": ["Network traffic analysis", "Creating forensic disk images", "Decrypting ransomware", "Social media monitoring"],
                    "answer": "Creating forensic disk images"
                },
                {
                    "question": "Which tool is best for analyzing network packets?",
                    "options": ["EnCase", "Wireshark", "Autopsy", "Cellebrite"],
                    "answer": "Wireshark"
                },
                {
                    "question": "SSDs complicate data recovery because of:",
                    "options": ["FAT32 file systems", "TRIM command erasing deleted files", "Magnetic storage corruption", "Lack of write-blockers"],
                    "answer": "TRIM command erasing deleted files"
                },
                {
                    "question": "Which law governs EU data privacy?",
                    "options": ["CFAA", "GDPR", "HIPAA", "Budapest Convention"],
                    "answer": "GDPR"
                },
                {
                    "question": "What is a key ethical obligation in digital forensics?",
                    "options": ["Ignoring privacy laws", "Maintaining chain of custody", "Deleting irrelevant evidence", "Using untested tools"],
                    "answer": "Maintaining chain of custody"
                },
                {
                    "question": "Jurisdictional conflicts in cybercrime often arise due to:",
                    "options": ["Uniform global laws", "Differing national legislations", "Excess of forensic tools", "Lack of encryption"],
                    "answer": "Differing national legislations"
                },
                {
                    "question": "Which data is lost when a device is powered off?",
                    "options": ["Archived emails", "RAM contents", "SSD partitions", "Cloud backups"],
                    "answer": "RAM contents"
                },
                {
                    "question": "What is the purpose of live data acquisition?",
                    "options": ["Recover overwritten files", "Capture volatile data before shutdown", "Encrypt storage devices", "Analyze social media posts"],
                    "answer": "Capture volatile data before shutdown"
                },
                {
                    "question": "Which tool captures RAM contents for analysis?",
                    "options": ["FTK", "Volatility", "Wireshark", "EnCase"],
                    "answer": "Volatility"
                },
                {
                    "question": "Anti-forensics techniques aim to:",
                    "options": ["Speed up investigations", "Obfuscate or destroy evidence", "Simplify metadata extraction", "Enhance chain of custody"],
                    "answer": "Obfuscate or destroy evidence"
                },
                {
                    "question": "Which tool is used to break encryption?",
                    "options": ["FTK Imager", "Passware Kit", "Autopsy", "Tor Browser"],
                    "answer": "Passware Kit"
                },
                {
                    "question": "Full-disk encryption complicates investigations by:",
                    "options": ["Speeding up data recovery", "Blocking access to stored data", "Simplifying hash verification", "Generating more logs"],
                    "answer": "Blocking access to stored data"
                },
                {
                    "question": "Which file system is used by modern Windows OS?",
                    "options": ["ext4", "NTFS", "HFS+", "APFS"],
                    "answer": "NTFS"
                },
                {
                    "question": "File carving recovers data by:",
                    "options": ["Decrypting partitions", "Scanning raw storage for file headers", "Analyzing email metadata", "Tracking IP addresses"],
                    "answer": "Scanning raw storage for file headers"
                },
                {
                    "question": "What does FAT32 lack compared to NTFS?",
                    "options": ["Support for large files", "Journaling and file permissions", "Metadata storage", "Network compatibility"],
                    "answer": "Journaling and file permissions"
                },
                {
                    "question": "Timeline reconstruction relies heavily on:",
                    "options": ["Social media posts", "File system timestamps", "VPN configurations", "Data encryption"],
                    "answer": "File system timestamps"
                },
                {
                    "question": "Which log type records user login attempts?",
                    "options": ["Firewall logs", "Authentication logs", "Email headers", "Browser history"],
                    "answer": "Authentication logs"
                },
                {
                    "question": "In ransomware cases, memory dumping helps recover:",
                    "options": ["Deleted partitions", "Encryption keys", "IP addresses", "Social media activity"],
                    "answer": "Encryption keys"
                },
                {
                    "question": "Magnetic storage devices are sensitive to:",
                    "options": ["Cold temperatures", "Strong magnetic fields", "Low humidity", "Dark environments"],
                    "answer": "Strong magnetic fields"
                },
                {
                    "question": "Tamper-evident seals are used to:",
                    "options": ["Encrypt data", "Detect unauthorized access", "Speed up imaging", "Recover deleted files"],
                    "answer": "Detect unauthorized access"
                },
                {
                    "question": "Environmental controls for digital evidence storage prioritize:",
                    "options": ["High humidity", "Stable temperature and magnetic isolation", "Bright lighting", "Network connectivity"],
                    "answer": "Stable temperature and magnetic isolation"
                },
                {
                    "question": "In the San Bernardino case, forensic experts focused on:",
                    "options": ["Cloud server breaches", "Recovering deleted phone data", "Social media analysis", "Network traffic encryption"],
                    "answer": "Recovering deleted phone data"
                },
                {
                    "question": "A corporate data breach investigation starts by:",
                    "options": ["Interviewing employees", "Securing the server room", "Deleting suspicious files", "Encrypting backups"],
                    "answer": "Securing the server room"
                },
                {
                    "question": "Language patterns in social media posts help:",
                    "options": ["Encrypt communications", "Link anonymous accounts to real identities", "Speed up data acquisition", "Bypass firewalls"],
                    "answer": "Link anonymous accounts to real identities"
                },
                {
                    "question": "A forensic report’s executive summary is written for:",
                    "options": ["Technical experts", "Non-technical readers", "Suspects", "Malware developers"],
                    "answer": "Non-technical readers"
                },
                {
                    "question": "Evidence becomes inadmissible in court if:",
                    "options": ["Hash values are verified", "Chain of custody is broken", "Write-blockers are used", "Metadata is analyzed"],
                    "answer": "Chain of custody is broken"
                },
                {
                    "question": "Case notes must avoid:",
                    "options": ["Timestamps", "Speculative opinions", "Tool names", "File paths"],
                    "answer": "Speculative opinions"
                },
                {
                    "question": "Magnetic force microscopy is used to:",
                    "options": ["Analyze network packets", "Recover data from damaged HDDs", "Decrypt files", "Track VPN usage"],
                    "answer": "Recover data from damaged HDDs"
                },
                {
                    "question": "Wear-leveling in SSDs affects:",
                    "options": ["Network speed", "Data recovery success", "Metadata accuracy", "Chain of custody"],
                    "answer": "Data recovery success"
                },
                {
                    "question": "Which technique bypasses encryption?",
                    "options": ["File carving", "Cold-boot attacks (extracting RAM data)", "IP tracking", "Write-blocking"],
                    "answer": "Cold-boot attacks (extracting RAM data)"
                },
                {
                    "question": "Network forensics primarily analyzes:",
                    "options": ["Physical storage devices", "Traffic logs and packet captures", "Social media posts", "Handwritten notes"],
                    "answer": "Traffic logs and packet captures"
                },
                {
                    "question": "A SYN flood attack is detected using:",
                    "options": ["File system analysis", "Firewall/IDS logs", "Metadata hashing", "Data encryption"],
                    "answer": "Firewall/IDS logs"
                },
                {
                    "question": "Which protocol is often exploited in DDoS attacks?",
                    "options": ["HTTPS", "DNS", "FTP", "SSH"],
                    "answer": "DNS"
                },
                {
                    "question": "Mobile device forensics often deals with:",
                    "options": ["Physical damage to HDDs", "App data and GPS logs", "Network packet analysis", "Cloud encryption"],
                    "answer": "App data and GPS logs"
                },
                {
                    "question": "Which tool extracts data from smartphones?",
                    "options": ["Wireshark", "Cellebrite", "EnCase", "Volatility"],
                    "answer": "Cellebrite"
                },
                {
                    "question": "SIM card cloning helps recover:",
                    "options": ["Deleted photos", "Call logs and SMS", "Social media passwords", "RAM contents"],
                    "answer": "Call logs and SMS"
                },
                {
                    "question": "Cloud forensics challenges include:",
                    "options": ["Physical device access", "Jurisdiction over remote servers", "Lack of encryption", "Simple chain of custody"],
                    "answer": "Jurisdiction over remote servers"
                },
                {
                    "question": "Which law affects cloud data stored in the EU?",
                    "options": ["CFAA", "GDPR", "HIPAA", "DMCA"],
                    "answer": "GDPR"
                },
                {
                    "question": "A key step in cloud evidence collection is:",
                    "options": ["Powering off servers", "Legal requests to the provider", "Deleting backups", "Ignoring jurisdiction"],
                    "answer": "Legal requests to the provider"
                }
            ]
        },
    };

    // ======================
    // 3. DOM Elements
    // ======================
    const elements = {
        startScreen: document.getElementById('startScreen'),
        quizScreen: document.getElementById('quizScreen'),
        resultScreen: document.getElementById('resultScreen'),
        courseCards: document.getElementById('courseCards'),
        questionElement: document.getElementById('question'),
        optionsElement: document.getElementById('options'),
        timeElement: document.getElementById('time'),
        scoreElement: document.getElementById('score'),
        reviewElement: document.getElementById('review'),
        nextBtn: document.getElementById('nextBtn'),
        retryBtn: document.getElementById('retryBtn'),
        darkModeToggle: document.getElementById('darkModeToggle'),
        timerToggle: document.getElementById('timerToggle') // Add this to your HTML
    };

    // ======================
    // 4. Core Functions
    // ======================

    // Initialize the application
    function init() {
        initCourseSelection();
        setupEventListeners();
    }

    // Set up course selection UI
    function initCourseSelection() {
        elements.courseCards.innerHTML = '';
        
        for (const [courseId, course] of Object.entries(courses)) {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-image" style="background-image: url('${course.image}')"></div>
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="timer-option">
                        <label>
                            <input type="checkbox" id="enableTimer" checked>
                            Enable Timer (30 minutes)
                        </label>
                    </div>
                    <button class="start-course-btn" data-course="${courseId}">Start Exam</button>
                </div>
            `;
            elements.courseCards.appendChild(courseCard);
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Course selection buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-course-btn')) {
                const courseId = e.target.getAttribute('data-course');
                const card = e.target.closest('.course-card');
                const timerCheckbox = card.querySelector('#enableTimer');
                state.timerEnabled = timerCheckbox.checked;
                startQuiz(courseId);
            }
        });

        // Quiz navigation
        elements.nextBtn.addEventListener('click', nextQuestion);
        elements.retryBtn.addEventListener('click', () => location.reload());
        elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Start quiz for a specific course
    function startQuiz(courseId) {
        state.currentCourse = courseId;
        // Get all questions for the course
        const allQuestions = courses[courseId].questions;
        
        // Shuffle and select only 50 questions
        state.questions = shuffleArray(allQuestions).slice(0, 50);
        
        state.userAnswers = [];
        state.currentQuestion = 0;
        state.timeLeft = 1800;

        // Update UI
        elements.startScreen.style.display = 'none';
        elements.quizScreen.style.display = 'block';
        elements.resultScreen.style.display = 'none';

        // Show/hide timer based on user preference
        if (state.timerEnabled) {
            elements.timeElement.style.display = 'block';
            startTimer();
        } else {
            elements.timeElement.style.display = 'none';
        }

        showQuestion();
    }

    // Helper function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Timer functionality
    function startTimer() {
        clearInterval(state.timerId);
        
        state.timerId = setInterval(() => {
            state.timeLeft--;
            updateTimerDisplay();
            
            if (state.timeLeft <= 0) {
                clearInterval(state.timerId);
                submitQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(state.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (state.timeLeft % 60).toString().padStart(2, '0');
        elements.timeElement.textContent = `${minutes}:${seconds}`;
    }

    // Display current question
    function showQuestion() {
        const question = state.questions[state.currentQuestion];
        elements.questionElement.textContent = question.question;
        
        const optionsHtml = question.options.map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join('');
        
        elements.optionsElement.innerHTML = optionsHtml;
        elements.nextBtn.textContent = state.currentQuestion === state.questions.length - 1 ? 'Submit' : 'Next';
    }

    // Handle next question or submission
    function nextQuestion() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert('Please select an answer!');
            return;
        }

        state.userAnswers[state.currentQuestion] = selected.value;
        
        if (state.currentQuestion < state.questions.length - 1) {
            state.currentQuestion++;
            animateQuestionTransition();
        } else {
            submitQuiz();
        }
    }

    function animateQuestionTransition() {
        document.querySelector('.question-container').style.opacity = 0;
        setTimeout(() => {
            showQuestion();
            document.querySelector('.question-container').style.opacity = 1;
        }, 300);
    }

    // Submit and show results
    function submitQuiz() {
        if (state.timerEnabled) {
            clearInterval(state.timerId);
        }
        const score = calculateScore();
        saveResult(score);
        showResults(score);
    }

    function calculateScore() {
        return state.questions.reduce((acc, question, index) => {
            return acc + (state.userAnswers[index] === question.answer ? 1 : 0);
        }, 0);
    }

    function showResults(score) {
        elements.quizScreen.style.display = 'none';
        elements.resultScreen.style.display = 'block';
        
        elements.scoreElement.textContent = `${score}/${state.questions.length}`;
        elements.reviewElement.innerHTML = generateReviewHtml(score);
    }

    function generateReviewHtml(score) {
        return state.questions.map((question, index) => {
            if (state.userAnswers[index] !== question.answer) {
                return `
                    <div class="review-item">
                        <p><strong>Question:</strong> ${question.question}</p>
                        <p><strong>Your Answer:</strong> ${state.userAnswers[index] || 'Unanswered'}</p>
                        <p><strong>Correct Answer:</strong> ${question.answer}</p>
                    </div>
                `;
            }
            return '';
        }).join('');
    }

    // Save results to localStorage
    function saveResult(score) {
        const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
        results.push({
            date: new Date().toLocaleString(),
            course: state.currentCourse,
            score: `${score}/${state.questions.length}`,
            timerUsed: state.timerEnabled
        });
        localStorage.setItem('quizResults', JSON.stringify(results));
    }

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // ======================
    // 5. Initialize App
    // ======================
    init();
});