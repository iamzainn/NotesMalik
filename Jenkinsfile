pipeline {
    agent any

    environment {
        // Define hard-coded environment variables
        DOCKER_HUB_REPO = 'iamzainn'
        IMAGE_NAME = 'Myapp'
    }

    stages {
        stage('Cloning repo') {
            steps {
                echo 'Cloning the repository...'
                // Checkout the repository
                git 'https://github.com/iamzainn/NotesMalik.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // Build the application
               

                echo 'Building Docker image...'
                // Build Docker image using environment variables
                sh 'docker build -t $DOCKER_HUB_REPO/$IMAGE_NAME:latest .'
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }

                    echo 'Pushing Docker image to Docker Hub...'
                    // Push Docker image using environment variables
                    sh 'docker push $DOCKER_HUB_REPO/$IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploying') {
            steps {
                echo 'Deploying the application...'
                // Deploy the application using environment variables
                sh 'docker run -d -p 3000:3000 $DOCKER_HUB_REPO/$IMAGE_NAME:latest'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            // Cleanup Docker
            sh 'docker system prune -f'
        }
    }
}
