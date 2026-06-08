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

    // ADD 
    post {
        always {
            echo 'Publishing Playwright HTML Test Report...'
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report', 
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}