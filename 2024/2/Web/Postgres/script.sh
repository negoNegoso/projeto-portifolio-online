#!/bin/sh
echo "host all zbx_monitor localhost trust" >> /var/lib/postgresql/data/pg_hba.conf
echo "host all zbx_monitor 127.0.0.1/32 md5" >> /var/lib/postgresql/data/pg_hba.conf
echo "host all zbx_monitor ::1/128 scram-sha-256" >> /var/lib/postgresql/data/pg_hba.conf