pipeline {
    agent {
        docker {
            image 'node:20'
            args '-u root'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        EC2_INSTANCE_ID = 'YOUR_EC2_INSTANCE_ID'
        EC2_SSH_USER = 'ubuntu'
        EC2_SSH_KEY = credentials('ec2-ssh-key')
        GITHUB_CREDENTIALS = credentials('github-ssh-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        credentialsId: 'github-ssh-key',
                        url: 'git@github.com:your-org/your-repo.git'
                    ]]
                ])
            }
        }

        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_SSH_USER}@${EC2_INSTANCE_ID} <<EOF
                            mkdir -p /home/ubuntu/next
                            cd /home/ubuntu/next
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
