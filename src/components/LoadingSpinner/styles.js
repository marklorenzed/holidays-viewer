import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    spinner: {
        position: 'relative',
        left: '50%',
        top: '50%',
        color: "white"
    },
    mask: {
        background: "rgba(0, 0, 0, 0.3)",
        position: "fixed"
    }
});

export default useStyles;
