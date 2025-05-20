import { Box, Icon, ListItemText } from '@mui/material';
import styles from '../../errors/errors.module.css';
import React from 'react';
import { ReactComponent as AccessIcon } from '../../../assets/icons/ic_action_sand_clock.svg';
import { useTranslation } from 'react-i18next';
import { createAccount } from '../../../manager/LoginManager';
import BlueBtn from '../../../frame/components/btns/BlueBtn';

export default function PendingAccessError() {
    const { t } = useTranslation();

    return (
        <Box>
            <Box className={styles.block}>
                <Icon className={styles.icon}>
                    <AccessIcon className={styles.icon} />
                </Icon>
                <Box className={styles.info}>
                    <ListItemText disableTypography={true} className={styles.title}>
                        {t('web:access_requested')}
                    </ListItemText>
                    <ListItemText disableTypography={true} className={styles.text}>
                        {t('web:access_requested_desc')}
                    </ListItemText>
                </Box>
            </Box>
            <BlueBtn
                action={() => createAccount(ctx)}
                text={t('web:access_requested_btn')}
                additionalStyle={{ color: '#727272 !important', mt: '-15px' }}
                span={true}
                disabled={true}
            />
        </Box>
    );
}
