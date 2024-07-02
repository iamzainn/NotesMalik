pipeline {
    agent {
        docker {
            image 'node:16'
            args '-u root'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        EC2_INSTANCE_ID = 'YOUR_EC2_INSTANCE_ID'
        EC2_SSH_USER = 'YOUR_EC2_SSH_USER'
        EC2_SSH_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_SSH_USER}@${EC2_INSTANCE_ID} <<EOF
                            cd /path/to/your/project
                            git pull
                            npm install
                            npm run build
                            pm2 restart your-app
                            exit
                        EOF
                        """
                    }
                }
            }
        }
    }
}
