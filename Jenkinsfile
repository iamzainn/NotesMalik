pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'iamzainn'
        IMAGE_NAME = 'my_app'
    }

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

                script {
                    try {
                        // Clean up existing Docker containers and images
                        echo 'Stopping and removing existing containers...'
                        sh 'docker compose -f docker-compose.yml down --rmi all --volumes --remove-orphans'
                    } catch (Exception e) {
                        echo "Error occurred during cleanup:"
                        echo e.getMessage()
                        currentBuild.result = 'FAILURE'
                        return
                    }

                    try {
                        // Build and deploy using docker-compose
                        echo 'Starting new containers...'
                        sh 'docker compose -f docker-compose.yml up -d --build'
                    } catch (Exception e) {
                        echo "Error occurred during deployment:"
                        echo e.getMessage()
                        currentBuild.result = 'FAILURE'
                        return
                    }
                }
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
