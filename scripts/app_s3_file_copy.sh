#!/bin/bash

aws s3 sync s3://c3finops/docs/ /var/www/html/

echo "S3 DEV Files were synced" | mail -s "S3 Files were synced" kesav.kummari@c3ops.in