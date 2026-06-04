pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing testing packages...'
                bat 'npm install' 
            }
        }
        
        stage('Execute Tests') {
            steps {
                echo 'Running automation framework...'
                // If you are using Playwright, you might want to change 'npm test' to:
                bat 'npx playwright test'
            }
        }
    }
}