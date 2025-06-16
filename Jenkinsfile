pipeline {
    agent any

    stages {
           stage('Instalar dependencias') {
            steps {
             bat 'npm install'
            }
        }
           stage('Executar Testes') {
            steps {
                set '''NO_COLOR=1 npm test'''
            }
        }
    }
}
