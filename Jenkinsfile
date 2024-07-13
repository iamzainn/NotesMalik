pipeline {
    agent any


    stages {
        stage('Cloning repo') {
            steps {
                echo 'Cloning the repository...'
                git branch: 'main', url: 'https://github.com/iamzainn/NotesMalik.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'Building and deploying the application...'

             
                sh 'docker compose -f docker-compose.yml down'
                sh 'docker compose -f docker-compose.yml up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh 'docker system prune -f'
        }
    }
}
