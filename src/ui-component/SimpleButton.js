import { Button } from '@mui/material';
import { THEME_COLOR_DARK } from 'utils/Constants';
import AnimateButton from './extended/AnimateButton';

// eslint-disable-next-line
function SimpleButton({ isValid, title }) {
    return (
        <AnimateButton>
            <Button
                disableElevation
                disabled={isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{ backgroundColor: THEME_COLOR_DARK, color: 'white' }}
            >
                {title}
            </Button>
        </AnimateButton>
    );
}

export default SimpleButton;
