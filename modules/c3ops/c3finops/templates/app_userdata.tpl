#!/bin/bash

# Copying environment script files
cp -pvr /home/ec2-user/c3finops/scripts/${env}/start_application.sh /home/ec2-user/start_application.sh
cp -pvr /home/ec2-user/c3finops/scripts/${env}/dbhostnamereplace.sh /home/ec2-user/dbhostnamereplace.sh
cp -pvr /home/ec2-user/c3finops/scripts/${env}/app_s3_file_copy.sh /home/ec2-user/app_s3_file_copy.sh

chmod 777 /home/ec2-user/scripts/app_s3_file_copy.sh

chmod 777 /home/ec2-user/dbhostnamereplace.sh
cd /home/ec2-user/
./dbhostnamereplace.sh
chmod 777 /home/ec2-user/start_application.sh
#crontab -e
#@reboot /home/ec2-user/start_application.sh
#crontab -l | { cat; echo "@reboot /home/ec2-user/start_application.sh"; } | crontab -

# Remove existing crontab
crontab -r

# Create new cron jobs with logging
cat <<EOF | crontab -
*/5 * * * * /home/ec2-user/app_s3_file_copy.sh >> /var/log/app_s3_file_copy.log 2>&1
@reboot sleep 300 && /home/ec2-user/start_application.sh >> /var/log/start_application.log 2>&1
EOF

echo "Crontab updated successfully. Old crontab backed up in /tmp."

#crontab -l | { cat; echo "*/5 * * * * /home/ec2-user/start_application.sh"; echo "@reboot /home/ec2-user/start_application.sh"; } | crontab -


# Copying the Docs to Server
cp -pvr /home/ec2-user/c3finops/scripts/* /var/www/html/



