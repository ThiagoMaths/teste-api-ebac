pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'master', url: 'https://github.com/ThiagoMaths/teste-api-ebac.git'
                sh 'npm i start-server-and-test'
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}
