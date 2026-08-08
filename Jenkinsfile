pipeline {
  agent {
    label 'java-jdk21'
  }

  stages {
    stage('Build and Test') {
      steps {
        nodejs('NodeJS 24.18.0') {
          dir('allure-results') {
            deleteDir()
          }

          dir('allure-report') {
            deleteDir()
          }

          dir('test-results') {
            deleteDir()
          }

          dir('playwright-report') {
            deleteDir()
          }

          sh 'npm ci'
          sh 'npx playwright install --with-deps'

          withAllureUpload(
            credentialsId: 'allure-testops-api-token',
            name: '${JOB_NAME} - #${BUILD_NUMBER}',
            projectId: '5316',
            results: [[path: 'allure-results']],
            serverId: 'Allure TestOps',
            tags: ''
          ) {
            script {
              env.NOTIFICATION_TESTOPS_URL =
                "${env.ALLURE_ENDPOINT}/jobrun/${env.ALLURE_JOB_RUN_ID}"
            }

            sh 'npm test'
          }
        }
      }
    }
  }

  post {
    always {
      allure(
        includeProperties: false,
        jdk: '',
        properties: [],
        reportBuildPolicy: 'ALWAYS',
        results: [[path: 'allure-results']]
      )

      withCredentials([
        string(
          credentialsId: 'tlc-tg-bot-token',
          variable: 'TELEGRAM_BOT_TOKEN'
        ),
        string(
          credentialsId: 'tlc-tg-test-chat-id-3',
          variable: 'TELEGRAM_CHAT_ID'
        ),
      ]) {
        sh '''
          set +x
          RUNTIME_CONFIG="${WORKSPACE}@tmp/allure-notifications-config.json"

          trap 'rm -f "$RUNTIME_CONFIG"' EXIT

          cat > "$RUNTIME_CONFIG" <<EOF
          {
            "base": {
              "project": "${JOB_BASE_NAME}",
              "environment": "Jenkins",
              "comment": "Результаты сборки #${BUILD_NUMBER}",
              "links": {
                "testops": "${NOTIFICATION_TESTOPS_URL}",
                "build": "${BUILD_URL}"
              },
              "language": "ru",
              "allureFolder": "allure-report/",
              "allureResultsFolder": "allure-results/",
              "enableChart": true,
              "chart": {
                "mode": "pie"
              },
              "darkMode": true
            },
            "telegram": {
              "token": "${TELEGRAM_BOT_TOKEN}",
              "chat": "${TELEGRAM_CHAT_ID}",
              "templatePath": "/templates/telegram.ftl"
            },
          }
EOF

          JAR="${WORKSPACE}@tmp/allure-notifications-5.0.3.jar"

          if [ ! -f "$JAR" ]; then
            wget -O "$JAR" \
              https://github.com/qa-guru/allure-notifications/releases/download/v5.0.3/allure-notifications-5.0.3.jar
          fi

          java \
            "-DconfigFile=$RUNTIME_CONFIG" \
            -jar "$JAR"
        '''
      }
    }
  }
}