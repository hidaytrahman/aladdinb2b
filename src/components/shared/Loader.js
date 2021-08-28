import { CircularProgress } from "@material-ui/core";

const Loader = ({loading}) => loading && <CircularProgress color="secondary" />

export default Loader;