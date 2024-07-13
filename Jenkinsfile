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

        stage('Build') {
            steps {
                echo 'Building the application...'
                // Build commands for your application

                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_HUB_REPO/$IMAGE_NAME:latest .'
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        echo 'Logging in to Docker Hub...'
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                        echo 'Pushing Docker image to Docker Hub...'
                        sh 'docker push $DOCKER_HUB_REPO/$IMAGE_NAME:latest'
                    }
                }
            }
        }

        stage('Deploying') {
            steps {
                script {
                    try {
                        echo 'Attempting to stop the running Docker containers...'
                        sh 'docker-compose down'
                        echo 'Successfully stopped the Docker containers.'
                    } catch (Exception e) {
                        echo 'Error occurred while stopping the Docker containers:'
                        echo e.getMessage()
                        currentBuild.result = 'FAILURE'
                        return
                    }

                    try {
                        echo 'Starting the new Docker Compose containers...'
                        sh 'docker-compose up -d'
                        echo 'Successfully started the new Docker Compose containers.'
                    } catch (Exception e) {
                        echo 'Error occurred while starting the new Docker Compose containers:'
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
