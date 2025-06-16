pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
               git branch: 'master', url: 'https://github.com/ThiagoMaths/teste-api-ebac.git'
            }
        }
           stage('Instalar dependencias') {
            steps {
             bat 'npm install'
            }
        }
           stage('Executar Testes') {
            steps {
                bat 'NO_COLOR=1 npm test'
            }
        }
    }
}
