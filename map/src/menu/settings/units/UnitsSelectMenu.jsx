import {
    Divider,
    FormControl,
    FormControlLabel,
    ListItem,
    ListItemText,
    Paper,
    Radio,
    RadioGroup,
} from '@mui/material';
import radioStyles from '../../trackfavmenu.module.css';
import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function UnitsSelectMenu({ unit, setOpenList }) {
    const ctx = useContext(AppContext);

    const { t } = useTranslation();

    const select = (event) => {
        const u = event.target.value;
        ctx.setUnitsSettings((prevState) => ({
            ...prevState,
            [unit.type]: u,
        }));
        setOpenList(false);
    };

    const UnitRadioMenu = () => {
        const keys = Object.keys(unit.list);
        const dividerIndexes = {
            len: [0, 3],
            speed: [2, 4],
        };

        if (!dividerIndexes[unit.type]) return null;

        return (
            <>
                {keys.map((key, index) => (
                    <React.Fragment key={key}>
                        <FormControlLabel
                            className={radioStyles.controlLabel}
                            value={key}
                            control={<Radio sx={{ mr: '-12px', ml: '5px' }} />}
                            label={<UnitRadioItem label={t(unit.list[key])} />}
                        />
                        {dividerIndexes[unit.type].includes(index) && (
                            <Divider className={radioStyles.dividerActions} />
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

    const UnitRadioItem = ({ label }) => {
        return (
            <ListItem className={radioStyles.sortItem}>
                <ListItemText className={radioStyles.sortText}>{label}</ListItemText>
            </ListItem>
        );
    };

    return (
        <Paper className={radioStyles.actions}>
            <FormControl>
                <RadioGroup value={ctx.unitsSettings[unit.type]} onChange={select}>
                    <UnitRadioMenu />
                </RadioGroup>
            </FormControl>
        </Paper>
    );
}
