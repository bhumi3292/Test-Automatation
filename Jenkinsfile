pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing testing packages...'
                bat 'npm install'
                
                echo 'Installing Playwright Browsers...'
                bat 'npx playwright install'
            }
        }
        
        stage('Execute Tests') {
            steps {
                echo 'Running automation framework...'
                bat 'npx playwright test'
            }
        }
    }
}