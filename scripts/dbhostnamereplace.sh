#/bin/bash
cd /home/ec2-user/dbconfig/
chmod 664 dsp.commons.conf
sed -i 's/c3ops-dev-rds-mysql.c4646dhd.ap-south-2.rds.amazonaws.com/c3ops-prod-rds-mysql.c4646dhd.ap-south-2.rds.amazonaws.com/g' dsp.commons.conf
sed -i 's/awsp/awsd/g' /root/.bashrc
source /root/.bashrc
echo $C3OPS_DEV